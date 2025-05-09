import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Report from './components/Report';
import AddTransaction from './components/AddTransaction';
import Budget from './components/Budget';
import BudgetOverview from './components/BudgetOverview';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import CategoryManager from './components/CategoryManager';

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

          <Route path="/report" element={
            <ProtectedRoute token={token}>
              <Report />
            </ProtectedRoute>
          } />

          <Route path="/add-transaction" element={
            <ProtectedRoute token={token}>
              <AddTransaction />
            </ProtectedRoute>
          } />

          <Route path="/budget" element={
            <ProtectedRoute token={token}>
              <Budget />
            </ProtectedRoute>
          } />

          <Route path="/overview" element={
            <ProtectedRoute token={token}>
              <BudgetOverview />
            </ProtectedRoute>
          } />
          <Route path="/categories" element={
            <ProtectedRoute token={token}>
              <CategoryManager />
            </ProtectedRoute>
          } />

        </Routes>

      </div>
    </Router>
  );
};

export default App;
