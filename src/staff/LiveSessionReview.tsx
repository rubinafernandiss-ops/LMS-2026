import { motion } from 'motion/react';
import { CalendarDays, Check, Clock, Link2, Users, Video } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import type { OfficeHour, PublicUser } from '../../shared/types';
import { api } from '../lib/api';
import { fmtDateTime } from '../lib/format';
import { Avatar, Button, Card, cx, Empty, ErrorBox, Input, Loading, Modal, PageHeader, Pill, useLoad } from '../components/ui';

interface LearnerRow {
  user: PublicUser;
  courses: { courseId: string; title: string }[];
}

const finished = (o: OfficeHour) => Date.parse(o.startsAt) + o.durationMin * 60_000 < Date.now();

/**
 * Review Live Sessions.
 * The administrator's view of every live session an instructor has scheduled,
 * who was invited, and who actually turned up.
 */
/** The full attendance list for one session, opened from "Who Attended". */
function RosterModal({
  session,
  onClose,
  nameOf,
  emailOf,
  initialsOf,
}: {
  session: OfficeHour | null;
  onClose: () => void;
  nameOf: (id: string) => string;
  emailOf: (id: string) => string;
  initialsOf: (id: string) => string;
}) {
  const [tab, setTab] = useState<'came' | 'missed'>('came');
  const [q, setQ] = useState('');
  useEffect(() => {
    setTab('came');
    setQ('');
  }, [session]);
  if (!session) return null;
  const invited = session.invited?.length ? session.invited : session.registered;
  const missed = invited.filter((id) => !session.attended.includes(id));
  const ids = tab === 'came' ? session.attended : missed;
  const needle = q.trim().toLowerCase();
  const shown = needle ? ids.filter((id) => nameOf(id).toLowerCase().includes(needle) || emailOf(id).toLowerCase().includes(needle)) : ids;
  return (
    <Modal
      open={!!session}
      onClose={onClose}
      wide
      title={`Attendance · ${session.title}`}
      footer={
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      }
    >
      <p className="text-sm text-ink-soft">
        {fmtDateTime(session.startsAt)} · delivered by {session.host}
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <div className="flex gap-1.5 rounded-full bg-mist p-1">
          <button onClick={() => setTab('came')} className={cx('rounded-full px-3.5 py-1.5 text-[13px] font-bold transition', tab === 'came' ? 'bg-white text-ngreen-ink shadow-sm' : 'text-ink-soft')}>
            Attended ({session.attended.length})
          </button>
          <button onClick={() => setTab('missed')} className={cx('rounded-full px-3.5 py-1.5 text-[13px] font-bold transition', tab === 'missed' ? 'bg-white text-npink shadow-sm' : 'text-ink-soft')}>
            Did not attend ({missed.length})
          </button>
        </div>
        {ids.length > 8 && <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filter by name or email" className="!w-auto flex-1 !rounded-full" aria-label="Filter attendance by name or email" />}
      </div>

      {shown.length === 0 ? (
        <p className="mt-6 text-center text-sm text-ink-soft">
          {ids.length === 0 ? (tab === 'came' ? 'Nobody has been marked as attending yet.' : 'Everyone invited turned up.') : 'No one matches that search.'}
        </p>
      ) : (
        <ul className="mt-4 max-h-[50vh] divide-y divide-line overflow-y-auto scroll-thin">
          {shown.map((id) => (
            <li key={id} className="flex items-center gap-3 py-2.5">
              <Avatar initials={initialsOf(id)} size={32} />
              <div className="min-w-0 flex-1">
                <div className="truncate font-semibold">{nameOf(id)}</div>
                <div className="truncate text-[12px] text-ink-soft">{emailOf(id)}</div>
              </div>
              {tab === 'came' ? (
                <Pill color="green">
                  <Check className="h-3 w-3" /> Attended
                </Pill>
              ) : (
                <Pill color="gray">Missed</Pill>
              )}
            </li>
          ))}
        </ul>
      )}
      <p className="mt-4 text-[12px] text-ink-soft">Attendance feeds each learner&rsquo;s engagement score.</p>
    </Modal>
  );
}

export default function LiveSessionReview() {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all');
  const [roster, setRoster] = useState<OfficeHour | null>(null);
  const [q, setQ] = useState('');
  const sessions = useLoad(() => api<{ officeHours: OfficeHour[] }>('/office-hours'), []);
  const people = useLoad(() => api<{ learners: LearnerRow[] }>('/staff/learners'), []);

  const nameOf = (id: string) => people.data?.learners.find((r) => r.user.id === id)?.user.name ?? 'Learner';
  const initialsOf = (id: string) => people.data?.learners.find((r) => r.user.id === id)?.user.initials ?? '–';
  const emailOf = (id: string) => people.data?.learners.find((r) => r.user.id === id)?.user.email ?? '';

  const list = useMemo(() => {
    let all = [...(sessions.data?.officeHours ?? [])].sort((a, b) => Date.parse(b.startsAt) - Date.parse(a.startsAt));
    if (filter === 'upcoming') all = all.filter((o) => !finished(o));
    if (filter === 'past') all = all.filter(finished);
    const term = q.trim().toLowerCase();
    if (term) all = all.filter((o) => o.title.toLowerCase().includes(term) || o.host.toLowerCase().includes(term));
    return all;
  }, [sessions.data, filter, q]);

  if (sessions.loading) return <Loading />;
  if (sessions.error) return <ErrorBox message={sessions.error} onRetry={() => void sessions.reload()} />;

  const all = sessions.data?.officeHours ?? [];

  return (
    <div className="space-y-5">
      <PageHeader title="Review Live Sessions" subtitle="Review live sessions and see who delivers. Attendance feeds each learner’s engagement score." />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'Sessions Scheduled', value: all.length, color: '#1F6BFF', icon: <CalendarDays className="h-5 w-5" /> },
          { label: 'Upcoming', value: all.filter((o) => !finished(o)).length, color: '#8B3DFF', icon: <Clock className="h-5 w-5" /> },
          { label: 'Finished', value: all.filter(finished).length, color: '#00C2FF', icon: <Video className="h-5 w-5" /> },
        ].map((t, i) => (
          <motion.div key={t.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="relative overflow-hidden !p-4" hover>
              <span className="absolute inset-x-0 top-0 h-1" style={{ background: t.color }} />
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: `${t.color}1a`, color: t.color }}>
                {t.icon}
              </span>
              <div className="mt-2 font-display text-[26px] font-extrabold">{t.value}</div>
              <div className="text-[13px] font-semibold text-ink-soft">{t.label}</div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="flex gap-1.5">
          {(['all', 'upcoming', 'past'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cx('rounded-full px-4 py-1.5 text-sm font-semibold transition', filter === f ? 'bg-ink text-white' : 'bg-mist text-ink-soft hover:text-ink')}
            >
              {f === 'all' ? 'All' : f === 'upcoming' ? 'Upcoming' : 'Finished'}
            </button>
          ))}
        </div>
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filter by session or host" className="!w-auto min-w-[220px] flex-1 !rounded-full" aria-label="Filter sessions" />
      </div>

      {list.length === 0 ? (
        <Empty icon={<Video className="h-6 w-6" />} title="No sessions to review" text="Sessions your instructors schedule appear here." />
      ) : (
        <div className="space-y-3">
          {list.map((o) => {
            const done = finished(o);
            const invited = o.invited?.length ? o.invited : o.registered;
            const rate = invited.length ? Math.round((o.attended.length / invited.length) * 100) : null;
            return (
              <motion.div key={o.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
                <Card>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-display text-lg font-bold">{o.title}</h3>
                        <Pill color={o.kind === 'learning' ? 'purple' : 'blue'}>{o.kind === 'learning' ? 'Live Learning' : 'Live Help'}</Pill>
                        {done ? <Pill color="gray">Finished</Pill> : <Pill color="green">Upcoming</Pill>}
                      </div>
                      <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-ink-soft">
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="h-4 w-4" /> {fmtDateTime(o.startsAt)} · {o.durationMin} min
                        </span>
                        <span>Delivered by {o.host}</span>
                        {o.createdByName && o.createdByName !== o.host && <span>Scheduled by {o.createdByName}</span>}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-display text-2xl font-bold" style={{ color: rate === null ? undefined : rate >= 70 ? '#00804F' : rate >= 40 ? '#1F6BFF' : '#FF2E93' }}>
                        {o.attended.length}
                        <span className="text-base text-ink-soft">/{invited.length || '—'}</span>
                      </div>
                      <div className="text-[12px] font-semibold text-ink-soft">{done ? 'attended' : 'attended so far'}</div>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-line pt-3">
                    <Button size="sm" variant="secondary" icon={<Users className="h-3.5 w-3.5" />} onClick={() => setRoster(o)}>
                      Who Attended ({o.attended.length})
                    </Button>
                    {invited.length === 0 && o.attended.length === 0 && <span className="text-[13px] text-ink-soft">Open to the whole course; nobody has joined yet.</span>}
                    <Button size="sm" variant="ghost" className="ml-auto" icon={<Link2 className="h-3.5 w-3.5" />} onClick={() => window.open(o.joinUrl, '_blank', 'noopener')}>
                      Meeting Link
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
      <RosterModal session={roster} onClose={() => setRoster(null)} nameOf={nameOf} emailOf={emailOf} initialsOf={initialsOf} />
    </div>
  );
}
