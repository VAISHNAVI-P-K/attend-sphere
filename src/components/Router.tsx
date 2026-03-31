import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import { MemberProtectedRoute } from '@/components/ui/member-protected-route';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import EventsPage from '@/components/pages/EventsPage';
import EventDetailPage from '@/components/pages/EventDetailPage';
import DashboardPage from '@/components/pages/DashboardPage';
import DemoDashboardPage from '@/components/pages/DemoDashboardPage';
import ContactPage from '@/components/pages/ContactPage';
import ProfilePage from '@/components/pages/ProfilePage';
import MarkAttendancePage from '@/components/pages/MarkAttendancePage';
import AnalyticsPage from '@/components/pages/AnalyticsPage';
import StudentProfilePage from '@/components/pages/StudentProfilePage';
import SystemPerformancePage from '@/components/pages/SystemPerformancePage';
import SignInPage from '@/components/pages/SignInPage';
import RegisterPage from '@/components/pages/RegisterPage';

// Layout component that includes ScrollToTop
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        routeMetadata: {
          pageIdentifier: 'home',
        },
      },
      {
        path: "events",
        element: <EventsPage />,
        routeMetadata: {
          pageIdentifier: 'events',
        },
      },
      {
        path: "events/:id",
        element: <EventDetailPage />,
        routeMetadata: {
          pageIdentifier: 'event-detail',
        },
      },
      {
        path: "dashboard",
        element: (
          <MemberProtectedRoute messageToSignIn="Sign in to access your dashboard">
            <DashboardPage />
          </MemberProtectedRoute>
        ),
        routeMetadata: {
          pageIdentifier: 'dashboard',
        },
      },
      {
        path: "demo-dashboard",
        element: <DemoDashboardPage />,
        routeMetadata: {
          pageIdentifier: 'demo-dashboard',
        },
      },
      {
        path: "mark-attendance",
        element: (
          <MemberProtectedRoute messageToSignIn="Sign in to mark attendance">
            <MarkAttendancePage />
          </MemberProtectedRoute>
        ),
        routeMetadata: {
          pageIdentifier: 'mark-attendance',
        },
      },
      {
        path: "analytics",
        element: (
          <MemberProtectedRoute messageToSignIn="Sign in to view analytics">
            <AnalyticsPage />
          </MemberProtectedRoute>
        ),
        routeMetadata: {
          pageIdentifier: 'analytics',
        },
      },
      {
        path: "student/:id",
        element: (
          <MemberProtectedRoute messageToSignIn="Sign in to view student profile">
            <StudentProfilePage />
          </MemberProtectedRoute>
        ),
        routeMetadata: {
          pageIdentifier: 'student-profile',
        },
      },
      {
        path: "system-performance",
        element: (
          <MemberProtectedRoute messageToSignIn="Sign in to view system performance">
            <SystemPerformancePage />
          </MemberProtectedRoute>
        ),
        routeMetadata: {
          pageIdentifier: 'system-performance',
        },
      },
      {
        path: "contact",
        element: <ContactPage />,
        routeMetadata: {
          pageIdentifier: 'contact',
        },
      },
      {
        path: "signin",
        element: <SignInPage />,
        routeMetadata: {
          pageIdentifier: 'signin',
        },
      },
      {
        path: "register",
        element: <RegisterPage />,
        routeMetadata: {
          pageIdentifier: 'register',
        },
      },
      {
        path: "profile",
        element: (
          <MemberProtectedRoute>
            <ProfilePage />
          </MemberProtectedRoute>
        ),
        routeMetadata: {
          pageIdentifier: 'profile',
        },
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
