import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTasks, deleteTask } from "../services/api";

type Task = {
  id: number;
  title: string;
  description: string;
  status: "pending" | "done";
};

export default function TaskList() {
  const queryClient = useQueryClient();
  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  if (isLoading) return <p>Chargement...</p>;

  return (
    <ul>
      {tasks.map((task: Task) => (
        <li key={task.id}>
          <strong>{task.title}</strong>: {task.description} ({task.status})
          <button onClick={() => deleteMutation.mutate(task.id)}>Supprimer</button>
        </li>
      ))}
    </ul>
  );
}
