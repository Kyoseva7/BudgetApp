// frontend/src/components/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <h2>Добре дошъл в приложението за бюджет!</h2>
      <p>Избери какво искаш да направиш:</p>
      <ul>
        <li><Link to="/add-transaction">Добави транзакция</Link></li>
        <li><Link to="/budget">Управление на бюджет</Link></li>
        <li><Link to="/report">Генерирай отчет</Link></li>
        <li><Link to="/overview">Общ преглед</Link></li>
      </ul>
    </div>
  );
};

export default Dashboard;
