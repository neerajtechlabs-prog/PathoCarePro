import { useState } from 'react';
import { Card } from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import { FormInput } from '../../../components/form/FormInput';

const billItems = [
  { id: '1', code: 'CBC', test: 'Complete Blood Count', reportDays: 1, rate: 250 },
  { id: '2', code: 'LFT', test: 'Liver Function Test', reportDays: 1, rate: 400 },
  { id: '3', code: 'RFT', test: 'Renal Function Test', reportDays: 1, rate: 400 },
];

export default function FinalBillPage() {
  const [amount, setAmount] = useState(1050);
  const [discount, setDiscount] = useState(50);
  const [extra, setExtra] = useState(0);
  const [advance, setAdvance] = useState(200);

  const netAmount = amount - discount + extra;
  const balance = netAmount - advance;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">Final Bill</h2>
        <p className="mt-2 text-sm text-slate-500">Generate a consolidated bill for the patient visit.</p>
      </div>

      <Card>
        <div className="grid gap-4 md:grid-cols-2">
          <FormInput label="Bill No" value="BILL-2026-001" readOnly />
          <FormInput label="Date" value="22/05/2026" readOnly />
          <FormInput label="Centre" value="MAIN" readOnly />
          <FormInput label="Reg No" value="1006" readOnly />
          <FormInput label="Patient" value="Sunita Patel" readOnly />
          <FormInput label="Doctor" value="Dr. Sharma" readOnly />
        </div>
      </Card>

      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-[0.08em] text-slate-500">
              <tr>
                <th className="px-4 py-3">SNo</th>
                <th className="px-4 py-3">Code</th>
                <th className="px-4 py-3">Test</th>
                <th className="px-4 py-3">Report Days</th>
                <th className="px-4 py-3">Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {billItems.map((item, idx) => (
                <tr key={item.id}>
                  <td className="px-4 py-3">{idx + 1}</td>
                  <td className="px-4 py-3 font-medium text-slate-900">{item.code}</td>
                  <td className="px-4 py-3 text-slate-600">{item.test}</td>
                  <td className="px-4 py-3 text-slate-600">{item.reportDays}</td>
                  <td className="px-4 py-3 text-slate-600">₹{item.rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card title="Billing Summary">
          <div className="space-y-4">
            <FormInput label="Amount" value={`₹${amount}`} readOnly />
            <FormInput label="Discount" value={`₹${discount}`} readOnly />
            <FormInput label="Extra" value={`₹${extra}`} readOnly />
            <FormInput label="Advance" value={`₹${advance}`} readOnly />
            <FormInput label="Net Amount" value={`₹${netAmount}`} readOnly />
            <FormInput label="Balance Amount" value={`₹${balance}`} readOnly />
          </div>
        </Card>

        <Card title="Actions">
          <div className="space-y-3">
            <Button type="button" className="w-full" onClick={() => alert('Bill saved')}>
              Save
            </Button>
            <Button type="button" variant="outline" className="w-full" onClick={() => alert('Search bill')}>
              Search
            </Button>
            <Button type="button" className="w-full" onClick={() => alert('Print bill')}>
              Print
            </Button>
            <Button type="button" variant="secondary" className="w-full" onClick={() => alert('Refresh')}>
              Refresh
            </Button>
            <Button type="button" variant="ghost" className="w-full" onClick={() => alert('Exit')}>
              Exit
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
