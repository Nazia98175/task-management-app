import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const client = axios.create({
  baseURL: API_URL
});

function extractErrorMessage(error, fallback) {
  return error.response?.data?.error || fallback;
}

export async function getTasks() {
  try {
    const { data } = await client.get('/tasks');
    return data;
  } catch (error) {
    throw new Error(extractErrorMessage(error, 'Failed to load tasks'));
  }
}

export async function createTask(task) {
  try {
    const { data } = await client.post('/tasks', task);
    return data;
  } catch (error) {
    throw new Error(extractErrorMessage(error, 'Failed to create task'));
  }
}

export async function updateTask(id, task) {
  try {
    const { data } = await client.put(`/tasks/${id}`, task);
    return data;
  } catch (error) {
    throw new Error(extractErrorMessage(error, 'Failed to update task'));
  }
}

export async function toggleTask(id) {
  try {
    const { data } = await client.patch(`/tasks/${id}/complete`);
    return data;
  } catch (error) {
    throw new Error(extractErrorMessage(error, 'Failed to update task status'));
  }
}

export async function deleteTask(id) {
  try {
    const { data } = await client.delete(`/tasks/${id}`);
    return data;
  } catch (error) {
    throw new Error(extractErrorMessage(error, 'Failed to delete task'));
  }
}
