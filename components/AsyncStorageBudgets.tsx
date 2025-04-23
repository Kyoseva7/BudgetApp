import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Budget {
  id: string;
  category: string;
  limit: number;
  spent: number;
}

// Функция за запазване на бюджетите в AsyncStorage
export const saveBudgets = async (budgets: Budget[]) => {
  try {
    await AsyncStorage.setItem('@budgets', JSON.stringify(budgets));
  } catch (e) {
    console.error('Error saving budgets', e);
  }
};

// Функция за зареждане на бюджетите от AsyncStorage
export const loadBudgets = async (): Promise<Budget[]> => {
  try {
    const savedBudgets = await AsyncStorage.getItem('@budgets');
    if (savedBudgets) {
      return JSON.parse(savedBudgets);
    }
    return [];
  } catch (e) {
    console.error('Error loading budgets', e);
    return [];
  }
};
