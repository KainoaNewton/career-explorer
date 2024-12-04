import React, { useState } from "react";

interface TagInputProps {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}

const TagInput: React.FC<TagInputProps> = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");

  const handleAddTag = (e: ReactKeyboardEvent) => {
    if (e.key === "Enter" && inputValue) {
      setTags([...tags, inputValue]);
      setInputValue("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <span key={index} className="inline-flex items-center py-1 px-2 bg-blue-200 rounded">
          {tag}
          <button className="ml-2" onClick={() => handleRemoveTag(tag)}>x</button>
        </span>
      ))}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleAddTag}
        placeholder="Add a tag"
        className="border rounded py-1 px-2"
      />
    </div>
  );
};

export default TagInput;
