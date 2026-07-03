import { Link, useNavigate } from 'react-router-dom';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import { useEffect, useMemo, useState } from 'react';
import { fetchReport } from '../../../services/misService';

type Row = Record<string, string | number>;

const reportTree = [
  {
    group: 'Daily Operations Reports',
    reports: [
      { key: 'day-register', label: 'Day Register' },
      { key: 'day-collection', label: 'Day Collection' },
      { key: 'cancel-booking', label: 'Cancel Booking' },
      { key: 'test-summary', label: 'Test Summary' },
      { key: 'balance', label: 'Balance' },
      { key: 'previous-collection', label: 'Previous Collection' },
    ],
  },
  {
    group: 'Doctor Account Reports',
    reports: [
      { key: 'doctor-patient-detail', label: 'Doctor Patient Detail' },
      { key: 'doctor-patient-summary', label: 'Doctor Patient Summary' },
      { key: 'doctor-billing', label: 'Doctor Billing' },
    ],
  },
  {
    group: 'Centre Account Reports',
    reports: [
      { key: 'centre-patient-register', label: 'Centre Patient Register' },
      { key: 'centre-billing', label: 'Centre Billing' },
    ],
  },
  {
    group: 'List Reports',
    reports: [
      { key: 'test-rate-list', label: 'Test Rate List' },
      { key: 'doctor-list', label: 'Doctor List' },
    ],
  },
];

export default function MISIndexPage() {
  const navigate = useNavigate();
  const [fromDate, setFromDate] = useState('2026-05-22');
  const [toDate, setToDate] = useState('2026-05-22');
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [rows, setRows] = useState<Row[]>([]);
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc' | null>(null);
  const [exportPanelOpen, setExportPanelOpen] = useState(false);
  const [exportSelection, setExportSelection] = useState<string[] | null>(null);

  const columnsConfig = useMemo(() => {
    try {
      const raw = localStorage.getItem('doctorBillingColumns');
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }, []);

  useEffect(() => {
    // reset rows and export selection when switching report
    setRows([]);
    setExportSelection(null);
    setPage(1);
  }, [selectedReport]);

  const columnsForExport = useMemo(() => {
    if (selectedReport === 'doctor-billing' && columnsConfig) {
      return columnsConfig.map((col: any) => ({ columnName: col.columnName, caption: col.caption }));
    }
    if (rows.length > 0) {
      return Object.keys(rows[0]).map((k) => ({ columnName: k, caption: k }));
    }
    return [];
  }, [columnsConfig, rows, selectedReport]);

  useEffect(() => {
    if (rows.length > 0 && exportSelection === null && columnsForExport.length > 0) {
      setExportSelection(columnsForExport.map((col) => col.columnName));
    }
  }, [columnsForExport, exportSelection, rows.length]);

  const loadReport = async (opts: { page?: number } = {}) => {
    if (!selectedReport) return;
    const res = await fetchReport(selectedReport, { page: opts.page || page, pageSize, sortBy, sortDir });
    setRows(res.rows as Row[]);
    setTotalRows(res.total || 0);
  };

  const downloadCSV = () => {
    if (rows.length === 0) return;
    const selectedColumns = exportSelection ?? columnsForExport.map((col) => col.columnName);
    const headerRow = selectedColumns.join(',');
    const csv = [
      headerRow,
      ...rows.map((row) => selectedColumns.map((key) => `"${String(row[key] ?? '')}"`).join(',')),
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedReport || 'report'}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    setExportPanelOpen(false);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">MIS Panel</h2>
          <p className="mt-1 text-sm text-slate-500">One solution for all reporting — select a report on the left and use the controls to load data.</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <aside>
          <Card className="mb-4" title="Report Tree">
            <div className="space-y-4">
              {reportTree.map((group) => (
                <div key={group.group}>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{group.group}</p>
                  <div className="space-y-1">
                    {group.reports.map((r) => (
                      <button
                        key={r.key}
                        onClick={() => setSelectedReport(r.key)}
                        className={`w-full text-left rounded-lg px-3 py-2 text-sm transition ${selectedReport === r.key ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700 hover:bg-slate-50'}`}
                      >
                        {r.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Quick Actions">
            <div className="flex flex-col gap-2">
              <Button onClick={() => alert('F5 refresh')} variant="outline">F5 Refresh</Button>
              <Button onClick={() => alert('Ctrl+S save')} variant="outline">Ctrl+S Save</Button>
              <Button onClick={() => alert('Ctrl+P print preview')} variant="outline">Ctrl+P Print Preview</Button>
            </div>
          </Card>
        </aside>

        <main>
          <Card>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-center gap-3 no-print">
                <label className="text-sm text-slate-600">From</label>
                <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="rounded-md border border-slate-200 px-3 py-2" />
                <label className="text-sm text-slate-600">To</label>
                <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="rounded-md border border-slate-200 px-3 py-2" />
                <Button onClick={() => {
                  if (!selectedReport) {
                    alert('Select a report first');
                    return;
                  }
                  void loadReport({ page: 1 });
                }}>Show</Button>
                <Button variant="outline" onClick={() => navigate(-1)}>Back</Button>
                <Button variant="ghost" onClick={handlePrint}>Print</Button>
                <Link to="/dashboard/mis/doctor-billing/settings">
                  <Button variant="secondary">Setting</Button>
                </Link>
              </div>

              <div className="text-sm text-slate-500">No of Records: {rows.length}</div>
            </div>

            <div className="mt-6">
              {selectedReport ? (
                <div>
                  <h3 className="text-lg font-medium text-slate-900">{selectedReport.replace(/-/g, ' ')}</h3>
                  <div className="mt-4 text-sm text-slate-600">Sample report viewer (mock data). Use the Setting button to configure columns for reports like Doctor Billing.</div>
                  <div className="mt-4">
                    {rows.length === 0 ? (
                      <div className="text-slate-500">No data loaded. Click Show to fetch mock data for the selected report.</div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full table-auto text-sm border-collapse">
                          <thead>
                            <tr className="bg-slate-50">
                              {(selectedReport === 'doctor-billing' && columnsConfig ? columnsConfig : Object.keys(rows[0]).map((k, i) => ({ columnName: k, caption: k })) ).map((col: any, i: number) => (
                                <th key={i} className="px-3 py-2 text-left border-b">
                                  <button className="font-medium" onClick={() => {
                                    const key = col.columnName;
                                    if (sortBy === key) setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
                                    else { setSortBy(key); setSortDir('asc'); }
                                    // reload
                                    void loadReport({ page: 1 });
                                  }}>{col.caption ?? col.columnName}{sortBy === col.columnName ? (sortDir === 'asc' ? ' ↑' : ' ↓') : ''}</button>
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {rows.map((r, ri) => (
                              <tr key={ri} className="border-t">
                                {(selectedReport === 'doctor-billing' && columnsConfig ? columnsConfig : Object.keys(r).map((k) => ({ columnName: k }))).map((col: any, ci: number) => (
                                  <td key={ci} className="px-3 py-2">{String(r[col.columnName] ?? '')}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                          {/* Footer totals for showTotal columns when using columnsConfig */}
                          {selectedReport === 'doctor-billing' && columnsConfig && (
                            <tfoot>
                              <tr className="bg-slate-50">
                                {columnsConfig.map((col: any, i: number) => (
                                  <td key={i} className="px-3 py-2 font-semibold">
                                    {col.showTotal ? (() => {
                                      const sum = rows.reduce((acc, row) => acc + (Number(row[col.columnName]) || 0), 0);
                                      return sum.toFixed(2);
                                    })() : ''}
                                  </td>
                                ))}
                              </tr>
                            </tfoot>
                          )}
                        </table>
                      </div>
                    )}
                    {rows.length > 0 && (
                      <div className="mt-4 flex items-center gap-3">
                        <Button onClick={handlePrint}>Print</Button>
                        <Button variant="outline" onClick={() => setExportPanelOpen((v) => !v)}>Export CSV</Button>
                        <div>
                          {exportPanelOpen && (
                            <div className="mt-2 rounded border border-slate-200 bg-white p-3 shadow-sm">
                              <div className="text-sm text-slate-600 mb-2">Select columns to export</div>
                              <div className="max-h-40 overflow-y-auto">
                                {columnsForExport.map((c: any) => (
                                  <div key={c.columnName} className="flex items-center gap-2">
                                    <input
                                      type="checkbox"
                                      checked={exportSelection ? exportSelection.includes(c.columnName) : true}
                                      onChange={(e) => {
                                        setExportSelection((prev) => {
                                          const cur = prev ?? columnsForExport.map((col) => col.columnName);
                                          if (e.target.checked) return Array.from(new Set([...cur, c.columnName]));
                                          return cur.filter((x) => x !== c.columnName);
                                        });
                                      }}
                                    />
                                    <label className="text-sm">{c.caption ?? c.columnName}</label>
                                  </div>
                                ))}
                              </div>
                              <div className="mt-3 flex gap-2">
                                <Button onClick={downloadCSV}>Download</Button>
                                <Button variant="outline" onClick={() => setExportPanelOpen(false)}>Cancel</Button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-slate-500">Select a report from the left to preview data.</div>
              )}
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}
