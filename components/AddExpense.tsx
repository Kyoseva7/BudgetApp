import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';

interface ExpenseData {
  amount: string;
  category: string;
  description: string;
}

const AddExpense: React.FC = () => {
  const [expenseData, setExpenseData] = useState<ExpenseData>({
    amount: '',
    category: '',
    description: '',
  });

  const handleInputChange = (field: keyof ExpenseData, value: string) => {
    setExpenseData({ ...expenseData, [field]: value });
  };

  const handleSubmit = () => {
    // Тук ще добавим логика за записване на данните в база или състояние
    console.log('Added expense:', expenseData);
    setExpenseData({ amount: '', category: '', description: '' }); // Изчистваме полетата
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Добави разход</Text>

      <TextInput
        style={styles.input}
        placeholder="Сума"
        keyboardType="numeric"
        value={expenseData.amount}
        onChangeText={(text) => handleInputChange('amount', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Категория"
        value={expenseData.category}
        onChangeText={(text) => handleInputChange('category', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Описание"
        value={expenseData.description}
        onChangeText={(text) => handleInputChange('description', text)}
      />

      <Button title="Добави" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
  },
});

export default AddExpense;
