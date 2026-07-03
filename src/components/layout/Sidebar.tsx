import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, FlaskConical, FileText, CreditCard, Settings, ClipboardList, BarChart3, Database, Activity, Image, ToolCase, Trash2, Calculator, ShieldCheck } from 'lucide-react';

const navGroups = [
  {
    title: 'Core',
    items: [
      { label: 'Dashboard', icon: <LayoutDashboard size={18} />, path: '/dashboard' },
      { label: 'Patients', icon: <Users size={18} />, path: '/dashboard/patients' },
    ],
  },
  {
    title: 'Transaction',
    items: [
      { label: 'Booking', icon: <FlaskConical size={18} />, path: '/dashboard/booking' },
      { label: 'Results', icon: <ClipboardList size={18} />, path: '/dashboard/results/entry' },
      { label: 'Report Partly', icon: <FileText size={18} />, path: '/dashboard/report-partly' },
      { label: 'Workload', icon: <Activity size={18} />, path: '/dashboard/mis/day-collection' },
    ],
  },
  {
    title: 'Masters',
    items: [{ label: 'Masters', icon: <Database size={18} />, path: '/dashboard/masters' }],
  },
  {
    title: 'Radiology',
    items: [
      { label: 'Result Report', icon: <FileText size={18} />, path: '/dashboard/radiology/result-report' },
      { label: 'Report Master', icon: <FileText size={18} />, path: '/dashboard/radiology/report-master' },
      { label: 'Word Report Setup', icon: <Image size={18} />, path: '/dashboard/radiology/word-report-setup' },
      { label: 'PNDT / CMO', icon: <Image size={18} />, path: '/dashboard/radiology/pndt' },
    ],
  },
  {
    title: 'Billing',
    items: [
      { label: 'Balance Receipt', icon: <CreditCard size={18} />, path: '/dashboard/account/balance-receipt' },
      { label: 'Final Bill', icon: <CreditCard size={18} />, path: '/dashboard/billing/final-bill' },
      { label: 'Receipts', icon: <CreditCard size={18} />, path: '/dashboard/billing/receipts' },
      { label: 'Doctor Billing', icon: <FileText size={18} />, path: '/dashboard/doctor-bill' },
    ],
  },
  {
    title: 'Utility',
    items: [
      { label: 'Delete Booking', icon: <Trash2 size={18} />, path: '/dashboard/utility/delete-booking' },
      { label: 'Calculator', icon: <Calculator size={18} />, path: '/dashboard/utility/calculator' },
      { label: 'Notepad', icon: <FileText size={18} />, path: '/dashboard/utility/notepad' },
      { label: 'Backup Guidance', icon: <ShieldCheck size={18} />, path: '/dashboard/utility/backup-guidance' },
      { label: 'Daily Voucher', icon: <FileText size={18} />, path: '/dashboard/account/daily-voucher' },
      { label: 'Internet Reporting', icon: <FileText size={18} />, path: '/dashboard/mis/internet-reporting' },
    ],
  },
  {
    title: 'Analytics',
    items: [{ label: 'MIS', icon: <BarChart3 size={18} />, path: '/dashboard/mis/day-collection' }],
  },
  {
    title: 'Settings',
    items: [{ label: 'Settings', icon: <Settings size={18} />, path: '/dashboard/settings/lab-profile' }],
  },
];

export default function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white p-4 lg:block">
      <div className="mb-6 px-2">
        <h2 className="text-lg font-semibold text-slate-900">PathoCare Pro</h2>
        <p className="text-sm text-slate-500">Frontend shell</p>
      </div>
      <nav className="space-y-6">
        {navGroups.map((group) => (
          <div key={group.title}>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-400">{group.title}</p>
            <div className="space-y-1">
              {group.items.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                      isActive ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'
                    }`
                  }
                >
                  {item.icon}
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
