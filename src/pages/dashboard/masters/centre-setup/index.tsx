import { useState } from 'react';
import { Plus, Edit2, Trash2, MapPin, Phone, Clock } from 'lucide-react';
import Card from '../../../../components/ui/Card';
import Button from '../../../../components/ui/Button';
import Input from '../../../../components/ui/Input';

interface Centre {
  id: string;
  name: string;
  code: string;
  address: string;
  city: string;
  phone: string;
  openingTime: string;
  closingTime: string;
  operatingDays: string;
  manager: string;
  status: 'active' | 'inactive';
  sampleCapacity: number;
  // Email / report configuration
  emailType?: 'Owner' | 'Doctor' | 'Patient';
  doctor?: string;
  signature?: string;
  signatureFile?: string;
  printAlways?: boolean;
  printSummary?: boolean;
  header?: string;
  footer?: string;
  reportTemplate?: string;
  designation?: string;
  registrationNo?: string;
  authority?: string;
  emailId?: string;
  password?: string;
  smtpServer?: string;
  smtpPort?: string;
}

const mockCentres: Centre[] = [
  {
    id: '1',
    name: 'Head Office - Downtown',
    code: 'HQ-001',
    address: '123 Medical Plaza, Main Street',
    city: 'Mumbai',
    phone: '+91-9876543210',
    openingTime: '07:00',
    closingTime: '19:00',
    operatingDays: 'Mon-Sat',
    manager: 'Mr. Rajesh Verma',
    status: 'active',
    sampleCapacity: 500,
  },
  {
    id: '2',
    name: 'Suburban Branch - Andheri',
    code: 'ANH-001',
    address: '456 Health Center, Andheri West',
    city: 'Mumbai',
    phone: '+91-9876543211',
    openingTime: '08:00',
    closingTime: '18:00',
    operatingDays: 'Mon-Sat',
    manager: 'Ms. Priya Sharma',
    status: 'active',
    sampleCapacity: 300,
  },
  {
    id: '3',
    name: 'Corporate Center - Bandra',
    code: 'BAN-001',
    emailType: 'Owner',
    address: '789 Business Complex, Bandra',
    city: 'Mumbai',
    phone: '+91-9876543212',
    openingTime: '09:00',
    closingTime: '17:00',
    operatingDays: 'Mon-Fri',
    manager: 'Dr. Amit Patel',
    status: 'active',
    sampleCapacity: 200,
  },
];

export default function CentreSetupPage() {
  const [centres, setCentres] = useState<Centre[]>(() => {
    try {
      const raw = localStorage.getItem('centres');
      return raw ? (JSON.parse(raw) as Centre[]) : mockCentres;
    } catch (e) {
      return mockCentres;
    }
  });
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Centre>>({});

  const handleAddNew = () => {
    setEditingId(null);
    setFormData({});
    setShowModal(true);
  };

  const handleEdit = (centre: Centre) => {
    setEditingId(centre.id);
    setFormData(centre);
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure?')) {
      setCentres((prev) => {
        const next = prev.filter((c) => c.id !== id);
        try {
          localStorage.setItem('centres', JSON.stringify(next));
        } catch (e) {
          // ignore
        }
        return next;
      });
    }
  };

  const handleSaveCentre = () => {
    const payload: Centre = {
      id: editingId || Date.now().toString(),
      name: formData.name || 'Unnamed',
      code: formData.code || '',
      address: formData.address || '',
      city: formData.city || '',
      phone: formData.phone || '',
      openingTime: formData.openingTime || '',
      closingTime: formData.closingTime || '',
      operatingDays: formData.operatingDays || '',
      manager: formData.manager || '',
      status: (formData.status as 'active' | 'inactive') || 'active',
      sampleCapacity: Number(formData.sampleCapacity) || 0,
      emailType: (formData.emailType as any) || undefined,
      doctor: formData.doctor || undefined,
      signature: formData.signature || undefined,
      signatureFile: formData.signatureFile || undefined,
      printAlways: !!formData.printAlways,
      printSummary: !!formData.printSummary,
      header: formData.header || undefined,
      footer: formData.footer || undefined,
      reportTemplate: formData.reportTemplate || undefined,
      designation: formData.designation || undefined,
      registrationNo: formData.registrationNo || undefined,
      authority: formData.authority || undefined,
      emailId: formData.emailId || undefined,
      password: formData.password || undefined,
      smtpServer: formData.smtpServer || undefined,
      smtpPort: formData.smtpPort || undefined,
    };

    setCentres((prev) => {
      if (editingId) {
        const next = prev.map((c) => (c.id === editingId ? payload : c));
        try { localStorage.setItem('centres', JSON.stringify(next)); } catch (e) {}
        return next;
      }
      const next = [payload, ...prev];
      try { localStorage.setItem('centres', JSON.stringify(next)); } catch (e) {}
      return next;
    });
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Centre Setup</h2>
          <p className="mt-2 text-sm text-slate-500">Manage collection centres, branches, and sample centers.</p>
        </div>
        <Button onClick={handleAddNew} className="gap-2">
          <Plus size={16} />
          Add Centre
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {centres.map((centre) => (
          <Card key={centre.id} className="flex flex-col">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-slate-900">{centre.name}</h3>
                <p className="mt-1 text-xs text-slate-500">{centre.code}</p>
              </div>
              <span
                className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                  centre.status === 'active'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-slate-100 text-slate-800'
                }`}
              >
                {centre.status === 'active' ? 'Active' : 'Inactive'}
              </span>
            </div>

            <div className="mt-4 space-y-2 border-t border-slate-100 pt-3 text-sm">
              <div className="flex items-start gap-2 text-slate-600">
                <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                <span>{centre.address}, {centre.city}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Phone size={14} />
                <span>{centre.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Clock size={14} />
                <span>{centre.openingTime} - {centre.closingTime} ({centre.operatingDays})</span>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
              <span className="text-slate-600">Manager: {centre.manager}</span>
              <span className="rounded-full bg-indigo-50 px-2 py-1 text-indigo-700">{centre.sampleCapacity}/day</span>
            </div>

            <div className="mt-4 flex gap-2">
              <Button size="sm" variant="secondary" onClick={() => handleEdit(centre)}>
                Edit
              </Button>
              <Button size="sm" variant="secondary" onClick={() => handleDelete(centre.id)}>
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Card className="w-full max-w-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-slate-900">
              {editingId ? 'Edit Centre' : 'Add New Centre'}
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              <Input
                label="Centre Name"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Head Office"
              />
              <Input
                label="Centre Code"
                value={formData.code || ''}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                placeholder="HQ-001"
              />
              <Input
                label="Address"
                value={formData.address || ''}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Street address"
              />
              <Input
                label="City"
                value={formData.city || ''}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="City"
              />
              <Input
                label="Phone"
                value={formData.phone || ''}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91-XXXXXXXXXX"
              />
              <Input
                label="Manager Name"
                value={formData.manager || ''}
                onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                placeholder="Manager name"
              />
              <Input
                label="Opening Time"
                type="time"
                value={formData.openingTime || ''}
                onChange={(e) => setFormData({ ...formData, openingTime: e.target.value })}
              />
              <Input
                label="Closing Time"
                type="time"
                value={formData.closingTime || ''}
                onChange={(e) => setFormData({ ...formData, closingTime: e.target.value })}
              />
              <Input
                label="Operating Days"
                value={formData.operatingDays || ''}
                onChange={(e) => setFormData({ ...formData, operatingDays: e.target.value })}
                placeholder="Mon-Sat"
              />
              <Input
                label="Daily Sample Capacity"
                type="number"
                value={formData.sampleCapacity || ''}
                onChange={(e) => setFormData({ ...formData, sampleCapacity: parseInt(e.target.value) })}
                placeholder="500"
              />

              {/* Email / Report configuration fields */}
              <div>
                <label className="block text-sm font-medium text-slate-700">Email Type</label>
                <select
                  value={formData.emailType || ''}
                  onChange={(e) => setFormData({ ...formData, emailType: (e.target.value as any) })}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none"
                >
                  <option value="">Select</option>
                  <option value="Owner">Owner</option>
                  <option value="Doctor">Doctor</option>
                  <option value="Patient">Patient</option>
                </select>
              </div>

              <Input
                label="Doctor"
                value={formData.doctor || ''}
                onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
                placeholder="Dr. Name or code"
              />

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700">Signature</label>
                <textarea
                  value={formData.signature || ''}
                  onChange={(e) => setFormData({ ...formData, signature: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Signature File</label>
                <input
                  type="file"
                  onChange={(e) => setFormData({ ...formData, signatureFile: e.target.files && e.target.files[0] ? e.target.files[0].name : undefined })}
                  className="w-full text-sm"
                />
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={!!formData.printAlways} onChange={(e) => setFormData({ ...formData, printAlways: e.target.checked })} />
                  <span className="text-sm text-slate-700">Print always</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={!!formData.printSummary} onChange={(e) => setFormData({ ...formData, printSummary: e.target.checked })} />
                  <span className="text-sm text-slate-700">Print Summary</span>
                </label>
              </div>

              <Input label="Header" value={formData.header || ''} onChange={(e) => setFormData({ ...formData, header: e.target.value })} />
              <Input label="Footer" value={formData.footer || ''} onChange={(e) => setFormData({ ...formData, footer: e.target.value })} />

              <Input label="Report Template" value={formData.reportTemplate || ''} onChange={(e) => setFormData({ ...formData, reportTemplate: e.target.value })} placeholder="Template name or path" />

              <Input label="Designation" value={formData.designation || ''} onChange={(e) => setFormData({ ...formData, designation: e.target.value })} />
              <Input label="Registration No." value={formData.registrationNo || ''} onChange={(e) => setFormData({ ...formData, registrationNo: e.target.value })} />
              <Input label="Authority" value={formData.authority || ''} onChange={(e) => setFormData({ ...formData, authority: e.target.value })} />

              <Input label="Email ID" value={formData.emailId || ''} onChange={(e) => setFormData({ ...formData, emailId: e.target.value })} />
              <Input label="Password" type="password" value={formData.password || ''} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />

              <div>
                <label className="block text-sm font-medium text-slate-700">SMTP Server</label>
                <input value={formData.smtpServer || ''} onChange={(e) => setFormData({ ...formData, smtpServer: e.target.value })} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Port</label>
                <input value={formData.smtpPort || ''} onChange={(e) => setFormData({ ...formData, smtpPort: e.target.value })} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" />
              </div>
            </div>
            <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveCentre}>Save Centre</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
