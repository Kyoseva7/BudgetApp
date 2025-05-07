// frontend/src/components/BudgetOverview.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BudgetOverview = () => {
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/budgets');
        setBudgets(response.data);
      } catch (error) {
        console.error('Грешка при зареждане на бюджета:', error);
      }
    };

    fetchBudgets();
  }, []);

  return (
    <div>
      <h2>Преглед на бюджета</h2>
      <table>
        <thead>
          <tr>
            <th>Категория</th>
            <th>Лимит</th>
            <th>Разходи</th>
            <th>Оставащо</th>
          </tr>
        </thead>
        <tbody>
          {budgets.map((budget) => (
            <tr key={budget.id}>
              <td>{budget.category}</td>
              <td>{budget.limit}</td>
              <td>{budget.spent}</td>
              <td>{budget.limit - budget.spent}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BudgetOverview;
