import { body } from 'express-validator';

export const goalValidators = () => [
  body('userId').exists().isString().withMessage('userId is required'),
  body('title').exists().isString().isLength({ min: 3 }).withMessage('title is required'),
  body('targetPercentReduction').exists().isFloat({ gt: 0 }).toFloat()
];
