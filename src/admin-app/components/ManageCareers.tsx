import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

const ManageCareers = () => {
  const { control, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const { error } = await supabase
      .from("careers")
      .insert([{ title: data.title, description: data.description }]);

    if (error) {
      console.error("Error inserting data:", error);
    } else {
      // Handle successful insertion (e.g., show a success message)
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium">
          Career Title
        </label>
        <Controller
          name="title"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <input
              {...field}
              type="text"
              id="title"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          )}
        />
      </div>
      
      <div>
        <label htmlFor="description" className="block text-sm font-medium">
          Career Description
        </label>
        <Controller
          name="description"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <textarea
              {...field}
              id="description"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          )}
        />
      </div>

      <Button type="submit" variant="outline" className="bg-spotify-darkgray text-white hover:bg-spotify-darkgray/90 border-spotify-lightgray">
        Add Career
      </Button>
    </form>
  );
};

export default ManageCareers;
