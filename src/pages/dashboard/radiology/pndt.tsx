import { NavLink, Outlet } from 'react-router-dom';

export default function RadiologyPNDTPage() {
  const tabClassName = ({ isActive }: { isActive: boolean }) =>
    `inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition ${
      isActive ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
    }`;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">PNDT / CMO Workflow</h2>
        <p className="mt-2 text-sm text-slate-500">Capture obstetric radiology details and maintain the PC-PNDT compliance register.</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <NavLink to="entry" className={tabClassName}>
          CMO Entry
        </NavLink>
        <NavLink to="register" className={tabClassName}>
          CMO Register
        </NavLink>
      </div>

      <Outlet />
    </div>
  );
}
