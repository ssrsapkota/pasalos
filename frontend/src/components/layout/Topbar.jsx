import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { LogOut, User, Bell, Search } from 'lucide-react';

const Topbar = () => {
  const { user, vendor, logout } = useAuth();

  return (
    <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-10 flex items-center justify-between px-8">
      <div className="flex items-center gap-4">
        <div className="relative group">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search anything..." 
            className="pl-10 pr-4 py-1.5 bg-slate-100 border-transparent focus:bg-white focus:border-primary-500 rounded-full text-sm transition-all w-64 outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="text-slate-500 hover:text-primary-600 transition-colors relative">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="h-8 w-px bg-slate-200"></div>

        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-900">{user?.name}</p>
            <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">
              {user?.role.replace('_', ' ')} {vendor ? `| ${vendor.businessName}` : ''}
            </p>
          </div>
          
          <div className="relative group">
            <button className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-primary-50 hover:text-primary-600 hover:border-primary-200 transition-all">
              <User size={20} />
            </button>
            
            <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-lg opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 py-1 overflow-hidden">
              <div className="px-4 py-2 border-b border-slate-100 bg-slate-50/50 sm:hidden">
                <p className="text-sm font-bold text-slate-900">{user?.name}</p>
                <p className="text-[10px] text-slate-500">{user?.role}</p>
              </div>
              <button 
                onClick={logout}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
