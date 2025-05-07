import React, { useState, useEffect } from 'react';
import axios from '../api/axiosConfig';

const Budget = () => {
  const [userId, setUserId] = useState('');
  const [budgets, setBudgets] = useState([]);

  const fetchBudgets = async () => {
    try {
      const res = await axios.get('/budgets', {
        params: { userId }
      });
      setBudgets(res.data);
    } catch (err) {
      console.error('Грешка при зареждане на бюджети:', err);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchBudgets();
    }
  }, [userId]);

  return (
    <div>
      <h2>Бюджети по категории</h2>
      <input placeholder="User ID" value={userId} onChange={e => setUserId(e.target.value)} />
      {budgets.map((b, i) => (
        <div key={i}>
          <p>Категория: {b.category}</p>
          <p>Лимит: {b.limitAmount} лв</p>
        </div>
      ))}
    </div>
  );
};

export default Budget;
