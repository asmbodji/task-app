import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-100 text-gray-900 p-6">
        <div className="max-w-xl mx-auto bg-white shadow-xl rounded-xl p-6">
          <h1 className="text-2xl font-bold mb-4 text-center">📝 Gestionnaire de Tâches</h1>
          <TaskForm />
          <TaskList />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;


