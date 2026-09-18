import { Activity, BookMarked, ClipboardCheck, Gauge, HelpCircle, MessageCircle, Radio, UserCog, Users, UsersRound, Video } from 'lucide-react';
import { useEffect, useState, type ReactNode } from 'react';
import type { Course } from '../../shared/types';
import { flattenLessons } from '../../shared/analytics';
import { api } from '../lib/api';
import { useSession } from '../lib/session';
import Shell, { type NavItem } from '../components/Shell';
import ThreadBoard, { type BoardCourse } from '../components/ThreadBoard';
import { ErrorBox, Loading, PageHeader, useLoad, useRoute } from '../components/ui';
import { Overview, Users as UsersPage } from './Admin';
import Cohort, { LearnerPortal } from './Cohort';
import CourseBuilder from './CourseBuilder';
import Courses from './Courses';
import { ActivityMetrics, Assessments } from './Insights';
import Learners from './Learners';
import LiveLearning from './LiveLearning';
import LiveSessionReview from './LiveSessionReview';

function useStaffCourses() {
  return useLoad(async () => {
    const list = await api<{ courses: { id: string; title: string }[] }>('/staff/courses');
    const full = await Promise.all(list.courses.map((c) => api<{ course: Course }>(`/staff/courses/${c.id}`).then((r) => r.course)));
    return full.map<BoardCourse>((c) => ({ id: c.id, title: c.title, lessons: flattenLessons(c).map((f) => ({ id: f.lesson.id, title: f.lesson.title })) }));
  }, []);
}

function Inbox({ threadId, query, admin }: { threadId?: string; query: URLSearchParams; admin?: boolean }) {
  const { data, error, loading, reload } = useStaffCourses();
  if (loading) return <Loading />;
  if (error || !data) return <ErrorBox message={error ?? 'Could not load'} onRetry={() => void reload()} />;
  return (
    <div>
      <PageHeader
        title="Questions"
        subtitle={admin ? 'Questions your instructors have sent you. Learner questions stay with their own instructor.' : 'Every question your learners have sent you. Each one is private between you and that learner.'}
      />
      <ThreadBoard courses={data} threadId={threadId} basePath="inbox" query={query} mode={admin ? 'admin-questions' : 'default'} />
    </div>
  );
}

/** An instructor's private line to the administrator. */
function AskAdmin({ threadId, query }: { threadId?: string; query: URLSearchParams }) {
  const { data, error, loading, reload } = useStaffCourses();
  if (loading) return <Loading />;
  if (error || !data) return <ErrorBox message={error ?? 'Could not load'} onRetry={() => void reload()} />;
  return (
    <div>
      <PageHeader title="Ask Admin" subtitle="Ask the administrator anything about your courses or this portal. Learners never see these." />
      <ThreadBoard courses={data} threadId={threadId} basePath="ask-admin" query={query} mode="ask-admin" />
    </div>
  );
}

export default function StaffApp() {
  const { user } = useSession();
  const { view, params, query } = useRoute();
  const admin = user.role === 'admin';
  const [open, setOpen] = useState(0);

  // Badge: learner questions still waiting for a staff answer.
  useEffect(() => {
    let alive = true;
    const load = () =>
      api<{ threads: { replies: { authorRole: string }[]; authorRole: string }[] }>('/threads')
        .then((r) => alive && setOpen(r.threads.filter((t) => t.authorRole === 'learner' && !t.replies.some((x) => x.authorRole !== 'learner')).length))
        .catch(() => undefined);
    void load();
    const t = setInterval(load, 60_000);
    return () => {
      alive = false;
      clearInterval(t);
    };
  }, [view]);

  const home = admin ? 'overview' : 'cohort';
  const v = view || home;

  const nav: NavItem[] = [
    ...(admin ? [{ id: 'overview', label: 'Overview', icon: Gauge }] : []),
    { id: 'cohort', label: 'Cohort', icon: UsersRound, also: ['learner'] },
    { id: 'learners', label: 'Learners & Access', icon: Users },
    ...(admin ? [] : [{ id: 'assessments', label: 'Assessments', icon: ClipboardCheck }]),
    { id: 'activity', label: 'Activity Metrics', icon: Activity },
    { id: 'inbox', label: 'Questions', icon: MessageCircle, badge: open },
    ...(admin ? [] : [{ id: 'ask-admin', label: 'Ask Admin', icon: HelpCircle }]),
    ...(admin
      ? [{ id: 'live-sessions', label: 'Review Live Sessions', icon: Video, also: ['office-hours'] }]
      : [
          { id: 'live-learning', label: 'Live Learning', icon: Radio, also: ['office-hours'] },
        ]),
  ];
  const secondary: NavItem[] = [{ id: 'courses', label: admin ? 'Courses' : 'My Courses', icon: BookMarked }, ...(admin ? [{ id: 'users', label: 'Users', icon: UserCog }] : [])];

  let page: ReactNode;
  switch (v) {
    case 'overview':
      page = admin ? <Overview /> : <Cohort />;
      break;
    case 'cohort':
      page = <Cohort initialCourseId={query.get('course') ?? undefined} />;
      break;
    case 'learner':
      page = <LearnerPortal userId={params[0] ?? ''} courseId={query.get('course') ?? undefined} />;
      break;
    case 'learners':
      page = <Learners />;
      break;
    case 'assessments':
      page = admin ? <Overview /> : <Assessments />;
      break;
    case 'activity':
      page = <ActivityMetrics />;
      break;
    case 'inbox':
      page = <Inbox threadId={params[0]} query={query} admin={admin} />;
      break;
    case 'ask-admin':
      page = admin ? <Inbox threadId={params[0]} query={query} admin /> : <AskAdmin threadId={params[0]} query={query} />;
      break;
    case 'office-hours':
      page = admin ? <LiveSessionReview /> : <LiveLearning />;
      break;
    case 'live-learning':
      page = admin ? <LiveSessionReview /> : <LiveLearning />;
      break;
    case 'live-sessions':
      page = <LiveSessionReview />;
      break;
    case 'courses':
      page = params[0] === 'new' ? <CourseBuilder key="new" /> : params[0] === 'edit' && params[1] ? <CourseBuilder key={params[1]} courseId={params[1]} /> : <Courses />;
      break;
    case 'users':
      page = admin ? <UsersPage /> : <Cohort />;
      break;
    default:
      page = admin ? <Overview /> : <Cohort />;
  }

  return (
    <Shell nav={nav} secondary={secondary} current={v === 'overview' && !admin ? 'cohort' : v}>
      {page}
    </Shell>
  );
}
