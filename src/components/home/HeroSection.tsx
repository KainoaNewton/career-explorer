import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <div className="text-center space-y-6 py-12">
      <h1 className="text-5xl font-bold bg-gradient-to-r from-spotify-green to-blue-500 bg-clip-text text-transparent">
        Discover Your Career Path
      </h1>
      <p className="text-xl text-spotify-lightgray max-w-2xl mx-auto">
        Explore different careers, understand what it takes to succeed, and find your perfect profession.
      </p>
      <Button
        onClick={() => navigate("/search")}
        className="relative inline-flex items-center px-8 py-8 text-lg font-semibold text-black bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 hover:from-pink-500 hover:to-yellow-400 rounded-xl shadow-[0_4px_20px_rgba(255,0,0,0.6)] transition-transform transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-pink-400"
      >
        <span
          className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 blur-md opacity-80 rounded-xl animate-pulse"
          aria-hidden="true"
        ></span>
        <span className="relative z-10 flex items-center">
          <Search className="mr-3 h-6 w-6 text-white" />
          <span className="text-white">Explore Careers</span>
        </span>
      </Button>
    </div>
  );
}