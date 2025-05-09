import React, { useEffect, useState } from 'react';
import axios from '../api/axiosConfig';

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [type, setType] = useState('expense');

  const fetchCategories = async () => {
    const res = await axios.get('/categories');
    setCategories(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/categories', { name, type });
    setName('');
    fetchCategories();
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <h2>Категории</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Име" value={name} onChange={e => setName(e.target.value)} />
        <select value={type} onChange={e => setType(e.target.value)}>
          <option value="expense">Разход</option>
          <option value="income">Приход</option>
        </select>
        <button type="submit">Добави</button>
      </form>

      <ul>
        {categories.map(cat => (
          <li key={cat.id}>{cat.name} ({cat.type})</li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryManager;
