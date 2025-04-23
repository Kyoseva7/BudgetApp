import React, { useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TextInput } from 'react-native';

interface Expense {
  id: string;
  name: string;
  amount: number;
}

interface ExpenseListProps {
  expenses: Expense[];
  onDeleteExpense: (id: string) => void;
  onEditExpense: (id: string, newName: string, newAmount: number) => void;
  onAddExpense: (newExpense: Expense) => void; // Добавяме onAddExpense като пропс
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onDeleteExpense, onEditExpense, onAddExpense }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedName, setEditedName] = useState('');
  const [editedAmount, setEditedAmount] = useState('');
  const [newExpenseName, setNewExpenseName] = useState(''); // За нов разход
  const [newExpenseAmount, setNewExpenseAmount] = useState(''); // За нов разход

  const handleEdit = (id: string, name: string, amount: number) => {
    setEditingId(id);
    setEditedName(name);
    setEditedAmount(amount.toString());
  };

  const handleSave = (id: string) => {
    onEditExpense(id, editedName, parseFloat(editedAmount));
    setEditingId(null);
  };

  // Функция за добавяне на нов разход
  const handleAddNewExpense = () => {
    const newExpense: Expense = {
      id: Math.random().toString(), // Генерираме уникално ID за новия разход
      name: newExpenseName,
      amount: parseFloat(newExpenseAmount),
    };
    onAddExpense(newExpense);
    setNewExpenseName('');
    setNewExpenseAmount('');
  };

  return (
    <View>
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
      <Button title="Добави разход" onPress={handleAddNewExpense} />

      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.expenseItem}>
            {editingId === item.id ? (
              <>
                <TextInput
                  style={styles.input}
                  value={editedName}
                  onChangeText={setEditedName}
                />
                <TextInput
                  style={styles.input}
                  value={editedAmount}
                  onChangeText={setEditedAmount}
                  keyboardType="numeric"
                />
                <Button title="Запази" onPress={() => handleSave(item.id)} />
                <Button title="Отказ" onPress={() => setEditingId(null)} color="gray" />
              </>
            ) : (
              <>
                <Text>{item.name}: ${item.amount.toFixed(2)}</Text>
                <View style={styles.buttonContainer}>
                  <Button title="Редактирай" onPress={() => handleEdit(item.id, item.name, item.amount)} color="blue" />
                  <Button title="Изтрий" onPress={() => onDeleteExpense(item.id)} color="red" />
                </View>
              </>
            )}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#000',
    padding: 5,
    marginBottom: 5,
    width: 150,
  },
});

export default ExpenseList;
