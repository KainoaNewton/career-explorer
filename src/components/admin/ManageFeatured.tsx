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
      const { error } = await supabase
        .from('careers')
        .update({ featured: !currentValue })
        .eq('id', id);

      if (error) throw error;

      queryClient.invalidateQueries({ queryKey: ['careers'] });
      
      toast({
        title: `Career ${!currentValue ? 'added to' : 'removed from'} featured section`,
      });
    } catch (error: any) {
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
              onCheckedChange={() => toggleFeatured(career.id, career.featured || false)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}