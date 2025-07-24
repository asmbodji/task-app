import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTasks, deleteTask, toggleTaskStatus } from "../services/api";

type Task = {
  id: string;
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

  const toggleMutation = useMutation({
    mutationFn: toggleTaskStatus,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  if (isLoading) return <p>Chargement...</p>;

  return (
    <ul className="space-y-4">
      {tasks.map((task: Task) => (
        <li
          key={task.id}
          className="bg-gray-100 p-4 rounded shadow-sm flex justify-between items-center"
        >
          <div>
            <p className="font-semibold">{task.title}</p>
            <p className="text-sm text-gray-600">{task.description}</p>
            <span
              className={`text-xs px-2 py-1 rounded ${
                task.status === "done"
                  ? "bg-green-200 text-green-800"
                  : "bg-yellow-200 text-yellow-800"
              }`}
            >
              {task.status}
            </span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => toggleMutation.mutate(task.id)}
              className="text-green-600 hover:text-green-800 font-bold"
              title="Basculer statut"
            >
              ✓
            </button>
            <button
              onClick={() => deleteMutation.mutate(task.id)}
              className="text-red-500 hover:text-red-700 font-bold"
              title="Supprimer"
            >
              🗑️
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

