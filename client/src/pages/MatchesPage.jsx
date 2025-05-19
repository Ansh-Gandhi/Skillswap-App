import React, { useState, useEffect } from 'react';

export default function MatchesPage() {
  const userId = 1; 
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetch(`/api/matches/${userId}`)
      .then(res => res.json())
      .then(data => setMatches(data));
  }, []);

  return (
    <div>
      <h2>Your Skill Swap Matches</h2>
      {matches.length === 0 && <p>No matches found.</p>}
      <ul>
        {matches.map(user => (
          <li key={user.id}>
            <strong>{user.name}</strong><br/>
            Offers: {user.offeredSkills.map(s => s.name).join(', ')}<br/>
            Wants: {user.wantedSkills.map(s => s.name).join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
}
