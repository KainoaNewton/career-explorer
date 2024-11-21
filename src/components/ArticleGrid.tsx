import { Article } from "@/lib/articles";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock } from "lucide-react";

interface ArticleGridProps {
  articles: Article[];
}

export function ArticleGrid({ articles }: ArticleGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <Card 
          key={article.id}
          className="bg-spotify-darkgray hover:bg-spotify-darkgray/90 border-none transition-all hover:scale-[1.02] cursor-pointer animate-scale-in"
        >
          <CardHeader>
            <div className="flex justify-between items-start mb-2">
              <Badge variant="secondary" className="bg-spotify-green/20 text-spotify-green hover:bg-spotify-green/30">
                {article.category}
              </Badge>
              <div className="flex items-center space-x-4 text-spotify-lightgray text-sm">
                <div className="flex items-center">
                  <CalendarDays className="w-4 h-4 mr-1" />
                  {new Date(article.date).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {article.readTime}
                </div>
              </div>
            </div>
            <CardTitle className="text-white hover:text-spotify-green transition-colors">
              {article.title}
            </CardTitle>
            <CardDescription className="text-spotify-lightgray">
              {article.excerpt}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <button className="text-spotify-green hover:text-white transition-colors">
              Read more →
            </button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}