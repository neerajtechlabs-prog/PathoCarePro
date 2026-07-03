import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import { FormInput, FormTextArea, SelectInput } from '../../../components/form/FormInput';

const departments = [
  { value: 'US', label: 'US' },
  { value: 'X-RAY', label: 'X-RAY' },
  { value: 'CT', label: 'CT' },
  { value: 'MRI', label: 'MRI' },
];

const testTypes = [
  { value: 'Routine', label: 'Routine' },
  { value: 'Emergency', label: 'Emergency' },
  { value: 'Follow-up', label: 'Follow-up' },
];

const doctors = [
  { value: 'Dr. Sharma', label: 'Dr. Sharma' },
  { value: 'Dr. Verma', label: 'Dr. Verma' },
  { value: 'Dr. Kapoor', label: 'Dr. Kapoor' },
];

export default function RadiologyResultReportPage() {
  const navigate = useNavigate();
  const [department, setDepartment] = useState('US');
  const [regNo, setRegNo] = useState('1006');
  const [recordNo, setRecordNo] = useState('R-2026-102');
  const [patientName, setPatientName] = useState('Sunita Patel');
  const [ageSex, setAgeSex] = useState('32/F');
  const [regDate, setRegDate] = useState('2026-05-22');
  const [resultDate, setResultDate] = useState('2026-05-22');
  const [testCode, setTestCode] = useState('USG-AB');
  const [testName, setTestName] = useState('USG Abdomen');
  const [testType, setTestType] = useState('Routine');
  const [doctor, setDoctor] = useState('Dr. Sharma');
  const [reportText, setReportText] = useState('Findings: No abnormality detected. Impression: Normal abdominal ultrasound.');

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">Radiology Result Report</h2>
        <p className="mt-2 text-sm text-slate-500">Enter diagnostic findings for radiology and imaging reports.</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.65fr_0.35fr]">
        <Card>
          <div className="grid gap-4 md:grid-cols-2">
            <SelectInput
              label="Dept"
              options={departments}
              value={department}
              onChange={(event) => setDepartment(event.target.value)}
            />
            <FormInput label="Reg No" value={regNo} onChange={(event) => setRegNo(event.target.value)} />
            <FormInput label="Record No" value={recordNo} onChange={(event) => setRecordNo(event.target.value)} />
            <FormInput label="Patient" value={patientName} onChange={(event) => setPatientName(event.target.value)} />
            <FormInput label="Age/Sex" value={ageSex} onChange={(event) => setAgeSex(event.target.value)} />
            <FormInput label="Reg Date" type="date" value={regDate} onChange={(event) => setRegDate(event.target.value)} />
            <FormInput label="Result Date" type="date" value={resultDate} onChange={(event) => setResultDate(event.target.value)} />
            <SelectInput
              label="Doctor"
              options={doctors}
              value={doctor}
              onChange={(event) => setDoctor(event.target.value)}
            />
            <FormInput label="Test Code" value={testCode} onChange={(event) => setTestCode(event.target.value)} />
            <FormInput label="Test Name" value={testName} onChange={(event) => setTestName(event.target.value)} />
            <SelectInput
              label="Test Type"
              options={testTypes}
              value={testType}
              onChange={(event) => setTestType(event.target.value)}
            />
          </div>

          <div className="mt-6">
            <FormTextArea
              label="Report Findings"
              rows={12}
              value={reportText}
              onChange={(event) => setReportText(event.target.value)}
            />
          </div>
        </Card>

        <Card title="Actions">
          <div className="space-y-3">
            <Button type="button" className="w-full" onClick={() => alert('Report saved')}>
              Save
            </Button>
            <Button type="button" variant="outline" className="w-full" onClick={() => alert('Delete action not implemented')}>
              Delete
            </Button>
            <Button type="button" variant="outline" className="w-full" onClick={() => alert('Search panel not available yet')}>
              Search
            </Button>
            <Button type="button" variant="secondary" className="w-full" onClick={() => alert('Print preview not implemented')}>
              Print
            </Button>
            <Button type="button" variant="ghost" className="w-full" onClick={() => window.location.reload()}>
              Refresh
            </Button>
            <Button type="button" variant="outline" className="w-full" onClick={() => navigate('/dashboard')}>
              Exit
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
