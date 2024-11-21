import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Career } from "@/lib/careers";
import { CareerGrid } from "@/components/CareerGrid";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon, Home, X, Filter } from "lucide-react";
import { CategoryFilter } from "@/components/search/CategoryFilter";
import { EducationFilter } from "@/components/search/EducationFilter";
import { SalaryFilter } from "@/components/search/SalaryFilter";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get("category") ? [searchParams.get("category")!] : []
  );
  const [selectedYearRanges, setSelectedYearRanges] = useState<string[]>([]);
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");

  const handleCareerClick = (career: Career) => {
    setSelectedCareer(career);
  };

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams);
    params.set("q", searchQuery);
    setSearchParams(params);
  };

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleSalaryChange = (min: string, max: string) => {
    setSalaryMin(min);
    setSalaryMax(max);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedYearRanges([]);
    setSalaryMin("");
    setSalaryMax("");
    setSearchQuery("");
    setSearchParams(new URLSearchParams());
  };

  const Filters = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Filters</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="text-white/70 hover:text-white"
        >
          <X className="h-4 w-4 mr-2" />
          Clear filters
        </Button>
      </div>
      <CategoryFilter
        selectedCategories={selectedCategories}
        onToggleCategory={toggleCategory}
      />
      <EducationFilter
        selectedRanges={selectedYearRanges}
        onChange={setSelectedYearRanges}
      />
      <SalaryFilter
        salaryMin={salaryMin}
        salaryMax={salaryMax}
        onSalaryChange={handleSalaryChange}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1F2C] to-spotify-black text-white">
      {/* Search Header */}
      <div className="sticky top-0 z-10 bg-[#1A1F2C]/95 backdrop-blur-sm border-b border-white/10 p-4">
        <div className="max-w-7xl mx-auto flex gap-4 items-center">
          <Link to="/">
            <Button variant="ghost" size="icon" className="mr-2">
              <Home className="h-5 w-5" />
            </Button>
          </Link>
          <div className="relative flex-1">
            <Input
              className="w-full bg-white/10 border-none pl-10"
              placeholder="Search careers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70 h-4 w-4" />
          </div>
          <Button onClick={handleSearch} className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 hover:from-pink-500 hover:to-yellow-400 text-white">
            Search
          </Button>
          {/* Only show the filter button on mobile */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Filter className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] bg-[#1A1F2C] border-r border-white/10 p-6">
                <Filters />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar - Desktop */}
        <div className="hidden lg:block sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto">
          <Filters />
        </div>

        {/* Career Grid */}
        <div className="lg:col-span-3">
          <CareerGrid
            onCareerClick={handleCareerClick}
            filter={searchParams.get("q") || ""}
            categories={selectedCategories}
            selectedYearRanges={selectedYearRanges}
            salaryMin={salaryMin}
            salaryMax={salaryMax}
          />
        </div>
      </div>

      {/* Career Detail Dialog */}
      <Dialog open={!!selectedCareer} onOpenChange={() => setSelectedCareer(null)}>
        <DialogContent className="bg-[#1A1F2C] text-white border-none max-w-2xl">
          {selectedCareer && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
                {selectedCareer.title}
              </h2>
              <p className="text-white/70">{selectedCareer.description}</p>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Education Required</h3>
                  <p className="text-white/70">
                    {selectedCareer.yearsOfEducation} years of higher education
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-2">Average Salary</h3>
                  <p className="text-white/70">{selectedCareer.averageSalary}</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-2">Daily Tasks</h3>
                  <ul className="list-disc pl-5 text-white/70">
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
                        className="bg-white/10 text-white px-3 py-1 rounded-full text-sm"
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
    </div>
  );
};

export default Search;