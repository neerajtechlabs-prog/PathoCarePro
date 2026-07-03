import { useNavigate } from 'react-router-dom';
import { Building2, Users, Stethoscope, FlaskConical, QrCode, MessageSquare, FileText, DollarSign, Gift, MapPin, Package, Copy, Briefcase, UserPlus, BarChart3 } from 'lucide-react';
import Card from '../../../components/ui/Card';

const masterGroups = [
  {
    title: 'Core Lab Setup',
    description: 'Set foundational lab identity, centres, and organizational structure.',
    items: [
      { title: 'Owner Profile', description: 'Manage lab identity and administrative profile.', icon: Building2, accent: 'bg-emerald-50 text-emerald-700', path: '/dashboard/masters/owner-profile' },
      { title: 'Centre Setup', description: 'Configure branches, collection centres and centre details.', icon: Building2, accent: 'bg-amber-50 text-amber-700', path: '/dashboard/masters/centre-setup' },
      { title: 'Department Setup', description: 'Manage technical departments and reporting divisions.', icon: MapPin, accent: 'bg-orange-50 text-orange-700', path: '/dashboard/masters/dept' },
      { title: 'Barcode Master', description: 'Generate and manage barcode templates for samples.', icon: QrCode, accent: 'bg-rose-50 text-rose-700', path: '/dashboard/masters/barcode-master' },
    ],
  },
  {
    title: 'Doctor & Referral',
    description: 'Control referral sources, doctor profiles, and discount workflows.',
    items: [
      { title: 'Doctor Profile', description: 'Maintain referring doctors and their details.', icon: Stethoscope, accent: 'bg-sky-50 text-sky-700', path: '/dashboard/masters/doctor-master' },
      { title: 'Revise Doctor', description: 'Edit and update doctor information.', icon: Stethoscope, accent: 'bg-sky-50 text-sky-700', path: '/dashboard/masters/revise-doctor' },
      { title: 'Compliment', description: 'Manage referral bonuses and compliments.', icon: Gift, accent: 'bg-rose-50 text-rose-700', path: '/dashboard/masters/compliment' },
      { title: 'Assign Compliment', description: 'Allocate compliment referrals to doctors.', icon: Gift, accent: 'bg-rose-50 text-rose-700', path: '/dashboard/masters/assign-compliment' },
    ],
  },
  {
    title: 'Tests & Samples',
    description: 'Define tests, sample types, and result templates for clinical workflows.',
    items: [
      { title: 'Test Master', description: 'Create and manage laboratory tests.', icon: FlaskConical, accent: 'bg-violet-50 text-violet-700', path: '/dashboard/masters/tests' },
      { title: 'Revise Test', description: 'Edit and update existing test configurations.', icon: FlaskConical, accent: 'bg-violet-50 text-violet-700', path: '/dashboard/masters/revise-test' },
      { title: 'Test Group', description: 'Organize tests into groups and standard packages.', icon: Package, accent: 'bg-violet-50 text-violet-700', path: '/dashboard/masters/sample-types' },
      { title: 'Sample List', description: 'Manage sample types and collection requirements.', icon: Copy, accent: 'bg-cyan-50 text-cyan-700', path: '/dashboard/masters/sample-list' },
      { title: 'Special Notes', description: 'Add standard notes and report instructions.', icon: FileText, accent: 'bg-amber-50 text-amber-700', path: '/dashboard/masters/special-notes' },
    ],
  },
  {
    title: 'Users & Billing',
    description: 'Configure user accounts, access, and pricing for billing workflows.',
    items: [
      { title: 'User Management', description: 'Add and manage system users and roles.', icon: UserPlus, accent: 'bg-cyan-50 text-cyan-700', path: '/dashboard/masters/user-management' },
      { title: 'User Rate List', description: 'Assign rate cards and pricing to users.', icon: BarChart3, accent: 'bg-purple-50 text-purple-700', path: '/dashboard/masters/user-rate-list' },
      { title: 'Bill Type', description: 'Configure billing categories and payment rules.', icon: DollarSign, accent: 'bg-emerald-50 text-emerald-700', path: '/dashboard/masters/bill-type' },
      { title: 'SMS Setup', description: 'Configure SMS settings for patient communication.', icon: MessageSquare, accent: 'bg-pink-50 text-pink-700', path: '/dashboard/masters/sms-setup' },
      { title: 'Employee Master', description: 'Manage staff records and operational roles.', icon: Users, accent: 'bg-blue-50 text-blue-700', path: '/dashboard/masters/employee-master' },
      { title: 'Outsource Lab', description: 'Configure outsourced lab partners and billing.', icon: Briefcase, accent: 'bg-blue-50 text-blue-700', path: '/dashboard/masters/outsource-lab' },
    ],
  },
];

export default function MastersIndexPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">Master Configuration Hub</h2>
        <p className="mt-2 text-sm text-slate-500">Grouped configuration areas to make master data setup faster and more intuitive.</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        {masterGroups.map((group) => (
          <Card key={group.title} className="overflow-hidden">
            <div className="border-b border-slate-200 bg-slate-50 px-6 py-5">
              <h3 className="text-sm font-semibold text-slate-900">{group.title}</h3>
              <p className="mt-1 text-xs text-slate-500">{group.description}</p>
            </div>
            <div className="grid gap-4 p-6 sm:grid-cols-2">
              {group.items.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.title}
                    type="button"
                    onClick={() => navigate(section.path)}
                    className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-4 text-left transition hover:border-indigo-300 hover:shadow-md"
                  >
                    <div className={`inline-flex items-center justify-center rounded-2xl p-3 ${section.accent}`}>
                      <Icon size={18} />
                    </div>
                    <div className="mt-4">
                      <h4 className="text-sm font-semibold text-slate-900">{section.title}</h4>
                      <p className="mt-1 text-xs leading-5 text-slate-500">{section.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </Card>
        ))}
      </div>

      <Card title="Master Setup Guidance" subtitle="Follow these best practices for reliable lab configuration">
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Start here</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li>• Complete owner, centre and department setup first.</li>
              <li>• Define tests, groups and sample types before bookings.</li>
              <li>• Assign doctor and billing settings before live operations.</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-sky-200 bg-sky-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-500">Core categories</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li>• Core Lab Setup</li>
              <li>• Doctor & Referral</li>
              <li>• Tests & Samples</li>
              <li>• Users & Billing</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">Quality checklist</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li>✓ Validate all rate and sample mappings.</li>
              <li>✓ Use standard naming conventions.</li>
              <li>✓ Keep inactive items archived.</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
