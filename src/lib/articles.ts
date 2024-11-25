import { supabase } from './supabase';
import { toast } from "@/components/ui/use-toast";

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  slug: string;
}

export async function getArticles() {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('date', { ascending: false });
    
    if (error) {
      toast({
        title: "Error fetching articles",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }

    if (!data) {
      return [];
    }

    return data as Article[];
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
}

export async function getArticleBySlug(slug: string) {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (error) {
      toast({
        title: "Error fetching article",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }

    if (!data) {
      throw new Error('Article not found');
    }

    return data as Article;
  } catch (error) {
    console.error('Error fetching article:', error);
    throw error;
  }
}

export async function deleteArticle(id: string) {
  try {
    const { error } = await supabase
      .from('articles')
      .delete()
      .eq('id', id);
    
    if (error) {
      toast({
        title: "Error deleting article",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }

    toast({
      title: "Article deleted successfully",
    });
  } catch (error) {
    console.error('Error deleting article:', error);
    throw error;
  }
}
