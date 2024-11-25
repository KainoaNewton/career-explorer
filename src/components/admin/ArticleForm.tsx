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
import { RichTextEditor } from "./RichTextEditor";
import { useState } from "react";

const articleSchema = z.object({
  title: z.string().min(1, "Title is required"),
  excerpt: z.string().min(1, "Excerpt is required"),
  category: z.string().min(1, "Category is required"),
  slug: z.string().min(1, "Slug is required"),
  author: z.string().min(1, "Author is required"),
});

export const ArticleForm = () => {
  const { toast } = useToast();
  const [content, setContent] = useState("");
  
  const form = useForm({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: "",
      excerpt: "",
      category: "",
      slug: "",
      author: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof articleSchema>) => {
    try {
      const { error } = await supabase.from("articles").insert([{
        ...values,
        content,
        date: new Date().toISOString(),
      }]);
      if (error) throw error;
      toast({
        title: "Article added successfully",
      });
      form.reset();
      setContent("");
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
                <Input placeholder="e.g. 10 Tips for Career Success" className="bg-spotify-black text-white border-spotify-lightgray" {...field} />
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
              <FormLabel className="text-white">Excerpt</FormLabel>
              <FormControl>
                <Textarea placeholder="A brief summary that will appear in the article list" className="bg-spotify-black text-white border-spotify-lightgray" {...field} />
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
                <Input placeholder="e.g. Career Advice, Industry News" className="bg-spotify-black text-white border-spotify-lightgray" {...field} />
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
                <Input placeholder="e.g. John Doe" className="bg-spotify-black text-white border-spotify-lightgray" {...field} />
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
              <FormLabel className="text-white">Slug</FormLabel>
              <FormControl>
                <Input placeholder="e.g. 10-tips-for-career-success (URL-friendly version of the title)" className="bg-spotify-black text-white border-spotify-lightgray" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel className="text-white">Article Content</FormLabel>
          <RichTextEditor content={content} onChange={setContent} />
        </FormItem>

        <Button type="submit" className="w-full bg-spotify-green hover:bg-spotify-green/90" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Add Article"
          )}
        </Button>
      </form>
    </Form>
  );
};