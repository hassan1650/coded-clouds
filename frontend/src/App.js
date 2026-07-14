import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './layouts/DashboardLayout'; 

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Employees from './pages/admin/Employees';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Authentication View */}
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/employees" element={<Employees />} />
  
            </Route>
          </Route>

          {/* Universal Rule Catch */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;