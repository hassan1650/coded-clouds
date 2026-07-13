import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { 
  LayoutDashboard, Shield, Code, Palette, Megaphone, 
  Settings, Users, FolderKanban, Terminal, LogOut 
} from 'lucide-react';

const Sidebar = () => {
  const { user, logout } = useContext(AuthContext);

  const getMenuItems = () => {
    const menu = [
      { label: 'Overview', icon: <LayoutDashboard size={18} />, path: '#' },
      { label: 'My Projects', icon: <FolderKanban size={18} />, path: '#' }
    ];

    if (user?.role === 'superadmin') {
      menu.push(
        { label: 'System Access', icon: <Shield size={18} />, path: '#' },
        { label: 'Global Settings', icon: <Settings size={18} />, path: '#' },
        { label: 'Manage Users', icon: <Users size={18} />, path: '#' }
      );
    } 
    else if (user?.role === 'admin') {
      menu.push(
        { label: 'Team Overview', icon: <Users size={18} />, path: '#' },
        { label: 'Control Panel', icon: <Shield size={18} />, path: '#' }
      );
    } 
    else if (user?.role === 'developer') {
      menu.push(
        { label: 'Dev Server Console', icon: <Terminal size={18} />, path: '#' },
        { label: 'Repositories', icon: <Code size={18} />, path: '#' }
      );
    } 
    else if (user?.role === 'designer') {
      menu.push(
        { label: 'Design System', icon: <Palette size={18} />, path: '#' },
        { label: 'Asset Workspace', icon: <FolderKanban size={18} />, path: '#' }
      );
    } 
    else if (user?.role === 'marketing') {
      menu.push(
        { label: 'Campaigns Panel', icon: <Megaphone size={18} />, path: '#' },
        { label: 'Analytics Insights', icon: <LayoutDashboard size={18} />, path: '#' }
      );
    }

    return menu;
  };

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between p-4 shrink-0 h-screen">
      <div>
        <div className="flex items-center gap-3 px-2 py-4 mb-6 border-b border-slate-800">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/10">
            Ω
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-md tracking-wide text-white">Coded Clouds</span>
            <span className="text-[10px] text-slate-500 font-medium">Workspace</span>
          </div>
        </div>

        <nav className="space-y-1">
          <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-600 px-3 mb-2">Navigation</span>
          {getMenuItems().map((item, index) => (
            <a 
              key={index} 
              href={item.path} 
              className={`flex items-center gap-3 px-3 py-2.5 text-sm rounded-xl font-medium transition duration-150 ${
                index === 0 
                  ? 'bg-blue-600/10 text-blue-400 border border-blue-500/10' 
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
      </div>

      {/* Logout Action */}
      <button 
        onClick={logout} 
        className="flex items-center gap-3 px-3 py-2.5 text-sm text-rose-400 hover:bg-rose-950/20 border border-transparent hover:border-rose-900/30 rounded-xl transition font-medium w-full mt-auto"
      >
        <LogOut size={18} />
        <span>Sign Out</span>
      </button>
    </aside>
  );
};

export default Sidebar;
export { Sidebar };