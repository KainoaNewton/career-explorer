import { supabase } from './supabase';

export interface Career {
  id: string;
  title: string;
  category: string;
  yearsOfEducation: number;
  averageSalary: string;
  description: string;
  dailyTasks: string[];
  requiredSkills: string[];
  salaryMin?: string;
  salaryMax?: string;
}

export const categories = [
  {
    id: "tech",
    title: "Technology",
    description: "Explore careers in software, data, and IT",
    color: "from-blue-500 to-purple-500",
  },
  {
    id: "healthcare",
    title: "Healthcare",
    description: "Discover medical and wellness professions",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "creative",
    title: "Creative",
    description: "Find opportunities in design and arts",
    color: "from-orange-500 to-pink-500",
  },
  {
    id: "business",
    title: "Business",
    description: "Learn about finance and management roles",
    color: "from-yellow-500 to-orange-500",
  },
];

export async function getCareers() {
  const { data, error } = await supabase
    .from('careers')
    .select('*')
    .order('title', { ascending: true });
  
  if (error) throw error;
  return data as Career[];
}

export async function getCareerById(id: string) {
  const { data, error } = await supabase
    .from('careers')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data as Career;
}