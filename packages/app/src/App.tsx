import type { JSX } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { User } from '~/entities/user';
import { AuthPage } from './pages/auth-page';
import { MainPage } from './pages/main-page';
import { DocumentPage } from './pages/document-page';

function ProtectedRoute({
  children,
}: {
  children?: string | JSX.Element | JSX.Element[];
}) {
  if (!User.isAuthenticated()) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}

function App() {
  return (
    <>
      <Routes>
        <Route
          index
          element={
            <ProtectedRoute>
              <MainPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/document/:id"
          element={
            <ProtectedRoute>
              <DocumentPage />
            </ProtectedRoute>
          }
        />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </>
  );
}

export default App;
