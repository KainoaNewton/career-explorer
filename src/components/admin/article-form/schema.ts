import * as z from "zod";

export const articleSchema = z.object({
  title: z.string().min(1, "Title is required").max(50, "Title must not exceed 50 characters"),
  excerpt: z.string().min(1, "Excerpt is required").max(130, "Excerpt must not exceed 130 characters"),
  category: z.string().min(1, "Category is required").max(16, "Category must not exceed 16 characters"),
  slug: z.string().min(1, "URL is required"),
  author: z.string().min(1, "Author is required"),
});