import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      const { token } = res.data;

      localStorage.setItem('token', token);

      navigate('/profile');
    } catch (err) {
      console.error(err);
      setError('Invalid email or password');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type='email'
        placeholder='Email'
        onChange={e => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <input
        type='password'
        placeholder='Password'
        onChange={e => setFormData({ ...formData, password: e.target.value })}
        required
      />
      <button type='submit'>Login</button>
    </form>
  );
}
