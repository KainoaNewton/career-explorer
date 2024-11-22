import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";
import { FormFields, careerSchema } from "./career-form/FormFields";
import { TagInput } from "./career-form/TagInput";
import * as z from "zod";

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
        averageSalary: values.salaryMax ? `$${Math.floor((parseInt(values.salaryMin || "0") + parseInt(values.salaryMax)) / 2).toLocaleString()}` : "Not specified"
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
        <FormFields form={form} />

        <TagInput
          label="Daily Tasks"
          tags={dailyTasks}
          newTag={newTask}
          setNewTag={setNewTask}
          addTag={addTask}
          removeTag={removeTask}
          placeholder="Add a daily task"
        />

        <TagInput
          label="Required Skills"
          tags={requiredSkills}
          newTag={newSkill}
          setNewTag={setNewSkill}
          addTag={addSkill}
          removeTag={removeSkill}
          placeholder="Add a required skill"
        />

        <Button type="submit" className="w-full bg-spotify-green hover:bg-spotify-green/90">
          Add Career
        </Button>
      </form>
    </Form>
  );
}