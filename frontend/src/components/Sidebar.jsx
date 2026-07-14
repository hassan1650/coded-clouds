import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import logo from '../assets/logo.png';
import { 
  LayoutDashboard, Shield, Code, Palette, Megaphone, 
  Settings, Users, FolderKanban, Terminal, LogOut 
} from 'lucide-react';

const Sidebar = () => {
  const { user, logout } = useContext(AuthContext);

  const getMenuItems = () => {
    const menu = [
      { label: 'Overview', icon: <LayoutDashboard size={18} />, path: '/dashboard', }
    ];

    if (user?.role === 'superadmin') {
      menu.push(
        { label: 'Employees', icon: <Users size={18} />, path: '/dashboard/employees', }
      );
    } 
    else if (user?.role === 'admin') {
      menu.push(
        { label: 'Control Panel', icon: <Shield size={18} />, path: '/admin/control', },
        { label: 'Employees', icon: <Users size={18} />, path: '/dashboard/employees', }
      );
    } 
    else if (user?.role === 'developer') {
      menu.push(
        { label: 'Dev Server Console', icon: <Terminal size={18} />, path: '#', badge: 'Live' },
        { label: 'Repositories', icon: <Code size={18} />, path: '#', badge: null }
      );
    } 
    else if (user?.role === 'designer') {
      menu.push(
        { label: 'Design System', icon: <Palette size={18} />, path: '#',  },
        { label: 'Asset Workspace', icon: <FolderKanban size={18} />, path: '#',  }
      );
    } 
    else if (user?.role === 'marketing') {
      menu.push(
        { label: 'Campaigns Panel', icon: <Megaphone size={18} />, path: '#', },
        { label: 'Analytics Insights', icon: <LayoutDashboard size={18} />, path: '#', }
      );
    }

    return menu;
  };

  return (
    <aside className="w-72 bg-slate-950 border-r border-slate-900 flex flex-col justify-between p-4 pt-0 shrink-0 h-screen select-none">
      <div>
        
        <div className="p-2 mb-6">
          <div className="flex items-center justify-center rounded-2xl  border-slate-900/80 backdrop-blur-md shadow-inner group transition-colors duration-300 hover:border-slate-800">
            <div className="overflow-hidden rounded-xl p-1 flex items-center group-hover:scale-102 transition-transform duration-300">
              <img src={logo} alt="Logo" className="h-16 w-auto max-w-full object-contain" />
            </div>
          </div>
        </div>

        {/* ─── NAVIGATION LINKS PANEL ─── */}
        <nav className="space-y-1.5">
          <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-600 px-3 mb-3">Navigation</span>
          
          {getMenuItems().map((item, index) => (
            <NavLink 
              key={index} 
              to={item.path}
              end={item.path === '/dashboard'}
              className={({ isActive }) => 
                `group relative flex items-center justify-between px-4 py-3 text-sm rounded-xl font-medium overflow-hidden transition-all duration-300 ${
                  isActive 
                    ? 'bg-slate-900/80 text-blue-400 border border-slate-800/60 shadow-md shadow-slate-950/50' 
                    : 'text-slate-400 hover:text-slate-200 border border-transparent'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className={`absolute left-0 top-1/4 h-1/2 w-[3px] bg-gradient-to-b from-blue-400 to-indigo-500 rounded-r-md transition-all duration-300 transform origin-left ${
                    isActive ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-50'
                  }`} />

                  <div className={`absolute inset-0 bg-gradient-to-r from-slate-900/60 via-slate-900/20 to-transparent -z-10 transition-transform duration-300 ease-out transform -translate-x-full group-hover:translate-x-0 ${
                    isActive ? 'translate-x-0 bg-slate-900/40' : ''
                  }`} />

                  <div className="flex items-center gap-3 z-10 transition-transform duration-200 group-hover:translate-x-0.5">
                    <span className={`transition-colors duration-200 ${isActive ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300'}`}>
                      {item.icon}
                    </span>
                    <span className="tracking-wide font-medium">{item.label}</span>
                  </div>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* ─── BOTTOM ACTIONS FOOTER ─── */}
      <button 
        onClick={logout} 
        className="group relative flex items-center gap-3 px-4 py-3 text-sm text-rose-400 hover:text-rose-300 border border-transparent hover:border-rose-950/40 rounded-xl transition-all duration-300 font-medium w-full mt-auto overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-rose-950/10 via-rose-950/5 to-transparent -z-10 transition-transform duration-300 ease-out transform -translate-x-full group-hover:translate-x-0" />
        <LogOut size={18} className="text-rose-500/60 group-hover:text-rose-400 group-hover:scale-105 transition-all duration-200" />
        <span className="tracking-wide">Sign Out</span>
      </button>
    </aside>
  );
};

export default Sidebar;