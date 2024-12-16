import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { articleSchema } from "./schema";

interface ArticleFormFieldsProps {
  form: UseFormReturn<z.infer<typeof articleSchema>>;
}

export function ArticleFormFields({ form }: ArticleFormFieldsProps) {
  return (
    <>
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">Title (max 50 characters)</FormLabel>
            <FormControl>
              <Input
                placeholder="e.g. 10 Tips for Career Success"
                className="bg-spotify-black text-white border-spotify-lightgray"
                maxLength={50}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="excerpt"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">Excerpt (max 130 characters)</FormLabel>
            <FormControl>
              <Textarea
                placeholder="A brief summary that will appear in the article list"
                className="bg-spotify-black text-white border-spotify-lightgray"
                maxLength={130}
                {...field}
              />
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
            <FormLabel className="text-white">Category (max 16 characters)</FormLabel>
            <FormControl>
              <Input
                placeholder="e.g. Career Advice"
                className="bg-spotify-black text-white border-spotify-lightgray"
                maxLength={16}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="author"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">Author</FormLabel>
            <FormControl>
              <Input 
                placeholder="e.g. Kainoa Newton" 
                className="bg-spotify-black text-white border-spotify-lightgray" 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="slug"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">URL</FormLabel>
            <FormControl>
              <Input 
                placeholder="e.g. 10-tips-for-career-success (URL-friendly version of the title)" 
                className="bg-spotify-black text-white border-spotify-lightgray" 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}