import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function ProfilePage() {
  const { id } = useParams();            
  const [user, setUser] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const currentUserId = 1; 

  useEffect(() => {
    fetch(`/api/users/${id}`)
      .then(res => res.json())
      .then(data => setUser(data));
  }, [id]);

  const submitReview = async () => {
    if (!rating) return;
    await fetch(`/api/users/${id}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        reviewerId: currentUserId,
        rating: rating,
        comment: comment
      })
    });
    const updated = await fetch(`/api/users/${id}`).then(r => r.json());
    setUser(updated);
    setComment('');
    setRating(5);
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>{user.name}’s Profile</h2>
      <p><strong>Email:</strong> {user.email}</p>

      <div>
        <h3>Offered Skills</h3>
        <ul>{user.offeredSkills.map(s => <li key={s.id}>{s.name}</li>)}</ul>
      </div>
      <div>
        <h3>Wanted Skills</h3>
        <ul>{user.wantedSkills.map(s => <li key={s.id}>{s.name}</li>)}</ul>
      </div>

      <div>
        <h3>Reviews</h3>
        {user.reviewsReceived.length === 0 && <p>No reviews yet.</p>}
        <ul>
          {user.reviewsReceived.map(r => (
            <li key={r.id}>
              <strong>{r.reviewer.name}</strong> rated {r.rating}/5<br/>
              {r.comment}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Leave a Review</h3>
        <label>Rating:
          <select value={rating} onChange={e => setRating(parseInt(e.target.value))}>
            {[5,4,3,2,1].map(n => <option key={n}>{n}</option>)}
          </select>
        </label>
        <br/>
        <textarea 
          value={comment} 
          onChange={e => setComment(e.target.value)} 
          placeholder="Comments (optional)"
        />
        <br/>
        <button onClick={submitReview}>Submit Review</button>
      </div>
    </div>
  );
}
