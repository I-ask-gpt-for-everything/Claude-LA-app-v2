import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Shell } from './components/layout';
import { Dashboard, Projects, Clients, Documents, Settings } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Shell>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Shell>
    </BrowserRouter>
  );
}

export default App;
