import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Career, careers, categories } from "@/lib/careers";
import { CareerGrid } from "@/components/CareerGrid";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon, Home } from "lucide-react";

const EDUCATION_LEVELS = [
  { id: "bachelors", label: "Bachelor's Degree", years: 4 },
  { id: "masters", label: "Master's Degree", years: 6 },
  { id: "doctorate", label: "Doctorate", years: 8 },
];

const SALARY_PRESETS = [
  { label: "Entry Level", min: 30000, max: 50000 },
  { label: "Mid Level", min: 50000, max: 80000 },
  { label: "Senior Level", min: 80000, max: 120000 },
  { label: "Executive", min: 120000, max: 200000 },
];

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get("category") ? [searchParams.get("category")!] : []
  );
  const [selectedEducation, setSelectedEducation] = useState<string[]>([]);
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

  const handleSalaryPreset = (min: number, max: number) => {
    setSalaryMin(min.toString());
    setSalaryMax(max.toString());
  };

  return (
    <div className="min-h-screen bg-spotify-black text-white">
      {/* Search Header */}
      <div className="sticky top-0 z-10 bg-spotify-black/95 backdrop-blur-sm border-b border-white/10 p-4">
        <div className="max-w-7xl mx-auto flex gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon" className="mr-2">
              <Home className="h-5 w-5" />
            </Button>
          </Link>
          <div className="relative flex-1">
            <Input
              className="w-full bg-spotify-darkgray border-none pl-10"
              placeholder="Search careers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-spotify-lightgray h-4 w-4" />
          </div>
          <Button onClick={handleSearch} className="bg-spotify-green hover:bg-spotify-green/90">
            Search
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 grid grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className="space-y-6">
          <div className="bg-spotify-darkgray rounded-lg p-4 space-y-4">
            <h3 className="text-lg font-bold">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => toggleCategory(category.id)}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                    selectedCategories.includes(category.id)
                      ? "bg-spotify-green text-white"
                      : "hover:bg-white/10"
                  }`}
                >
                  {category.title}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-spotify-darkgray rounded-lg p-4 space-y-4">
            <h3 className="text-lg font-bold">Education Level</h3>
            <div className="space-y-2">
              {EDUCATION_LEVELS.map((level) => (
                <button
                  key={level.id}
                  onClick={() => setSelectedEducation(prev => 
                    prev.includes(level.id) 
                      ? prev.filter(id => id !== level.id)
                      : [...prev, level.id]
                  )}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                    selectedEducation.includes(level.id)
                      ? "bg-spotify-green text-white"
                      : "hover:bg-white/10"
                  }`}
                >
                  {level.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-spotify-darkgray rounded-lg p-4 space-y-4">
            <h3 className="text-lg font-bold">Salary Range</h3>
            <div className="space-y-3">
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={salaryMin}
                  onChange={(e) => setSalaryMin(e.target.value)}
                  className="bg-spotify-black"
                />
                <Input
                  type="number"
                  placeholder="Max"
                  value={salaryMax}
                  onChange={(e) => setSalaryMax(e.target.value)}
                  className="bg-spotify-black"
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-spotify-lightgray">Presets:</p>
                {SALARY_PRESETS.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => handleSalaryPreset(preset.min, preset.max)}
                    className="w-full text-left px-3 py-2 rounded-md hover:bg-white/10 text-sm"
                  >
                    {preset.label} (${preset.min.toLocaleString()} - ${preset.max.toLocaleString()})
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Career Grid */}
        <div className="col-span-3">
          <CareerGrid
            onCareerClick={handleCareerClick}
            filter={searchParams.get("q") || ""}
            categories={selectedCategories}
          />
        </div>
      </div>

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
    </div>
  );
};

export default Search;