import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormLabel } from "@/components/ui/form";
import { X } from "lucide-react";

interface TagInputProps {
  label: string;
  tags: string[];
  newTag: string;
  setNewTag: (value: string) => void;
  addTag: () => void;
  removeTag: (index: number) => void;
  placeholder: string;
}

export function TagInput({
  label,
  tags,
  newTag,
  setNewTag,
  addTag,
  removeTag,
  placeholder,
}: TagInputProps) {
  return (
    <div className="space-y-4">
      <FormLabel className="text-white">{label}</FormLabel>
      <div className="flex gap-2">
        <Input
          placeholder={placeholder}
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          className="bg-spotify-black text-white border-spotify-lightgray"
          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
        />
        <Button 
          type="button"
          onClick={addTag}
          className="bg-spotify-green hover:bg-spotify-green/90"
        >
          Add
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <div key={index} className="flex items-center bg-spotify-darkgray text-white px-3 py-1 rounded-full">
            <span>{tag}</span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="ml-2 h-auto p-0 hover:bg-transparent"
              onClick={() => removeTag(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}