import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminAuth } from "@/components/admin/AdminAuth";
import { CareerForm } from "@/components/admin/CareerForm";
import { ArticleForm } from "@/components/admin/ArticleForm";
import { ManageArticles } from "@/components/admin/ManageArticles";
import { ManageCareers } from "@/components/admin/ManageCareers";
import { supabase } from "@/lib/supabase";
import { CategoryCard } from "@/components/CategoryCard";
import { useNavigate } from "react-router-dom";
import { categories } from "@/lib/careers";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [careers, setCareers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setIsAuthenticated(!!session);
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    checkSession();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const fetchCareers = async () => {
      const { data, error } = await supabase.from("careers").select("*");
      if (error) {
        console.error("Error fetching careers:", error);
      } else {
        setCareers(data);
      }
    };

    fetchCareers();
  }, []);

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-spotify-black p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold text-white">Latest Careers</h1>
          <ul className="space-y-4">
            {careers.slice(-3).reverse().map((career) => (
              <li key={career.id} className="bg-spotify-darkgray p-4 rounded-lg">
                <h2 className="text-xl text-white">{career.title}</h2>
                <p className="text-gray-400">{career.description}</p>
              </li>
            ))}
          </ul>
          <Tabs defaultValue="add-career" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-spotify-darkgray">
              <TabsTrigger value="add-career" className="text-white data-[state=active]:bg-spotify-green">
                Add Career
              </TabsTrigger>
              <TabsTrigger value="manage-careers" className="text-white data-[state=active]:bg-spotify-green">
                Manage Careers
              </TabsTrigger>
              <TabsTrigger value="add-article" className="text-white data-[state=active]:bg-spotify-green">
                Add Article
              </TabsTrigger>
              <TabsTrigger value="manage-articles" className="text-white data-[state=active]:bg-spotify-green">
                Manage Articles
              </TabsTrigger>
            </TabsList>

            <TabsContent value="add-career" className="bg-spotify-darkgray p-6 rounded-lg mt-4">
              <CareerForm />
            </TabsContent>

            <TabsContent value="manage-careers" className="bg-spotify-darkgray p-6 rounded-lg mt-4">
              <ManageCareers />
            </TabsContent>

            <TabsContent value="add-article" className="bg-spotify-darkgray p-6 rounded-lg mt-4">
              <ArticleForm />
            </TabsContent>

            <TabsContent value="manage-articles" className="bg-spotify-darkgray p-6 rounded-lg mt-4">
              <ManageArticles />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <div className="min-h-screen bg-spotify-black flex items-center justify-center">
      <div className="text-white">Loading...</div>
    </div>;
  }

  // Main homepage content for non-authenticated users
  return (
    <div className="min-h-screen bg-gradient-to-b from-spotify-black to-spotify-darkgray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Discover Your Perfect Career Path
          </h1>
          <p className="text-xl text-spotify-lightgray mb-8 max-w-3xl mx-auto">
            Explore different career paths, understand what it takes to succeed, and find the profession that matches your passion and skills.
          </p>
          <Button
            onClick={() => navigate("/search")}
            className="bg-spotify-green hover:bg-spotify-green/90 text-white px-8 py-6 rounded-full text-lg"
          >
            Start Exploring
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {careers.slice(-3).reverse().map((career) => (
            <div key={career.id} className="bg-spotify-darkgray p-6 rounded-lg hover:bg-spotify-darkgray/80 transition-colors">
              <h3 className="text-xl font-semibold text-white mb-2">{career.title}</h3>
              <p className="text-spotify-lightgray">{career.description}</p>
            </div>
          ))}
        </div>

        <h2 className="text-3xl font-bold text-white text-center mb-8">
          Browse by Category
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              title={category.name}
              description={category.description}
              gradient={category.gradient}
              onClick={() => navigate(`/search?category=${category.id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;