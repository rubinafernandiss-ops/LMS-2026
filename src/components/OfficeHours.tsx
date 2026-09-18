import { CalendarPlus, Check, Clock, ExternalLink, Film, Plus, Trash2, Users, Video } from 'lucide-react';
import { useState } from 'react';
import type { OfficeHour } from '../../shared/types';
import { api } from '../lib/api';
import { downloadText, fmtDateTime } from '../lib/format';
import { useSession } from '../lib/session';
import { Avatar, Button, Card, cx, Empty, ErrorBox, IconButton, Input, Label, Loading, Modal, PageHeader, Pill, Select, useConfirm, useLoad, useToast } from './ui';

function ics(o: OfficeHour) {
  const f = (d: Date) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const s = new Date(o.startsAt);
  const e = new Date(s.getTime() + o.durationMin * 60_000);
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//USAII//Learning//EN',
    'BEGIN:VEVENT',
    `UID:${o.id}@usaii-learning`,
    `DTSTAMP:${f(new Date())}`,
    `DTSTART:${f(s)}`,
    `DTEND:${f(e)}`,
    `SUMMARY:${o.title.replace(/[,;]/g, ' ')}`,
    `DESCRIPTION:Hosted by ${o.host}. Join: ${o.joinUrl}`,
    `URL:${o.joinUrl}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

function CreateSession({ open, onClose, courses, onCreated }: { open: boolean; onClose: () => void; courses: { id: string; title: string }[]; onCreated: () => void }) {
  const { user } = useSession();
  const toast = useToast();
  const [f, setF] = useState({ title: '', startsAt: '', durationMin: 45, joinUrl: '', courseId: 'all', host: user.name });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const inPast = !!f.startsAt && new Date(f.startsAt).getTime() < Date.now();
  const linkLooksWrong = !!f.joinUrl.trim() && !/^https?:\/\//i.test(f.joinUrl.trim());
  const problem = !f.title.trim()
    ? 'Give the session a name so learners know what it covers.'
    : !f.startsAt
      ? 'Choose the date and time of the session.'
      : inPast
        ? 'That date and time have already passed. Pick a time in the future.'
        : linkLooksWrong
          ? 'The meeting link must start with https://'
          : '';
  const save = async () => {
    if (problem) {
      setErr(problem);
      return;
    }
    setErr('');
    setBusy(true);
    try {
      await api('/office-hours', { body: { ...f, startsAt: f.startsAt ? new Date(f.startsAt).toISOString() : '' } });
      toast('success', 'Session scheduled. Learners have been notified.');
      setF({ ...f, title: '', startsAt: '', joinUrl: '' });
      onCreated();
      onClose();
    } catch (e) {
      setErr((e as Error).message);
      toast('error', (e as Error).message);
    } finally {
      setBusy(false);
    }
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Schedule a Live Session"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button loading={busy} disabled={!!problem} onClick={save}>
            Schedule Session
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        {err && <ErrorBox message={err} />}
        <div>
          <Label>Host name</Label>
          <Input value={f.host} onChange={(e) => setF({ ...f, host: e.target.value })} placeholder="Dr. Patricia Okonkwo" />
        </div>
        <div>
          <Label>Session name</Label>
          <Input value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} placeholder="Weekly Q&A: Module 3" />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
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
          <Input value={f.joinUrl} onChange={(e) => setF({ ...f, joinUrl: e.target.value })} placeholder="https://zoom.us/j/…" />
          <p className="mt-1 text-[12px] text-ink-faint">Optional, but learners can only join from here if you add one.</p>
        </div>
        <div>
            <Label>Who is it for?</Label>
            <Select value={f.courseId} onChange={(e) => setF({ ...f, courseId: e.target.value })}>
              <option value="all">All courses</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </Select>
        </div>
      </div>
    </Modal>
  );
}

function SessionCard({ o, past, staff, courseName, onChange, onRemoved }: { o: OfficeHour; past: boolean; staff: boolean; courseName: string; onChange: (o: OfficeHour) => void; onRemoved: () => void }) {
  const { user } = useSession();
  const toast = useToast();
  const confirm = useConfirm();
  const [busy, setBusy] = useState('');
  const [rec, setRec] = useState(o.recordingUrl ?? '');
  const start = Date.parse(o.startsAt);
  const joinable = Date.now() >= start - 15 * 60_000 && Date.now() <= start + o.durationMin * 60_000;
  const registered = o.registered.includes(user.id);
  const act = async (name: string, fn: () => Promise<void>) => {
    setBusy(name);
    try {
      await fn();
    } catch (e) {
      toast('error', (e as Error).message);
    } finally {
      setBusy('');
    }
  };
  return (
    <Card className={cx(joinable && 'border-ngreen/50 shadow-[0_0_0_4px_rgba(0,199,127,0.08)]')}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex gap-4">
          <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-nblue-soft to-npurple-soft text-center">
            <span className="text-[10px] font-bold text-npurple">{new Date(start).toLocaleDateString('en-US', { month: 'short' })}</span>
            <span className="font-display text-xl font-bold leading-none">{new Date(start).getDate()}</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <Avatar initials={o.host.replace(/^Dr\.?\s*/i, '').split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()} size={26} />
              <span className="font-display text-[15px] font-bold">{o.host}</span>
            </div>
            <div className="mt-1 text-[15px] font-semibold text-ink">{o.title}</div>
            <div className="mt-0.5 flex items-center gap-1 text-sm text-ink-soft">
              <Clock className="h-3.5 w-3.5" /> {fmtDateTime(o.startsAt)} · {o.durationMin} min
            </div>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              <Pill color="gray">{courseName}</Pill>
              {joinable && <Pill color="green">Live now</Pill>}
              {staff && (
                <Pill color="blue">
                  <Users className="h-3 w-3" /> {o.registered.length} registered{past ? `, ${o.attended.length} attended` : ''}
                </Pill>
              )}
              {!staff && past && o.attended.includes(user.id) && <Pill color="green">You attended</Pill>}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {!past && joinable && (
            <Button
              variant="success"
              loading={busy === 'join'}
              icon={<Video className="h-4 w-4" />}
              onClick={() =>
                act('join', async () => {
                  const r = await api(`/office-hours/${o.id}/join`, { body: {} });
                  onChange(r.session);
                  window.open(r.joinUrl, '_blank', 'noopener');
                })
              }
            >
              Join now
            </Button>
          )}
          {!past && !staff && (
            <Button
              variant={registered ? 'secondary' : 'primary'}
              loading={busy === 'reg'}
              icon={registered ? <Check className="h-4 w-4 text-ngreen" /> : undefined}
              onClick={() =>
                act('reg', async () => {
                  const r = await api(`/office-hours/${o.id}/register`, { body: {} });
                  onChange(r.session);
                  toast('success', r.session.registered.includes(user.id) ? 'You are registered. We will remind you.' : 'Registration canceled.');
                })
              }
            >
              {registered ? 'Registered' : 'Register'}
            </Button>
          )}
          {!past && (
            <IconButton label="Add to calendar" onClick={() => downloadText(`${o.title.replace(/\W+/g, '-')}.ics`, ics(o), 'text/calendar')}>
              <CalendarPlus className="h-4 w-4" />
            </IconButton>
          )}
          {past && o.recordingUrl && (
            <a href={o.recordingUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-sm font-semibold hover:border-nblue hover:text-nblue">
              <Film className="h-4 w-4" /> Watch recording
            </a>
          )}
          {staff && (
            <IconButton
              label="Delete session"
              className="hover:!text-npink"
              onClick={async () => {
                if (!(await confirm({ title: 'Delete this session?', confirm: 'Delete', danger: true }))) return;
                await act('del', async () => {
                  await api(`/office-hours/${o.id}`, { method: 'DELETE' });
                  onRemoved();
                });
              }}
            >
              <Trash2 className="h-4 w-4" />
            </IconButton>
          )}
        </div>
      </div>
      {staff && past && (
        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-line pt-4">
          <Input value={rec} onChange={(e) => setRec(e.target.value)} placeholder="Recording link (https://…)" className="!w-auto flex-1 !py-2" />
          <Button
            size="sm"
            variant="secondary"
            loading={busy === 'rec'}
            onClick={() =>
              act('rec', async () => {
                const r = await api(`/office-hours/${o.id}`, { method: 'PATCH', body: { recordingUrl: rec } });
                onChange(r.session);
                toast('success', 'Recording link saved.');
              })
            }
          >
            Save recording
          </Button>
        </div>
      )}
      {!past && (
        <a href={o.joinUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-xs text-ink-faint hover:text-nblue">
          <ExternalLink className="h-3 w-3" /> Meeting link opens 15 minutes before the start
        </a>
      )}
    </Card>
  );
}

export default function OfficeHoursPage({ courses }: { courses: { id: string; title: string }[] }) {
  const { user } = useSession();
  const staff = user.role !== 'learner';
  const [create, setCreate] = useState(false);
  const { data, setData, error, loading, reload } = useLoad(() => api<{ officeHours: OfficeHour[] }>('/office-hours'), []);
  if (loading) return <Loading />;
  if (error) return <ErrorBox message={error} onRetry={() => void reload()} />;
  const now = Date.now();
  const list = data?.officeHours ?? [];
  const upcoming = list.filter((o) => Date.parse(o.startsAt) + o.durationMin * 60_000 >= now);
  const past = list.filter((o) => Date.parse(o.startsAt) + o.durationMin * 60_000 < now).reverse();
  const cname = (id: string) => (id === 'all' ? 'All courses' : (courses.find((c) => c.id === id)?.title ?? 'Course'));
  const update = (o: OfficeHour) => setData((d) => (d ? { officeHours: d.officeHours.map((x) => (x.id === o.id ? o : x)) } : d));
  const remove = (id: string) => setData((d) => (d ? { officeHours: d.officeHours.filter((x) => x.id !== id) } : d));
  return (
    <div className="space-y-6">
      <PageHeader
        title="Live Sessions"
        subtitle={
          staff
            ? 'Live sessions for your learners. Attendance feeds each learner’s engagement score.'
            : 'Live sessions scheduled by your instructor. Register for the ones you want to attend and we will remind you the day before.'
        }
        actions={
          staff && (
            <Button icon={<Plus className="h-4 w-4" />} onClick={() => setCreate(true)}>
              Schedule Session
            </Button>
          )
        }
      />
      {!staff && upcoming.length > 0 && (
        <Card className="flex flex-wrap items-center gap-4 bg-gradient-to-r from-npurple-soft/60 to-white">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-nblue to-npurple text-white">
            <Video className="h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="font-bold">
              {upcoming.length} session{upcoming.length === 1 ? '' : 's'} coming up
            </div>
            <p className="text-sm text-ink-soft">Press Register on any session below. Your place is saved and you will get a reminder before it starts.</p>
          </div>
        </Card>
      )}
      <section>
        <h2 className="mb-3 text-lg font-bold">Upcoming</h2>
        <div className="space-y-3">
          {upcoming.length === 0 && <Empty icon={<Video className="h-6 w-6" />} title="No sessions scheduled yet" text={staff ? 'Schedule one from Live Learning.' : 'When your instructor schedules one, it appears here and you will be notified.'} />}
          {upcoming.map((o) => (
            <SessionCard key={o.id} o={o} past={false} staff={staff} courseName={cname(o.courseId)} onChange={update} onRemoved={() => remove(o.id)} />
          ))}
        </div>
      </section>
      {past.length > 0 && (
        <section>
          <h2 className="mb-3 text-lg font-bold">Past sessions</h2>
          <div className="space-y-3">
            {past.map((o) => (
              <SessionCard key={o.id} o={o} past staff={staff} courseName={cname(o.courseId)} onChange={update} onRemoved={() => remove(o.id)} />
            ))}
          </div>
        </section>
      )}
      {staff && <CreateSession open={create} onClose={() => setCreate(false)} courses={courses} onCreated={() => void reload(true)} />}
    </div>
  );
}
