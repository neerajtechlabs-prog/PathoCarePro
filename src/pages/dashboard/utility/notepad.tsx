import { useState } from 'react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';

export default function UtilityNotepadPage() {
  const [note, setNote] = useState('');

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">Notepad</h2>
        <p className="mt-2 text-sm text-slate-500">Use this note area to capture deletion justification, admin review comments, or temporary reference text.</p>
      </div>

      <Card title="Admin Notepad" subtitle="Temporary notes for sensitive operations">
        <div className="space-y-4">
          <textarea
            value={note}
            onChange={(event) => setNote(event.target.value)}
            placeholder="Write deletion notes or admin comments here..."
            className="min-h-[280px] w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-indigo-500 focus:ring-indigo-500"
          />
          <div className="flex flex-wrap items-center gap-3">
            <Button type="button" variant="primary" onClick={() => alert('Note saved for this session.') }>
              Save Note
            </Button>
            <Button type="button" variant="outline" onClick={() => setNote('')}>
              Clear
            </Button>
          </div>
        </div>
      </Card>

      <Card title="Usage guidance" subtitle="Keep a manual record when deleting bookings">
        <ul className="space-y-3 text-sm text-slate-700">
          <li>• Capture why records are being deleted and who approved the action.</li>
          <li>• Use the note only for temporary admin context; this is not an audit log.</li>
          <li>• Clear the note after completing the deletion workflow to avoid accidental reuse.</li>
        </ul>
      </Card>
    </div>
  );
}
