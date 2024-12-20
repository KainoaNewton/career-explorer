import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, User } from "lucide-react";
import { getArticleBySlug } from "@/lib/articles";
import { useQuery } from "@tanstack/react-query";

const Article = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const { data: article, isLoading } = useQuery({
    queryKey: ['article', slug],
    queryFn: () => getArticleBySlug(slug || ''),
    enabled: !!slug
  });

  const handleBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return <div>Loading article...</div>;
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-spotify-black text-white p-6">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="ghost" 
            className="text-white hover:text-white hover:bg-spotify-darkgray"
            onClick={handleBack}
          >
            <Home className="mr-2 h-4 w-4" />
            Go Back
          </Button>
          <div className="text-center mt-20">
            <h1 className="text-2xl font-bold">Article not found</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-spotify-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        <Button 
          variant="ghost" 
          className="text-white hover:text-white hover:bg-spotify-darkgray"
          onClick={handleBack}
        >
          <Home className="mr-2 h-4 w-4" />
          Go Back
        </Button>
        
        <article className="mt-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/70">{article.category}</span>
              <div className="flex items-center space-x-4 text-white/70 text-sm">
                <span>{new Date(article.date).toLocaleDateString()}</span>
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  <span>{article.author}</span>
                </div>
              </div>
            </div>
            
            <h1 className="article-title">
              {article.title}
            </h1>
            
            <p className="article-excerpt">
              {article.excerpt}
            </p>
            
            <div 
              className="mt-8 prose prose-invert max-w-none [&>*]:!font-size-revert [&>*]:!inherit-none" 
              dangerouslySetInnerHTML={{ __html: article.content }} 
            />
          </div>
        </article>
      </div>
    </div>
  );
};

export default Article;