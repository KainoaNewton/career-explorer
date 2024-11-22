import { useParams, Link } from "react-router-dom";
import { articles } from "@/lib/articles";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const Article = () => {
  const { slug } = useParams();
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen bg-spotify-black text-white p-6">
        <div className="max-w-4xl mx-auto">
          <Link to="/">
            <Button variant="ghost" className="text-white hover:text-white hover:bg-spotify-darkgray">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
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
          <Link to="/">
            <Button variant="ghost" className="text-white hover:text-white hover:bg-spotify-darkgray">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        
        <article className="mt-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/70">{article.category}</span>
              <div className="flex items-center space-x-4 text-white/70 text-sm">
                <span>{new Date(article.date).toLocaleDateString()}</span>
                <span>{article.readTime}</span>
              </div>
            </div>
            
            <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
              {article.title}
            </h1>
            
            <p className="text-lg text-white/80 leading-relaxed">
              {article.excerpt}
            </p>
            
            {/* This is where the full article content would go */}
            <div className="mt-8 prose prose-invert max-w-none">
              <p className="text-white/80">
                This is a placeholder for the full article content. In a real application, 
                you would fetch the complete article content from your backend or CMS.
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default Article;