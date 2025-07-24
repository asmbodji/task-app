import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { addTask } from "../services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const taskSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  description: z.string().min(1, "La description est requise"),
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-6">
      <input
        className="w-full border border-gray-300 rounded p-2"
        placeholder="Titre"
        {...register("title")}
      />
      <input
        className="w-full border border-gray-300 rounded p-2"
        placeholder="Description"
        {...register("description")}
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Ajouter la tâche
      </button>
    </form>
  );
}

