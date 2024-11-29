import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCareers } from "@/lib/careers";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";

export function ManageFeatured() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: careers, isLoading } = useQuery({
    queryKey: ['careers'],
    queryFn: getCareers
  });

  const toggleFeatured = async (id: string, currentValue: boolean) => {
    try {
      // First, update the UI optimistically
      queryClient.setQueryData(['careers'], (oldData: any) => {
        return oldData?.map((career: any) =>
          career.id === id ? { ...career, featured: !currentValue } : career
        );
      });

      // Then perform the actual update
      const { data, error } = await supabase
        .from('careers')
        .update({
          featured: !currentValue
        })
        .eq('id', id)
        .select('*')
        .single();

      if (error) {
        // If there's an error, revert the optimistic update
        queryClient.invalidateQueries({ queryKey: ['careers'] });
        throw error;
      }

      // Show success message
      toast({
        title: `Career ${!currentValue ? 'added to' : 'removed from'} featured section`,
      });

      // Refresh the data to ensure consistency
      await queryClient.invalidateQueries({ queryKey: ['careers'] });
    } catch (error: any) {
      console.error('Error updating featured status:', error);
      toast({
        title: "Error updating featured status",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (isLoading) return <div>Loading careers...</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-white">Manage Featured Careers</h2>
      <p className="text-spotify-lightgray">Toggle careers to show them in the featured section on the homepage.</p>
      <div className="space-y-2">
        {careers?.map((career) => (
          <div key={career.id} className="flex items-center justify-between p-4 bg-spotify-darkgray rounded-lg">
            <div>
              <h3 className="font-medium text-white">{career.title}</h3>
              <p className="text-sm text-gray-400">{career.category}</p>
            </div>
            <Switch
              checked={career.featured || false}
              onCheckedChange={() => toggleFeatured(career.id, Boolean(career.featured))}
            />
          </div>
        ))}
      </div>
    </div>
  );
}