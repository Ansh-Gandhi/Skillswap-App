import React, { useState, useEffect } from 'react';

export default function ManageSkills() {
  const userId = 1;
  const [user, setUser] = useState({ offeredSkills: [], wantedSkills: [] });
  const [offerInput, setOfferInput] = useState('');
  const [wantInput, setWantInput]   = useState('');

  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => setUser(data));
  }, []);

  const refresh = () => {
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => setUser(data));
  };

  const addOffered = async () => {
    if (!offerInput) return;
    await fetch(`/api/users/${userId}/offered`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: offerInput })
    });
    setOfferInput('');
    refresh();
  };

  const removeOffered = async (skillId) => {
    await fetch(`/api/users/${userId}/offered/${skillId}`, { method: 'DELETE' });
    refresh();
  };

  const addWanted = async () => {
    if (!wantInput) return;
    await fetch(`/api/users/${userId}/wanted`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: wantInput })
    });
    setWantInput('');
    refresh();
  };

  const removeWanted = async (skillId) => {
    await fetch(`/api/users/${userId}/wanted/${skillId}`, { method: 'DELETE' });
    refresh();
  };

  return (
    <div>
      <h2>Manage Your Skills</h2>
      <div>
        <h3>Offered Skills</h3>
        <ul>
          {user.offeredSkills.map(skill => (
            <li key={skill.id}>
              {skill.name} 
              <button onClick={() => removeOffered(skill.id)}>Remove</button>
            </li>
          ))}
        </ul>
        <input 
          value={offerInput} 
          onChange={e => setOfferInput(e.target.value)} 
          placeholder="New skill to offer" 
        />
        <button onClick={addOffered}>Add Offered Skill</button>
      </div>
      <div>
        <h3>Wanted Skills</h3>
        <ul>
          {user.wantedSkills.map(skill => (
            <li key={skill.id}>
              {skill.name} 
              <button onClick={() => removeWanted(skill.id)}>Remove</button>
            </li>
          ))}
        </ul>
        <input 
          value={wantInput} 
          onChange={e => setWantInput(e.target.value)} 
          placeholder="New skill you want" 
        />
        <button onClick={addWanted}>Add Wanted Skill</button>
      </div>
    </div>
  );
}
