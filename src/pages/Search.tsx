import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Career, careers, categories } from "@/lib/careers";
import { CareerGrid } from "@/components/CareerGrid";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon } from "lucide-react";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);
  const [salaryRange, setSalaryRange] = useState([0, 200000]);
  const [educationYears, setEducationYears] = useState([0, 8]);

  const initialCategory = searchParams.get("category");

  const handleCareerClick = (career: Career) => {
    setSelectedCareer(career);
  };

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams);
    params.set("q", searchQuery);
    setSearchParams(params);
  };

  return (
    <div className="min-h-screen bg-spotify-black text-white">
      {/* Search Header */}
      <div className="sticky top-0 z-10 bg-spotify-black/95 backdrop-blur-sm border-b border-white/10 p-4">
        <div className="max-w-7xl mx-auto flex gap-4">
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
                  onClick={() => {
                    const params = new URLSearchParams(searchParams);
                    params.set("category", category.id);
                    setSearchParams(params);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                    category.id === searchParams.get("category")
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
            <h3 className="text-lg font-bold">Education (Years)</h3>
            <Slider
              defaultValue={educationYears}
              max={8}
              step={1}
              onValueChange={setEducationYears}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-spotify-lightgray">
              <span>{educationYears[0]} years</span>
              <span>{educationYears[1]} years</span>
            </div>
          </div>

          <div className="bg-spotify-darkgray rounded-lg p-4 space-y-4">
            <h3 className="text-lg font-bold">Salary Range</h3>
            <Slider
              defaultValue={salaryRange}
              max={200000}
              step={10000}
              onValueChange={setSalaryRange}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-spotify-lightgray">
              <span>${salaryRange[0].toLocaleString()}</span>
              <span>${salaryRange[1].toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Career Grid */}
        <div className="col-span-3">
          <CareerGrid
            onCareerClick={handleCareerClick}
            filter={searchParams.get("q") || ""}
            category={searchParams.get("category") || undefined}
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