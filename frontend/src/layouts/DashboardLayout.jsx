import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar'; // Agar Navbar component hai to wrapper yahan chalega

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex h-screen w-screen bg-slate-950 text-slate-100 overflow-hidden antialiased">
      {/* Sidebar global ho gaya, ab har page par automatically dikhega */}
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar />
        
        {/* Main scrollable content view */}
        <div className="p-8 overflow-y-auto flex-1 space-y-6">
          {/* Is Outlet ke andar saare routes badal badal kar render honge bina sidebar hile */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;