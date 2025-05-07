// frontend/src/components/ReportGeneration.js
import React, { useState } from 'react';
import axios from 'axios';
import Notification from './Notification';

const ReportGeneration = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [report, setReport] = useState(null);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

 const handleGenerateReport = async () => {
     try {
       const response = await axios.get(`http://localhost:8080/api/reports`, {
         params: { startDate, endDate },
       });
       setReport(response.data);
       setMessage('Отчетът беше успешно генериран!');
       setMessageType('success');
     } catch (error) {
       setMessage('Грешка при генерирането на отчета!');
       setMessageType('error');
     }
   };

  return (
      <div>
        {message && <Notification message={message} type={messageType} />}
        <h2>Генериране на финансов отчет</h2>
        <label>Начална дата:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <label>Крайна дата:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button onClick={handleGenerateReport}>Генерирай отчет</button>

        {report && (
          <div>
            <h3>Отчет за периода от {startDate} до {endDate}</h3>
            <p>Общо приходи: {report.incomeTotal}</p>
            <p>Общо разходи: {report.expenseTotal}</p>
            <h4>Разбивка по категории:</h4>
            <ul>
              {Object.entries(report.categoriesBreakdown).map(([category, amount]) => (
                <li key={category}>{category}: {amount}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  export default ReportGeneration;
