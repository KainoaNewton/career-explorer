import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormControl, FormDescription, FormLabel, FormMessage } from "@/components/ui/form";
import RichTextEditor from "./RichTextEditor";

const CareerForm = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <FormLabel htmlFor="title">Career Title</FormLabel>
        <Controller
          name="title"
          control={control}
          rules={{ required: "Title is required" }}
          render={({ field }) => (
            <FormControl>
              <input
                {...field}
                id="title"
                className="input"
                placeholder="Enter title"
              />
              {errors.title && (
                <FormMessage>
                  {errors.title.message as string}
                </FormMessage>
              )}
            </FormControl>
          )}
        />
      </div>

      <div className="space-y-2">
        <FormLabel htmlFor="description">Description</FormLabel>
        <Controller
          name="description"
          control={control}
          rules={{ required: "Description is required" }}
          render={({ field }) => (
            <FormControl>
              <RichTextEditor {...field} />
              {errors.description && (
                <FormMessage>
                  {errors.description.message as string}
                </FormMessage>
              )}
            </FormControl>
          )}
        />
      </div>

      <Button type="submit" className="w-full">
        Submit
      </Button>
    </form>
  );
};

export { CareerForm };