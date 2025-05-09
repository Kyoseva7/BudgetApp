import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/auth/register', { username, password });
      alert("Успешна регистрация!");
      navigate('/login');
    } catch {
      alert("Потребителското име вече съществува");
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Регистрация</h2>
      <input placeholder="Потребителско име" value={username} onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Парола" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Регистрирай се</button>
    </form>
  );
};

export default Register;
