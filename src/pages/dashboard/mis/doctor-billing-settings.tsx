import { useEffect, useState } from 'react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import { useNavigate } from 'react-router-dom';

interface ColumnConfig {
  position: number;
  columnName: string;
  caption: string;
  width: number;
  showTotal: boolean;
}

const defaultColumns: ColumnConfig[] = [
  { position: 0, columnName: 'BookingID', caption: 'BookingID', width: 150, showTotal: false },
  { position: 1, columnName: 'Dated', caption: 'Dated', width: 150, showTotal: true },
  { position: 2, columnName: 'RegNo', caption: 'RegNo', width: 150, showTotal: true },
  { position: 3, columnName: 'RecordNo', caption: 'RecordNo', width: 150, showTotal: true },
  { position: 4, columnName: 'PatientID', caption: 'PatientID', width: 150, showTotal: true },
  { position: 5, columnName: 'UID', caption: 'UID', width: 150, showTotal: true },
  { position: 6, columnName: 'Patient', caption: 'Patient', width: 150, showTotal: true },
  { position: 7, columnName: 'TotalAmount', caption: 'TotalAmount', width: 150, showTotal: true },
  { position: 8, columnName: 'TDiscount', caption: 'TDiscount', width: 150, showTotal: true },
  { position: 9, columnName: 'TPaid', caption: 'TPaid', width: 150, showTotal: true },
  { position: 10, columnName: 'DrCUT', caption: 'DrCUT', width: 150, showTotal: true },
  { position: 11, columnName: 'DoctorID', caption: 'DoctorID', width: 150, showTotal: true },
  { position: 12, columnName: 'Doctor', caption: 'Doctor', width: 150, showTotal: true },
  { position: 13, columnName: 'TestIDs', caption: 'TestIDs', width: 150, showTotal: true },
  { position: 14, columnName: 'TestInitials', caption: 'TestInitials', width: 150, showTotal: true },
];

export default function DoctorBillingSettingsPage() {
  const navigate = useNavigate();
  const [columns, setColumns] = useState<ColumnConfig[]>(() => {
    try {
      const raw = localStorage.getItem('doctorBillingColumns');
      return raw ? JSON.parse(raw) : defaultColumns;
    } catch (e) {
      return defaultColumns;
    }
  });

  useEffect(() => {
    // keep positions sorted
    setColumns((cols) => [...cols].sort((a, b) => a.position - b.position));
  }, []);

  const updateColumn = (idx: number, patch: Partial<ColumnConfig>) => {
    setColumns((prev) => prev.map((c, i) => (i === idx ? { ...c, ...patch } : c)));
  };

  const movePosition = (idx: number, dir: -1 | 1) => {
    setColumns((prev) => {
      const copy = [...prev];
      const target = idx + dir;
      if (target < 0 || target >= copy.length) return prev;
      const tmp = copy[target];
      copy[target] = { ...copy[idx], position: target };
      copy[idx] = { ...tmp, position: idx };
      return copy.map((c, i) => ({ ...c, position: i }));
    });
  };

  const handleSave = () => {
    localStorage.setItem('doctorBillingColumns', JSON.stringify(columns));
    alert('Configuration saved');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Doctor Billing — Column Configurator</h2>
          <p className="mt-1 text-sm text-slate-500">Master &gt;&gt; Doctor Account &gt;&gt; Doctor Billing</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate(-1)}>Back</Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-sm">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-3 py-2 text-left">Pos</th>
                <th className="px-3 py-2 text-left">Column Name</th>
                <th className="px-3 py-2 text-left">Caption</th>
                <th className="px-3 py-2 text-left">Width</th>
                <th className="px-3 py-2 text-left">Show Total</th>
                <th className="px-3 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {columns.map((col, idx) => (
                <tr key={col.columnName} className="border-t">
                  <td className="px-3 py-2">{col.position}</td>
                  <td className="px-3 py-2">{col.columnName}</td>
                  <td className="px-3 py-2">
                    <input value={col.caption} onChange={(e) => updateColumn(idx, { caption: e.target.value })} className="w-full rounded border border-slate-200 px-2 py-1" />
                  </td>
                  <td className="px-3 py-2">
                    <input type="number" value={col.width} onChange={(e) => updateColumn(idx, { width: Number(e.target.value) || 0 })} className="w-24 rounded border border-slate-200 px-2 py-1" />
                  </td>
                  <td className="px-3 py-2">
                    <input type="checkbox" checked={col.showTotal} onChange={(e) => updateColumn(idx, { showTotal: e.target.checked })} />
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => movePosition(idx, -1)}>↑</Button>
                      <Button variant="outline" onClick={() => movePosition(idx, 1)}>↓</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="flex justify-end">
        <Button variant="outline" onClick={() => { localStorage.removeItem('doctorBillingColumns'); setColumns(defaultColumns); }}>Reset</Button>
        <Button onClick={handleSave}>Save Configuration</Button>
      </div>
    </div>
  );
}
