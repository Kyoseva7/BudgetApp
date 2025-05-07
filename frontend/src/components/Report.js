// frontend/src/components/Report.js
import React, { useState } from 'react';
import axios from 'axios';

const Report = () => {
  const [userId, setUserId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [report, setReport] = useState(null);

  const fetchReport = async () => {
    try {
      const response = await axios.get('/reports', {
        params: {
          userId,
          startDate,
          endDate
        }
      });
      setReport(response.data);
    } catch (error) {
      console.error('Грешка при взимането на отчет:', error);
    }
  };

  return (
    <div>
      <h2>Финансов отчет</h2>
      <div>
        <label>Потребител ID:</label>
        <input value={userId} onChange={(e) => setUserId(e.target.value)} />
        <label>Начална дата:</label>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <label>Крайна дата:</label>
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        <button onClick={fetchReport}>Генерирай отчет</button>
      </div>

      {report && (
        <div>
          <h3>Общ приход: {report.incomeTotal} лв</h3>
          <h3>Общ разход: {report.expenseTotal} лв</h3>
          <h4>Разбивка по категории:</h4>
          <ul>
            {Object.entries(report.categoryBreakdown).map(([category, amount]) => (
              <li key={category}>{category}: {amount} лв</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Report;
