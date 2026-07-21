import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const signupSchema = z.object({
  // Organization / Lab details
  labName: z.string().min(2, 'Pathology / Lab name is required'),
  labCode: z.string().optional(),
  registrationNumber: z.string().min(2, 'Registration number is required'),
  gstNumber: z.string().optional(),

  // Admin information
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  mobileNumber: z.string().regex(/^(?:\+\d{1,3}[- ]?)?\d{10}$/, 'Invalid mobile number'),
  designation: z.enum(['Owner', 'Administrator', 'Lab Director', 'Manager']),

  // Login credentials
  username: z.string().min(2, 'Username is required'),
  password: z.string().min(8, 'Password must be at least 8 characters').regex(/(?=.*[a-z])/, 'Must contain a lowercase letter').regex(/(?=.*[A-Z])/, 'Must contain an uppercase letter').regex(/(?=.*\d)/, 'Must contain a number').regex(/(?=.*[^A-Za-z0-9])/, 'Must contain a special character'),
  confirmPassword: z.string().min(8, 'Confirm password is required'),

  // Address
  country: z.string().min(2, 'Country is required'),
  state: z.string().min(1, 'State is required'),
  city: z.string().min(1, 'City is required'),
  pinCode: z.string().regex(/^[0-9]{4,6}$/, 'Pin code must be 4-6 digits'),
  completeAddress: z.string().min(5, 'Complete address is required'),

  // Subscription
  plan: z.enum(['Starter', 'Professional', 'Enterprise']).optional(),

  // Security / consents
  terms: z.boolean().refine((v) => v === true, { message: 'You must accept Terms & Conditions' }),
  privacy: z.boolean().refine((v) => v === true, { message: 'You must accept the Privacy Policy' }),
}).refine((data) => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: 'Passwords must match',
});

export const patientSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  age: z.coerce.number().min(0).max(120),
  gender: z.enum(['Male', 'Female', 'Other']),
  mobile: z.string().regex(/^[0-9]{10}$/, 'Invalid mobile number (10 digits required)'),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  doctor: z.string().min(2, 'Doctor name is required'),
  area: z.string().optional(),
});

export const testRowSchema = z.object({
  id: z.string(),
  code: z.string().min(1, 'Test code is required'),
  name: z.string().min(1, 'Test name is required'),
  department: z.string().min(1, 'Department is required'),
  reportDays: z.number().min(1, 'Report days must be at least 1'),
  rate: z.number().min(0, 'Rate must be non-negative'),
});

export const bookingFormSchema = z.object({
  centre: z.string().min(1, 'Centre is required'),
  regNo: z.string().min(1, 'Registration number is required'),
  barcode: z.string().optional(),
  date: z.string().min(1, 'Date is required'),
  time: z.string().optional(),
  recordNo: z.string().optional(),
  uid: z.string().optional(),
  patientName: z.string().min(2, 'Patient name must be at least 2 characters'),
  patientTitle: z.string().min(1, 'Patient title is required'),
  age: z.number().min(0, 'Age must be non-negative').max(150, 'Invalid age'),
  ageUnit: z.enum(['Year', 'Month', 'Day']),
  sex: z.enum(['Male', 'Female', 'Other']),
  mobile: z.string().regex(/^[0-9]{10}$/, 'Mobile number must be 10 digits'),
  email: z.string().email('Invalid email address').optional().or(z.string().length(0)),
  area: z.string().optional(),
  doctor: z.string().min(1, 'Doctor is required'),
  doctorEmail: z.string().email('Invalid email').optional().or(z.string().length(0)),
  doctorType: z.string().optional(),
  bookingType: z.string().optional(),
  sample: z.string().min(1, 'Sample type is required'),
  takenBy: z.string().optional(),
  panel: z.string().optional(),
  fileNo: z.string().optional(),
  userRate: z.string().optional(),
  resultType: z.string().optional(),
  tests: z.array(testRowSchema).min(1, 'At least one test must be selected'),
  moveAllColumns: z.boolean().default(false),
  bookingPlusResult: z.boolean().default(false),
  bookingPlusReceipt: z.boolean().default(false),
  printWorkingSlip: z.boolean().default(false),
  extraBy: z.string().optional(),
  discountBy: z.string().optional(),
  payType: z.string().min(1, 'Payment type is required'),
  amount: z.number().min(0, 'Amount must be non-negative'),
  discount: z.number().min(0, 'Discount must be non-negative'),
  discountPercent: z.number().min(0).max(100),
  total: z.number().min(0),
  net: z.number().min(0),
  paid: z.number().min(0),
  cancelRemark: z.string().optional(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type SignupFormValues = z.infer<typeof signupSchema>;
export type PatientFormValues = z.infer<typeof patientSchema>;
export type BookingFormValues = z.infer<typeof bookingFormSchema>;
