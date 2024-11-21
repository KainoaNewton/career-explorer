import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { articles } from "@/lib/articles";
import { ArticleGrid } from "@/components/ArticleGrid";

const Articles = () => {
  return (
    <div className="min-h-screen bg-spotify-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        <Link to="/">
          <Button variant="ghost" className="text-white hover:text-white hover:bg-spotify-darkgray">
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        <div className="mt-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent mb-8">
            All Articles
          </h1>
          <ArticleGrid articles={articles} />
        </div>
      </div>
    </div>
  );
};

export default Articles;