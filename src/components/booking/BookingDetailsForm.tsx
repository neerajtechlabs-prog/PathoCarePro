import React from 'react';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import type { BookingFormValues } from '../../shared/validation';
import { FormInput, SelectInput } from '../form/FormInput';
import { Card } from '../ui/Card';

interface BookingDetailsFormProps {
  register: UseFormRegister<BookingFormValues>;
  errors: FieldErrors<BookingFormValues>;
  centres: Array<{ value: string; label: string }>;
}

export const BookingDetailsForm: React.FC<BookingDetailsFormProps> = ({
  register,
  errors,
  centres,
}) => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Booking Information</h3>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SelectInput
            label="Centre"
            {...register('centre')}
            options={centres}
            required
            error={errors.centre?.message}
          />

          <FormInput
            label="Barcode"
            type="text"
            placeholder="Scan barcode"
            {...register('barcode')}
            error={errors.barcode?.message}
          />

          <FormInput
            label="Date"
            type="date"
            required
            {...register('date')}
            error={errors.date?.message}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormInput
            label="Registration No"
            type="text"
            placeholder="Enter reg number"
            required
            {...register('regNo')}
            error={errors.regNo?.message}
          />

          <FormInput
            label="Record No"
            type="text"
            placeholder="Enter record number"
            {...register('recordNo')}
            error={errors.recordNo?.message}
          />

          <FormInput
            label="Time"
            type="time"
            {...register('time')}
            error={errors.time?.message}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormInput
            label="UID"
            type="text"
            placeholder="Enter UID"
            {...register('uid')}
            error={errors.uid?.message}
          />
        </div>
      </div>
    </Card>
  );
};
