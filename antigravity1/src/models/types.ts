export type FuelType = 'petrol' | 'diesel' | 'electric' | 'hybrid';

export interface TransportationInput {
  carDistanceKmPerWeek?: number; // km/week
  fuelType?: FuelType;
  publicTransportKmPerWeek?: number;
  flightsPerYear?: number; // count
}

export interface EnergyInput {
  electricityKWhPerMonth?: number;
  renewablePercentage?: number; // 0-100
}

export interface LifestyleInput {
  dietType?: 'vegan' | 'vegetarian' | 'omnivore' | 'pescatarian';
  shoppingSpendMonthly?: number; // currency units
  wasteKgPerWeek?: number;
}

export interface UserInput {
  transportation: TransportationInput;
  energy: EnergyInput;
  lifestyle: LifestyleInput;
}

export interface EmissionsBreakdown {
  transportation: number;
  energy: number;
  lifestyle: number;
  total: number;
  details?: Record<string, number>;
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  estimatedAnnualSavingsKgCO2e: number;
  priority: number; // lower = higher priority
}

export interface Goal {
  id: string;
  userId: string;
  title: string;
  targetPercentReduction: number; // e.g., 10 for 10%
  createdAt: string;
  achievedAt?: string | null;
}

export interface SnapshotRecord {
  timestamp: string;
  snapshot: EmissionsBreakdown;
}
