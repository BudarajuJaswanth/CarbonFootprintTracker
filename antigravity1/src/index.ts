import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import { calculateEmissions } from './services/carbonService';
import { generateRecommendations } from './services/recommendationService';
import { carbonInputValidators } from './validators/inputs';
import { validationResult } from 'express-validator';
import { goalValidators } from './validators/goals';
import { InMemoryGoalRepo } from './repos/inMemoryGoalRepo';
import { GoalService } from './services/goalService'; // Server-only, no React imports

dotenv.config();

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/health', (_req: any, res: any) => res.json({ status: 'ok' }));

app.post('/api/calculate', carbonInputValidators(), (req: any, res: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const breakdown = calculateEmissions(req.body);
    return res.json(breakdown);
  } catch (err) {
    // Do not leak internal details
    return res.status(500).json({ error: 'Calculation failed' });
  }
});

app.post('/api/recommendations', carbonInputValidators(), (req: any, res: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const breakdown = calculateEmissions(req.body);
    const recs = generateRecommendations(breakdown);
    return res.json({ breakdown, recommendations: recs });
  } catch (err) {
    return res.status(500).json({ error: 'Recommendation generation failed' });
  }
});

// Goals endpoints (simple, stateless example using in-memory repo)
const goalRepo = new InMemoryGoalRepo();
const goalService = new GoalService(goalRepo);

app.post('/api/goals', goalValidators(), async (req: any, res: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const { userId, title, targetPercentReduction } = req.body;
    const goal = await goalService.createGoal(userId, title, Number(targetPercentReduction));
    return res.status(201).json(goal);
  } catch (err) {
    return res.status(400).json({ error: String(err) });
  }
});

app.get('/api/goals/:userId', async (req: any, res: any) => {
  const { userId } = req.params;
  if (!userId) return res.status(400).json({ error: 'missing userId' });
  const goals = await goalService.listGoals(userId);
  return res.json({ goals });
});

export { app };

// Server start moved to server.ts for testability

