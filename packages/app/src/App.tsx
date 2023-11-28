import { Routes, Route } from 'react-router-dom';
import { AuthPage } from './pages/auth-page';

function App() {
  return (
    <>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </>
  );
}

export default App;
