import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { bookingFormSchema, type BookingFormValues } from '../../shared/validation';
import { resetBookingForm, type BookingFormData } from '../../features/bookings/bookingSlice';
import { BookingDetailsForm } from './BookingDetailsForm';
import { PatientDetailsForm } from './PatientDetailsForm';
import { DoctorSampleForm } from './DoctorSampleForm';
import { TestTable } from './TestTable';
import { BillingSection } from './BillingSection';
import { ActionButtons } from './ActionButtons';
import { bookingService } from '../../services/bookingService';
import { Card } from '../ui/Card';
import { FormTextArea } from '../form/FormInput';

interface BookingFormProps {
  bookingId?: string;
  mode?: 'create' | 'edit' | 'view';
}

const MOCK_CENTRES = [
  { value: 'MAIN', label: 'SAI PATHOLOGY LAB - MAIN' },
  { value: 'BRANCH1', label: 'SAI PATHOLOGY LAB - BRANCH 1' },
  { value: 'BRANCH2', label: 'SAI PATHOLOGY LAB - BRANCH 2' },
];

const MOCK_DOCTORS = [
  { value: 'DR001', label: 'Dr. Sharma' },
  { value: 'DR002', label: 'Dr. Patel' },
  { value: 'DR003', label: 'Dr. Gupta' },
];

const MOCK_SAMPLE_TYPES = [
  { value: 'BLOOD', label: 'Blood' },
  { value: 'URINE', label: 'Urine' },
  { value: 'STOOL', label: 'Stool' },
  { value: 'SALIVA', label: 'Saliva' },
];

const MOCK_PANELS = [
  { value: 'BP001', label: 'Basic Health Panel' },
  { value: 'BP002', label: 'Comprehensive Panel' },
  { value: 'BP003', label: 'Thyroid Panel' },
];

const MOCK_TESTS = [
  { value: 'PATH', label: 'Pathology', rate: 500, reportDays: 1 },
  { value: 'US', label: 'Ultrasound', rate: 1000, reportDays: 0 },
  { value: 'CBC', label: 'Complete Blood Count', rate: 250, reportDays: 1 },
];

const MOCK_PAYMENT_OPTIONS = [
  { value: 'Cash', label: 'Cash' },
  { value: 'Card', label: 'Debit/Credit Card' },
  { value: 'UPI', label: 'UPI' },
];

const getMockPrefillValues = (): BookingFormValues => ({
  centre: 'MAIN',
  regNo: 'REG-1001',
  barcode: 'BC-1001',
  date: new Date().toISOString().slice(0, 10),
  time: '10:30',
  recordNo: 'REC-001',
  uid: 'UID-001',
  patientName: 'Aarav Sharma',
  patientTitle: 'Mr.',
  age: 32,
  ageUnit: 'Year',
  sex: 'Male',
  mobile: '9876543210',
  email: 'aarav@example.com',
  area: 'Sector 15, Noida',
  doctor: 'DR001',
  doctorEmail: 'drsharma@example.com',
  doctorType: 'Consultant',
  bookingType: 'Routine',
  sample: 'BLOOD',
  takenBy: 'Lab Tech 1',
  panel: 'BP001',
  fileNo: 'FILE-001',
  userRate: 'standard',
  resultType: 'Normal',
  tests: [
    {
      id: 'mock-test-1',
      backendId: 'public-1',
      code: 'CBC',
      test: 'Complete Blood Count',
      reportDays: 1,
      rate: 250,
    },
  ],
  moveAllColumns: false,
  bookingPlusResult: true,
  bookingPlusReceipt: false,
  printWorkingSlip: true,
  extraBy: 'Self',
  discountBy: 'Patient',
  payType: 'Cash',
  amount: 250,
  discount: 0,
  discountPercent: 0,
  total: 250,
  net: 250,
  paid: 250,
  cancelRemark: 'Demo booking prefilled from mock values',
});

export const BookingFormContainer: React.FC<BookingFormProps> = ({ bookingId, mode = 'create' }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const bookingData = useAppSelector((state) => state.bookings || {});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [testOptions, setTestOptions] = useState<Array<{ value: string; label: string; rate: number; backendId?: string; code?: string }>>([]);

  const defaultValues = mode === 'create'
    ? getMockPrefillValues()
    : (bookingData as BookingFormValues);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues,
  });

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: 'tests',
  });

  useEffect(() => {
    if (mode === 'create') {
      const mockValues = getMockPrefillValues();
      reset(mockValues);
      replace(mockValues.tests);
      setValue('total', mockValues.total, { shouldValidate: true, shouldDirty: true });
      setValue('net', mockValues.net, { shouldValidate: true, shouldDirty: true });
      setValue('amount', mockValues.amount, { shouldValidate: true, shouldDirty: true });
      setValue('discount', mockValues.discount, { shouldValidate: true, shouldDirty: true });
      return;
    }

    reset(bookingData as BookingFormValues);
  }, [bookingData, mode, replace, reset, setValue]);

  useEffect(() => {
    let mounted = true;

    const loadTests = async () => {
      try {
        const response = await bookingService.getTests();
        if (!mounted) return;

        const options = Array.isArray(response)
          ? response.map((item: any) => ({
              value: item?.value || item?.code || item?.id,
              label: item?.label || item?.name || item?.testName || item?.code || 'Unnamed Test',
              rate: Number(item?.rate ?? 0),
              backendId: item?.backendId || item?.id || item?.uuid || item?.testId,
              code: item?.code || item?.value || item?.id,
            }))
          : [];

        setTestOptions(options.length ? options : MOCK_TESTS.map((test) => ({ value: test.value, label: test.label, rate: test.rate })));
      } catch (err) {
        console.error('Failed to load test options', err);
        if (mounted) {
          setTestOptions(MOCK_TESTS.map((test) => ({ value: test.value, label: test.label, rate: test.rate })));
        }
      }
    };

    loadTests();

    return () => {
      mounted = false;
    };
  }, []);

  const watchedTests = watch('tests') ?? [];
  const watchedTotal = Number(watch('total') ?? 0);
  const watchedDiscountPercent = Number(watch('discountPercent') ?? 0);

  useEffect(() => {
    const discountAmount = (watchedTotal * watchedDiscountPercent) / 100;
    setValue('amount', watchedTotal, { shouldDirty: true, shouldValidate: true });
    setValue('discount', discountAmount, { shouldDirty: true, shouldValidate: true });
    setValue('net', watchedTotal - discountAmount, { shouldDirty: true, shouldValidate: true });
  }, [watchedTotal, watchedDiscountPercent, setValue]);

  const onSubmit = async (values: BookingFormValues) => {
    console.log("BookingFormValue",values)
    try {
      setIsLoading(true);
      setError(null);

      if (mode === 'create') {
        await bookingService.createBooking(values as unknown as BookingFormData);
        setSuccess(true);
        dispatch(resetBookingForm());
        setTimeout(() => navigate('/bookings'), 2000);
      } else if (mode === 'edit' && bookingId) {
        await bookingService.updateBooking(bookingId, values as unknown as BookingFormData);
        setSuccess(true);
        setTimeout(() => navigate(`/bookings/${bookingId}`), 2000);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while saving the booking');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTestRow = () => {
    const newRow = {
      id: `test-${Date.now()}`,
      code: '',
      test: '',
      reportDays: 0,
      rate: 0,
    };
    const nextTests = [...(watchedTests || []), newRow];
    setValue('tests', nextTests, { shouldValidate: true, shouldDirty: true });
    append(newRow);
  };

  const handleTestChange = (index: number, testValue: string) => {
    const selectedTest = testOptions.find((t) => t.value === testValue);
    if (!selectedTest) return;

    const updatedTests = [...(watchedTests || [])];
    updatedTests[index] = {
      ...updatedTests[index],
      backendId: selectedTest.backendId,
      test: selectedTest.label,
      code: selectedTest.code || selectedTest.value,
      rate: selectedTest.rate,
      reportDays: selectedTest.rate > 0 ? 1 : 0,
    };

    setValue('tests', updatedTests, { shouldValidate: true, shouldDirty: true });
    setValue('total', updatedTests.reduce((sum, row) => sum + (row.rate || 0), 0), { shouldValidate: true, shouldDirty: true });
  };

  const handleDeleteTestRow = (index: number) => {
    const updatedTests = (watchedTests || []).filter((_, i) => i !== index);
    setValue('tests', updatedTests, { shouldValidate: true, shouldDirty: true });
    setValue('total', updatedTests.reduce((sum, row) => sum + (row.rate || 0), 0), { shouldValidate: true, shouldDirty: true });
    remove(index);
  };

  const handleRefresh = () => {
    dispatch(resetBookingForm());
    reset(bookingData as BookingFormValues);
    setError(null);
    setSuccess(false);
  };

  const handleDelete = async () => {
    if (bookingId && window.confirm('Are you sure you want to delete this booking?')) {
      try {
        setIsLoading(true);
        await bookingService.deleteBooking(bookingId);
        navigate('/bookings');
      } catch (err: any) {
        setError(err.message || 'Failed to delete booking');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handlePrint = async () => {
    try {
      setIsLoading(true);
      if (bookingId) {
        const blob = await bookingService.printBooking(bookingId);
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      } else {
        alert('Please save the booking first before printing');
      }
    } catch (err) {
      setError('Failed to print booking');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExit = () => {
    if (window.confirm('Are you sure you want to exit? Any unsaved changes will be lost.')) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">SAI PATHOLOGY LAB</h1>
          <p className="text-gray-600 mt-2">
            {mode === 'create' && 'Create New Booking'}
            {mode === 'edit' && 'Edit Booking'}
            {mode === 'view' && 'View Booking'}
          </p>
        </div>

        {error && (
          <Card className="mb-6 p-4 bg-red-50 border-red-200">
            <p className="text-red-700">{error}</p>
          </Card>
        )}

        {success && (
          <Card className="mb-6 p-4 bg-green-50 border-green-200">
            <p className="text-green-700">Booking {mode === 'create' ? 'created' : 'updated'} successfully!</p>
          </Card>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <BookingDetailsForm register={register} errors={errors} centres={MOCK_CENTRES} />

          <PatientDetailsForm register={register} errors={errors} />

          <DoctorSampleForm register={register} errors={errors} doctors={MOCK_DOCTORS} sampleTypes={MOCK_SAMPLE_TYPES} panels={MOCK_PANELS} />

          <TestTable
            fields={fields}
            register={register}
            errors={errors}
            testOptions={testOptions}
            watchedTests={watchedTests}
            onAddRow={handleAddTestRow}
            onTestChange={handleTestChange}
            onDeleteRow={handleDeleteTestRow}
          />

          <BillingSection register={register} errors={errors} watch={watch} setValue={setValue} paymentOptions={MOCK_PAYMENT_OPTIONS} />

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
            <FormTextArea
              label="Cancel Remark / Notes"
              {...register('cancelRemark')}
              placeholder="Add any remarks or notes"
              rows={4}
              error={errors.cancelRemark?.message}
            />
          </Card>

          <Card className="p-6">
            <ActionButtons
              onSave={handleSubmit(onSubmit)}
              onDelete={mode === 'edit' ? handleDelete : undefined}
              onPrint={mode === 'view' || mode === 'edit' ? handlePrint : undefined}
              onRefresh={handleRefresh}
              onExit={handleExit}
              isLoading={isLoading || isSubmitting}
              isEditing={mode === 'edit'}
            />
          </Card>
        </form>
      </div>
    </div>
  );
};

export default BookingFormContainer;
