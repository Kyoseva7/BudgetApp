import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, TextInput, Button, StyleSheet, Text } from 'react-native';
import ExpenseList from '../components/ExpenseList';
import { fetchExpenses, addExpense, updateExpense, deleteExpense } from '../components/api';

export interface Expense {
  id: string;
  name: string;
  amount: number;
}

const HomeScreen: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [newExpenseName, setNewExpenseName] = useState('');
  const [newExpenseAmount, setNewExpenseAmount] = useState('');

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchExpenses();
      setExpenses(data);
      setLoading(false);
    };
    loadData();
  }, []);

  const handleAddExpense = async () => {
    if (!newExpenseName || !newExpenseAmount) {
      return;
    }

    const newExpense: Expense = {
      id: Math.random().toString(),
      name: newExpenseName,
      amount: parseFloat(newExpenseAmount),
    };

    const savedExpense = await addExpense(newExpense);
    if (savedExpense) {
      setExpenses([...expenses, savedExpense]);
    }

    setNewExpenseName('');
    setNewExpenseAmount('');
  };

  const handleDeleteExpense = async (id: string) => {
    await deleteExpense(id);
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const handleEditExpense = async (id: string, newName: string, newAmount: number) => {
    const updatedExpense = { id, name: newName, amount: newAmount };
    await updateExpense(id, updatedExpense);
    setExpenses(expenses.map(expense => (expense.id === id ? updatedExpense : expense)));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Добави разход</Text>

      <TextInput
        style={styles.input}
        placeholder="Име на разход"
        value={newExpenseName}
        onChangeText={setNewExpenseName}
      />
      <TextInput
        style={styles.input}
        placeholder="Сума"
        value={newExpenseAmount}
        onChangeText={setNewExpenseAmount}
        keyboardType="numeric"
      />
      <Button title="Добави" onPress={handleAddExpense} />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ExpenseList
          expenses={expenses}
          onDeleteExpense={handleDeleteExpense}
          onEditExpense={handleEditExpense}
          onAddExpense={handleAddExpense}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
});

export default HomeScreen;
