import type { VariantProps } from "class-variance-authority";
import { Field as FieldCN, FieldDescription, FieldError, FieldLabel, fieldVariants } from "./shadcn/field";

type Props = {
  label: string;
  description?: string;
  htmlFor?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
} & React.ComponentProps<"div"> & VariantProps<typeof fieldVariants>;
export const Field = ({error, description, htmlFor, label, children, required, ...props}: Props) => (
  <FieldCN {...props}>
    <FieldLabel htmlFor={htmlFor} className="gap-0">
      {label}
      {required && <span className="text-destructive">*</span>}
    </FieldLabel>

    {children}

    {
      error ?
      (<FieldError>{error}</FieldError>) :
      (description &&<FieldDescription>{description}</FieldDescription>)
    }
  </FieldCN>
)
