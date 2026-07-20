import React from 'react';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import type { BookingFormValues } from '../../shared/validation';
import { FormInput, SelectInput } from '../form/FormInput';
import { Card } from '../ui/Card';

interface PatientDetailsFormProps {
  register: UseFormRegister<BookingFormValues>;
  errors: FieldErrors<BookingFormValues>;
}

export const PatientDetailsForm: React.FC<PatientDetailsFormProps> = ({ register, errors }) => {
  return (
    <Card className="p-6 background-red-50">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Patient Information</h3>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-2 grid grid-cols-3 gap-2">
            <SelectInput
              label="Title"
              {...register('patientTitle')}
              options={[
                { value: 'Mr.', label: 'Mr.' },
                { value: 'Ms.', label: 'Ms.' },
                { value: 'Mrs.', label: 'Mrs.' },
                { value: 'Dr.', label: 'Dr.' },
              ]}
              required
              error={errors.patientTitle?.message}
            />

            <FormInput
              label="Patient Name"
              type="text"
              placeholder="Enter name"
              required
              className="col-span-2"
              {...register('patientName')}
              error={errors.patientName?.message}
            />
          </div>

          <FormInput
            label="Mobile"
            type="tel"
            placeholder="10 digit"
            required
            {...register('mobile')}
            error={errors.mobile?.message}
          />

          <FormInput
            label="Email"
            type="email"
            placeholder="Enter email"
            {...register('email')}
            error={errors.email?.message}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-2 grid grid-cols-2 gap-2">
            <FormInput
              label="Age"
              type="number"
              min="0"
              max="150"
              placeholder="Enter age"
              required
              {...register('age', { valueAsNumber: true })}
              error={errors.age?.message}
            />

            <SelectInput
              label="Unit"
              {...register('ageUnit')}
              options={[
                { value: 'Day', label: 'Day' },
                { value: 'Month', label: 'Month' },
                { value: 'Year', label: 'Year' },
              ]}
              required
              error={errors.ageUnit?.message}
            />
          </div>

          <SelectInput
            label="Sex"
            {...register('sex')}
            options={[
              { value: 'Male', label: 'Male' },
              { value: 'Female', label: 'Female' },
              { value: 'Other', label: 'Other' },
            ]}
            required
            error={errors.sex?.message}
          />

          <FormInput
            label="Area"
            type="text"
            placeholder="Enter area"
            {...register('area')}
            error={errors.area?.message}
          />
        </div>
      </div>
    </Card>
  );
};
