import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import AdminDashboard from './pages/AdminDashboard';
import ClientDashboard from './pages/ClientDashboard';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/client" element={<ClientDashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/" element={<Navigate to="/client" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
