import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import { FormInput, SelectInput } from '../../../components/form/FormInput';

const mockBooking = {
  regNo: '1006',
  centreNo: 'MAIN',
  recordNo: 'R-2026-102',
  patient: 'Sunita Patel',
  doctor: 'Dr. Sharma',
  sample: 'Blood',
};

const testRows = [
  { id: '1', code: 'CBC', name: 'Complete Blood Count', newPage: true, footNote: 'Includes WBC, RBC, Platelets', selected: true },
  { id: '2', code: 'LFT', name: 'Liver Function Test', newPage: false, footNote: 'Report on biochemical markers', selected: true },
  { id: '3', code: 'RFT', name: 'Renal Function Test', newPage: false, footNote: 'Kidney panel', selected: false },
];

const printers = [
  { value: 'Printer1', label: 'Pathology Lab Printer' },
  { value: 'Printer2', label: 'Desk Printer' },
];

export default function ReportPartlyPage() {
  const navigate = useNavigate();
  const [reportFile, setReportFile] = useState('rptPrintTestResult');
  const [selectedPrinter, setSelectedPrinter] = useState('Printer1');
  const [tests, setTests] = useState(testRows);

  const selectedCount = useMemo(() => tests.filter((row) => row.selected).length, [tests]);

  const toggleTest = (id: string) => {
    setTests((current) => current.map((row) => (row.id === id ? { ...row, selected: !row.selected } : row)));
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">Report Partly</h2>
        <p className="mt-2 text-sm text-slate-500">Select tests for a partial report printout without completing the full booking.</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_0.75fr]">
        <Card>
          <div className="grid gap-4 md:grid-cols-2">
            <FormInput label="Reg No" value={mockBooking.regNo} readOnly />
            <FormInput label="Centre No" value={mockBooking.centreNo} readOnly />
            <FormInput label="Record No" value={mockBooking.recordNo} readOnly />
            <FormInput label="Patient" value={mockBooking.patient} readOnly />
            <FormInput label="Doctor" value={mockBooking.doctor} readOnly />
            <FormInput label="Sample" value={mockBooking.sample} readOnly />
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50 text-left text-xs uppercase tracking-[0.08em] text-slate-500">
                <tr>
                  <th className="px-4 py-3">Select</th>
                  <th className="px-4 py-3">Test Code</th>
                  <th className="px-4 py-3">Test Name</th>
                  <th className="px-4 py-3">New Page</th>
                  <th className="px-4 py-3">Foot Note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {tests.map((row) => (
                  <tr key={row.id}>
                    <td className="px-4 py-3">
                      <input type="checkbox" checked={row.selected} onChange={() => toggleTest(row.id)} className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-900">{row.code}</td>
                    <td className="px-4 py-3 text-slate-600">{row.name}</td>
                    <td className="px-4 py-3 text-slate-600">{row.newPage ? 'Yes' : 'No'}</td>
                    <td className="px-4 py-3 text-slate-600">{row.footNote}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="space-y-6">
          <Card title="Print Settings" subtitle={`${selectedCount} tests selected`}>
            <div className="space-y-4">
              <FormInput label="Report File Name" value={reportFile} readOnly />
              <SelectInput
                label="Select Printer"
                options={printers}
                value={selectedPrinter}
                onChange={(e) => setSelectedPrinter(e.target.value)}
              />
              <div className="space-y-3">
                <Button type="button" className="w-full" onClick={() => alert('Preview not implemented yet')}>
                  Preview
                </Button>
                <Button type="button" className="w-full" onClick={() => alert('Print job sent')}>
                  Print
                </Button>
                <Button variant="outline" type="button" className="w-full" onClick={() => navigate('/dashboard')}>
                  Exit
                </Button>
              </div>
            </div>
          </Card>

          <Card title="Instructions" subtitle="Partial report guidelines">
            <ul className="space-y-2 text-sm text-slate-600">
              <li>• Select only the tests that are ready to print.</li>
              <li>• Use a separate print run for radiology or external tests.</li>
              <li>• Confirm the printer before sending the job.</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
