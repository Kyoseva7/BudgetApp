import React, { useState } from 'react';
import axios from '../api/axiosConfig';

const Login = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/login', { username, password });
      const token = res.data.token;
      localStorage.setItem('token', token);
      setToken(token);
    } catch {
      alert("Грешно потребителско име или парола");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Вход</h2>
      <input placeholder="Потребителско име" value={username} onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Парола" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Влез</button>
    </form>
  );
};

export default Login;
