import { categories } from "@/lib/careers";

interface CategoryFilterProps {
  selectedCategories: string[];
  onToggleCategory: (categoryId: string) => void;
}

export function CategoryFilter({ selectedCategories, onToggleCategory }: CategoryFilterProps) {
  return (
    <div className="bg-spotify-darkgray rounded-lg p-4 space-y-4">
      <h3 className="text-lg font-bold">Categories</h3>
      <div className="space-y-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onToggleCategory(category.id)}
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
  );
}