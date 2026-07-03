import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

type ReportRow = {
  id: string;
  cno: number;
  regNo: string;
  patient: string;
  doctor: string;
  tests: string;
  sent: boolean;
};

const LOCAL_KEY = 'internetReportingRows';

export default function InternetReportingPage() {
  const navigate = useNavigate();
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [centre, setCentre] = useState<string>('JERATH PATH LAB');
  const [patientFilter, setPatientFilter] = useState('');
  const [doctorFilter, setDoctorFilter] = useState('');
  const [multipleSelection, setMultipleSelection] = useState(false);
  const [rows, setRows] = useState<ReportRow[]>([]);
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [reportTemplate, setReportTemplate] = useState('rptPrintTestResult');

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LOCAL_KEY);
      if (raw) setRows(JSON.parse(raw));
      else {
        // seed sample
        const seed: ReportRow[] = [
          { id: '1', cno: 1, regNo: 'REG-001', patient: 'John Doe', doctor: 'Dr. Sharma', tests: 'CBC, Lipid', sent: false },
          { id: '2', cno: 2, regNo: 'REG-002', patient: 'Jane Rao', doctor: 'Dr. Gupta', tests: 'LFT', sent: true },
        ];
        setRows(seed);
      }
    } catch (e) {
      // ignore
    }
  }, []);

  useEffect(() => {
    try { localStorage.setItem(LOCAL_KEY, JSON.stringify(rows)); } catch (e) {}
  }, [rows]);

  const visibleRows = useMemo(() => {
    return rows.filter((r) => {
      if (patientFilter && !r.patient.toLowerCase().includes(patientFilter.toLowerCase())) return false;
      if (doctorFilter && !r.doctor.toLowerCase().includes(doctorFilter.toLowerCase())) return false;
      return true;
    });
  }, [rows, patientFilter, doctorFilter]);

  const toggleSelect = (id: string) => {
    setSelected((s) => ({ ...s, [id]: !s[id] }));
  };

  const sendReport = (multi = false) => {
    const idsToSend = multi
      ? Object.keys(selected).filter((k) => selected[k])
      : Object.keys(selected).filter((k) => selected[k]).slice(0, 1);

    if (idsToSend.length === 0) return alert('Select at least one patient to send');

    const next = rows.map((r) => (idsToSend.includes(r.id) ? { ...r, sent: true } : r));
    setRows(next);
    alert(`Sent ${idsToSend.length} report(s) using ${reportTemplate}`);
    setSelected({});
  };

  const handleDelete = () => {
    const ids = Object.keys(selected).filter((k) => selected[k]);
    if (ids.length === 0) return alert('Select a row to delete');
    const next = rows.filter((r) => !ids.includes(r.id));
    setRows(next);
    setSelected({});
  };

  const handleRefresh = () => {
    try { const raw = localStorage.getItem(LOCAL_KEY); setRows(raw ? JSON.parse(raw) : []); setSelected({}); alert('Refreshed'); } catch (e) { alert('Refresh failed'); }
  };

  const handleScreenPreview = () => {
    const ids = Object.keys(selected).filter((k) => selected[k]);
    if (ids.length === 0) return alert('Select at least one patient to preview');
    const r = rows.find((x) => x.id === ids[0]);
    if (!r) return;
    alert(`Preview for ${r.patient} (template: ${reportTemplate})`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">Internet Reporting</h2>
        <p className="mt-1 text-sm text-slate-500">Send test reports electronically to patients and doctors.</p>
      </div>

      <Card>
        <div className="flex flex-wrap gap-4 items-end">
          <div>
            <label className="text-sm text-slate-600">Dated</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="rounded-md border border-slate-200 px-3 py-2" />
          </div>

          <div>
            <label className="text-sm text-slate-600">Centre</label>
            <select value={centre} onChange={(e) => setCentre(e.target.value)} className="rounded-md border border-slate-200 px-3 py-2">
              <option>JERATH PATH LAB</option>
              <option>HQ-001</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-slate-600">Patient</label>
            <Input value={patientFilter} onChange={(e) => setPatientFilter(e.target.value)} placeholder="Search patient" />
          </div>

          <div>
            <label className="text-sm text-slate-600">Doctor</label>
            <Input value={doctorFilter} onChange={(e) => setDoctorFilter(e.target.value)} placeholder="Doctor name" />
          </div>

          <div className="flex items-center gap-2">
            <input id="multi" type="checkbox" checked={multipleSelection} onChange={(e) => setMultipleSelection(e.target.checked)} />
            <label htmlFor="multi" className="text-sm text-slate-600">Multiple Selection</label>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <label className="text-sm text-slate-600">Report</label>
            <select value={reportTemplate} onChange={(e) => setReportTemplate(e.target.value)} className="rounded-md border border-slate-200 px-3 py-2">
              <option>rptPrintTestResult</option>
            </select>
            <Button onClick={() => sendReport(false)}>Send Report</Button>
            <Button onClick={() => sendReport(true)}>Multi Report</Button>
            <Button variant="outline" onClick={handleScreenPreview}>Screen</Button>
            <Button variant="secondary" onClick={handleDelete}>Delete</Button>
            <Button variant="outline" onClick={handleRefresh}>Refresh</Button>
            <Button variant="ghost" onClick={() => navigate(-1)}>Exit</Button>
          </div>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full table-auto text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-3 py-2 text-left border-b">CNo</th>
                <th className="px-3 py-2 text-left border-b">RegNo</th>
                <th className="px-3 py-2 text-left border-b">Patient</th>
                <th className="px-3 py-2 text-left border-b">Doctor</th>
                <th className="px-3 py-2 text-left border-b">Tests</th>
                <th className="px-3 py-2 text-left border-b">SendReport</th>
              </tr>
            </thead>
            <tbody>
              {visibleRows.map((r) => (
                <tr key={r.id} className={`border-t ${selected[r.id] ? 'bg-indigo-50' : ''}`} onClick={() => { if (multipleSelection) toggleSelect(r.id); else setSelected({ [r.id]: !selected[r.id] }); }}>
                  <td className="px-3 py-2">{r.cno}</td>
                  <td className="px-3 py-2">{r.regNo}</td>
                  <td className="px-3 py-2">{r.patient}</td>
                  <td className="px-3 py-2">{r.doctor}</td>
                  <td className="px-3 py-2">{r.tests}</td>
                  <td className="px-3 py-2">{r.sent ? 'Sent' : 'Pending'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
