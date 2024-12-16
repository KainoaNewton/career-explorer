import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { RichTextEditor } from "./RichTextEditor";
import { ArticleFormFields } from "./article-form/ArticleFormFields";
import { useArticleForm } from "./article-form/useArticleForm";
import { FormItem, FormLabel } from "./ui/form";

export const ArticleForm = () => {
  const { form, content, setContent, onSubmit, isUnloading } = useArticleForm();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <ArticleFormFields form={form} />
        
        <FormItem>
          <FormLabel className="text-white">Article Content</FormLabel>
          <RichTextEditor
            content={content}
            onChange={setContent}
            placeholder="Write your article content here..."
          />
        </FormItem>

        <Button 
          type="submit" 
          className="w-full bg-spotify-green hover:bg-spotify-green/90" 
          disabled={form.formState.isSubmitting}
        >
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