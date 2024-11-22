import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { X } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";

const careerSchema = z.object({
  title: z.string().min(1, "Title is required"),
  category: z.string().min(1, "Category is required"),
  yearsOfEducation: z.string().min(1, "Years of education is required"),
  averageSalary: z.string().min(1, "Average salary is required"),
  description: z.string().min(1, "Description is required"),
  salaryMin: z.string().optional(),
  salaryMax: z.string().optional(),
});

export function CareerForm() {
  const { toast } = useToast();
  const [dailyTasks, setDailyTasks] = useState<string[]>([]);
  const [requiredSkills, setRequiredSkills] = useState<string[]>([]);
  const [newTask, setNewTask] = useState("");
  const [newSkill, setNewSkill] = useState("");

  const form = useForm<z.infer<typeof careerSchema>>({
    resolver: zodResolver(careerSchema),
    defaultValues: {
      title: "",
      category: "",
      yearsOfEducation: "",
      averageSalary: "",
      description: "",
      salaryMin: "",
      salaryMax: "",
    },
  });

  const addTask = () => {
    if (newTask.trim()) {
      setDailyTasks([...dailyTasks, newTask.trim()]);
      setNewTask("");
    }
  };

  const removeTask = (index: number) => {
    setDailyTasks(dailyTasks.filter((_, i) => i !== index));
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setRequiredSkills([...requiredSkills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (index: number) => {
    setRequiredSkills(requiredSkills.filter((_, i) => i !== index));
  };

  const onSubmit = async (values: z.infer<typeof careerSchema>) => {
    try {
      const { error } = await supabase.from("careers").insert([{
        ...values,
        yearsOfEducation: parseInt(values.yearsOfEducation),
        dailyTasks,
        requiredSkills,
      }]);

      if (error) throw error;

      toast({
        title: "Career added successfully",
      });

      form.reset();
      setDailyTasks([]);
      setRequiredSkills([]);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Software Engineer" className="bg-spotify-black text-white border-spotify-lightgray" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Category</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Technology" className="bg-spotify-black text-white border-spotify-lightgray" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="yearsOfEducation"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Years of Education</FormLabel>
              <FormControl>
                <Input type="number" placeholder="e.g. 4" className="bg-spotify-black text-white border-spotify-lightgray" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="averageSalary"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Average Salary</FormLabel>
              <FormControl>
                <Input placeholder="e.g. $80,000" className="bg-spotify-black text-white border-spotify-lightgray" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="salaryMin"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Minimum Salary (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="e.g. $60,000" className="bg-spotify-black text-white border-spotify-lightgray" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="salaryMax"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Maximum Salary (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="e.g. $100,000" className="bg-spotify-black text-white border-spotify-lightgray" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe the career..." className="bg-spotify-black text-white border-spotify-lightgray" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <FormLabel className="text-white">Daily Tasks</FormLabel>
          <div className="flex gap-2">
            <Input
              placeholder="Add a daily task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="bg-spotify-black text-white border-spotify-lightgray"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTask())}
            />
            <Button 
              type="button"
              onClick={addTask}
              className="bg-spotify-green hover:bg-spotify-green/90"
            >
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {dailyTasks.map((task, index) => (
              <div key={index} className="flex items-center bg-spotify-darkgray text-white px-3 py-1 rounded-full">
                <span>{task}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="ml-2 h-auto p-0 hover:bg-transparent"
                  onClick={() => removeTask(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <FormLabel className="text-white">Required Skills</FormLabel>
          <div className="flex gap-2">
            <Input
              placeholder="Add a required skill"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="bg-spotify-black text-white border-spotify-lightgray"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
            />
            <Button 
              type="button"
              onClick={addSkill}
              className="bg-spotify-green hover:bg-spotify-green/90"
            >
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {requiredSkills.map((skill, index) => (
              <div key={index} className="flex items-center bg-spotify-darkgray text-white px-3 py-1 rounded-full">
                <span>{skill}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="ml-2 h-auto p-0 hover:bg-transparent"
                  onClick={() => removeSkill(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <Button type="submit" className="w-full bg-spotify-green hover:bg-spotify-green/90">
          Add Career
        </Button>
      </form>
    </Form>
  );
}