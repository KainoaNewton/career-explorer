import { Career, categories } from "@/lib/careers";
import { CareerCard } from "./CareerCard";

interface CareerGridProps {
  careers: Career[];
  isLoading?: boolean;
  onCareerClick: (career: Career) => void;
  filter?: string;
  categories?: string[];
  selectedYearRanges?: string[];
  salaryMin?: string;
  salaryMax?: string;
}

export function CareerGrid({ 
  careers,
  isLoading,
  onCareerClick, 
  filter, 
  categories,
  selectedYearRanges,
  salaryMin,
  salaryMax
}: CareerGridProps) {
  if (isLoading) {
    return <div>Loading careers...</div>;
  }

  const filteredCareers = careers.filter((career) => {
    // Category filter
    if (categories && categories.length > 0 && !categories.includes(career.category)) return false;
    
    // Years of education filter
    if (selectedYearRanges && selectedYearRanges.length > 0) {
      const yearsMatch = selectedYearRanges.some(range => {
        switch (range) {
          case "1-2":
            return career.yearsOfEducation >= 1 && career.yearsOfEducation <= 2;
          case "3-4":
            return career.yearsOfEducation >= 3 && career.yearsOfEducation <= 4;
          case "5-6":
            return career.yearsOfEducation >= 5 && career.yearsOfEducation <= 6;
          case "7+":
            return career.yearsOfEducation >= 7;
          default:
            return false;
        }
      });
      if (!yearsMatch) return false;
    }

    // Salary filter
    if (salaryMin || salaryMax) {
      const careerSalary = parseInt(career.averageSalary.replace(/[^0-9]/g, ''));
      if (salaryMin && careerSalary < parseInt(salaryMin)) return false;
      if (salaryMax && careerSalary > parseInt(salaryMax)) return false;
    }

    // Text search filter
    if (filter) {
      return career.title.toLowerCase().includes(filter.toLowerCase()) ||
             career.description.toLowerCase().includes(filter.toLowerCase());
    }
    
    return true;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredCareers.map((career) => (
        <CareerCard
          key={career.id}
          career={career}
          onClick={() => onCareerClick(career)}
        />
      ))}
    </div>
  );
}