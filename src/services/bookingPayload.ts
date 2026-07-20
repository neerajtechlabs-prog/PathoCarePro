import type { BookingFormData } from '../features/bookings/bookingSlice';

export interface BookingCreatePayload {
  patientId: string;
  doctorId?: string;
  testIds?: string[];
  preferredDate?: string;
  notes?: string;
  email?: string;
  phone?: string;
  paymentMode?: string;
  amount?: number;
  centre?: string;
  regNo?: string;
  barcode?: string;
  time?: string;
  recordNo?: string;
  uid?: string;
  patientName?: string;
  patientTitle?: string;
  age?: number;
  ageUnit?: string;
  sex?: string;
  mobile?: string;
  area?: string;
  doctor?: string;
  doctorEmail?: string;
  doctorType?: string;
  bookingType?: string;
  sample?: string;
  takenBy?: string;
  panel?: string;
  fileNo?: string;
  userRate?: string;
  resultType?: string;
  tests?: Array<{
    id?: string;
    backendId?: string;
    code?: string;
    test?: string;
    reportDays?: number;
    rate?: number;
  }>;
  moveAllColumns?: boolean;
  bookingPlusResult?: boolean;
  bookingPlusReceipt?: boolean;
  printWorkingSlip?: boolean;
  extraBy?: string;
  discountBy?: string;
  payType?: string;
  discount?: number;
  discountPercent?: number;
  total?: number;
  net?: number;
  paid?: number;
  cancelRemark?: string;
}

const normalizePaymentMode = (payType?: string) => {
  const normalized = (payType || '').toLowerCase();

  switch (normalized) {
    case 'cash':
      return 'CASH';
    case 'card':
    case 'debit/credit card':
      return 'CARD';
    case 'upi':
      return 'UPI';
    case 'cheque':
      return 'CHEQUE';
    case 'online':
    case 'online transfer':
      return 'ONLINE';
    default:
      return (payType || '').toUpperCase();
  }
};

export const buildBookingCreatePayload = (
  bookingData: BookingFormData,
  patientId = '',
): BookingCreatePayload => ({
  patientId,
  testIds: bookingData.tests
    .map((test) => test.backendId || test.id)
    .filter((value): value is string => Boolean(value)),
  preferredDate: bookingData.date || undefined,
  notes: bookingData.cancelRemark || undefined,
  email: bookingData.email || undefined,
  phone: bookingData.mobile || undefined,
  paymentMode: normalizePaymentMode(bookingData.payType),
  amount: Number(bookingData.net || bookingData.total || bookingData.amount || 0),
  centre: bookingData.centre,
  regNo: bookingData.regNo,
  barcode: bookingData.barcode,
  time: bookingData.time,
  recordNo: bookingData.recordNo,
  uid: bookingData.uid,
  patientName: bookingData.patientName,
  patientTitle: bookingData.patientTitle,
  age: bookingData.age,
  ageUnit: bookingData.ageUnit,
  sex: bookingData.sex,
  mobile: bookingData.mobile,
  area: bookingData.area,
  doctor: bookingData.doctor,
  doctorEmail: bookingData.doctorEmail,
  doctorType: bookingData.doctorType,
  bookingType: bookingData.bookingType,
  sample: bookingData.sample,
  takenBy: bookingData.takenBy,
  panel: bookingData.panel,
  fileNo: bookingData.fileNo,
  userRate: bookingData.userRate,
  resultType: bookingData.resultType,
  tests: bookingData.tests.map((test) => ({
    id: test.id,
    backendId: test.backendId,
    code: test.code,
    test: test.test,
    reportDays: test.reportDays,
    rate: test.rate,
  })),
  moveAllColumns: bookingData.moveAllColumns,
  bookingPlusResult: bookingData.bookingPlusResult,
  bookingPlusReceipt: bookingData.bookingPlusReceipt,
  printWorkingSlip: bookingData.printWorkingSlip,
  extraBy: bookingData.extraBy,
  discountBy: bookingData.discountBy,
  payType: bookingData.payType,
  discount: bookingData.discount,
  discountPercent: bookingData.discountPercent,
  total: bookingData.total,
  net: bookingData.net,
  paid: bookingData.paid,
  cancelRemark: bookingData.cancelRemark,
});
