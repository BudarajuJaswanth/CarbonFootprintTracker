// Emission factors (kg CO2e per unit)
// These are simplified and documented for transparency.
export const EMISSION_FACTORS = {
  petrolPerKm: 0.192, // kg CO2e per km (average car petrol)
  dieselPerKm: 0.171, // kg CO2e per km (average car diesel)
  electricPerKm: 0.05, // kg CO2e per km (depends on grid, example)
  publicTransportPerKm: 0.05,
  flightPerFlight: 250, // kg CO2e per short/average flight
  electricityPerKWh: 0.475, // kg CO2e per kWh (grid average)
  wastePerKg: 0.5, // kg CO2e per kg waste (approx)
  shoppingPerCurrency: 0.02 // kg CO2e per currency unit spent (approx)
};
