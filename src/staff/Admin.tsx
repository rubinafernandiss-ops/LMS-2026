import { KeyRound, Power, ShieldCheck, ThumbsUp, UserPlus } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { AuditEntry, PublicUser, Role } from '../../shared/types';
import { api, tokenStore } from '../lib/api';
import { fmtDateTime } from '../lib/format';
import { useSession } from '../lib/session';
import { Avatar, Button, Card, cx, ErrorBox, FadeIn, Input, Label, Loading, Modal, PageHeader, PasswordField, Pill, Ring, Segmented, Tabs, useConfirm, useLoad, useToast } from '../components/ui';

interface OverviewData {
  feedback: { recommendYes: number; totalLearners: number; answered: number; ease: number | null; startedWithoutAssistance: number };
  stats: { learners: number; instructors: number; publishedCourses: number; totalEnrollments: number; courseStartRate: number; courseCompletionRate: number };
  comments: { id: string; name: string; comment: string; recommend: boolean; createdAt: string }[];
  audit: AuditEntry[];
}

function BigRing({ title, value, label, color }: { title: string; value: number | null; label: string; color: string }) {
  return (
    <Card className="flex flex-col items-center py-7 text-center" hover>
      <Ring value={value} size={140} stroke={12} label={label} color={color} />
      <div className="mt-4 font-display text-[17px] font-bold leading-snug">{title}</div>
    </Card>
  );
}

function Tile({ label, value, color }: { label: string; value: string | number; color: string }) {
  return (
    <Card className="relative overflow-hidden !p-5" hover>
      <span className="absolute inset-x-0 top-0 h-1" style={{ background: color }} />
      <div className="text-sm font-semibold text-ink-soft">{label}</div>
      <div className="mt-1 font-display text-3xl font-extrabold">{value}</div>
    </Card>
  );
}

export function Overview() {
  const toast = useToast();
  const confirm = useConfirm();
  const { logout } = useSession();
  const [tab, setTab] = useState<'comments' | 'audit'>('comments');
  const { data, error, loading, reload } = useLoad(() => api<OverviewData>('/admin/overview'), []);
  if (loading && !data) return <Loading />;
  if (error || !data) return <ErrorBox message={error ?? 'Could not load'} onRetry={() => void reload()} />;
  const f = data.feedback;
  const s = data.stats;
  const resetDemo = async () => {
    const ok = await confirm({ title: 'Reset all data to the demo state?', text: 'All accounts, courses and progress return to the original demo. Everyone is signed out.', confirm: 'Reset everything', danger: true });
    if (!ok) return;
    try {
      await api('/admin/reset-demo', { body: {} });
      toast('success', 'Demo data restored. Please sign in again.');
      tokenStore.set(null);
      setTimeout(logout, 800);
    } catch (e) {
      toast('error', (e as Error).message);
    }
  };
  return (
    <div className="space-y-6">
      <PageHeader title="Overview" />
      <FadeIn className="grid gap-4 md:grid-cols-3">
        <BigRing title="Learners Who Would Recommend USAII®" value={f.totalLearners ? (f.recommendYes / f.totalLearners) * 100 : null} label={`${f.recommendYes}/${f.totalLearners}`} color="#FF2E93" />
        <BigRing title="Ease of Knowing the Next Step" value={f.ease === null ? null : (f.ease / 5) * 100} label={f.ease === null ? '—' : `${f.ease}/5`} color="#00C77F" />
        <BigRing title="Learners Who Started Their Course Unaided" value={f.startedWithoutAssistance} label={`${f.startedWithoutAssistance}%`} color="#1F6BFF" />
      </FadeIn>
      <FadeIn delay={0.1} className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        <Tile label="No. of Learners" value={s.learners} color="#1F6BFF" />
        <Tile label="No. of Instructors" value={s.instructors} color="#8B3DFF" />
        <Tile label="Published Courses" value={s.publishedCourses} color="#FF2E93" />
        <Tile label="Course Start Rate" value={`${s.courseStartRate}%`} color="#8B3DFF" />
        <Tile label="Course Completion Rate" value={`${s.courseCompletionRate}%`} color="#00C77F" />
      </FadeIn>
      <div>
        <Tabs
          value={tab}
          onChange={setTab}
          tabs={[
            { value: 'comments', label: 'Learner comments' },
            { value: 'audit', label: 'Activity log' },
          ]}
        />
        {tab === 'comments' ? (
          <div className="grid gap-3 md:grid-cols-2">
            {data.comments.length === 0 && <p className="text-sm text-ink-faint">No comments yet.</p>}
            {data.comments.map((c) => (
              <Card key={c.id} className="!p-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{c.name}</span>
                  {c.recommend && (
                    <Pill color="green">
                      <ThumbsUp className="h-3 w-3" /> Recommends
                    </Pill>
                  )}
                </div>
                <p className="mt-1 text-sm text-ink-soft">“{c.comment}”</p>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="!p-0 overflow-hidden">
            <div className="max-h-[420px] divide-y divide-line overflow-y-auto scroll-thin">
              {data.audit.map((a) => (
                <div key={a.id} className="grid gap-1 px-5 py-2.5 text-sm sm:grid-cols-[170px_1fr]">
                  <span className="text-xs text-ink-faint">{fmtDateTime(a.at)}</span>
                  <span>
                    <span className="font-semibold">{a.actorName}</span> <span className="text-ink-soft">{a.details}</span>
                  </span>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
      <div className="flex justify-end">
        <Button variant="ghost" size="sm" onClick={() => void resetDemo()}>
          Reset demo data
        </Button>
      </div>
    </div>
  );
}

export function SetPasswordModal({ user, endpoint, onClose }: { user: PublicUser | null; endpoint: string; onClose: () => void }) {
  const toast = useToast();
  const [pw, setPw] = useState('');
  const [busy, setBusy] = useState(false);
  const save = async () => {
    if (!user) return;
    setBusy(true);
    try {
      await api(endpoint, { body: { password: pw } });
      toast('success', `New password set for ${user.name}.`);
      setPw('');
      onClose();
    } catch (e) {
      toast('error', (e as Error).message);
    } finally {
      setBusy(false);
    }
  };
  return (
    <Modal
      open={!!user}
      onClose={onClose}
      title={`Set password for ${user?.name ?? ''}`}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button loading={busy} onClick={save}>
            Save password
          </Button>
        </>
      }
    >
      <PasswordField value={pw} onChange={setPw} id="set-pw" label="New password" />
      <p className="mt-3 text-xs text-ink-faint">Share the new password with {user?.name.split(' ')[0]} so they can sign in.</p>
    </Modal>
  );
}

export function Users() {
  const toast = useToast();
  const confirm = useConfirm();
  const { user: me } = useSession();
  const [role, setRole] = useState<'all' | Role>('all');
  const [create, setCreate] = useState(false);
  const [form, setForm] = useState<{ name: string; email: string; password: string; role: 'instructor' | 'learner' }>({ name: '', email: '', password: '', role: 'instructor' });
  const [busy, setBusy] = useState(false);
  const [pwUser, setPwUser] = useState<PublicUser | null>(null);
  const { data, error, loading, reload } = useLoad(() => api<{ users: PublicUser[] }>('/admin/users'), []);
  const users = useMemo(() => (data?.users ?? []).filter((u) => role === 'all' || u.role === role), [data, role]);
  if (loading && !data) return <Loading />;
  if (error || !data) return <ErrorBox message={error ?? 'Could not load'} onRetry={() => void reload()} />;

  const createUser = async () => {
    setBusy(true);
    try {
      const r = await api('/admin/users', { body: form });
      toast('success', `${r.user.name} can now sign in with ${r.user.email}.`);
      setCreate(false);
      setForm({ name: '', email: '', password: '', role: form.role });
      await reload(true);
    } catch (e) {
      toast('error', (e as Error).message);
    } finally {
      setBusy(false);
    }
  };
  const toggle = async (u: PublicUser) => {
    if (u.active && !(await confirm({ title: `Deactivate ${u.name}?`, text: 'They cannot sign in until you reactivate them. Their data is kept.', confirm: 'Deactivate', danger: true }))) return;
    try {
      await api(`/admin/users/${u.id}`, { method: 'PATCH', body: { active: !u.active } });
      toast('success', u.active ? `${u.name} deactivated.` : `${u.name} reactivated.`);
      await reload(true);
    } catch (e) {
      toast('error', (e as Error).message);
    }
  };

  return (
    <div className="space-y-5">
      <PageHeader
        title="Users"
        actions={
          <Button icon={<UserPlus className="h-4 w-4" />} onClick={() => setCreate(true)}>
            Create account
          </Button>
        }
      />
      <Segmented
        value={role}
        onChange={setRole}
        options={[
          { value: 'all', label: `All (${data.users.length})` },
          { value: 'learner', label: 'Learners' },
          { value: 'instructor', label: 'Instructors' },
          { value: 'admin', label: 'Administrator' },
        ]}
      />
      <Card className="!p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="bg-mist/60 text-left text-xs text-ink-faint">
              <tr>
                <th className="px-5 py-2.5 font-semibold">Name</th>
                <th className="px-3 py-2.5 font-semibold">Role</th>
                <th className="px-3 py-2.5 font-semibold">Status</th>
                <th className="px-5 py-2.5 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {users.map((u) => (
                <tr key={u.id} className={cx(!u.active && 'opacity-60')}>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar initials={u.initials} size={32} />
                      <div>
                        <div className="font-semibold">
                          {u.name} {u.id === me.id && <span className="text-xs text-ink-faint">(you)</span>}
                        </div>
                        <div className="text-xs text-ink-faint">{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3">
                    <Pill color={u.role === 'admin' ? 'pink' : u.role === 'instructor' ? 'purple' : 'blue'}>
                      {u.role === 'admin' && <ShieldCheck className="h-3 w-3" />}
                      {u.role === 'admin' ? 'Administrator' : u.role === 'instructor' ? 'Instructor' : 'Learner'}
                    </Pill>
                  </td>
                  <td className="px-3">{u.active ? <Pill color="green">Active</Pill> : <Pill color="gray">Inactive</Pill>}</td>
                  <td className="px-5">
                    {u.role !== 'admin' ? (
                      <div className="flex justify-end gap-1">
                        <Button size="sm" variant="ghost" icon={<KeyRound className="h-3.5 w-3.5" />} onClick={() => setPwUser(u)}>
                          Set password
                        </Button>
                        <Button size="sm" variant={u.active ? 'ghost' : 'secondary'} icon={<Power className="h-3.5 w-3.5" />} onClick={() => void toggle(u)}>
                          {u.active ? 'Deactivate' : 'Reactivate'}
                        </Button>
                      </div>
                    ) : (
                      <div className="text-right text-xs text-ink-faint">Use the profile menu</div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <Modal
        open={create}
        onClose={() => setCreate(false)}
        title="Create account"
        footer={
          <>
            <Button variant="secondary" onClick={() => setCreate(false)}>
              Cancel
            </Button>
            <Button loading={busy} onClick={createUser}>
              Create account
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <Label>Role</Label>
            <Segmented
              value={form.role}
              onChange={(r) => setForm({ ...form, role: r })}
              options={[
                { value: 'instructor', label: 'Instructor' },
                { value: 'learner', label: 'Learner' },
              ]}
            />
          </div>
          <div>
            <Label htmlFor="cu-name">Full name</Label>
            <Input id="cu-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="cu-email">Email</Label>
            <Input id="cu-email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <PasswordField id="cu-pw" value={form.password} onChange={(v) => setForm({ ...form, password: v })} />
          <p className="text-xs text-ink-faint">They sign in with this email and password. To give a learner course access, use Learners &amp; Access.</p>
        </div>
      </Modal>
      <SetPasswordModal user={pwUser} endpoint={`/admin/users/${pwUser?.id}/reset-password`} onClose={() => setPwUser(null)} />
    </div>
  );
}
