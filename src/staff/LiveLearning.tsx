import { AnimatePresence, motion } from 'motion/react';
import { BellRing, CalendarPlus, Check, Clock, Copy, Link2, Search, Trash2, Users, Video } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { OfficeHour, PublicUser } from '../../shared/types';
import { api } from '../lib/api';
import { fmtDateTime } from '../lib/format';
import { useSession } from '../lib/session';
import {
  Avatar,
  Button,
  Card,
  cx,
  Empty,
  ErrorBox,
  Input,
  Label,
  Loading,
  Modal,
  PageHeader,
  Pill,
  Select,
  useConfirm,
  useLoad,
  useToast,
} from '../components/ui';

interface AccessRow {
  user: PublicUser;
  courses: { courseId: string; title: string }[];
  lastActive?: string;
}

const isPast = (o: OfficeHour) => Date.parse(o.startsAt) + o.durationMin * 60_000 < Date.now();

/** Pick the learners this session is for. Search, tick, done. */
function LearnerPicker({ rows, value, onChange }: { rows: AccessRow[]; value: string[]; onChange: (ids: string[]) => void }) {
  const [q, setQ] = useState('');
  const term = q.trim().toLowerCase();
  const list = term ? rows.filter((r) => r.user.name.toLowerCase().includes(term) || (r.user.email ?? '').toLowerCase().includes(term)) : rows;
  const toggle = (id: string) => onChange(value.includes(id) ? value.filter((x) => x !== id) : [...value, id]);
  return (
    <div>
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <div className="relative min-w-[200px] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name or email" className="!pl-9" aria-label="Search learners" />
        </div>
        <div className="flex gap-1.5">
          <Button size="sm" variant="secondary" onClick={() => onChange(list.map((r) => r.user.id))}>
            Select All
          </Button>
          <Button size="sm" variant="ghost" onClick={() => onChange([])}>
            Clear
          </Button>
        </div>
      </div>
      <div className="max-h-56 space-y-1.5 overflow-y-auto rounded-2xl border border-line p-2 scroll-thin">
        {list.length === 0 && <p className="px-2 py-3 text-sm text-ink-soft">No learner matches that search.</p>}
        {list.map((r) => {
          const on = value.includes(r.user.id);
          return (
            <button
              key={r.user.id}
              type="button"
              onClick={() => toggle(r.user.id)}
              className={cx('flex w-full items-center gap-2.5 rounded-2xl border px-3 py-2 text-left transition', on ? 'border-transparent bg-gradient-to-r from-nblue to-npurple text-white' : 'border-line hover:border-nblue/40')}
            >
              <span className={cx('flex h-5 w-5 shrink-0 items-center justify-center rounded-md border', on ? 'border-white bg-white/25' : 'border-line')}>{on && <Check className="h-3.5 w-3.5" />}</span>
              <Avatar initials={r.user.initials} size={28} />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold">{r.user.name}</span>
                <span className={cx('block truncate text-[12px]', on ? 'text-white/80' : 'text-ink-soft')}>{r.user.email}</span>
              </span>
            </button>
          );
        })}
      </div>
      <p className="mt-1.5 text-[12px] text-ink-soft">{value.length} learner{value.length === 1 ? '' : 's'} invited. Only these learners see the session.</p>
    </div>
  );
}

function ScheduleModal({ open, onClose, rows, courses, onCreated }: { open: boolean; onClose: () => void; rows: AccessRow[]; courses: { id: string; title: string }[]; onCreated: () => void }) {
  const { user } = useSession();
  const toast = useToast();
  const [f, setF] = useState({ title: '', startsAt: '', durationMin: 60, joinUrl: '', courseId: 'all', host: user.name });
  const [invited, setInvited] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  const inPast = !!f.startsAt && new Date(f.startsAt).getTime() < Date.now();
  const problem = !f.title.trim()
    ? 'Give the session a name so learners know what it covers.'
    : !f.startsAt
      ? 'Choose the date and time.'
      : inPast
        ? 'That date and time have already passed. Pick a time in the future.'
        : !/^https?:\/\//i.test(f.joinUrl.trim())
          ? 'Add the meeting link, starting with https://'
          : invited.length === 0
            ? 'Choose at least one learner to invite.'
            : '';

  const save = async () => {
    if (problem) return setErr(problem);
    setErr('');
    setBusy(true);
    try {
      await api('/office-hours', { body: { ...f, kind: 'learning', invited, startsAt: new Date(f.startsAt).toISOString() } });
      toast('success', `Session scheduled. ${invited.length} learner${invited.length === 1 ? '' : 's'} notified.`);
      setF({ ...f, title: '', startsAt: '', joinUrl: '' });
      setInvited([]);
      onCreated();
      onClose();
    } catch (e) {
      setErr((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Schedule a Live Learning Session"
      wide
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button loading={busy} disabled={!!problem} onClick={save} icon={<CalendarPlus className="h-4 w-4" />}>
            Schedule and Notify
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        {err && <ErrorBox message={err} />}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label>Session name</Label>
            <Input value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} placeholder="Live walkthrough: building your first workflow" />
          </div>
          <div>
            <Label>Host</Label>
            <Input value={f.host} onChange={(e) => setF({ ...f, host: e.target.value })} />
          </div>
          <div>
            <Label>Date and time</Label>
            <Input type="datetime-local" value={f.startsAt} onChange={(e) => setF({ ...f, startsAt: e.target.value })} />
            {inPast && <p className="mt-1 text-[12px] font-semibold text-npink">This time is in the past.</p>}
          </div>
          <div>
            <Label>Length (minutes)</Label>
            <Input type="number" min={10} max={240} value={f.durationMin} onChange={(e) => setF({ ...f, durationMin: Number(e.target.value) })} />
          </div>
        </div>
        <div>
          <Label>Meeting link</Label>
          <Input value={f.joinUrl} onChange={(e) => setF({ ...f, joinUrl: e.target.value })} placeholder="https://zoom.us/j/… or any meeting link" />
          <p className="mt-1 text-[12px] text-ink-soft">Zoom, Teams, Meet — any link works. Learners open it from this page.</p>
        </div>
        <div>
          <Label>Course this belongs to</Label>
          <Select value={f.courseId} onChange={(e) => setF({ ...f, courseId: e.target.value })}>
            <option value="all">All my courses</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Label>Invite learners</Label>
          <LearnerPicker rows={rows} value={invited} onChange={setInvited} />
        </div>
      </div>
    </Modal>
  );
}

/**
 * Live Learning.
 * The instructor schedules a session, picks exactly who it is for, adds the
 * meeting link, and can send a reminder to those learners at any time.
 */
export default function LiveLearning() {
  const toast = useToast();
  const confirm = useConfirm();
  const [add, setAdd] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);
  const sessions = useLoad(() => api<{ officeHours: OfficeHour[] }>('/office-hours'), []);
  const access = useLoad(() => api<{ learners: AccessRow[]; courses: { id: string; title: string }[] }>('/staff/learners'), []);

  const mine = useMemo(() => (sessions.data?.officeHours ?? []).filter((o) => o.kind === 'learning').sort((a, b) => Date.parse(b.startsAt) - Date.parse(a.startsAt)), [sessions.data]);
  const upcoming = mine.filter((o) => !isPast(o));
  const past = mine.filter(isPast);
  const nameOf = (id: string) => access.data?.learners.find((r) => r.user.id === id)?.user.name ?? 'Learner';

  if (sessions.loading || access.loading) return <Loading />;
  if (sessions.error) return <ErrorBox message={sessions.error} onRetry={() => void sessions.reload()} />;

  const remind = async (o: OfficeHour) => {
    setBusy(o.id);
    try {
      const r = await api<{ sent: number }>(`/office-hours/${o.id}/remind`, { body: {} });
      toast('success', `Reminder sent to ${r.sent} learner${r.sent === 1 ? '' : 's'}.`);
      await sessions.reload(true);
    } catch (e) {
      toast('error', (e as Error).message);
    } finally {
      setBusy(null);
    }
  };

  const remove = async (o: OfficeHour) => {
    if (!(await confirm({ title: 'Cancel this session?', text: 'Learners will no longer see it.', confirm: 'Cancel session', danger: true }))) return;
    try {
      await api(`/office-hours/${o.id}`, { method: 'DELETE' });
      toast('success', 'Session cancelled.');
      await sessions.reload(true);
    } catch (e) {
      toast('error', (e as Error).message);
    }
  };

  const Row = ({ o }: { o: OfficeHour }) => {
    const done = isPast(o);
    return (
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <Card hover>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-display text-lg font-bold">{o.title}</h3>
                {done ? <Pill color="gray">Finished</Pill> : <Pill color="green">Upcoming</Pill>}
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-ink-soft">
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-4 w-4" /> {fmtDateTime(o.startsAt)} · {o.durationMin} min
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Users className="h-4 w-4" /> {o.invited?.length ?? 0} invited · {o.attended.length} attended
                </span>
                <span>Host: {o.host}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <Button size="sm" variant="secondary" icon={<Link2 className="h-3.5 w-3.5" />} onClick={() => window.open(o.joinUrl, '_blank', 'noopener')}>
                Open Link
              </Button>
              <Button
                size="sm"
                variant="secondary"
                icon={<Copy className="h-3.5 w-3.5" />}
                onClick={() => {
                  void navigator.clipboard?.writeText(o.joinUrl);
                  toast('success', 'Meeting link copied.');
                }}
              >
                Copy
              </Button>
              {!done && (
                <Button size="sm" loading={busy === o.id} icon={<BellRing className="h-3.5 w-3.5" />} onClick={() => void remind(o)}>
                  Send Reminder
                </Button>
              )}
              <Button size="sm" variant="ghost" icon={<Trash2 className="h-3.5 w-3.5" />} onClick={() => void remove(o)}>
                Cancel
              </Button>
            </div>
          </div>
          {(o.invited?.length ?? 0) > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5 border-t border-line pt-3">
              {o.invited!.map((id) => {
                const came = o.attended.includes(id);
                return (
                  <span key={id} className={cx('inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-semibold', came ? 'bg-ngreen-soft text-ngreen-ink' : 'bg-mist text-ink-soft')}>
                    {came && <Check className="h-3 w-3" />} {nameOf(id)}
                    {done && !came && <span className="text-ink-faint">· did not attend</span>}
                  </span>
                );
              })}
            </div>
          )}
          {o.lastReminderAt && <p className="mt-2 text-[12px] text-ink-soft">Last reminder sent {fmtDateTime(o.lastReminderAt)}.</p>}
        </Card>
      </motion.div>
    );
  };

  return (
    <div className="space-y-5">
      <PageHeader
        title="Live Learning"
        subtitle="Schedule a live session, invite the learners it is for, and remind them before it starts."
        actions={
          <Button icon={<CalendarPlus className="h-4 w-4" />} onClick={() => setAdd(true)}>
            Schedule Session
          </Button>
        }
      />

      {mine.length === 0 ? (
        <Empty
          icon={<Video className="h-6 w-6" />}
          title="No live sessions yet"
          text="Schedule one, pick the learners it is for, and they are notified straight away."
          action={<Button onClick={() => setAdd(true)}>Schedule Session</Button>}
        />
      ) : (
        <AnimatePresence>
          {upcoming.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-sm font-bold uppercase tracking-wide text-ink-soft">Upcoming</h2>
              {upcoming.map((o) => (
                <Row key={o.id} o={o} />
              ))}
            </div>
          )}
          {past.length > 0 && (
            <div className="mt-6 space-y-3">
              <h2 className="text-sm font-bold uppercase tracking-wide text-ink-soft">Finished</h2>
              {past.map((o) => (
                <Row key={o.id} o={o} />
              ))}
            </div>
          )}
        </AnimatePresence>
      )}

      <ScheduleModal open={add} onClose={() => setAdd(false)} rows={access.data?.learners ?? []} courses={access.data?.courses ?? []} onCreated={() => void sessions.reload(true)} />
    </div>
  );
}
