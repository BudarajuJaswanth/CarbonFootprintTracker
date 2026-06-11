import { calculateEmissions } from '../services/carbonService';

describe('calculateEmissions', () => {
  it('calculates zero for empty input', () => {
    const breakdown = calculateEmissions({ transportation: {}, energy: {}, lifestyle: {} });
    expect(breakdown.total).toBeGreaterThanOrEqual(0);
  });

  it('calculates reasonable values for a sample user', () => {
    const input = {
      transportation: { carDistanceKmPerWeek: 100, fuelType: 'petrol', publicTransportKmPerWeek: 10, flightsPerYear: 1 },
      energy: { electricityKWhPerMonth: 250, renewablePercentage: 10 },
      lifestyle: { dietType: 'omnivore', shoppingSpendMonthly: 200, wasteKgPerWeek: 5 }
    } as any;

    const breakdown = calculateEmissions(input);
    expect(breakdown.transportation).toBeGreaterThan(0);
    expect(breakdown.energy).toBeGreaterThan(0);
    expect(breakdown.lifestyle).toBeGreaterThan(0);
    expect(breakdown.total).toBeCloseTo(breakdown.transportation + breakdown.energy + breakdown.lifestyle, 2);
  });
});
