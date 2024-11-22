import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { categories } from "@/lib/careers";

interface CategoryManagerProps {
  onCategoryAdd: (category: string) => void;
}

export function CategoryManager({ onCategoryAdd }: CategoryManagerProps) {
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      onCategoryAdd(newCategory.trim());
      setNewCategory("");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="New category name"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="bg-spotify-black text-white border-spotify-lightgray"
        />
        <Button 
          onClick={handleAddCategory}
          className="bg-spotify-green hover:bg-spotify-green/90"
        >
          Add Category
        </Button>
      </div>
    </div>
  );
}