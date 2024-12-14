import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminAuth } from "@/components/admin/AdminAuth";
import { CareerForm } from "@/components/admin/CareerForm";
import { ArticleForm } from "@/components/admin/ArticleForm";
import { ManageArticles } from "@/components/admin/ManageArticles";
import { ManageCareers } from "@/components/admin/ManageCareers";
import { supabase } from "@/lib/supabase";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [careers, setCareers] = useState([]);

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

  if (isLoading) {
    return <div className="min-h-screen bg-spotify-black flex items-center justify-center">
      <div className="text-white">Loading...</div>
    </div>;
  }

  if (!isAuthenticated) {
    return <AdminAuth onAuthenticated={setIsAuthenticated} />;
  }

  // Get latest 3 careers (using array index since we don't have created_at)
  const latestCareers = careers ? [...careers].slice(-3).reverse() : [];

  return (
    <div className="min-h-screen bg-spotify-black p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-white">Latest Careers</h1>
        <ul className="space-y-4">
          {latestCareers.map((career) => (
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
};

export default Index;
