import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";

const ManageFeatured = () => {
  const [featuredJobs, setFeaturedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedJobs = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("featured_jobs")
        .select("*");
      if (error) console.error(error);
      else setFeaturedJobs(data);
      setLoading(false);
    };

    fetchFeaturedJobs();
  }, []);

  const handleRemoveFeatured = async (id) => {
    const { error } = await supabase
      .from("featured_jobs")
      .delete()
      .eq("id", id);
    if (error) console.error(error);
    else setFeaturedJobs(featuredJobs.filter(job => job.id !== id));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-lg font-bold">Manage Featured Jobs</h2>
      <ul>
        {featuredJobs.map(job => (
          <li key={job.id} className="flex justify-between items-center">
            <span>{job.title}</span>
            <Button
              variant="outline"
              onClick={() => handleRemoveFeatured(job.id)}
              className="text-red-500 hover:text-red-700"
            >
              Remove
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageFeatured;
