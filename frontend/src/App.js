import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Report from './components/Report';
import AddTransaction from './components/AddTransaction';
import Budget from './components/Budget';
import BudgetOverview from './components/BudgetOverview';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <Router>
      <div>
        <nav>
          <ul>
            {!token && <li><Link to="/login">Вход</Link></li>}
            {!token && <li><Link to="/register">Регистрация</Link></li>}
            {token && (
              <>
                <li><Link to="/report">Отчет</Link></li>
                <li><Link to="/add-transaction">Добави транзакция</Link></li>
                <li><Link to="/budget">Бюджет</Link></li>
                <li><Link to="/overview">Общ преглед</Link></li>
                <li><button onClick={() => {
                  localStorage.removeItem('token');
                  setToken(null);
                }}>Изход</button></li>
              </>
            )}
          </ul>
        </nav>

        <Routes>
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/report" element={<Report />} />
          <Route path="/add-transaction" element={<AddTransaction />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/overview" element={<BudgetOverview />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
