import { useState } from "react";
import { Career } from "@/lib/careers";
import { getCareers } from "@/lib/careers";
import { getArticles } from "@/lib/articles";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { HeroSection } from "@/components/home/HeroSection";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { LatestCareersSection } from "@/components/home/LatestCareersSection";
import { ArticlesSection } from "@/components/home/ArticlesSection";

const Index = () => {
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);

  const { data: careers, isLoading: careersLoading } = useQuery({
    queryKey: ['careers'],
    queryFn: getCareers
  });

  const { data: articles, isLoading: articlesLoading } = useQuery({
    queryKey: ['articles'],
    queryFn: getArticles
  });

  const handleCareerClick = (career: Career) => {
    const parsedCareer = {
      ...career,
      dailyTasks: Array.isArray(career.dailyTasks) 
        ? career.dailyTasks 
        : typeof career.dailyTasks === 'string' 
          ? JSON.parse(career.dailyTasks) 
          : [],
      requiredSkills: Array.isArray(career.requiredSkills)
        ? career.requiredSkills
        : typeof career.requiredSkills === 'string'
          ? JSON.parse(career.requiredSkills)
          : []
    };
    setSelectedCareer(parsedCareer);
  };

  return (
    <div className="min-h-screen bg-spotify-black text-white p-6">
      <main className="max-w-7xl mx-auto space-y-12">
        <HeroSection />
        <CategoriesSection />
        <LatestCareersSection 
          careers={careers || []} 
          isLoading={careersLoading}
          onCareerClick={handleCareerClick}
        />
        <ArticlesSection articles={articles || []} isLoading={articlesLoading} />

        {/* Career Detail Dialog */}
        <Dialog open={!!selectedCareer} onOpenChange={(open) => !open && setSelectedCareer(null)}>
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