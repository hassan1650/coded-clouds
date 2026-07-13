import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Bell, User } from 'lucide-react';

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <header className="h-16 border-b border-slate-800 bg-slate-900/40 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-10 w-full">
      <h1 className="text-md font-semibold text-slate-400 tracking-wide">
        WORKSPACE / <span className="text-slate-200 uppercase font-bold">{user?.role} PANEL</span>
      </h1>

      <div className="flex items-center gap-6">
        <button className="text-slate-400 hover:text-slate-200 transition relative p-1.5 rounded-lg hover:bg-slate-800">
          <Bell size={20} />
          <span className="absolute top-1 right-1 h-2 w-2 bg-blue-500 rounded-full"></span>
        </button>

        <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 pl-3 pr-4 py-1.5 rounded-full">
          <div className="h-7 w-7 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white uppercase">
            {user?.name?.charAt(0)}
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-200 leading-tight">{user?.name}</span>
            <span className="text-[10px] uppercase font-extrabold tracking-wider text-blue-400">
              {user?.role}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
export { Navbar };