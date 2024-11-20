import { Career, careers } from "@/lib/careers";
import { CareerCard } from "./CareerCard";

interface CareerGridProps {
  onCareerClick: (career: Career) => void;
  filter?: string;
  categories?: string[];
}

export function CareerGrid({ onCareerClick, filter, categories }: CareerGridProps) {
  const filteredCareers = careers.filter((career) => {
    if (categories && categories.length > 0 && !categories.includes(career.category)) return false;
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