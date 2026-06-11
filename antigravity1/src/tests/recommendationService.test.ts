import { calculateEmissions } from '../services/carbonService';
import { generateRecommendations } from '../services/recommendationService';

describe('generateRecommendations', () => {
  it('generates recommendations and prioritizes top category', () => {
    const input = {
      transportation: { carDistanceKmPerWeek: 300, fuelType: 'petrol', publicTransportKmPerWeek: 0, flightsPerYear: 2 },
      energy: { electricityKWhPerMonth: 100, renewablePercentage: 30 },
      lifestyle: { dietType: 'omnivore', shoppingSpendMonthly: 50, wasteKgPerWeek: 2 }
    } as any;

    const breakdown = calculateEmissions(input);
    const recs = generateRecommendations(breakdown);
    expect(recs.length).toBeGreaterThan(0);
    // Top priority should be focused on transportation
    expect(recs[0].title.toLowerCase()).toContain('prioritize');
  });
});
