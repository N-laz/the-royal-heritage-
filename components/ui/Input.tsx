import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

type FieldProps = { label?: string; error?: string; hint?: ReactNode; className?: string };

export function Input({ label, error, hint, className = "", id, ...props }: FieldProps & InputHTMLAttributes<HTMLInputElement>) {
  const fieldId = id ?? props.name;
  return (
    <div className={className}>
      {label && (
        <label htmlFor={fieldId} className="field-label">
          {label}
        </label>
      )}
      <input id={fieldId} {...props} className={`field ${error ? "border-red-400" : ""}`} aria-invalid={!!error} />
      {error ? <p className="field-error">{error}</p> : hint ? <p className="mt-1.5 text-xs text-espresso-50">{hint}</p> : null}
    </div>
  );
}

export function Select({
  label,
  error,
  className = "",
  id,
  children,
  ...props
}: FieldProps & SelectHTMLAttributes<HTMLSelectElement> & { children: ReactNode }) {
  const fieldId = id ?? props.name;
  return (
    <div className={className}>
      {label && (
        <label htmlFor={fieldId} className="field-label">
          {label}
        </label>
      )}
      <select id={fieldId} {...props} className={`field appearance-none bg-[length:12px] bg-[right_1rem_center] bg-no-repeat pr-10 ${error ? "border-red-400" : ""}`}
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' fill='none' stroke='%23A8834B' stroke-width='1.5'/%3E%3C/svg%3E\")" }}>
        {children}
      </select>
      {error && <p className="field-error">{error}</p>}
    </div>
  );
}

export function Textarea({ label, error, className = "", id, ...props }: FieldProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const fieldId = id ?? props.name;
  return (
    <div className={className}>
      {label && (
        <label htmlFor={fieldId} className="field-label">
          {label}
        </label>
      )}
      <textarea id={fieldId} rows={4} {...props} className={`field resize-none ${error ? "border-red-400" : ""}`} />
      {error && <p className="field-error">{error}</p>}
    </div>
  );
}
