import { Career } from "@/lib/careers";
import { GraduationCap, Briefcase } from "lucide-react";

interface CareerCardProps {
  career: Career;
  onClick: () => void;
}

export function CareerCard({ career, onClick }: CareerCardProps) {
  // Format salary range
  const formatSalary = (salary: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(parseInt(salary));
  };

  const salaryRange = career.salaryMin && career.salaryMax
    ? `${formatSalary(career.salaryMin)} - ${formatSalary(career.salaryMax)}`
    : "Salary not specified";

  return (
    <div
      onClick={onClick}
      className="bg-spotify-darkgray rounded-lg p-6 cursor-pointer transition-all hover:bg-spotify-darkgray/80 hover:scale-105"
    >
      <h3 className="text-xl font-bold text-white mb-2">{career.title}</h3>
      <div className="flex items-center gap-4 text-spotify-lightgray mb-4">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-4 w-4" />
          <span>{career.yearsOfEducation} years</span>
        </div>
        <div className="flex items-center gap-2">
          <Briefcase className="h-4 w-4" />
          <span>{salaryRange}</span>
        </div>
      </div>
      <p className="text-spotify-lightgray line-clamp-2">{career.description}</p>
    </div>
  );
}