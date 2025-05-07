// frontend/src/components/TransactionForm.js
import React, { useState } from 'react';
import axios from 'axios';
import Notification from './Notification';

const TransactionForm = () => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('expense'); // "expense" или "income"
  const [date, setDate] = useState('');
  const [userId, setUserId] = useState(1); // Пример: задаваме фиксирано ID за тестови потребител
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const transactionData = {
      amount,
      category,
      type,
      date,
      userId,
    };

    try {
       await axios.post('http://localhost:8080/api/transactions', transactionData);
       setMessage('Транзакцията беше успешно добавена!');
       setMessageType('success');
       setAmount('');
       setCategory('');
     } catch (error) {
       setMessage('Възникна грешка при добавянето на транзакцията!');
       setMessageType('error');
     }
   };

  return (
      <div>
        {message && <Notification message={message} type={messageType} />}
        <h2>Добави нова транзакция</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            placeholder="Сума"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <input
            type="text"
            placeholder="Категория"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="income">Приход</option>
            <option value="expense">Разход</option>
          </select>
          <button type="submit">Запази транзакцията</button>
        </form>
      </div>
    );
  };

  export default TransactionForm;