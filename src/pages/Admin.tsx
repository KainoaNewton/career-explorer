import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminAuth } from "@/components/admin/AdminAuth";
import { CareerForm } from "@/components/admin/CareerForm";
import { ArticleForm } from "@/components/admin/ArticleForm";
import { ManageArticles } from "@/components/admin/ManageArticles";
import { ManageCareers } from "@/components/admin/ManageCareers";
import { ManageFeatured } from "@/components/admin/ManageFeatured";
import { supabase } from "@/lib/supabase";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

  if (isLoading) {
    return <div className="min-h-screen bg-spotify-black flex items-center justify-center">
      <div className="text-white">Loading...</div>
    </div>;
  }

  if (!isAuthenticated) {
    return <AdminAuth onAuthenticated={setIsAuthenticated} />;
  }

  return (
    <div className="min-h-screen bg-spotify-black p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <div className="space-x-4">
            <Button
              variant="outline"
              onClick={async () => {
                await supabase.auth.signOut();
                setIsAuthenticated(false);
              }}
              className="bg-spotify-darkgray text-white hover:bg-spotify-darkgray/90 border-spotify-lightgray"
            >
              Sign Out
            </Button>
            <Button
              variant="outline"
              onClick={() => window.location.href = "https://careerexplorer.vercel.app/"}
              className="bg-spotify-darkgray text-white hover:bg-spotify-darkgray/90 border-spotify-lightgray"
            >
              Back to Home
            </Button>
          </div>
        </div>

        <Tabs defaultValue="add-career" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-spotify-darkgray">
            <TabsTrigger value="add-career" className="text-white data-[state=active]:bg-spotify-green">
              Add Career
            </TabsTrigger>
            <TabsTrigger value="manage-careers" className="text-white data-[state=active]:bg-spotify-green">
              Manage Careers
            </TabsTrigger>
            <TabsTrigger value="featured-careers" className="text-white data-[state=active]:bg-spotify-green">
              Featured Careers
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

          <TabsContent value="featured-careers" className="bg-spotify-darkgray p-6 rounded-lg mt-4">
            <ManageFeatured />
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

export default Admin;