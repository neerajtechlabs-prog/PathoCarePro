import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

export default function DoctorBillingPage() {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState<string>('2026-05-22');
  const [endDate, setEndDate] = useState<string>('2026-05-22');
  const [centre, setCentre] = useState<string>('');
  const [doctor, setDoctor] = useState<string>('');
  const [compliment, setCompliment] = useState<string>('');
  const [viewPaidOnly, setViewPaidOnly] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">Doctor Billing</h2>
        <p className="mt-2 text-sm text-slate-500">Generate referral commission statements for referring doctors.</p>
      </div>

      <Card>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="block text-sm font-medium text-slate-700">Start Date</label>
            <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">End Date</label>
            <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Centre</label>
            <select
              value={centre}
              onChange={(e) => setCentre(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none"
            >
              <option value="">All centres</option>
              <option value="C-120">C-120</option>
              <option value="C-121">C-121</option>
            </select>
          </div>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div>
            <label className="block text-sm font-medium text-slate-700">Doctor</label>
            <select
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none"
            >
              <option value="">All doctors</option>
              <option value="DR-101">Dr. Sharma (DR-101)</option>
              <option value="DR-102">Dr. Gupta (DR-102)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Compliment</label>
            <Input placeholder="Compliment / commission category" value={compliment} onChange={(e) => setCompliment(e.target.value)} />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">View</label>
            <div className="mt-2 flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input type="radio" checked={viewPaidOnly} onChange={() => setViewPaidOnly(true)} />
                <span className="text-sm text-slate-700">Paid</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" checked={!viewPaidOnly} onChange={() => setViewPaidOnly(false)} />
                <span className="text-sm text-slate-700">Total</span>
              </label>
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <Button onClick={() => alert('Preview not implemented')} variant="outline">Preview</Button>
          <Button onClick={() => window.print()} variant="primary">Print</Button>
          <Button onClick={() => navigate(-1)} variant="ghost">Exit</Button>
        </div>
      </Card>

      <Card title="Notes" subtitle="What the doctor billing report includes">
        <ul className="list-disc pl-5 text-sm text-slate-700">
          <li>Doctor name and code, patient-wise billing rows</li>
          <li>Tests performed, bill amount, commission % and amount</li>
          <li>Centre-wise and doctor-wise aggregation with totals</li>
        </ul>
      </Card>
    </div>
  );
}
