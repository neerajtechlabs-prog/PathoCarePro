import { useMemo, useState } from 'react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import { FormCheckbox, FormInput } from '../../../components/form/FormInput';

interface ResultRow {
  id: string;
  sn: string;
  isn: string;
  testName: string;
  result: string;
  range: string;
  unit: string;
  normal: string;
}

const initialRows: ResultRow[] = [
  { id: '1', sn: '1', isn: '101', testName: 'Complete Blood Count', result: '', range: '4.5-11.0', unit: '10^9/L', normal: 'Normal' },
  { id: '2', sn: '2', isn: '102', testName: 'Liver Function Test', result: '', range: '7-56', unit: 'U/L', normal: 'Normal' },
  { id: '3', sn: '3', isn: '103', testName: 'Blood Sugar', result: '', range: '70-110', unit: 'mg/dL', normal: 'Normal' },
];

export default function ResultEntryPage() {
  const [results, setResults] = useState<ResultRow[]>(initialRows);
  const [showIncomplete, setShowIncomplete] = useState(true);
  const [moveColumns, setMoveColumns] = useState(false);

  const filteredRows = useMemo(
    () => results.filter((row) => (showIncomplete ? row.result.trim() === '' : row.result.trim() !== '')),
    [results, showIncomplete]
  );

  const updateResult = (id: string, value: string) => {
    setResults((current) => current.map((row) => (row.id === id ? { ...row, result: value } : row)));
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Test Result Entry</h2>
          <p className="mt-2 text-sm text-slate-500">Laboratory scientist entry screen for result capture, TAT tracking, and patient follow-up.</p>
        </div>

        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
          <div className="h-full rounded-3xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">F1 / F2</p>
                <p className="mt-2 font-semibold text-slate-900">Incomplete / Complete</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant={showIncomplete ? 'primary' : 'outline'}
                  className="min-w-[88px]"
                  onClick={() => setShowIncomplete(true)}
                >
                  F1 Incomplete
                </Button>
                <Button
                  type="button"
                  variant={!showIncomplete ? 'primary' : 'outline'}
                  className="min-w-[88px]"
                  onClick={() => setShowIncomplete(false)}
                >
                  F2 Complete
                </Button>
              </div>
            </div>
            <p className="mt-3 text-[13px] leading-5 text-slate-500">
              Toggle between pending results and completed reports for TAT management.
            </p>
          </div>

          <div className="h-full rounded-3xl border border-slate-200 bg-white p-3 shadow-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Function key guide</p>
            <div className="mt-3 grid gap-2 text-sm text-slate-700">
              <div className="grid gap-2">
                <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-3 py-2">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-800 text-xs font-semibold text-white">F3</span>
                  <span>Search Record</span>
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-3 py-2">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-800 text-xs font-semibold text-white">F4</span>
                  <span>Today Reporting of Previous Test</span>
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-3 py-2">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-800 text-xs font-semibold text-white">F6</span>
                  <span>Test Result History</span>
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-3 py-2">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-800 text-xs font-semibold text-white">F9</span>
                  <span>Test History of Patient</span>
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-3 py-2">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-800 text-xs font-semibold text-white">F12</span>
                  <span>Booking Form</span>
                </div>
                <div className="rounded-2xl bg-slate-900 px-3 py-2 text-[11px] uppercase tracking-[0.2em] text-white">
                  Insert = Insert Box · PgDn = Test Help
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Card>
        <div className="grid gap-4 xl:grid-cols-[1fr_1fr_1fr]">
          <FormInput label="Booking Date" value="22/05/2026" readOnly />
          <FormInput label="Delivery Date" value="22/05/2026" readOnly />
          <FormInput label="Time" value="11:48:58 AM" readOnly />
        </div>

        <div className="mt-4 grid gap-4 xl:grid-cols-[1.25fr_1fr]">
          <div className="grid gap-4 sm:grid-cols-2">
            <FormInput label="Patient" value="Meena Shah" readOnly />
            <FormInput label="Doctor" value="Dr. Sharma" readOnly />
            <FormInput label="Reg No" value="1006" readOnly />
            <FormInput label="Centre No" value="C-120" readOnly />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <FormInput label="Record No" value="R-4521" readOnly />
            <FormInput label="Sample" value="Blood" readOnly />
            <FormInput label="UID" value="UID-3245" readOnly />
            <div className="flex items-center rounded-lg border border-slate-200 bg-white px-3 py-2">
              <FormCheckbox
                checked={moveColumns}
                onChange={(event) => setMoveColumns(event.target.checked)}
                label="Move Columns"
              />
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-[0.08em] text-slate-500">
              <tr>
                <th className="px-4 py-3">SNo</th>
                <th className="px-4 py-3">ISN</th>
                <th className="px-4 py-3">Test Name</th>
                <th className="px-4 py-3">Result</th>
                <th className="px-4 py-3">Range</th>
                <th className="px-4 py-3">Unit</th>
                <th className="px-4 py-3">Normal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {filteredRows.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-900">{row.sn}</td>
                  <td className="px-4 py-3 text-slate-700">{row.isn}</td>
                  <td className="px-4 py-3 text-slate-900">{row.testName}</td>
                  <td className="px-4 py-3">
                    <input
                      value={row.result}
                      onChange={(e) => updateResult(row.id, e.target.value)}
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none"
                      placeholder="Enter result"
                    />
                  </td>
                  <td className="px-4 py-3 text-slate-600">{row.range}</td>
                  <td className="px-4 py-3 text-slate-600">{row.unit}</td>
                  <td className="px-4 py-3 text-slate-600">{row.normal}</td>
                </tr>
              ))}
              {filteredRows.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-slate-400">
                    No results found for the selected view.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Button type="button" variant="outline" onClick={() => alert('Send SMS to patient')}>
          SMS
        </Button>
        <Button type="button" variant="secondary" onClick={() => alert('Add remark')}>
          Remark
        </Button>
        <Button type="button" variant="outline" onClick={() => alert('Show patient history')}>
          Patient History
        </Button>
        <Button type="button" variant="primary" onClick={() => alert('Save results')}>
          Save
        </Button>
        <Button type="button" variant="danger" onClick={() => alert('Delete result')}>
          Delete
        </Button>
        <Button type="button" variant="secondary" onClick={() => alert('Print result sheet')}>
          Print
        </Button>
        <Button type="button" variant="outline" onClick={() => alert('Search record')}>
          Search
        </Button>
        <Button type="button" variant="ghost" onClick={() => alert('Refresh data')}>
          Refresh
        </Button>
        <Button type="button" variant="ghost" onClick={() => alert('Exit result entry')}>
          Exit
        </Button>
      </div>
    </div>
  );
}
