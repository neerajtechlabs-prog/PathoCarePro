import React from 'react';
import { Trash2, Plus } from 'lucide-react';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import type { BookingFormValues } from '../../shared/validation';
import { FormInput, SelectInput } from '../form/FormInput';
import { Button } from '../ui/Button';

interface TestTableProps {
  fields: Array<{ id: string }>;
  register: UseFormRegister<BookingFormValues>;
  errors: FieldErrors<BookingFormValues>;
  testOptions: Array<{ value: string; label: string; rate: number; backendId?: string; code?: string }>;
  watchedTests: BookingFormValues['tests'];
  onAddRow: () => void;
  onTestChange: (index: number, testValue: string) => void;
  onDeleteRow: (index: number) => void;
}

export const TestTable: React.FC<TestTableProps> = ({
  fields,
  register,
  errors,
  testOptions,
  watchedTests,
  onAddRow,
  onTestChange,
  onDeleteRow,
}) => {
  const tableError = errors.tests?.message;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Test Selection</h3>
          {tableError && <p className="text-sm text-red-600 mt-1">{tableError}</p>}
        </div>
      </div>

      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 w-12">SNo</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Code</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 flex-1">Test Name</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 w-24">Report Days</th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700 w-24">Rate (₹)</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 w-12">Action</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((field, index) => {
              const row = watchedTests[index] ?? { code: '', test: '', reportDays: 0, rate: 0 };
              const testError = errors.tests?.[index]?.test?.message;

              return (
                <tr key={field.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-sm text-gray-600">{index + 1}</td>
                  <td className="px-4 py-3">
                    <FormInput value={row.code || ''} readOnly disabled className="text-sm bg-gray-100" />
                  </td>
                  <td className="px-4 py-3">
                    <SelectInput
                      value={row.test || ''}
                      onChange={(e) => onTestChange(index, e.target.value)}
                      options={testOptions}
                      placeholder="Select test"
                      className="text-sm"
                      error={testError}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <FormInput type="number" value={row.reportDays ?? 0} readOnly disabled className="text-sm bg-gray-100" />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="text-sm font-medium text-gray-900">₹ {(row.rate ?? 0).toFixed(2)}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      type="button"
                      onClick={() => onDeleteRow(index)}
                      className="inline-flex items-center justify-center p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                      title="Delete test"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              );
            })}

            {fields.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center">
                  <p className="text-gray-500 text-sm">No tests added. Click "Add Test" to add one.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex gap-2">
        <Button type="button" onClick={onAddRow} variant="outline" className="gap-2">
          <Plus size={18} /> Add Test
        </Button>
      </div>
    </div>
  );
};
