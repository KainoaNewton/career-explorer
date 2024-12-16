import { Article } from "@/lib/articles";
import { ArticleGrid } from "@/components/ArticleGrid";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface ArticlesSectionProps {
  articles: Article[];
  isLoading: boolean;
}

export function ArticlesSection({ articles, isLoading }: ArticlesSectionProps) {
  const navigate = useNavigate();
  const latestArticles = articles ? articles.slice(0, 3) : [];

  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Career Insights & Stories</h2>
        <Button
          variant="link"
          className="text-spotify-green hover:text-white transition-colors"
          onClick={() => navigate("/articles")}
        >
          View all articles
        </Button>
      </div>
      <ArticleGrid articles={latestArticles} isLoading={isLoading} />
    </section>
  );
}