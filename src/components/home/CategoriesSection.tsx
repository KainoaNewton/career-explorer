import { categories } from "@/lib/careers";
import { CategoryCard } from "@/components/CategoryCard";
import { useNavigate } from "react-router-dom";

export function CategoriesSection() {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/search?categories=${categoryId}`);
  };

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            title={category.title}
            description={category.description}
            gradient={category.color}
            onClick={() => handleCategoryClick(category.id)}
          />
        ))}
      </div>
    </section>
  );
}