import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Store, 
  Settings,
  Package,
  ShoppingCart,
  Receipt,
  BarChart3,
  Users2,
  Mail,
  MapPin,
  ChevronRight
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const SidebarItem = ({ icon: Icon, label, to, disabled = false }) => {
  if (disabled) {
    return (
      <div className="flex items-center gap-3 px-4 py-2.5 text-slate-400 cursor-not-allowed opacity-50">
        <Icon size={20} />
        <span className="font-medium">{label}</span>
      </div>
    );
  }

  return (
    <NavLink
      to={to}
      className={({ isActive }) => cn(
        "flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 group",
        isActive 
          ? "bg-primary-50 text-primary-600 shadow-sm" 
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
      )}
    >
      <Icon size={20} className={cn("transition-transform group-hover:scale-110")} />
      <span className="font-medium">{label}</span>
      <ChevronRight size={16} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
    </NavLink>
  );
};

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-white border-r border-slate-200 sticky top-0 flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-primary-600 tracking-tight">PasalOS</h1>
        <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-semibold">Nepal Retail Platform</p>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto pb-4">
        <div className="mb-4">
          <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Main Menu</p>
          <SidebarItem icon={LayoutDashboard} label="Dashboard" to="/" />
          <SidebarItem icon={Store} label="Store Profile" to="/profile" />
          <SidebarItem icon={Users} label="Store Users" to="/users" />
          <SidebarItem icon={Settings} label="Settings" to="/settings" />
        </div>

        <div className="mb-4">
          <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Operations (Coming Soon)</p>
          <SidebarItem icon={Package} label="Products" to="/products" disabled />
          <SidebarItem icon={Receipt} label="POS" to="/pos" disabled />
          <SidebarItem icon={ShoppingCart} label="Orders" to="/orders" disabled />
          <SidebarItem icon={Users2} label="Customers" to="/customers" disabled />
          <SidebarItem icon={BarChart3} label="Reports" to="/reports" disabled />
          <SidebarItem icon={MapPin} label="Outlets" to="/outlets" disabled />
          <SidebarItem icon={Mail} label="Omnichannel" to="/inbox" disabled />
        </div>
      </nav>

      <div className="p-4 border-t border-slate-100 bg-slate-50/50">
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-xs">
            NP
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900">PasalOS Pro</p>
            <p className="text-[10px] text-slate-500 italic">SaaS Edition v1.0</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
