import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { CareerGrid } from "@/components/CareerGrid";
import { CategoryCard } from "@/components/CategoryCard";
import { categories, Career } from "@/lib/careers";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);
  const { toast } = useToast();

  const handleCareerClick = (career: Career) => {
    setSelectedCareer(career);
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId === selectedCategory ? undefined : categoryId);
    toast({
      title: "Category selected",
      description: "Showing careers in " + categories.find(c => c.id === categoryId)?.title,
    });
  };

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
          <SearchBar onSearch={setSearchQuery} />
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
          <h2 className="text-2xl font-bold mb-6">
            {selectedCategory 
              ? `Careers in ${categories.find(c => c.id === selectedCategory)?.title}`
              : "Featured Careers"}
          </h2>
          <CareerGrid
            onCareerClick={handleCareerClick}
            filter={searchQuery}
            category={selectedCategory}
          />
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
                    <p className="text-spotify-lightgray">{selectedCareer.yearsOfEducation} years of higher education</p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Average Salary</h3>
                    <p className="text-spotify-lightgray">{selectedCareer.averageSalary}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Daily Tasks</h3>
                    <ul className="list-disc pl-5 text-spotify-lightgray">
                      {selectedCareer.dailyTasks.map((task, index) => (
                        <li key={index}>{task}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Required Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedCareer.requiredSkills.map((skill, index) => (
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