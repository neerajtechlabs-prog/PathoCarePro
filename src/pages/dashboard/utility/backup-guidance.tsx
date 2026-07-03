import Card from '../../../components/ui/Card';

export default function BackupGuidancePage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">Backup Guidance</h2>
        <p className="mt-2 text-sm text-slate-500">Ensure data safety before using the Delete Booking tool or any destructive utility action.</p>
      </div>

      <Card title="Why backup matters" subtitle="Protect lab data and compliance">
        <ul className="space-y-3 text-sm text-slate-700">
          <li>• Permanent deletion may remove billing, test results, receipts, and audit records.</li>
          <li>• Back up before deleting anything from the historical or active financial period.</li>
          <li>• Only use Delete Booking for test data cleanup, duplicate correction, or pre-live data cleanup.</li>
          <li>• Never delete records after lab tests have been completed and billed.</li>
        </ul>
      </Card>

      <Card title="Recommended steps before deletion">
        <ol className="space-y-3 text-sm text-slate-700">
          <li>1. Verify user authorization and role permissions.</li>
          <li>2. Confirm data backup and export before records are removed.</li>
          <li>3. Review the selected date range and loaded bookings.</li>
          <li>4. Use Delete Selected only after careful row selection review.</li>
          <li>5. Document why deletion was done and who approved it.</li>
        </ol>
      </Card>
    </div>
  );
}
