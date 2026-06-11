import React, { useEffect, useState } from 'react';
import { CalculatorForm } from '../components/CalculatorForm';
import { GoalForm } from '../components/GoalForm';
import { UserInput, EmissionsBreakdown, Goal } from '../models/types';

export const App: React.FC = () => {
  const [breakdown, setBreakdown] = useState<EmissionsBreakdown | null>(null);
  const [goals, setGoals] = useState<Goal[]>([]);

  const handleSubmit = async (input: UserInput) => {
    const res = await fetch('/api/calculate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input)
    });
    if (res.ok) {
      const data = await res.json();
      setBreakdown(data);
    }
  };

  const fetchGoals = async (userId = 'user-1') => {
    try {
      const res = await fetch(`/api/goals/${userId}`);
      if (res.ok) {
        const data = await res.json();
        setGoals(data.goals || []);
      }
    } catch (_) {
      // ignore for demo
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  return (
    <main>
      <div className="topbar">
        <div className="brand">
          <div className="logo">C</div>
          <div>
            <h1>Carbon Footprint Assistant</h1>
            <div className="muted">Estimate emissions and set achievable goals</div>
          </div>
        </div>
        <div className="muted">Estimated annual savings & accessibility focused</div>
      </div>

      <div className="grid">
        <div>
          <section>
            <h2 className="muted">Calculate footprint</h2>
            <CalculatorForm onSubmit={handleSubmit} />

            {breakdown && (
              <div className="card results" aria-live="polite">
                <h3>Results</h3>
                <div className="total">Total annual emissions: {Math.round(breakdown.total)} kg CO2e</div>
                <ul>
                  {Object.entries(breakdown.byCategory || {}).map(([cat, val]) => (
                    <li key={cat} className="muted">{cat}: {Math.round((val as any) * 100) / 100} kg CO2e</li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          <section style={{marginTop:18}}>
            <h2 className="muted">Recommendations</h2>
            <div className="card">
              <p className="muted">Get tailored recommendations after running a calculation.</p>
            </div>
          </section>
        </div>

        <aside>
          <section>
            <h2 className="muted">Goals</h2>
            <GoalForm onCreated={(g) => { setGoals((s) => [g, ...s]); }} />

            <div className="card" style={{marginTop:12}}>
              <h3>Your goals</h3>
              <ul className="goals-list">
                {goals.length === 0 && <li className="muted">No goals yet — create one!</li>}
                {goals.map((g) => (
                  <li key={g.id}>
                    <strong>{g.title}</strong>
                    <div className="muted">Target: {g.targetPercentReduction}% — {g.achievedAt ? 'Achieved' : 'In progress'}</div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </aside>
      </div>
    </main>
  );
};
