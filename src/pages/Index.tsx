import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CategoryCard } from "@/components/CategoryCard";
import { CareerGrid } from "@/components/CareerGrid";
import { ArticleGrid } from "@/components/ArticleGrid";
import { categories, getCareers, Career } from "@/lib/careers";
import { getArticles } from "@/lib/articles";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

const Index = () => {
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);
  const navigate = useNavigate();

  const { data: careers, isLoading: careersLoading } = useQuery({
    queryKey: ['careers'],
    queryFn: getCareers
  });

  const { data: articles, isLoading: articlesLoading } = useQuery({
    queryKey: ['articles'],
    queryFn: getArticles
  });

  const handleCareerClick = (career: Career) => {
    setSelectedCareer(career);
  };

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/search?categories=${categoryId}`);
  };

  // Ensure dailyTasks and requiredSkills are arrays
  const parsedDailyTasks = selectedCareer?.dailyTasks 
    ? Array.isArray(selectedCareer.dailyTasks) 
      ? selectedCareer.dailyTasks 
      : JSON.parse(selectedCareer.dailyTasks as string)
    : [];

  const parsedRequiredSkills = selectedCareer?.requiredSkills
    ? Array.isArray(selectedCareer.requiredSkills)
      ? selectedCareer.requiredSkills
      : JSON.parse(selectedCareer.requiredSkills as string)
    : [];

  // Get only the 3 latest articles
  const latestArticles = articles ? articles.slice(0, 3) : [];

  return (
    <div className="min-h-screen bg-spotify-black text-white p-6">
      <main className="max-w-7xl mx-auto space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-6 py-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-spotify-green to-blue-500 bg-clip-text text-transparent">
            Discover Your Career Path
          </h1>
          <p className="text-xl text-spotify-lightgray max-w-2xl mx-auto">
            Explore different careers, understand what it takes to succeed, and find your perfect profession.
          </p>
          <Button
            onClick={() => navigate("/search")}
            className="relative inline-flex items-center px-8 py-8 text-lg font-semibold text-black bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 hover:from-pink-500 hover:to-yellow-400 rounded-xl shadow-[0_4px_20px_rgba(255,0,0,0.6)] transition-transform transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-pink-400"
          >
            <span
              className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 blur-md opacity-80 rounded-xl animate-pulse"
              aria-hidden="true"
            ></span>
            <span className="relative z-10 flex items-center">
              <Search className="mr-3 h-6 w-6 text-white" />
              <span className="text-white">Explore Careers</span>
            </span>
          </Button>
        </div>

        {/* Categories */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                title={category.title}
                description={category.description}
                gradient={category.color}
                onClick={() => handleCategoryClick(category.id)}
              />
            ))}
          </div>
        </section>

        {/* Careers Grid */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Featured Careers</h2>
          <CareerGrid
            careers={careers || []}
            isLoading={careersLoading}
            onCareerClick={handleCareerClick}
          />
        </section>

        {/* Articles Section */}
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
          <ArticleGrid articles={latestArticles} isLoading={articlesLoading} />
        </section>

        {/* Career Detail Dialog */}
        <Dialog open={!!selectedCareer} onOpenChange={() => setSelectedCareer(null)}>
          <DialogContent className="bg-spotify-darkgray text-white border-none max-w-2xl">
            {selectedCareer && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">{selectedCareer.title}</h2>
                <p className="text-spotify-lightgray">{selectedCareer.description}</p>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Education Required</h3>
                    <p className="text-spotify-lightgray">
                      {selectedCareer.yearsOfEducation} years of higher education
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Average Salary</h3>
                    <p className="text-spotify-lightgray">{selectedCareer.averageSalary}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Daily Tasks</h3>
                    <ul className="list-disc pl-5 text-spotify-lightgray">
                      {parsedDailyTasks.map((task: string, index: number) => (
                        <li key={index}>{task}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Required Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {parsedRequiredSkills.map((skill: string, index: number) => (
                        <span
                          key={index}
                          className="bg-spotify-green/20 text-spotify-green px-3 py-1 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default Index;
