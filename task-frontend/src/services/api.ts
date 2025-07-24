import axios from "axios";

// URL de l'API (définie via variable d'environnement Vercel)
const API_URL = process.env.REACT_APP_API_URL!;

// Obtenir toutes les tâches
export const getTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Ajouter une tâche
export const addTask = async (data: { title: string; description: string }) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

// Supprimer une tâche
export const deleteTask = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
};
