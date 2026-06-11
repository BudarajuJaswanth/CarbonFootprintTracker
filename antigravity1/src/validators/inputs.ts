import { body, ValidationChain } from 'express-validator';

export const carbonInputValidators = (): ValidationChain[] => [
  body('transportation').exists().withMessage('transportation is required'),
  body('transportation.carDistanceKmPerWeek').optional().isFloat({ min: 0 }).toFloat(),
  body('transportation.publicTransportKmPerWeek').optional().isFloat({ min: 0 }).toFloat(),
  body('transportation.flightsPerYear').optional().isInt({ min: 0 }).toInt(),
  body('transportation.fuelType').optional().isIn(['petrol', 'diesel', 'electric', 'hybrid']),
  body('energy.electricityKWhPerMonth').optional().isFloat({ min: 0 }).toFloat(),
  body('energy.renewablePercentage').optional().isFloat({ min: 0, max: 100 }).toFloat(),
  body('lifestyle.dietType').optional().isIn(['vegan', 'vegetarian', 'omnivore', 'pescatarian']),
  body('lifestyle.shoppingSpendMonthly').optional().isFloat({ min: 0 }).toFloat(),
  body('lifestyle.wasteKgPerWeek').optional().isFloat({ min: 0 }).toFloat()
];
