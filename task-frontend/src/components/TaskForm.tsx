import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { addTask } from "../services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const taskSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

type TaskFormInputs = z.infer<typeof taskSchema>;

export default function TaskForm() {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm<TaskFormInputs>({
    resolver: zodResolver(taskSchema),
  });

  const mutation = useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      reset();
    },
  });

  const onSubmit = (data: TaskFormInputs) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: 20 }}>
      <input placeholder="Titre" {...register("title")} />
      <input placeholder="Description" {...register("description")} />
      <button type="submit">Ajouter</button>
    </form>
  );
}
