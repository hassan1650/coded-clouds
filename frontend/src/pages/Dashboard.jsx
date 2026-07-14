import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

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
      default: return <div className="p-6 bg-slate-900 rounded-xl border border-slate-800">Role dashboard view not found.</div>;
    }
  };

  return (
    <>
      {renderRolePage()}
    </>
  );
};

export default Dashboard;