// frontend/src/components/SavingsGoals.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SavingsGoals = () => {
  const [goals, setGoals] = useState([]);
  const [goalName, setGoalName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [currentAmount, setCurrentAmount] = useState('');
  const [targetDate, setTargetDate] = useState('');

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/goals');
        setGoals(response.data);
      } catch (error) {
        console.error('Грешка при зареждане на целите:', error);
      }
    };

    fetchGoals();
  }, []);

  const handleAddGoal = async () => {
    const newGoal = {
      goalName,
      targetAmount,
      currentAmount,
      targetDate,
    };

    try {
      await axios.post('http://localhost:8080/api/goals', newGoal);
      alert('Целта беше добавена успешно!');
    } catch (error) {
      console.error('Грешка при добавяне на целта:', error);
      alert('Имаше проблем при добавянето на целта.');
    }
  };

  return (
    <div>
      <h2>Цели за спестявания</h2>
      <h3>Съществуващи цели</h3>
      <ul>
        {goals.map((goal) => (
          <li key={goal.id}>
            {goal.goalName} - {goal.currentAmount}/{goal.targetAmount} лв. - До {goal.targetDate}
          </li>
        ))}
      </ul>
      <h3>Добави нова цел</h3>
      <label>Име на целта:</label>
      <input
        type="text"
        value={goalName}
        onChange={(e) => setGoalName(e.target.value)}
      />
      <label>Целева сума:</label>
      <input
        type="number"
        value={targetAmount}
        onChange={(e) => setTargetAmount(e.target.value)}
      />
      <label>Текуща сума:</label>
      <input
        type="number"
        value={currentAmount}
        onChange={(e) => setCurrentAmount(e.target.value)}
      />
      <label>Краен срок:</label>
      <input
        type="date"
        value={targetDate}
        onChange={(e) => setTargetDate(e.target.value)}
      />
      <button onClick={handleAddGoal}>Добави цел</button>
    </div>
  );
};

export default SavingsGoals;
