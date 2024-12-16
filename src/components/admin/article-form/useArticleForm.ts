import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { articleSchema } from "./schema";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";

export function useArticleForm() {
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

  useEffect(() => {
    if (!isUnloading) {
      const formData = form.getValues();
      localStorage.setItem('articleFormData', JSON.stringify(formData));
    }
  }, [form.watch()]);

  useEffect(() => {
    if (!isUnloading) {
      localStorage.setItem('articleContent', content);
    }
  }, [content]);

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

  const clearForm = () => {
    form.reset();
    setContent("");
    localStorage.removeItem('articleFormData');
    localStorage.removeItem('articleContent');
  };

  const onSubmit = async (values: any) => {
    try {
      const { error } = await supabase.from("articles").insert([{
        ...values,
        content,
        date: new Date().toISOString(),
      }]);
      
      if (error) throw error;
      
      toast({
        title: "Success!",
        description: "Article added successfully",
        variant: "default",
      });
      
      clearForm();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return {
    form,
    content,
    setContent,
    onSubmit,
    isUnloading,
  };
}