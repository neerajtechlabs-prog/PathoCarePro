import type { ReactNode } from 'react';

interface PlaceholderPageProps {
  title?: string;
  description?: string;
  children?: ReactNode;
}

export default function PlaceholderPage({
  title = 'Coming Soon',
  description = 'This section is under development. The page structure is ready for implementation.',
  children,
}: PlaceholderPageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
        <p className="mt-2 text-sm text-slate-500">{description}</p>
      </div>
      <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm text-slate-700">Use this page as a placeholder while building the feature.</p>
        {children && <div className="mt-6">{children}</div>}
      </div>
    </div>
  );
}
