import { useMemo, useState } from 'react';
import { Card } from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import { FormInput } from '../../../components/form/FormInput';

const mockRegisterRows = [
  { id: '1', dated: '2026-05-22', code: '1006', patient: 'Sunita Patel', ageSex: '32/F', duration: 'N/A', issue: 'None', digType: 'US', digReport: 'Saved' },
  { id: '2', dated: '2026-05-22', code: '1007', patient: 'Ramesh Kumar', ageSex: '28/M', duration: 'N/A', issue: 'N/A', digType: 'US', digReport: 'Saved' },
];

export default function RadiologyPNDTRegisterPage() {
  const [fromDate, setFromDate] = useState('2026-05-22');
  const [toDate, setToDate] = useState('2026-05-22');

  const filteredRows = useMemo(
    () => mockRegisterRows.filter((row) => row.dated >= fromDate && row.dated <= toDate),
    [fromDate, toDate]
  );

  return (
    <div className="space-y-6">
      <Card title="Register Filters">
        <div className="grid gap-4 md:grid-cols-2">
          <FormInput label="From Date" type="date" value={fromDate} onChange={(event) => setFromDate(event.target.value)} />
          <FormInput label="To Date" type="date" value={toDate} onChange={(event) => setToDate(event.target.value)} />
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button type="button" onClick={() => alert('Showing updated register')}>
            Show
          </Button>
          <Button type="button" variant="secondary" onClick={() => alert('Print job sent')}>
            Print
          </Button>
        </div>
      </Card>

      <Card title="CMO Register" subtitle={`${filteredRows.length} records found`}>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-[0.08em] text-slate-500">
              <tr>
                <th className="px-3 py-2">SNo</th>
                <th className="px-3 py-2">Dated</th>
                <th className="px-3 py-2">Code</th>
                <th className="px-3 py-2">Patient</th>
                <th className="px-3 py-2">Age/Sex</th>
                <th className="px-3 py-2">Duration</th>
                <th className="px-3 py-2">Issue</th>
                <th className="px-3 py-2">DigType</th>
                <th className="px-3 py-2">DigReport</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {filteredRows.map((row, index) => (
                <tr key={row.id}>
                  <td className="px-3 py-2">{index + 1}</td>
                  <td className="px-3 py-2">{row.dated}</td>
                  <td className="px-3 py-2">{row.code}</td>
                  <td className="px-3 py-2">{row.patient}</td>
                  <td className="px-3 py-2">{row.ageSex}</td>
                  <td className="px-3 py-2">{row.duration}</td>
                  <td className="px-3 py-2">{row.issue}</td>
                  <td className="px-3 py-2">{row.digType}</td>
                  <td className="px-3 py-2">{row.digReport}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
