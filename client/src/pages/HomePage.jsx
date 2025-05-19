import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to SkillSwap!</h1>
      <p>Connect with others to swap skills and grow together.</p>
      <div style={{ marginTop: '20px' }}>
        <button onClick={() => navigate('/register')} style={{ marginRight: '10px' }}>
          Register
        </button>
        <button onClick={() => navigate('/login')}>
          Login
        </button>
      </div>
    </div>
  );
}
