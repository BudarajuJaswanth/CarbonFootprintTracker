import React, { useState } from 'react';
import { UserInput } from '../models/types';

interface Props {
  onSubmit: (input: UserInput) => void;
}

export const CalculatorForm: React.FC<Props> = ({ onSubmit }) => {
  const [carKm, setCarKm] = useState<number>(0);
  const [electricity, setElectricity] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const input: UserInput = {
      transportation: { carDistanceKmPerWeek: carKm },
      energy: { electricityKWhPerMonth: electricity },
      lifestyle: {}
    };
    try {
      onSubmit(input);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} aria-label="Carbon calculator form" className="card">
      <div className="form-row">
        <label htmlFor="carKm">Car km per week</label>
        <input id="carKm" name="carKm" type="number" min={0} step={1} value={carKm} onChange={(e) => setCarKm(Number(e.target.value))} placeholder="e.g., 100" />
      </div>

      <div className="form-row">
        <label htmlFor="electricity">Electricity kWh / month</label>
        <input id="electricity" name="electricity" type="number" min={0} step={0.1} value={electricity} onChange={(e) => setElectricity(Number(e.target.value))} placeholder="e.g., 200" />
      </div>

      <div style={{display:'flex',justifyContent:'flex-end'}}>
        <button type="submit" disabled={loading}>{loading ? 'Calculating…' : 'Calculate'}</button>
      </div>
    </form>
  );
};
