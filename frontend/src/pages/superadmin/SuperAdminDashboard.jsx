import React from 'react';

const SuperAdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="p-6 bg-red-950/30 border border-red-800/50 rounded-2xl">
        <h2 className="text-2xl font-bold text-red-400">Superadmin Master Console</h2>
        <p className="text-slate-400 text-sm mt-1">Global settings, database backups, and system overrides are located here.</p>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;