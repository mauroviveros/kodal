import { forwardRef, type ReactNode } from "react";
import type { FieldError } from "react-hook-form";

interface InputProps {
  label: string;
  helper?: string;
  error?: FieldError;
}

interface FormFieldProps  extends InputProps {
  labelFor?: string;
  required?: boolean;
  className?: string;
  children?: ReactNode;
}

interface SelectProps extends InputProps {
  items?: { value: string; label: string }[];
}

export const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  ({ className, helper, label, error, children, labelFor, required }, ref) => (
    <div className={`flex flex-col ${className || ''}`} ref={ref}>
      <label htmlFor={labelFor} className="mb-1 text-sm">
        {label}
        {required && <span className="text-primary">*</span>}
      </label>

      {children}

      {helper && <p className="text-muted-foreground text-xs">{helper}</p>}
      {error && <p className="text-destructive-foreground text-xs">{error.message}</p>}
    </div>
  )
);

export const Input = forwardRef<HTMLInputElement, InputProps & React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, helper, label, error, value, ...props }, ref) => (
    <FormField
      label={label}
      labelFor={props.id || props.name}
      required={props.required}
      helper={helper}
      error={error}
      className={className}
    >
      <input
        id={props.id || props.name}
        ref={ref}
        value={props.type === 'file' ? undefined : (value || '')}
        {...props}
      />
    </FormField>
  )
);

export const Select = forwardRef<HTMLSelectElement, SelectProps & React.InputHTMLAttributes<HTMLSelectElement>>(
  ({ className, helper, label, error, items, ...props }, ref) => (
    <FormField
      label={label}
      labelFor={props.id || props.name}
      required={props.required}
      helper={helper}
      error={error}
      className={className}
    >
      <select
        id={props.id || props.name}
        ref={ref}
        {...props}
      >
        {items?.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </FormField>
  )
);
