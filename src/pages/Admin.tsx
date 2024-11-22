import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminAuth } from "@/components/admin/AdminAuth";
import { CareerForm } from "@/components/admin/CareerForm";
import { ArticleForm } from "@/components/admin/ArticleForm";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return <AdminAuth onAuthenticated={setIsAuthenticated} />;
  }

  return (
    <div className="min-h-screen bg-spotify-black p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="bg-spotify-darkgray text-white hover:bg-spotify-darkgray/90 border-spotify-lightgray"
          >
            Back to Home
          </Button>
        </div>

        <Tabs defaultValue="careers" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-spotify-darkgray">
            <TabsTrigger value="careers" className="text-white data-[state=active]:bg-spotify-green">
              Add Career
            </TabsTrigger>
            <TabsTrigger value="articles" className="text-white data-[state=active]:bg-spotify-green">
              Add Article
            </TabsTrigger>
          </TabsList>

          <TabsContent value="careers" className="bg-spotify-darkgray p-6 rounded-lg mt-4">
            <CareerForm />
          </TabsContent>

          <TabsContent value="articles" className="bg-spotify-darkgray p-6 rounded-lg mt-4">
            <ArticleForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;