import { useState } from 'react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';

export default function UtilityCalculatorPage() {
  const [first, setFirst] = useState('');
  const [second, setSecond] = useState('');
  const [result, setResult] = useState<string>('');

  const compute = (operation: 'add' | 'subtract' | 'multiply' | 'divide') => {
    const a = Number(first);
    const b = Number(second);
    if (Number.isNaN(a) || Number.isNaN(b)) {
      setResult('Enter valid numbers');
      return;
    }

    let value: number;
    switch (operation) {
      case 'add':
        value = a + b;
        break;
      case 'subtract':
        value = a - b;
        break;
      case 'multiply':
        value = a * b;
        break;
      case 'divide':
        value = b === 0 ? NaN : a / b;
        break;
    }
    setResult(Number.isNaN(value) ? 'Invalid calculation' : value.toString());
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">Utility Calculator</h2>
        <p className="mt-2 text-sm text-slate-500">Quick reconciliation and adjustment calculations for admin use before deletion or financial decisions.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
        <Card title="Calculator">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-700">
              First value
              <input
                type="number"
                value={first}
                onChange={(event) => setFirst(event.target.value)}
                className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-indigo-500"
              />
            </label>
            <label className="block text-sm font-medium text-slate-700">
              Second value
              <input
                type="number"
                value={second}
                onChange={(event) => setSecond(event.target.value)}
                className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-indigo-500"
              />
            </label>
            <div className="flex flex-wrap gap-3">
              <Button type="button" onClick={() => compute('add')}>
                Add
              </Button>
              <Button type="button" onClick={() => compute('subtract')}>
                Subtract
              </Button>
              <Button type="button" onClick={() => compute('multiply')}>
                Multiply
              </Button>
              <Button type="button" onClick={() => compute('divide')}>
                Divide
              </Button>
            </div>
          </div>
        </Card>

        <Card title="Result" subtitle="Calculation output">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-slate-700">
            <p className="text-sm">{result || 'Enter values and choose an operation.'}</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
