import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getArticles, deleteArticle } from "@/lib/articles";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function ManageArticles() {
  const queryClient = useQueryClient();
  const { data: articles, isLoading } = useQuery({
    queryKey: ['articles'],
    queryFn: getArticles
  });

  const handleDelete = async (id: string) => {
    await deleteArticle(id);
    queryClient.invalidateQueries({ queryKey: ['articles'] });
  };

  if (isLoading) return <div>Loading articles...</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-white">Manage Articles</h2>
      <div className="space-y-2">
        {articles?.map((article) => (
          <div key={article.id} className="flex items-center justify-between p-4 bg-spotify-darkgray rounded-lg">
            <div>
              <h3 className="font-medium text-white">{article.title}</h3>
              <p className="text-sm text-gray-400">{article.category}</p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the article.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleDelete(article.id)}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        ))}
      </div>
    </div>
  );
}