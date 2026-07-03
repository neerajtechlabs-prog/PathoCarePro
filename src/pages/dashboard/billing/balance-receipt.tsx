import { useMemo, useState } from 'react';
import { Card } from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import { FormInput, FormTextArea, SelectInput } from '../../../components/form/FormInput';

const paymentModes = [
  { value: 'Cash', label: 'Cash' },
  { value: 'Card', label: 'Card' },
  { value: 'Online', label: 'Online' },
  { value: 'Cheque', label: 'Cheque' },
];

const discountApprovers = [
  { value: 'ADMIN', label: 'ADMIN' },
  { value: 'MANAGER', label: 'MANAGER' },
  { value: 'ACCOUNT', label: 'ACCOUNT' },
];

export default function BalanceReceiptPage() {
  const [regNo, setRegNo] = useState('1006');
  const [slipNo, setSlipNo] = useState('SLP-2026-001');
  const [uid, setUid] = useState('UID-3245');
  const [patientName, setPatientName] = useState('Sunita Patel');
  const [doctor, setDoctor] = useState('Dr. Sharma');
  const [regDate, setRegDate] = useState('2026-05-22');
  const [payMode, setPayMode] = useState('Cash');
  const [discountBy, setDiscountBy] = useState('ADMIN');
  const [totalAmount, setTotalAmount] = useState('4,500');
  const [discountPercent, setDiscountPercent] = useState('0');
  const [paidAmount, setPaidAmount] = useState('0');
  const [remark, setRemark] = useState('');

  const numericTotal = useMemo(() => Number(totalAmount.toString().replace(/,/g, '')) || 0, [totalAmount]);
  const numericDiscount = useMemo(() => Number(discountPercent) || 0, [discountPercent]);
  const discountValue = useMemo(() => (numericTotal * numericDiscount) / 100, [numericTotal, numericDiscount]);
  const netAmount = useMemo(() => numericTotal - discountValue, [numericTotal, discountValue]);
  const balanceDue = useMemo(() => netAmount - (Number(paidAmount) || 0), [netAmount, paidAmount]);

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Balance Receipt</h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-500">
            Collect outstanding payments for previously partially paid bookings. Use this screen to finalize the balance, print receipts, and manage receipt cancellations.
          </p>
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
            <span className="block text-xs uppercase tracking-[0.25em] text-slate-400">F1</span>
            Today Balance
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
            <span className="block text-xs uppercase tracking-[0.25em] text-slate-400">F4</span>
            Previous Balance
          </div>
        </div>
      </header>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.85fr]">
        <Card>
          <div className="grid gap-4 md:grid-cols-2">
            <FormInput
              label="Reg No"
              value={regNo}
              onChange={(e) => setRegNo(e.target.value)}
              placeholder="Enter registration number"
            />
            <FormInput label="Slip No" value={slipNo} onChange={(e) => setSlipNo(e.target.value)} placeholder="Booking slip number" />
            <FormInput label="UID" value={uid} onChange={(e) => setUid(e.target.value)} placeholder="Patient UID" />
            <FormInput
              label="Reg Date"
              type="date"
              value={regDate}
              onChange={(e) => setRegDate(e.target.value)}
            />
            <FormInput label="Patient" value={patientName} onChange={(e) => setPatientName(e.target.value)} placeholder="Patient name" />
            <FormInput label="Doctor" value={doctor} onChange={(e) => setDoctor(e.target.value)} placeholder="Referring doctor" />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <SelectInput
              label="Pay Mode"
              options={paymentModes}
              value={payMode}
              onChange={(e) => setPayMode(e.target.value)}
              placeholder="Select payment mode"
            />
            <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
              <SelectInput
                label="Disc By"
                options={discountApprovers}
                value={discountBy}
                onChange={(e) => setDiscountBy(e.target.value)}
                placeholder="Select approver"
              />
              <Button
                type="button"
                variant="outline"
                className="mt-6 h-11 whitespace-nowrap"
                onClick={() => alert('Open discount approver dialog')}
              >
                +
              </Button>
            </div>
            <FormInput label="Total Amt" value={totalAmount} readOnly />
            <div className="grid gap-4 sm:grid-cols-[1fr_0.9fr]">
              <FormInput
                label="Discount %"
                type="number"
                value={discountPercent}
                onChange={(e) => setDiscountPercent(e.target.value)}
                min={0}
                max={100}
                placeholder="0"
              />
              <FormInput label="Discount Value" value={discountValue.toFixed(2)} readOnly />
            </div>
            <FormInput label="Net" value={netAmount.toFixed(2)} readOnly />
            <FormInput
              label="Paid"
              type="number"
              value={paidAmount}
              onChange={(e) => setPaidAmount(e.target.value)}
              min={0}
              placeholder="Enter payment amount"
            />
          </div>
        </Card>

        <div className="space-y-4">
          <Card title="Transaction summary">
            <div className="space-y-3">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Balance Remaining</p>
                <p className="mt-2 text-3xl font-semibold text-slate-900">₹ {balanceDue.toFixed(2)}</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Payment mode</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">{payMode}</p>
              </div>
            </div>
          </Card>

          <Card title="Actions">
            <div className="grid gap-3">
              <Button type="button" onClick={() => alert('Save payment')}>
                Save
              </Button>
              <Button type="button" variant="outline" onClick={() => alert('Search receipts')}>
                Search
              </Button>
              <Button type="button" onClick={() => alert('Print receipt')}>
                Print
              </Button>
              <Button type="button" variant="secondary" onClick={() => alert('Refresh form')}>
                Refresh
              </Button>
              <Button type="button" variant="ghost" onClick={() => alert('Exit screen')}>
                Exit
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <Card title="Cancel Section" subtitle="Provide a reason before cancelling or selecting an existing receipt">
        <div className="space-y-5">
          <FormTextArea
            label="Remark"
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            placeholder="Enter cancellation remark"
            className="min-h-[120px] bg-slate-100"
          />
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button type="button" variant="outline" className="w-full sm:w-auto" onClick={() => alert('Cancel receipt')}>
              Cancel Receipt
            </Button>
            <Button type="button" className="w-full sm:w-auto" onClick={() => alert('Select receipt')}>
              Select Receipt
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
