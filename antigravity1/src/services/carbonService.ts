import { EMISSION_FACTORS } from '../constants/factors';
import { UserInput, EmissionsBreakdown } from '../models/types';

/**
 * Calculate estimated emissions in kg CO2e/year.
 * Formulas are explicit and simple so they're auditable.
 */
export function calculateEmissions(input: UserInput): EmissionsBreakdown {
  const t = input.transportation || {};
  const e = input.energy || {};
  const l = input.lifestyle || {};

  // Transportation
  const carKmPerYear = (t.carDistanceKmPerWeek || 0) * 52;
  let carFactor = EMISSION_FACTORS.petrolPerKm;
  if (t.fuelType === 'diesel') carFactor = EMISSION_FACTORS.dieselPerKm;
  if (t.fuelType === 'electric') carFactor = EMISSION_FACTORS.electricPerKm;
  if (t.fuelType === 'hybrid') carFactor = (EMISSION_FACTORS.petrolPerKm + EMISSION_FACTORS.electricPerKm) / 2;
  const carEmissions = carKmPerYear * carFactor;

  const publicTransportKmPerYear = (t.publicTransportKmPerWeek || 0) * 52;
  const publicTransportEmissions = publicTransportKmPerYear * EMISSION_FACTORS.publicTransportPerKm;

  const flightEmissions = (t.flightsPerYear || 0) * EMISSION_FACTORS.flightPerFlight;

  const transportation = carEmissions + publicTransportEmissions + flightEmissions;

  // Energy
  const electricityPerYear = (e.electricityKWhPerMonth || 0) * 12;
  const gridFactor = EMISSION_FACTORS.electricityPerKWh * (1 - ((e.renewablePercentage || 0) / 100));
  const energy = electricityPerYear * gridFactor;

  // Lifestyle
  // Simplified: diet multipliers
  const dietMultiplier = {
    vegan: 0.8,
    vegetarian: 0.9,
    pescatarian: 1.0,
    omnivore: 1.3
  } as Record<string, number>;
  const dietBase = 1000; // baseline annual kgCO2e for average food consumption
  const dietEmissions = (dietBase * (dietMultiplier[l.dietType || 'omnivore'] || 1));

  const shopping = (l.shoppingSpendMonthly || 0) * 12 * EMISSION_FACTORS.shoppingPerCurrency;
  const waste = (l.wasteKgPerWeek || 0) * 52 * EMISSION_FACTORS.wastePerKg;

  const lifestyle = dietEmissions + shopping + waste;

  const total = transportation + energy + lifestyle;

  const details = {
    carEmissions: round(carEmissions),
    publicTransportEmissions: round(publicTransportEmissions),
    flightEmissions: round(flightEmissions),
    electricityEmissions: round(energy),
    dietEmissions: round(dietEmissions),
    shoppingEmissions: round(shopping),
    wasteEmissions: round(waste)
  };

  return {
    transportation: round(transportation),
    energy: round(energy),
    lifestyle: round(lifestyle),
    total: round(total),
    details
  };
}

function round(n: number) {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}
