import React, { useEffect } from 'react';
import type { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import type { BookingFormValues } from '../../shared/validation';
import { FormInput, SelectInput } from '../form/FormInput';
import { Card } from '../ui/Card';

interface BillingSectionProps {
  register: UseFormRegister<BookingFormValues>;
  errors: FieldErrors<BookingFormValues>;
  watch: UseFormWatch<BookingFormValues>;
  setValue: UseFormSetValue<BookingFormValues>;
  paymentOptions: Array<{ value: string; label: string }>;
}

export const BillingSection: React.FC<BillingSectionProps> = ({
  register,
  errors,
  watch,
  setValue,
  paymentOptions,
}) => {
  const total = Number(watch('total') ?? 0);
  const discountPercent = Number(watch('discountPercent') ?? 0);
  const net = Number(watch('net') ?? 0);
  const paid = Number(watch('paid') ?? 0);

  useEffect(() => {
    const discountAmount = (total * discountPercent) / 100;
    const calculatedNet = total - discountAmount;

    setValue('amount', total, { shouldDirty: true, shouldValidate: true });
    setValue('discount', discountAmount, { shouldDirty: true, shouldValidate: true });
    setValue('net', calculatedNet, { shouldDirty: true, shouldValidate: true });
  }, [total, discountPercent, setValue]);

  const handleDiscountPercentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const percent = parseFloat(e.target.value) || 0;
    setValue('discountPercent', percent, { shouldDirty: true, shouldValidate: true });
  };

  const handlePaidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const paidAmount = parseFloat(e.target.value) || 0;
    setValue('paid', paidAmount, { shouldDirty: true, shouldValidate: true });
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Billing Information</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <SelectInput
            label="Extra By"
            {...register('extraBy')}
            options={[
              { value: 'none', label: 'None' },
              { value: 'doctor', label: 'Doctor' },
              { value: 'staff', label: 'Staff' },
            ]}
            error={errors.extraBy?.message}
          />

          <SelectInput
            label="Discount By"
            {...register('discountBy')}
            options={[
              { value: 'none', label: 'None' },
              { value: 'percentage', label: 'Percentage' },
              { value: 'fixed', label: 'Fixed Amount' },
            ]}
            error={errors.discountBy?.message}
          />

          <SelectInput
            label="Payment Type"
            {...register('payType')}
            options={paymentOptions}
            required
            error={errors.payType?.message}
          />
        </div>

        <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)</label>
            <div className="text-2xl font-bold text-gray-900">₹ {Number(total || 0).toFixed(2)}</div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              step="0.01"
              value={discountPercent}
              onChange={handleDiscountPercentChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Discount Amount (₹)</label>
            <div className="text-lg font-semibold text-blue-600">- ₹ {((total * discountPercent) / 100).toFixed(2)}</div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Net Total (₹)</label>
            <div className="text-2xl font-bold text-gray-900 text-right">₹ {net.toFixed(2)}</div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="Paid Amount (₹)"
          type="number"
          min="0"
          step="0.01"
          placeholder="Enter paid amount"
          {...register('paid', { valueAsNumber: true })}
          onChange={handlePaidChange}
          error={errors.paid?.message}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Balance (₹)</label>
          <div
            className={`px-3 py-2 text-lg font-semibold rounded-lg border-2 ${
              net - paid === 0
                ? 'border-green-500 bg-green-50 text-green-900'
                : net - paid > 0
                ? 'border-orange-500 bg-orange-50 text-orange-900'
                : 'border-red-500 bg-red-50 text-red-900'
            }`}
          >
            ₹ {(net - paid).toFixed(2)}
          </div>
        </div>
      </div>
    </Card>
  );
};
