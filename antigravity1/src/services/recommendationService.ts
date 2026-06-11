import { EmissionsBreakdown, Recommendation } from '../models/types';

/**
 * Generate dynamic recommendations based on emissions breakdown.
 * Recommendations estimate annual savings and are prioritized by impact.
 */
export function generateRecommendations(breakdown: EmissionsBreakdown): Recommendation[] {
  const recs: Recommendation[] = [];

  const { transportation, energy, lifestyle, details } = breakdown;

  // Prioritize categories by contribution
  const categories = [
    { key: 'transportation', value: transportation },
    { key: 'energy', value: energy },
    { key: 'lifestyle', value: lifestyle }
  ].sort((a, b) => b.value - a.value);

  // Helper to push recommendation
  const push = (r: Recommendation) => recs.push(r);

  // Transportation recommendations
  if (details) {
    if (details.carEmissions && details.carEmissions > 500) {
      push({
        id: 'use-public-transport',
        title: 'Increase public transport & carpooling',
        description: 'Replace short solo car trips with public transport or carpooling at least twice a week.',
        estimatedAnnualSavingsKgCO2e: Math.round(details.carEmissions * 0.15),
        priority: transportation === categories[0].value ? 1 : 3
      });
    }

    if (details.flightEmissions && details.flightEmissions > 200) {
      push({
        id: 'reduce-flights',
        title: 'Reduce short-haul flights',
        description: 'Consider fewer short flights; replace with train or virtual meetings when possible.',
        estimatedAnnualSavingsKgCO2e: Math.round(details.flightEmissions * 0.5),
        priority: transportation === categories[0].value ? 1 : 4
      });
    }
  }

  // Energy recommendations
  if (energy > 200) {
    push({
      id: 'led-and-efficiency',
      title: 'Improve home energy efficiency',
      description: 'Switch to LED bulbs, improve insulation, and use smart thermostats to cut electricity use.',
      estimatedAnnualSavingsKgCO2e: Math.round(energy * 0.2),
      priority: energy === categories[0].value ? 1 : 3
    });

    push({
      id: 'green-energy',
      title: 'Increase renewable electricity share',
      description: 'Switch to a green electricity plan or install rooftop solar if feasible.',
      estimatedAnnualSavingsKgCO2e: Math.round(energy * 0.4),
      priority: energy === categories[0].value ? 1 : 2
    });
  }

  // Lifestyle recommendations
  if (lifestyle > 1000) {
    push({
      id: 'diet-change',
      title: 'Adjust diet towards plant-based meals',
      description: 'Try reducing red meat and increasing plant-based meals; aim for 2 meat-free days per week.',
      estimatedAnnualSavingsKgCO2e: Math.round(lifestyle * 0.08),
      priority: lifestyle === categories[0].value ? 1 : 5
    });

    push({
      id: 'reduce-waste',
      title: 'Reduce food waste and single-use items',
      description: 'Plan meals, compost organic waste, and prioritize reusable products.',
      estimatedAnnualSavingsKgCO2e: Math.round((breakdown.details?.wasteEmissions || 0) * 0.5),
      priority: lifestyle === categories[0].value ? 2 : 5
    });
  }

  // Add targeted high-impact pick based on top category
  const top = categories[0];
  if (top.key === 'transportation') {
    recs.unshift({
      id: 'high-impact-transport',
      title: 'Prioritize reducing transport emissions',
      description: 'Focus on commuting choices and flight reduction — these offer large savings.',
      estimatedAnnualSavingsKgCO2e: Math.round(transportation * 0.25),
      priority: 0
    });
  } else if (top.key === 'energy') {
    recs.unshift({
      id: 'high-impact-energy',
      title: 'Prioritize home energy reductions',
      description: 'Energy efficiency and renewable electricity selection are high-impact actions.',
      estimatedAnnualSavingsKgCO2e: Math.round(energy * 0.35),
      priority: 0
    });
  } else if (top.key === 'lifestyle') {
    recs.unshift({
      id: 'high-impact-lifestyle',
      title: 'Prioritize lifestyle changes',
      description: 'Diet and consumption choices significantly affect your footprint; start here.',
      estimatedAnnualSavingsKgCO2e: Math.round(lifestyle * 0.15),
      priority: 0
    });
  }

  // Final sort by priority then estimated savings
  return recs.sort((a, b) => a.priority - b.priority || b.estimatedAnnualSavingsKgCO2e - a.estimatedAnnualSavingsKgCO2e);
}
