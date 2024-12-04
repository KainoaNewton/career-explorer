import React from "react";
import { useFormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const FormFields = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { name } = useFormField();

    return (
      <div ref={ref} className={className} {...props}>
        <Label htmlFor={`${name}-title`}>Title</Label>
        <Input id={`${name}-title`} name={`${name}.title`} required />
        
        <Label htmlFor={`${name}-description`}>Description</Label>
        <Input id={`${name}-description`} name={`${name}.description`} required />
        
        <Label htmlFor={`${name}-tags`}>Tags</Label>
        <Input id={`${name}-tags`} name={`${name}.tags`} />
      </div>
    );
  }
);

FormFields.displayName = "FormFields";

export { FormFields };
