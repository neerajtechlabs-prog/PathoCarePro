import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

type VoucherRow = {
  id: string;
  voucherNo: string;
  centre: string;
  date: string;
  headGroup: string;
  head: string;
  amount: number;
};

const LOCAL_KEY = 'dailyVouchers';

export default function DailyVoucherPage() {
  const navigate = useNavigate();
  const [voucherNo, setVoucherNo] = useState('001');
  const [centreCode, setCentreCode] = useState('MAIN');
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [headGroup, setHeadGroup] = useState('Daily Expenses');
  const [head, setHead] = useState('Tea');
  const [amount, setAmount] = useState<string>('');
  const [rows, setRows] = useState<VoucherRow[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LOCAL_KEY);
      if (raw) setRows(JSON.parse(raw));
    } catch (e) {
      // ignore
    }
  }, []);

  const nextVoucherNo = useMemo(() => {
    const next = (rows.length + 1).toString().padStart(3, '0');
    return next;
  }, [rows.length]);

  useEffect(() => {
    setVoucherNo(nextVoucherNo);
  }, [nextVoucherNo]);

  const addRow = () => {
    if (!head || !amount) return alert('Enter head and amount');
    const value = Number(amount);
    if (Number.isNaN(value) || value <= 0) return alert('Enter valid amount');
    const r: VoucherRow = {
      id: Date.now().toString(),
      voucherNo,
      centre: centreCode,
      date,
      headGroup,
      head,
      amount: value,
    };
    const next = [...rows, r];
    setRows(next);
    setAmount('');
    setSelectedIndex(null);
    try { localStorage.setItem(LOCAL_KEY, JSON.stringify(next)); } catch (e) {}
  };

  const handleSave = () => {
    try { localStorage.setItem(LOCAL_KEY, JSON.stringify(rows)); alert('Saved'); } catch (e) { alert('Save failed'); }
  };

  const handleDelete = () => {
    if (selectedIndex === null) return alert('Select a row to delete');
    const next = rows.filter((_, i) => i !== selectedIndex);
    setRows(next);
    setSelectedIndex(null);
    try { localStorage.setItem(LOCAL_KEY, JSON.stringify(next)); } catch (e) {}
  };

  const handleRefresh = () => {
    try {
      const raw = localStorage.getItem(LOCAL_KEY);
      setRows(raw ? JSON.parse(raw) : []);
      setSelectedIndex(null);
      alert('Refreshed');
    } catch (e) { alert('Refresh failed'); }
  };

  const handleExit = () => navigate(-1);

  const totalAmount = rows.reduce((s, r) => s + r.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">Daily Voucher</h2>
        <p className="mt-1 text-sm text-slate-500">Petty cash / expense entry for daily operational costs.</p>
      </div>

      <Card>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:gap-6">
          <div className="flex flex-col">
            <label className="text-sm text-slate-600">Voucher No</label>
            <input className="rounded-md border border-slate-200 px-3 py-2" value={voucherNo} readOnly />
          </div>

          <div>
            <label className="text-sm text-slate-600">Centre Code</label>
            <select value={centreCode} onChange={(e) => setCentreCode(e.target.value)} className="rounded-md border border-slate-200 px-3 py-2">
              <option value="MAIN">MAIN</option>
              <option value="HQ-001">HQ-001</option>
              <option value="ANH-001">ANH-001</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-slate-600">Date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="rounded-md border border-slate-200 px-3 py-2" />
          </div>

          <div>
            <label className="text-sm text-slate-600">Head Group</label>
            <select value={headGroup} onChange={(e) => setHeadGroup(e.target.value)} className="rounded-md border border-slate-200 px-3 py-2">
              <option>Daily Expenses</option>
              <option>Stationery</option>
              <option>Cleaning</option>
              <option>Courier</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-slate-600">Head</label>
            <select value={head} onChange={(e) => setHead(e.target.value)} className="rounded-md border border-slate-200 px-3 py-2">
              <option>Tea</option>
              <option>Stationery</option>
              <option>Cleaning</option>
              <option>Courier</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-slate-600">Amount</label>
            <input value={amount} onChange={(e) => setAmount(e.target.value)} className="rounded-md border border-slate-200 px-3 py-2" />
          </div>

          <div className="flex items-end">
            <Button onClick={addRow} className="h-10">+</Button>
          </div>
        </div>

        <div className="mt-6">
          <div className="overflow-x-auto">
            <table className="w-full table-auto text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-3 py-2 text-left border-b">SNo</th>
                  <th className="px-3 py-2 text-left border-b">VoucherNo</th>
                  <th className="px-3 py-2 text-left border-b">Centre</th>
                  <th className="px-3 py-2 text-left border-b">Head Group</th>
                  <th className="px-3 py-2 text-left border-b">Head</th>
                  <th className="px-3 py-2 text-left border-b">Amount</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={r.id} className={`border-t ${selectedIndex === i ? 'bg-indigo-50 text-indigo-700' : ''}`} onClick={() => setSelectedIndex(i)}>
                    <td className="px-3 py-2">{i + 1}</td>
                    <td className="px-3 py-2">{r.voucherNo}</td>
                    <td className="px-3 py-2">{r.centre}</td>
                    <td className="px-3 py-2">{r.headGroup}</td>
                    <td className="px-3 py-2">{r.head}</td>
                    <td className="px-3 py-2">{r.amount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-slate-50">
                  <td className="px-3 py-2 font-semibold" colSpan={5}>Total</td>
                  <td className="px-3 py-2 font-semibold">{totalAmount.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="mt-4 flex gap-3">
            <Button onClick={handleSave}>Save</Button>
            <Button variant="secondary" onClick={handleDelete}>Delete</Button>
            <Button variant="outline" onClick={handleRefresh}>Refresh</Button>
            <Button variant="ghost" onClick={handleExit}>Exit</Button>
            <Button variant="outline" onClick={() => navigate('/dashboard/mis/internet-reporting')}>Internet Reporting</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
