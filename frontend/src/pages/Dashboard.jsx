import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

// Har folder se unke dashboards import karein
import SuperAdminDashboard from './superadmin/SuperAdminDashboard';
import AdminDashboard from './admin/AdminDashboard';
import DeveloperDashboard from './developer/DeveloperDashboard';
import DesignerDashboard from './designer/DesignerDashboard';
import MarketingDashboard from './marketing/MarketingDashboard';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  const renderRolePage = () => {
    switch (user?.role) {
      case 'superadmin': return <SuperAdminDashboard />;
      case 'admin': return <AdminDashboard />;
      case 'developer': return <DeveloperDashboard />;
      case 'designer': return <DesignerDashboard />;
      case 'marketing': return <MarketingDashboard />;
      default: return <div className="p-6 bg-slate-900 rounded-xl">Role dashboard not found.</div>;
    }
  };

  return (
    <div className="flex h-screen w-screen bg-slate-950 text-slate-100 overflow-hidden antialiased">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar />
        <div className="p-8 overflow-y-auto flex-1 space-y-6">
          <div className="p-6 bg-gradient-to-r from-slate-900 to-indigo-950 rounded-2xl border border-slate-800/60 shadow-lg">
            <h2 className="text-xl font-bold">Welcome back, {user?.name}!</h2>
            <p className="text-xs text-slate-400">You are securely logged into your dedicated control system.</p>
          </div>
          {renderRolePage()}

        </div>
      </div>
    </div>
  );
};

export default Dashboard;