import { useState } from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";

export function SearchBar({ onSearch }: { onSearch: (query: string) => void }) {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-spotify-lightgray h-5 w-5" />
      <Input
        type="text"
        placeholder="Search for a career..."
        value={query}
        onChange={handleSearch}
        className="w-full pl-10 py-6 text-lg bg-white/10 border-none text-white placeholder:text-spotify-lightgray focus-visible:ring-spotify-green"
      />
    </div>
  );
}