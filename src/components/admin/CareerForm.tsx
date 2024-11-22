import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";

const careerSchema = z.object({
  title: z.string().min(1, "Title is required"),
  category: z.string().min(1, "Category is required"),
  yearsOfEducation: z.number().min(0),
  averageSalary: z.string().min(1, "Salary is required"),
  description: z.string().min(1, "Description is required"),
  dailyTasks: z.string().transform((str) => JSON.parse(str)),
  requiredSkills: z.string().transform((str) => JSON.parse(str)),
});

export const CareerForm = () => {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(careerSchema),
    defaultValues: {
      title: "",
      category: "",
      yearsOfEducation: 0,
      averageSalary: "",
      description: "",
      dailyTasks: "[]",
      requiredSkills: "[]",
    },
  });

  const onSubmit = async (values: z.infer<typeof careerSchema>) => {
    try {
      const { error } = await supabase.from("careers").insert([values]);
      if (error) throw error;
      toast({
        title: "Career added successfully",
      });
      form.reset();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                <Input
                  type="number"
                  placeholder="e.g. 4"
                  className="bg-spotify-black text-white border-spotify-lightgray"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="averageSalary"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Average Salary</FormLabel>
              <FormControl>
                <Input placeholder="e.g. $80,000 - $120,000" className="bg-spotify-black text-white border-spotify-lightgray" {...field} />
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
                <Textarea placeholder="Enter a detailed description of the career" className="bg-spotify-black text-white border-spotify-lightgray" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dailyTasks"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Daily Tasks (JSON array)</FormLabel>
              <FormControl>
                <Textarea placeholder='e.g. ["Write code", "Review pull requests", "Attend meetings"]' className="bg-spotify-black text-white border-spotify-lightgray" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="requiredSkills"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Required Skills (JSON array)</FormLabel>
              <FormControl>
                <Textarea placeholder='e.g. ["JavaScript", "React", "Node.js"]' className="bg-spotify-black text-white border-spotify-lightgray" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-spotify-green hover:bg-spotify-green/90" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Add Career"
          )}
        </Button>
      </form>
    </Form>
  );
};