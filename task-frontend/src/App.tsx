import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <h1>Gestionnaire de tâches</h1>
      <TaskForm />
      <TaskList />
    </QueryClientProvider>
  );
}

export default App;

