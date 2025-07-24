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
          <button
            onClick={() => deleteMutation.mutate(task.id)}
            className="text-red-500 hover:text-red-700 font-bold"
          >
            Supprimer
          </button>
        </li>
      ))}
    </ul>
  );
}

