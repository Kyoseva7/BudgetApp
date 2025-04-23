import AsyncStorage from '@react-native-async-storage/async-storage';
import { Expense } from '../screens/HomeScreen';

// Функция за запазване на разходите в AsyncStorage
export const saveExpenses = async (expenses: Expense[]) => {
  try {
    await AsyncStorage.setItem('@expenses', JSON.stringify(expenses));
  } catch (e) {
    console.error('Error saving expenses', e);
  }
};

// Функция за зареждане на разходите от AsyncStorage
export const loadExpenses = async (): Promise<Expense[]> => {
  try {
    const savedExpenses = await AsyncStorage.getItem('@expenses');
    if (savedExpenses) {
      return JSON.parse(savedExpenses);
    }
    return [];
  } catch (e) {
    console.error('Error loading expenses', e);
    return [];
  }
};

