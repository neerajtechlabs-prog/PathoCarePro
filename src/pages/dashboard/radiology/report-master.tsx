import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import { FormInput, FormTextArea, SelectInput } from '../../../components/form/FormInput';

const groups = [
  { value: 'US', label: 'US' },
  { value: 'X-RAY', label: 'X-RAY' },
  { value: 'CT', label: 'CT' },
];

const testTypes = [
  { value: 'Normal', label: 'Normal' },
  { value: 'Abnormal', label: 'Abnormal' },
];

const templates = [
  { id: '1', code: 'XRY-01', name: 'Chest X-Ray Normal', group: 'X-RAY' },
  { id: '2', code: 'USG-AB', name: 'USG Abdomen Normal', group: 'US' },
  { id: '3', code: 'CT-BRAIN', name: 'CT Brain Normal', group: 'CT' },
];

export default function RadiologyReportMasterPage() {
  const navigate = useNavigate();
  const [group, setGroup] = useState('US');
  const [testCode, setTestCode] = useState('USG-AB');
  const [testName, setTestName] = useState('USG Abdomen');
  const [testType, setTestType] = useState('Normal');
  const [content, setContent] = useState('FINDINGS:\nNo abnormality detected.\n\nIMPRESSION:\nNormal abdominal ultrasound.');

  const filteredTemplates = useMemo(
    () => templates.filter((template) => template.group === group),
    [group]
  );

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">Radiology Report Master</h2>
        <p className="mt-2 text-sm text-slate-500">Manage reusable radiology report templates for imaging workflows.</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.6fr_0.4fr]">
        <Card>
          <div className="grid gap-4 md:grid-cols-2">
            <SelectInput
              label="Group"
              options={groups}
              value={group}
              onChange={(event) => setGroup(event.target.value)}
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
              label="Template Content"
              rows={14}
              value={content}
              onChange={(event) => setContent(event.target.value)}
            />
          </div>
        </Card>

        <Card title="Template Library" subtitle={`${filteredTemplates.length} templates found`}>
          <div className="space-y-3">
            {filteredTemplates.map((template) => (
              <div key={template.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <p className="text-sm font-medium text-slate-900">{template.name}</p>
                <p className="text-xs text-slate-500">{template.code}</p>
              </div>
            ))}
            {filteredTemplates.length === 0 && <p className="text-sm text-slate-500">No templates available for this group.</p>}
          </div>

          <div className="mt-6 space-y-3">
            <Button type="button" className="w-full" onClick={() => alert('Template saved')}>
              Save
            </Button>
            <Button type="button" variant="outline" className="w-full" onClick={() => alert('Delete template not implemented')}>
              Delete
            </Button>
            <Button variant="ghost" type="button" className="w-full" onClick={() => navigate('/dashboard')}>
              Exit
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
