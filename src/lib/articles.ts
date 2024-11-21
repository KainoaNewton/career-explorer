export interface Article {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  slug: string;
}

export const articles: Article[] = [
  {
    id: "1",
    title: "A Day in the Life of a Software Engineer",
    excerpt: "Shadow experience: Following Sarah, a senior software engineer at a tech startup, through her daily routine.",
    date: "2024-02-20",
    readTime: "5 min read",
    category: "Tech",
    slug: "day-in-life-software-engineer"
  },
  {
    id: "2",
    title: "Interview: Healthcare Administration Insights",
    excerpt: "An in-depth conversation with John, a hospital administrator with 15 years of experience.",
    date: "2024-02-18",
    readTime: "8 min read",
    category: "Healthcare",
    slug: "healthcare-admin-interview"
  },
  {
    id: "3",
    title: "Teaching: More Than Just Lesson Plans",
    excerpt: "A detailed look into the daily challenges and rewards of being an elementary school teacher.",
    date: "2024-02-15",
    readTime: "6 min read",
    category: "Education",
    slug: "teaching-insights"
  }
];