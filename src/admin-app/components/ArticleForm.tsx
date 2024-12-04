import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { RichTextEditor } from "./RichTextEditor";

const ArticleForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase
      .from("articles")
      .insert([{ title, content }]);

    if (error) {
      console.error("Error inserting article:", error);
    } else {
      console.log("Article added:", data);
      setTitle("");
      setContent("");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          Content
        </label>
        <RichTextEditor value={content} onChange={setContent} />
      </div>

      <Button type="submit" variant="outline" className="w-full" disabled={loading}>
        {loading ? "Saving..." : "Save Article"}
      </Button>
    </form>
  );
};

export { ArticleForm };
