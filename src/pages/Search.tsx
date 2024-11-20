import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { CareerGrid } from "@/components/CareerGrid";
import { Career, categories } from "@/lib/careers";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useSearchParams } from "react-router-dom";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get("category") || ""
  );
  const [educationYears, setEducationYears] = useState([4]);
  const [salaryRange, setSalaryRange] = useState([100000]);

  const handleCareerClick = (career: Career) => {
    // Handle career click
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    if (value) {
      searchParams.set("category", value);
    } else {
      searchParams.delete("category");
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="min-h-screen bg-spotify-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} />
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className="w-64 space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Category</h3>
              <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                <SelectTrigger className="w-full bg-spotify-darkgray border-none">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Education (Years)</h3>
              <Slider
                defaultValue={[4]}
                max={8}
                step={1}
                value={educationYears}
                onValueChange={setEducationYears}
                className="w-full"
              />
              <span className="text-sm text-spotify-lightgray mt-2">
                Up to {educationYears} years
              </span>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Salary Range</h3>
              <Slider
                defaultValue={[100000]}
                max={200000}
                step={10000}
                value={salaryRange}
                onValueChange={setSalaryRange}
                className="w-full"
              />
              <span className="text-sm text-spotify-lightgray mt-2">
                Up to ${salaryRange.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Career Grid */}
          <div className="flex-1">
            <CareerGrid
              onCareerClick={handleCareerClick}
              filter={searchQuery}
              category={selectedCategory}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
