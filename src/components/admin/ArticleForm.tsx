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
import { useState, useEffect } from "react";

const articleSchema = z.object({
  title: z.string().min(1, "Title is required").max(50, "Title must not exceed 50 characters"),
  excerpt: z.string().min(1, "Excerpt is required").max(130, "Excerpt must not exceed 130 characters"),
  category: z.string().min(1, "Category is required").max(16, "Category must not exceed 16 characters"),
  slug: z.string().min(1, "URL is required"),
  author: z.string().min(1, "Author is required"),
});

export const ArticleForm = () => {
  const { toast } = useToast();
  const [content, setContent] = useState("");
  const [isUnloading, setIsUnloading] = useState(false);

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

  // Load form data from localStorage on mount
  useEffect(() => {
    const savedFormData = localStorage.getItem('articleFormData');
    const savedContent = localStorage.getItem('articleContent');

    if (savedFormData && !isUnloading) {
      form.reset(JSON.parse(savedFormData));
    }

    if (savedContent && !isUnloading) {
      setContent(savedContent);
    }
  }, []);

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    if (!isUnloading) {
      const formData = form.getValues();
      localStorage.setItem('articleFormData', JSON.stringify(formData));
    }
  }, [form.watch()]);

  // Save content to localStorage whenever it changes
  useEffect(() => {
    if (!isUnloading) {
      localStorage.setItem('articleContent', content);
    }
  }, [content]);

  // Handle beforeunload event
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      const formData = form.getValues();
      const hasUnsavedChanges = 
        Object.values(formData).some(value => value !== "") || 
        content !== "";

      if (hasUnsavedChanges) {
        setIsUnloading(true);
        localStorage.removeItem('articleFormData');
        localStorage.removeItem('articleContent');
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [content]);

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
      localStorage.removeItem('articleFormData');
      localStorage.removeItem('articleContent');
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
                <Input placeholder="e.g. Kainoa Newton" className="bg-spotify-black text-white border-spotify-lightgray" {...field} />
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
                <Input placeholder="e.g. 10-tips-for-career-success (URL-friendly version of the title)" className="bg-spotify-black text-white border-spotify-lightgray" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel className="text-white">Article Content</FormLabel>
          <RichTextEditor
            content={content}
            onChange={setContent}
            placeholder="Write your article content here..."
          />
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