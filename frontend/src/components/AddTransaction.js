import React, { useState, useEffect } from 'react';
import axios from '../api/axiosConfig';

const AddTransaction = () => {
  const [userId, setUserId] = useState('');
  const [amount, setAmount] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [type, setType] = useState('INCOME'); // или EXPENSE
  const [date, setDate] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Зареждаме категориите от API-то при стартиране на компонента
    axios.get('http://localhost:8080/api/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error("Грешка при зареждане на категориите:", error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Подаваме данните за транзакцията към backend API-то
      await axios.post('http://localhost:8080/api/transactions', {
        userId,
        amount,
        category: { id: categoryId }, // Използваме categoryId
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
      <input
        placeholder="User ID"
        value={userId}
        onChange={e => setUserId(e.target.value)}
        required
      />
      <input
        placeholder="Сума"
        type="number"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        required
      />
      <select
        value={categoryId}
        onChange={e => setCategoryId(e.target.value)}
        required
      >
        <option value="">Избери категория</option>
        {categories.map(category => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <select value={type} onChange={e => setType(e.target.value)} required>
        <option value="INCOME">Приход</option>
        <option value="EXPENSE">Разход</option>
      </select>
      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
        required
      />
      <button type="submit">Добави</button>
    </form>
  );
};

export default AddTransaction;
