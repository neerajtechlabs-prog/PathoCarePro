export type FetchOptions = {
  page?: number;
  pageSize?: number;
  sortBy?: string | null;
  sortDir?: 'asc' | 'desc' | null;
  from?: string;
  to?: string;
};

export async function fetchReport(reportKey: string, opts: FetchOptions = {}) {
  // Simulate network latency
  await new Promise((r) => setTimeout(r, 200));

  // Provide mock data per report type; structure is Row[]
  if (reportKey === 'doctor-billing') {
    const rows = [
      { BookingID: 'B1001', Dated: '2026-05-22', RegNo: '1006', RecordNo: 'R2026-01', PatientID: 'P1006', UID: 'UID-3245', Patient: 'Sunita Patel', TotalAmount: 4500, TDiscount: 0, TPaid: 2000, DrCUT: 300, DoctorID: 'D12', Doctor: 'Dr. Sharma', TestIDs: 'T1,T2', TestInitials: 'Hb,Gl' },
      { BookingID: 'B1002', Dated: '2026-05-22', RegNo: '1007', RecordNo: 'R2026-02', PatientID: 'P1007', UID: 'UID-3246', Patient: 'Rajesh Kumar', TotalAmount: 3200, TDiscount: 100, TPaid: 2200, DrCUT: 200, DoctorID: 'D15', Doctor: 'Dr. Mehta', TestIDs: 'T3', TestInitials: 'Ch' },
      { BookingID: 'B1003', Dated: '2026-05-22', RegNo: '1008', RecordNo: 'R2026-03', PatientID: 'P1008', UID: 'UID-3247', Patient: 'Meena Shah', TotalAmount: 1500, TDiscount: 0, TPaid: 1500, DrCUT: 150, DoctorID: 'D12', Doctor: 'Dr. Sharma', TestIDs: 'T4', TestInitials: 'PS' },
    ];

    // Apply sorting
    let sorted = [...rows];
    if (opts.sortBy) {
      sorted.sort((a: any, b: any) => {
        const av = a[opts.sortBy as string];
        const bv = b[opts.sortBy as string];
        if (av == null) return 1;
        if (bv == null) return -1;
        if (typeof av === 'number' && typeof bv === 'number') return (av - bv) * (opts.sortDir === 'desc' ? -1 : 1);
        return String(av).localeCompare(String(bv)) * (opts.sortDir === 'desc' ? -1 : 1);
      });
    }

    const page = opts.page || 1;
    const pageSize = opts.pageSize || 25;
    const total = sorted.length;
    const paged = sorted.slice((page - 1) * pageSize, page * pageSize);

    return { rows: paged, total };
  }

  if (reportKey === 'day-collection') {
    const rows = [
      { Dept: 'Hematology', Collected: 12500 },
      { Dept: 'Biochemistry', Collected: 8400 },
      { Dept: 'Microbiology', Collected: 4300 },
    ];
    return { rows, total: rows.length };
  }

  // Default: empty
  return { rows: [], total: 0 };
}
