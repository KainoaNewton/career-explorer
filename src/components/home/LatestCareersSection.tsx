import { Career } from "@/lib/careers";
import { CareerGrid } from "@/components/CareerGrid";

interface LatestCareersSectionProps {
  careers: Career[];
  isLoading: boolean;
  onCareerClick: (career: Career) => void;
}

export function LatestCareersSection({ careers, isLoading, onCareerClick }: LatestCareersSectionProps) {
  // Get latest 3 careers
  const latestCareers = careers ? careers.slice(0, 3) : [];

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Featured Careers</h2>
      <CareerGrid
        careers={latestCareers}
        isLoading={isLoading}
        onCareerClick={onCareerClick}
      />
    </section>
  );
}