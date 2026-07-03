import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import { FormInput } from '../../../components/form/FormInput';

interface BookingRow {
  id: string;
  centre: string;
  dated: string;
  regNo: string;
  patient: string;
  doctor: string;
  tests: string;
  deleteStatus: string;
  selected: boolean;
}

const allBookings: BookingRow[] = [
  { id: '1', centre: 'MAIN', dated: '2026-05-22', regNo: '1006', patient: 'Sunita Patel', doctor: 'Dr. Sharma', tests: 'USG Abdomen', deleteStatus: 'Pending', selected: false },
  { id: '2', centre: 'MAIN', dated: '2026-05-22', regNo: '1007', patient: 'Ramesh Kumar', doctor: 'Dr. Verma', tests: 'X-Ray Chest', deleteStatus: 'Pending', selected: false },
  { id: '3', centre: 'EXT1', dated: '2026-05-21', regNo: '1008', patient: 'Asha Mehta', doctor: 'Dr. Kapoor', tests: 'USG Pelvis', deleteStatus: 'Pending', selected: false },
];

const today = new Date().toISOString().slice(0, 10);

export default function DeleteBookingPage() {
  const navigate = useNavigate();
  const [fromDate, setFromDate] = useState(today);
  const [toDate, setToDate] = useState(today);
  const [rows, setRows] = useState<BookingRow[]>(() =>
    allBookings.filter((booking) => booking.dated >= today && booking.dated <= today)
  );
  const [activeId, setActiveId] = useState<string | null>(null);

  const visibleRows = useMemo(
    () => rows.filter((row) => row.dated >= fromDate && row.dated <= toDate),
    [rows, fromDate, toDate]
  );

  const selectedCount = visibleRows.filter((row) => row.selected).length;
  const activeRow = visibleRows.find((row) => row.id === activeId) ?? null;
  const allSelected = visibleRows.length > 0 && visibleRows.every((row) => row.selected);

  const refreshRows = () => {
    setRows(
      allBookings
        .filter((booking) => booking.dated >= fromDate && booking.dated <= toDate)
        .map((booking) => ({ ...booking, selected: false }))
    );
    setActiveId(null);
  };

  const toggleRowSelection = (id: string) => {
    setRows((current) =>
      current.map((row) => (row.id === id ? { ...row, selected: !row.selected } : row))
    );
  };

  const toggleSelectAll = () => {
    setRows((current) =>
      current.map((row) =>
        visibleRows.some((visible) => visible.id === row.id)
          ? { ...row, selected: !allSelected }
          : row
      )
    );
  };

  const deleteActiveRow = () => {
    if (!activeRow) {
      alert('Please select one row to delete.');
      return;
    }
    setRows((current) => current.filter((row) => row.id !== activeRow.id));
    setActiveId(null);
  };

  const deleteSelectedRows = () => {
    if (selectedCount === 0) {
      alert('Please select at least one row to delete.');
      return;
    }
    setRows((current) => current.filter((row) => !row.selected));
    setActiveId(null);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">Delete Booking</h2>
        <p className="mt-2 text-sm text-slate-500">Admin-only tool for permanently removing booking records within a selected date range.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <Card title="Date Range Filter">
          <div className="grid gap-4 md:grid-cols-2">
            <FormInput label="From" type="date" value={fromDate} onChange={(event) => setFromDate(event.target.value)} />
            <FormInput label="To" type="date" value={toDate} onChange={(event) => setToDate(event.target.value)} />
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button type="button" onClick={refreshRows}>
              Refresh
            </Button>
            <Button type="button" variant="outline" onClick={toggleSelectAll}>
              {allSelected ? 'Deselect All' : 'Select All'}
            </Button>
          </div>
        </Card>

        <Card title="Action Summary" subtitle="Review before deletion">
          <div className="space-y-4 text-sm text-slate-600">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <p className="font-semibold text-slate-900">Records in range</p>
              <p className="mt-1 text-sm text-slate-600">{visibleRows.length} records loaded from {fromDate} to {toDate}.</p>
            </div>
            <div className="rounded-3xl border border-rose-200 bg-rose-50 p-4">
              <p className="font-semibold text-rose-800">Selected for deletion</p>
              <p className="mt-1 text-sm text-rose-700">{selectedCount} record{selectedCount === 1 ? '' : 's'} currently selected.</p>
            </div>
            <div className="rounded-3xl border border-indigo-200 bg-indigo-50 p-4">
              <p className="font-semibold text-indigo-900">Owner/Admin only</p>
              <p className="mt-1 text-sm text-indigo-800">This screen is restricted to lab owner or senior administrator use only.</p>
            </div>
          </div>
        </Card>
      </div>
      <Card title="Action Controls" subtitle="Perform deletion carefully">
        <div className="flex flex-wrap gap-3">
          <Button type="button" variant="danger" onClick={deleteActiveRow}>
            Delete
          </Button>
          <Button type="button" variant="danger" onClick={deleteSelectedRows}>
            Delete Selected
          </Button>
          <Button type="button" variant="ghost" onClick={() => navigate('/dashboard')}>
            Exit
          </Button>
        </div>
      </Card>

      <Card title="Booking Records" subtitle={`${visibleRows.length} records found`}>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-[0.08em] text-slate-500">
              <tr>
                <th className="px-3 py-2">Select</th>
                <th className="px-3 py-2">Centre</th>
                <th className="px-3 py-2">Dated</th>
                <th className="px-3 py-2">Reg No</th>
                <th className="px-3 py-2">Patient</th>
                <th className="px-3 py-2">Doctor</th>
                <th className="px-3 py-2">Tests</th>
                <th className="px-3 py-2">Delete Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {visibleRows.map((row) => (
                <tr
                  key={row.id}
                  className={row.id === activeId ? 'bg-indigo-50' : ''}
                  onClick={() => setActiveId(row.id)}
                >
                  <td className="px-3 py-2">
                    <input
                      type="checkbox"
                      checked={row.selected}
                      onChange={() => toggleRowSelection(row.id)}
                      onClick={(event) => event.stopPropagation()}
                      className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                  </td>
                  <td className="px-3 py-2">{row.centre}</td>
                  <td className="px-3 py-2">{row.dated}</td>
                  <td className="px-3 py-2 font-medium text-slate-900">{row.regNo}</td>
                  <td className="px-3 py-2">{row.patient}</td>
                  <td className="px-3 py-2">{row.doctor}</td>
                  <td className="px-3 py-2">{row.tests}</td>
                  <td className="px-3 py-2">{row.deleteStatus}</td>
                </tr>
              ))}
              {visibleRows.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-3 py-6 text-center text-sm text-slate-500">
                    No bookings found for the selected date range.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <Card title="Admin Guidance">
        <ul className="space-y-2 text-sm text-slate-600">
          <li>• Use this screen only after verifying backups and authorization.</li>
          <li>• Delete removes booking records permanently and may affect billing, reports, receipts, and MIS totals.</li>
          <li>• Prefer single-row Delete for targeted removal; use Delete Selected only for carefully reviewed bulk cleanup.</li>
          <li>• Avoid deleting records from current active billing periods unless the entry is clearly invalid.</li>
        </ul>
      </Card>
    </div>
  );
}
