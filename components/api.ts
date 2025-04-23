import axios from 'axios';
import { Expense } from '../screens/HomeScreen';

const API_BASE_URL = 'http://localhost:3000'; // Промени на правилния адрес на бекенда

// Извличане на всички разходи
export const fetchExpenses = async (): Promise<Expense[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/expenses`);
    return response.data;
  } catch (error) {
    console.error('Error fetching expenses:', error);
    return [];
  }
};

// Добавяне на нов разход
export const addExpense = async (expense: Expense): Promise<Expense | null> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/expenses`, expense);
    return response.data;
  } catch (error) {
    console.error('Error adding expense:', error);
    return null;
  }
};

// Редактиране на разход
export const updateExpense = async (id: string, updatedExpense: Expense) => {
  try {
    await axios.put(`${API_BASE_URL}/expenses/${id}`, updatedExpense);
  } catch (error) {
    console.error('Error updating expense:', error);
  }
};

// Изтриване на разход
export const deleteExpense = async (id: string) => {
  try {
    await axios.delete(`${API_BASE_URL}/expenses/${id}`);
  } catch (error) {
    console.error('Error deleting expense:', error);
  }
};
