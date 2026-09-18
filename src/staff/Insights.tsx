import { motion } from 'motion/react';
import { ChevronDown, Clock, FileCheck2, Paperclip, Search, Users } from 'lucide-react';
import { useState } from 'react';
import type { ActivitySubmission, EngagementMetrics } from '../../shared/types';
import { api } from '../lib/api';
import { fmtDateTime, pct, scoreColor } from '../lib/format';
import { Avatar, Bar, Button, Card, cx, Empty, ErrorBox, Input, Loading, PageHeader, Pill, Tabs, Textarea, useLoad, useToast } from '../components/ui';
import { CourseSelect } from './Cohort';

interface AssessData {
  course: { id: string; title: string; passMark: number };
  courses: { id: string; title: string }[];
  lessons: {
    lessonId: string;
    title: string;
    moduleTitle: string;
    mode: string;
    questionCount: number;
    learnersAttempted: number;
    attempts: number;
    avgFirst: number | null;
    avgBest: number | null;
    questions: { id: string; question: string; answered: number; percentCorrect: number | null }[];
  }[];
  submissions: { userId: string; learnerName: string; learnerEmail?: string; lessonId: string; lessonTitle: string; activityTitle: string; fieldLabels: Record<string, string>; submission: ActivitySubmission }[];
  finals: { learnerName: string; attempts: { at: string; score: number }[]; passed: boolean }[];
}

function FeedbackBox({ courseId, s, onSaved }: { courseId: string; s: AssessData['submissions'][number]; onSaved: () => void }) {
  const toast = useToast();
  const [text, setText] = useState(s.submission.feedback ?? '');
  const [busy, setBusy] = useState(false);
  const save = async () => {
    setBusy(true);
    try {
      await api('/staff/activity-feedback', { body: { userId: s.userId, courseId, lessonId: s.lessonId, feedback: text } });
      toast('success', `Feedback sent to ${s.learnerName}.`);
      onSaved();
    } catch (e) {
      toast('error', (e as Error).message);
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="mt-3">
      <Textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Write specific, encouraging feedback" className="!min-h-[72px]" />
      <div className="mt-2 flex items-center justify-between">
        <span className="text-xs text-ink-faint">{s.submission.feedbackAt ? `Last sent ${fmtDateTime(s.submission.feedbackAt)} by ${s.submission.feedbackBy}` : 'No feedback yet'}</span>
        <Button size="sm" loading={busy} disabled={text.trim().length < 2} onClick={save}>
          {s.submission.feedback ? 'Update feedback' : 'Send feedback'}
        </Button>
      </div>
    </div>
  );
}

export function Assessments() {
  const [courseId, setCourseId] = useState('');
  const [tab, setTab] = useState<'checks' | 'activities' | 'finals'>('checks');
  const [open, setOpen] = useState<string | null>(null);
  const [subSearch, setSubSearch] = useState('');
  const { data, error, loading, reload } = useLoad(() => api<AssessData>(`/staff/assessments${courseId ? `?courseId=${courseId}` : ''}`), [courseId]);
  if (loading && !data) return <Loading />;
  if (error || !data) return <ErrorBox message={error ?? 'Could not load'} onRetry={() => void reload()} />;
  const pending = data.submissions.filter((s) => !s.submission.feedback).length;
  const q = subSearch.trim().toLowerCase();
  const submissions = q
    ? data.submissions.filter((s) => s.learnerName.toLowerCase().includes(q) || (s.learnerEmail ?? '').toLowerCase().includes(q))
    : data.submissions;
  return (
    <div className="space-y-5">
      <PageHeader title="Assessments" subtitle="See which questions confuse learners, and give feedback on activities." actions={<CourseSelect courses={data.courses} value={data.course.id} onChange={setCourseId} />} />
      <Tabs
        value={tab}
        onChange={setTab}
        tabs={[
          { value: 'checks', label: 'Checks and quizzes', count: data.lessons.filter((l) => l.questionCount).length },
          { value: 'activities', label: 'Activity submissions', count: pending },
          { value: 'finals', label: 'Final assessment', count: data.finals.length },
        ]}
      />
      {tab === 'checks' && (
        <Card className="!p-0 overflow-hidden">
          {data.lessons.filter((l) => l.questionCount).length === 0 && <Empty title="This course has no checks yet" />}
          {data.lessons
            .filter((l) => l.questionCount)
            .map((l) => (
              <div key={l.lessonId} className="border-b border-line last:border-0">
                <button onClick={() => setOpen(open === l.lessonId ? null : l.lessonId)} className="flex w-full flex-wrap items-center gap-x-6 gap-y-3 px-5 py-4 text-left transition hover:bg-mist/60" aria-expanded={open === l.lessonId}>
                  <div className="min-w-[200px] flex-1">
                    <div className="font-semibold">{l.title}</div>
                    <div className="text-xs text-ink-soft">
                      {l.moduleTitle} · {l.mode === 'quiz' ? 'Timed quiz' : 'Check'} · {l.questionCount} questions
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="w-[84px]">
                      <div className="text-[11px] font-semibold uppercase tracking-wide text-ink-soft">Learners</div>
                      <div className="font-display text-lg font-bold">{l.learnersAttempted}</div>
                    </div>
                    <div className="w-[84px]">
                      <div className="text-[11px] font-semibold uppercase tracking-wide text-ink-soft">First try</div>
                      <div className="font-display text-lg font-bold" style={{ color: scoreColor(l.avgFirst) }}>
                        {pct(l.avgFirst)}
                      </div>
                    </div>
                    <div className="w-[84px]">
                      <div className="text-[11px] font-semibold uppercase tracking-wide text-ink-soft">Best</div>
                      <div className="font-display text-lg font-bold" style={{ color: scoreColor(l.avgBest) }}>
                        {pct(l.avgBest)}
                      </div>
                    </div>
                    <ChevronDown className={cx('h-4 w-4 shrink-0 text-ink-soft transition', open === l.lessonId && 'rotate-180')} />
                  </div>
                </button>
                {open === l.lessonId && (
                  <div className="space-y-3 bg-mist/40 px-5 py-4">
                    {l.questions.map((q, i) => (
                      <div key={q.id}>
                        <div className="flex justify-between gap-3 text-sm">
                          <span>
                            <span className="text-ink-faint">Q{i + 1}.</span> {q.question}
                          </span>
                          <span className="shrink-0 font-semibold" style={{ color: scoreColor(q.percentCorrect) }}>
                            {q.percentCorrect === null ? 'No answers' : `${q.percentCorrect}% correct`}
                          </span>
                        </div>
                        <Bar value={q.percentCorrect} color={scoreColor(q.percentCorrect)} height={5} className="mt-1" />
                      </div>
                    ))}
                    <p className="text-xs text-ink-faint">Based on each learner’s first graded attempt. Questions under 60% may need clearer teaching or wording.</p>
                  </div>
                )}
              </div>
            ))}
        </Card>
      )}
      {tab === 'activities' && (
        <div className="space-y-3">
          <div className="relative w-full max-w-sm">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" />
            <Input value={subSearch} onChange={(e) => setSubSearch(e.target.value)} placeholder="Filter by learner name or email" className="!rounded-full pl-10" aria-label="Filter submissions by learner name or email" />
          </div>
          {data.submissions.length === 0 && <Empty icon={<FileCheck2 className="h-6 w-6" />} title="No submissions yet" />}
          {data.submissions.length > 0 && submissions.length === 0 && <Empty icon={<Search className="h-6 w-6" />} title="No learner matches that search" />}
          {submissions.map((s) => (
            <Card key={`${s.userId}-${s.lessonId}`}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <Avatar initials={s.learnerName.split(' ').map((w) => w[0]).join('').slice(0, 2)} size={34} />
                  <div>
                    <div className="font-semibold">{s.learnerName}</div>
                    {s.learnerEmail && <div className="text-xs text-ink-soft">{s.learnerEmail}</div>}
                    <div className="text-xs text-ink-soft">
                      {s.activityTitle || s.lessonTitle} · {fmtDateTime(s.submission.submittedAt)}
                    </div>
                  </div>
                </div>
                {s.submission.feedback ? <Pill color="green">Feedback sent</Pill> : <Pill color="pink">Needs feedback</Pill>}
              </div>
              <div className="mt-3 space-y-2 rounded-2xl bg-mist p-4">
                {Object.entries(s.submission.fields).map(([k, v]) => (
                  <div key={k}>
                    <div className="text-xs font-semibold text-ink-faint">{s.fieldLabels[k] ?? k}</div>
                    <p className="whitespace-pre-line text-sm">{v || '—'}</p>
                  </div>
                ))}
                {s.submission.fileUrl && (
                  <a href={s.submission.fileUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-nblue hover:underline">
                    <Paperclip className="h-4 w-4" /> {s.submission.fileName}
                  </a>
                )}
              </div>
              <FeedbackBox courseId={data.course.id} s={s} onSaved={() => void reload(true)} />
            </Card>
          ))}
        </div>
      )}
      {tab === 'finals' && (
        <Card>
          {data.finals.length === 0 ? (
            <Empty title="No final attempts yet" />
          ) : (
            <div className="divide-y divide-line">
              {data.finals.map((f) => (
                <div key={f.learnerName} className="flex flex-wrap items-center justify-between gap-2 py-3">
                  <span className="font-semibold">{f.learnerName}</span>
                  <span className="flex flex-wrap items-center gap-2 text-sm">
                    {f.attempts.map((a, i) => (
                      <span key={a.at} title={fmtDateTime(a.at)} className="font-semibold" style={{ color: scoreColor(a.score) }}>
                        #{i + 1}: {a.score}%
                      </span>
                    ))}
                    <Pill color={f.passed ? 'green' : 'pink'}>{f.passed ? 'Passed' : `Below ${data.course.passMark}%`}</Pill>
                  </span>
                </div>
              ))}
            </div>
          )}
        </Card>
      )}
    </div>
  );
}

interface ActivityData {
  course: { id: string; title: string } | null;
  courses: { id: string; title: string }[];
  rows: { userId: string; name: string; initials: string; engagement: EngagementMetrics }[];
  days: { date: string; minutes: number; logins: number; activeLearners: number }[];
}

function Bars({ values, labels, format, color }: { values: number[]; labels: string[]; format: (v: number) => string; color: string }) {
  const max = Math.max(...values, 1);
  return (
    <div className="flex h-44 items-end gap-2">
      {values.map((v, i) => (
        <div key={labels[i]} className="flex flex-1 flex-col items-center gap-1.5" title={`${labels[i]}: ${format(v)}`}>
          <span className="text-[11px] font-semibold text-ink-soft">{v ? format(v) : ''}</span>
          <motion.div className="w-full max-w-[34px] rounded-lg" style={{ background: v ? color : '#EEF0F7' }} initial={{ height: 0 }} animate={{ height: Math.max(4, (v / max) * 130) }} transition={{ duration: 0.6, delay: i * 0.04 }} />
          <span className="text-[11px] text-ink-faint">{labels[i]}</span>
        </div>
      ))}
    </div>
  );
}

export function ActivityMetrics() {
  const [courseId, setCourseId] = useState('');
  const [view, setView] = useState<'active' | 'hours'>('active');
  const { data, error, loading, reload } = useLoad(() => api<ActivityData>(`/staff/activity${courseId ? `?courseId=${courseId}` : ''}`), [courseId]);
  if (loading && !data) return <Loading />;
  if (error || !data) return <ErrorBox message={error ?? 'Could not load'} onRetry={() => void reload()} />;
  if (!data.course) return <Empty title="No courses yet" text="Activity appears here once learners start a course." />;
  const rows = data.rows;
  const activeCount = rows.filter((r) => r.engagement.activeDaysLast7 > 0).length;
  const avgHours = rows.length ? rows.reduce((a, r) => a + r.engagement.activeMinutesLast7, 0) / rows.length / 60 : 0;
  const week = data.days.slice(-7);
  const labels = week.map((d) => new Date(`${d.date}T12:00:00`).toLocaleDateString('en-US', { weekday: 'short' }));
  const hrs = (m: number) => `${(m / 60).toFixed(1)} h`;
  // Counts, not names: the list stays readable whether a course has 8 learners or 800.
  const total = rows.length;
  const share = (n: number) => (total ? Math.round((n / total) * 100) : 0);
  const bands =
    view === 'active'
      ? [
          { label: '5 or more days this week', count: rows.filter((r) => r.engagement.activeDaysLast7 >= 5).length, color: '#00C77F' },
          { label: '3 to 4 days', count: rows.filter((r) => r.engagement.activeDaysLast7 >= 3 && r.engagement.activeDaysLast7 < 5).length, color: '#1F6BFF' },
          { label: '1 to 2 days', count: rows.filter((r) => r.engagement.activeDaysLast7 >= 1 && r.engagement.activeDaysLast7 < 3).length, color: '#8B3DFF' },
          { label: 'Not active at all', count: rows.filter((r) => r.engagement.activeDaysLast7 === 0).length, color: '#FF2E93' },
        ]
      : [
          { label: '3 hours or more', count: rows.filter((r) => r.engagement.activeMinutesLast7 >= 180).length, color: '#00C77F' },
          { label: '1 to 3 hours', count: rows.filter((r) => r.engagement.activeMinutesLast7 >= 60 && r.engagement.activeMinutesLast7 < 180).length, color: '#1F6BFF' },
          { label: 'Under 1 hour', count: rows.filter((r) => r.engagement.activeMinutesLast7 > 0 && r.engagement.activeMinutesLast7 < 60).length, color: '#8B3DFF' },
          { label: 'No study time', count: rows.filter((r) => r.engagement.activeMinutesLast7 === 0).length, color: '#FF2E93' },
        ];
  const trackers = [
    { id: 'active' as const, label: 'Active Learners This Week', value: `${activeCount} / ${rows.length}`, icon: Users, color: '#1F6BFF' },
    { id: 'hours' as const, label: 'Avg Learning Hours', value: `${avgHours.toFixed(1)} h`, icon: Clock, color: '#8B3DFF' },
  ];
  return (
    <div className="space-y-6">
      <PageHeader title="Activity Metrics" subtitle="How much your learners are studying, as counts rather than names." actions={<CourseSelect courses={data.courses} value={data.course.id} onChange={setCourseId} />} />
      <div className="grid gap-4 sm:grid-cols-2">
        {trackers.map((t) => {
          const on = view === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setView(t.id)}
              aria-pressed={on}
              className={cx('relative overflow-hidden rounded-3xl border p-6 text-left transition', on ? 'border-transparent text-white shadow-xl' : 'border-line bg-white hover:-translate-y-0.5 hover:shadow-lg')}
              style={on ? { background: `linear-gradient(135deg, ${t.color}, #FF2E93)` } : undefined}
            >
              <div className="flex items-center gap-3">
                <span className={cx('flex h-11 w-11 items-center justify-center rounded-2xl', on ? 'bg-white/20' : '')} style={on ? undefined : { background: `${t.color}18`, color: t.color }}>
                  <t.icon className="h-5 w-5" />
                </span>
                <span className={cx('text-[15px] font-semibold', on ? 'text-white/90' : 'text-ink-soft')}>{t.label}</span>
              </div>
              <div className="mt-4 font-display text-[40px] font-extrabold leading-none">{t.value}</div>
            </button>
          );
        })}
      </div>
      <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
        <Card>
          <h3 className="mb-4 font-bold">{view === 'active' ? 'Learners active each day' : 'Learning hours each day'}</h3>
          {view === 'active' ? (
            <Bars values={week.map((d) => d.activeLearners)} labels={labels} format={(v) => String(v)} color="linear-gradient(180deg,#00C2FF,#1F6BFF)" />
          ) : (
            <Bars values={week.map((d) => d.minutes)} labels={labels} format={hrs} color="linear-gradient(180deg,#FF2E93,#8B3DFF)" />
          )}
        </Card>
        <Card>
          <h3 className="font-bold">{view === 'active' ? 'How often learners studied this week' : 'How long learners studied this week'}</h3>
          <p className="mt-0.5 text-[13px] text-ink-soft">
            {total} learner{total === 1 ? '' : 's'} in this course
          </p>
          <div className="mt-4 space-y-3.5">
            {total === 0 && <p className="text-sm text-ink-faint">No learners in this course yet.</p>}
            {bands.map((b) => (
              <div key={b.label}>
                <div className="flex items-baseline justify-between gap-2 text-sm">
                  <span className="font-semibold">{b.label}</span>
                  <span className="shrink-0 font-display text-lg font-bold" style={{ color: b.color }}>
                    {b.count}
                    <span className="ml-1 text-[12px] font-semibold text-ink-soft">of {total}</span>
                  </span>
                </div>
                <Bar value={share(b.count)} height={8} color={b.color} className="mt-1" />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
