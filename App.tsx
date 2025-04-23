import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import AddExpense from './components/AddExpense'; // Провери дали пътят е верен

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>

      {/* Това ще добави AddExpense извън навигацията */}
      <View style={styles.container}>
        <Text style={styles.title}>BudgetApp</Text>
        <Text style={styles.subtitle}>Управление на личния бюджет</Text>
        <AddExpense />
      </View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default App;
