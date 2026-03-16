import { FieldDescription, FieldError, FieldLabel } from "../shadcn/field";

interface Props {
  label: string;
  description?: string;
  htmlFor?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}
export const FormField = ({error, description, htmlFor, label, children, required}: Props) => (
  <>
    <FieldLabel htmlFor={htmlFor} className="gap-0">
      {label}
      {required && <span className="text-destructive">*</span>}
    </FieldLabel>

    {children}

    {
      error ?
      (<FieldError>{error}</FieldError>) :
      (<FieldDescription>{description}</FieldDescription>)
    }
  </>
)
