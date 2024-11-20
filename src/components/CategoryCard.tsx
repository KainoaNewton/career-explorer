import { cn } from "@/lib/utils";

interface CategoryCardProps {
  title: string;
  description: string;
  gradient: string;
  onClick: () => void;
}

export function CategoryCard({ title, description, gradient, onClick }: CategoryCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "relative overflow-hidden rounded-lg p-6 cursor-pointer transition-transform hover:scale-105",
        "bg-gradient-to-br",
        gradient
      )}
    >
      <div className="relative z-10">
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-white/80">{description}</p>
      </div>
    </div>
  );
}