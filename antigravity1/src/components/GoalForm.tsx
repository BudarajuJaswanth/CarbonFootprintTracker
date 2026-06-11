import React, { useState } from 'react';
import { Goal } from '../models/types';

interface Props {
  onCreated?: (goal: Goal) => void;
}

export const GoalForm: React.FC<Props> = ({ onCreated }) => {
  const [userId, setUserId] = useState<string>('user-1');
  const [title, setTitle] = useState<string>('Reduce emissions');
  const [target, setTarget] = useState<number>(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/goals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, title, targetPercentReduction: target })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || (data.errors && JSON.stringify(data.errors)) || 'Failed to create goal');
      } else {
        onCreated && onCreated(data);
        setTitle('');
      }
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} aria-label="Create sustainability goal" className="card">
      <div className="form-row">
        <label htmlFor="userId">User ID</label>
        <input id="userId" name="userId" value={userId} onChange={(e) => setUserId(e.target.value)} />
      </div>
      <div className="form-row">
        <label htmlFor="title">Goal title</label>
        <input id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Cut commuting emissions" />
      </div>
      <div className="form-row">
        <label htmlFor="target">Target reduction (%)</label>
        <input id="target" name="target" type="number" min={1} max={100} value={target} onChange={(e) => setTarget(Number(e.target.value))} />
      </div>
      <div style={{display:'flex',justifyContent:'flex-end'}}>
        <button type="submit" disabled={loading}>{loading ? 'Saving…' : 'Create goal'}</button>
      </div>
      {error && <div role="alert" aria-live="assertive" className="muted">{error}</div>}
    </form>
  );
};
