import { Article } from "@/lib/articles";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ArticleGridProps {
  articles: Article[];
  isLoading?: boolean;
}

export function ArticleGrid({ articles, isLoading }: ArticleGridProps) {
  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading articles...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <Card 
          key={article.id}
          className="relative bg-gray-800 border-none transition-all hover:scale-[1.02] cursor-pointer animate-scale-in overflow-hidden group"
          onClick={() => navigate(`/article/${article.slug}`)}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-red-500/20 to-pink-500/20 blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
          <CardHeader className="relative z-10">
            <div className="flex justify-between items-start mb-2">
              <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/20">
                {article.category}
              </Badge>
              <div className="flex items-center space-x-4 text-white/70 text-sm">
                <div className="flex items-center">
                  <CalendarDays className="w-4 h-4 mr-1" />
                  {new Date(article.date).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  {article.author}
                </div>
              </div>
            </div>
            <CardTitle className="text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-yellow-400 group-hover:via-red-500 group-hover:to-pink-500 transition-colors">
              {article.title}
            </CardTitle>
            <CardDescription className="text-white/70">
              {article.excerpt}
            </CardDescription>
          </CardHeader>
          <CardContent className="relative z-10">
            <button className="text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-yellow-400 hover:via-red-500 hover:to-pink-500 transition-colors">
              Read more →
            </button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}