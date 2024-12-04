import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCareers } from "@/lib/careers";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/lib/supabase";
import { toast } from "@/components/ui/use-toast";

export function ManageFeatured() {
  const queryClient = useQueryClient();
  const { data: careers, isLoading, error } = useQuery({
    queryKey: ['careers'],
    queryFn: getCareers
  });

  const toggleFeatured = async (id: string, currentValue: boolean) => {
    try {
      const newValue = !currentValue;
      
      const { error: updateError } = await supabase
        .from('careers')
        .update({ featured: newValue })
        .eq('id', id)
        .select()
        .single();

      if (updateError) {
        console.error('Error updating career:', updateError);
        throw updateError;
      }

      // Invalidate and refetch
      await queryClient.invalidateQueries({ queryKey: ['careers'] });
      
      toast({
        title: "Success",
        description: `Career ${newValue ? 'featured' : 'unfeatured'} successfully`,
      });
    } catch (error) {
      console.error('Error in toggleFeatured:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update featured status",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div>Loading careers...</div>;
  }

  if (error) {
    return (
      <div className="text-red-500">
        Error loading careers: {error instanceof Error ? error.message : 'Unknown error'}
      </div>
    );
  }

  if (!careers || careers.length === 0) {
    return <div>No careers available.</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-white">Manage Featured Careers</h2>
      <div className="space-y-2">
        {careers.map((career) => (
          <div key={career.id} className="flex items-center justify-between p-4 bg-spotify-darkgray rounded-lg">
            <div>
              <h3 className="font-medium text-white">{career.title}</h3>
              <p className="text-sm text-gray-400">{career.category}</p>
            </div>
            <Checkbox
              checked={career.featured || false}
              onCheckedChange={() => toggleFeatured(career.id, career.featured || false)}
              className="border-spotify-green data-[state=checked]:bg-spotify-green data-[state=checked]:text-white"
            />
          </div>
        ))}
      </div>
    </div>
  );
}