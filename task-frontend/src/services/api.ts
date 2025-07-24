import axios from "axios";

const API_URL = "http://localhost:3001/tasks";

export const getTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addTask = async (data: { title: string; description: string }) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

export const deleteTask = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
};
