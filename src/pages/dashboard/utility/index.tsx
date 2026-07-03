import { useNavigate } from 'react-router-dom';
import { Trash2, FileText, Calculator, ShieldCheck } from 'lucide-react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';

const utilityTools = [
  {
    title: 'Delete Booking',
    description: 'Permanently remove booking records for a selected date range.',
    icon: Trash2,
    path: '/dashboard/utility/delete-booking',
    accent: 'bg-rose-50 text-rose-700',
  },
  {
    title: 'Calculator',
    description: 'Perform quick administrative calculations before deletion or billing actions.',
    icon: Calculator,
    path: '/dashboard/utility/calculator',
    accent: 'bg-indigo-50 text-indigo-700',
  },
  {
    title: 'Notepad',
    description: 'Take temporary notes and document deletion justification.',
    icon: FileText,
    path: '/dashboard/utility/notepad',
    accent: 'bg-slate-50 text-slate-700',
  },
  {
    title: 'Backup Guidance',
    description: 'Review compliance and backup checks before performing destructive operations.',
    icon: ShieldCheck,
    path: '/dashboard/utility/backup-guidance',
    accent: 'bg-emerald-50 text-emerald-700',
  },
  {
    title: 'Daily Voucher',
    description: 'Quick access to daily petty cash / expense entry.',
    icon: FileText,
    path: '/dashboard/account/daily-voucher',
    accent: 'bg-amber-50 text-amber-700',
  },
  {
    title: 'Internet Reporting',
    description: 'Send test reports electronically to patients and doctors.',
    icon: FileText,
    path: '/dashboard/mis/internet-reporting',
    accent: 'bg-cyan-50 text-cyan-700',
  },
];

export default function UtilityIndexPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">Utility Hub</h2>
        <p className="mt-2 text-sm text-slate-500">
          Administrative tools for sensitive maintenance tasks. Access is restricted to lab administrators.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
        {utilityTools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Card key={tool.title} className="overflow-hidden">
              <div className="border-b border-slate-200 bg-slate-50 px-6 py-5">
                <h3 className="text-sm font-semibold text-slate-900">{tool.title}</h3>
                <p className="mt-1 text-xs text-slate-500">{tool.description}</p>
              </div>
              <div className="space-y-6 p-6">
                <div className={`inline-flex items-center justify-center rounded-2xl px-3 py-3 ${tool.accent}`}>
                  <Icon size={20} />
                </div>
                <Button type="button" variant="outline" className="w-full text-left" onClick={() => navigate(tool.path)}>
                  Open {tool.title}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      <Card title="Utility Action Guidance" subtitle="This section is for high-risk administrative operations">
        <div className="space-y-4 text-sm text-slate-600">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Use with care</p>
            <p className="mt-2 leading-6">
              This screen is designed for owner/senior administrator use only. Review the selected tool and confirm backups before making permanent changes.
            </p>
          </div>
          <div className="rounded-3xl border border-rose-200 bg-rose-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-500">High risk</p>
            <p className="mt-2 leading-6">
              Delete Booking permanently removes records and may affect billing, results, receipts and regulatory audit trails.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
