import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";

const careerSchema = z.object({
  title: z.string().min(1, "Title is required"),
  category: z.string().min(1, "Category is required"),
  yearsOfEducation: z.string().min(1, "Years of education is required"),
  description: z.string().min(1, "Description is required"),
  salaryMin: z.string().optional(),
  salaryMax: z.string().optional(),
});

type FormFieldsProps = {
  form: UseFormReturn<z.infer<typeof careerSchema>>;
};

export function FormFields({ form }: FormFieldsProps) {
  return (
    <>
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">Title</FormLabel>
            <FormControl>
              <Input placeholder="e.g. Software Engineer" className="bg-spotify-black text-white border-spotify-lightgray" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="category"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">Category</FormLabel>
            <FormControl>
              <Input placeholder="e.g. Technology" className="bg-spotify-black text-white border-spotify-lightgray" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="yearsOfEducation"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">Years of Education</FormLabel>
            <FormControl>
              <Input type="number" placeholder="e.g. 4" className="bg-spotify-black text-white border-spotify-lightgray" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="salaryMin"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">Minimum Salary</FormLabel>
            <FormControl>
              <Input placeholder="e.g. $60,000" className="bg-spotify-black text-white border-spotify-lightgray" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="salaryMax"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">Maximum Salary</FormLabel>
            <FormControl>
              <Input placeholder="e.g. $100,000" className="bg-spotify-black text-white border-spotify-lightgray" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">Description</FormLabel>
            <FormControl>
              <Textarea placeholder="Describe the career..." className="bg-spotify-black text-white border-spotify-lightgray" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}

export { careerSchema };