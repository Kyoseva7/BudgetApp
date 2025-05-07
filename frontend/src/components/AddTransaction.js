import React, { useState } from 'react';
import axios from '../api/axiosConfig';

const AddTransaction = () => {
  const [userId, setUserId] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('INCOME'); // или EXPENSE
  const [date, setDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/transactions', {
        userId,
        amount,
        category,
        type,
        date
      });
      alert('Успешно добавена транзакция');
    } catch (err) {
      alert('Грешка при добавяне на транзакция');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Добави Транзакция</h2>
      <input placeholder="User ID" value={userId} onChange={e => setUserId(e.target.value)} required />
      <input placeholder="Сума" type="number" value={amount} onChange={e => setAmount(e.target.value)} required />
      <input placeholder="Категория" value={category} onChange={e => setCategory(e.target.value)} required />
      <select value={type} onChange={e => setType(e.target.value)}>
        <option value="INCOME">Приход</option>
        <option value="EXPENSE">Разход</option>
      </select>
      <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
      <button type="submit">Добави</button>
    </form>
  );
};

export default AddTransaction;
