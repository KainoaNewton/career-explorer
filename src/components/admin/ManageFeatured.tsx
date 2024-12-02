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
    console.log('Attempting to toggle featured status:', { id, currentValue });
    
    try {
      // First, verify the career exists
      const { data: existingCareer, error: fetchError } = await supabase
        .from('careers')
        .select('id, featured')
        .eq('id', id)
        .single();

      if (fetchError) {
        console.error('Error fetching career:', fetchError);
        throw new Error('Failed to verify career exists');
      }

      if (!existingCareer) {
        console.error('Career not found:', id);
        throw new Error('Career not found');
      }

      console.log('Current career state:', existingCareer);

      // Perform the update
      const newValue = !currentValue;
      console.log('Updating featured status to:', newValue);
      
      const { error: updateError } = await supabase
        .from('careers')
        .update({ featured: newValue })
        .eq('id', id);

      if (updateError) {
        console.error('Error updating career:', updateError);
        throw updateError;
      }

      // Invalidate and refetch
      await queryClient.invalidateQueries({ queryKey: ['careers'] });
      
      console.log('Successfully updated featured status');
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

  // Handle initial loading state
  if (isLoading) {
    console.log('Loading careers...');
    return <div>Loading careers...</div>;
  }

  // Handle error state
  if (error) {
    console.error('Error loading careers:', error);
    return (
      <div className="text-red-500">
        Error loading careers: {error instanceof Error ? error.message : 'Unknown error'}
      </div>
    );
  }

  // Handle no careers state
  if (!careers || careers.length === 0) {
    console.log('No careers found');
    return <div>No careers available.</div>;
  }

  console.log('Rendering careers:', careers);

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