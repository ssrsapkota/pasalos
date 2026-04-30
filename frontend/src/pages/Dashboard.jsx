import React from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  TrendingUp, 
  Users, 
  Package, 
  ShoppingCart,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, trend, trendValue, color }) => (
  <div className="card p-6">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl bg-${color}-50 text-${color}-600`}>
        <Icon size={24} />
      </div>
      <div className={`flex items-center gap-1 text-sm font-bold ${trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
        {trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
        <span>{trendValue}</span>
      </div>
    </div>
    <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
    <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
  </div>
);

const Dashboard = () => {
  const { user, vendor } = useAuth();

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
          <p className="text-slate-500">Welcome back, {user?.name}. Here's what's happening at {vendor?.businessName}.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
            Download Report
          </button>
          <button className="btn-primary">
            New Sale
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Sales" 
          value="NPR 124,500" 
          icon={TrendingUp} 
          trend="up" 
          trendValue="12.5%" 
          color="indigo"
        />
        <StatCard 
          title="Active Customers" 
          value="1,240" 
          icon={Users} 
          trend="up" 
          trendValue="8.2%" 
          color="emerald"
        />
        <StatCard 
          title="Stock Items" 
          value="452" 
          icon={Package} 
          trend="down" 
          trendValue="2.1%" 
          color="amber"
        />
        <StatCard 
          title="Recent Orders" 
          value="84" 
          icon={ShoppingCart} 
          trend="up" 
          trendValue="15.3%" 
          color="rose"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 card p-8 min-h-[400px] flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
            <TrendingUp size={32} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Sales Analytics</h3>
            <p className="text-slate-500 max-w-sm mx-auto">Analytics visualization will be available in Sprint 2. Stay tuned for deeper insights.</p>
          </div>
        </div>

        <div className="card p-6 flex flex-col">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Recent Activity</h3>
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
              <ShoppingCart size={24} />
            </div>
            <p className="text-sm text-slate-500">No recent activity to show.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
