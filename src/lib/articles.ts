import { supabase } from './supabase';

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  slug: string;
}

export async function getArticles() {
  const { data, error } = await supabase
    .from('articles')
    .select('*');
  
  if (error) throw error;
  return data as Article[];
}

export async function getArticleBySlug(slug: string) {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .single();
  
  if (error) throw error;
  return data as Article;
}