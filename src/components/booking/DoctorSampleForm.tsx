import React from 'react';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import type { BookingFormValues } from '../../shared/validation';
import { FormInput, SelectInput, FormCheckbox } from '../form/FormInput';
import { Card } from '../ui/Card';

interface DoctorSampleFormProps {
  register: UseFormRegister<BookingFormValues>;
  errors: FieldErrors<BookingFormValues>;
  doctors: Array<{ value: string; label: string }>;
  sampleTypes: Array<{ value: string; label: string }>;
  panels: Array<{ value: string; label: string }>;
}

export const DoctorSampleForm: React.FC<DoctorSampleFormProps> = ({
  register,
  errors,
  doctors,
  sampleTypes,
  panels,
}) => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Doctor & Sample Details
      </h3>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SelectInput
            label="Doctor"
            {...register('doctor')}
            options={doctors}
            required
            error={errors.doctor?.message}
          />

          <SelectInput
            label="Dr. Type"
            {...register('doctorType')}
            options={[
              { value: 'GP', label: 'General Practitioner' },
              { value: 'Specialist', label: 'Specialist' },
              { value: 'Surgeon', label: 'Surgeon' },
            ]}
            error={errors.doctorType?.message}
          />

          <SelectInput
            label="Booking Type"
            {...register('bookingType')}
            options={[
              { value: 'H', label: 'Home' },
              { value: 'L', label: 'Lab' },
              { value: 'C', label: 'Corporate' },
            ]}
            error={errors.bookingType?.message}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SelectInput
            label="Sample Type"
            {...register('sample')}
            options={sampleTypes}
            required
            error={errors.sample?.message}
          />

          <FormInput
            label="Taken By"
            type="text"
            placeholder="Technician/Staff name"
            {...register('takenBy')}
            error={errors.takenBy?.message}
          />

          <FormInput
            label="File No"
            type="text"
            placeholder="Enter file number"
            {...register('fileNo')}
            error={errors.fileNo?.message}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SelectInput
            label="Panel"
            {...register('panel')}
            options={panels}
            error={errors.panel?.message}
          />

          <SelectInput
            label="User Rate"
            {...register('userRate')}
            options={[
              { value: 'standard', label: 'Standard' },
              { value: 'employee', label: 'Employee' },
              { value: 'student', label: 'Student' },
              { value: 'corporate', label: 'Corporate' },
            ]}
            error={errors.userRate?.message}
          />

          <SelectInput
            label="Result Type"
            {...register('resultType')}
            options={[
              { value: 'Normal', label: 'Normal' },
              { value: 'Abnormal', label: 'Abnormal' },
              { value: 'Pending', label: 'Pending' },
            ]}
            error={errors.resultType?.message}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormInput
            label="Doctor Email (Optional)"
            type="email"
            placeholder="doctor@example.com"
            {...register('doctorEmail')}
            error={errors.doctorEmail?.message}
          />
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="text-sm font-semibold text-gray-900 mb-4">Options</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormCheckbox label="Move All Columns" {...register('moveAllColumns')} />
          <FormCheckbox label="Booking + Result" {...register('bookingPlusResult')} />
          <FormCheckbox label="Booking + Receipt" {...register('bookingPlusReceipt')} />
          <FormCheckbox label="Print Working Slip" {...register('printWorkingSlip')} />
        </div>
      </div>
    </Card>
  );
};
