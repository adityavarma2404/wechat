import { lazy, Suspense, type ReactNode } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import { useAuth } from "../context/useAuth";

const Login = lazy(() =>
  import("../pages/Login").then((module) => ({ default: module.Login })),
);
const Signup = lazy(() =>
  import("../pages/Signup").then((module) => ({ default: module.Signup })),
);
const Home = lazy(() =>
  import("../pages/Home").then((module) => ({ default: module.Home })),
);

function LoadingScreen() {
  return (
    <div className="app-loading" role="status">
      <span className="app-loading__dot" /> Loading...
    </div>
  );
}

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isInitializing } = useAuth();
  const location = useLocation();
  if (isInitializing) return <LoadingScreen />;

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: `${location.pathname}${location.search}` }}
      />
    );
  }

  return children;
}

function PublicOnlyRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isInitializing } = useAuth();

  if (isInitializing) return <LoadingScreen />;
  return isAuthenticated ? <Navigate to="/home" replace /> : children;
}

function RootRedirect() {
  const { isAuthenticated, isInitializing } = useAuth();

  if (isInitializing) return <LoadingScreen />;
  return <Navigate to={isAuthenticated ? "/home" : "/login"} replace />;
}

export function AppRoutes() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route path="/" element={<RootRedirect />} />
        <Route
          path="/login"
          element={
            <PublicOnlyRoute>
              <Login />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicOnlyRoute>
              <Signup />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        >
          {" "}
          <Route path="chat/:chatId" />{" "}
        </Route>
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </Suspense>
  );
}

export function RoutingProvider() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
