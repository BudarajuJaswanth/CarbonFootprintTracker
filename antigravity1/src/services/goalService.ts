import { IGoalRepo } from '../repos/IGoalRepo';
import { Goal } from '../models/types';

export class GoalService {
  constructor(private repo: IGoalRepo) {}

  async createGoal(userId: string, title: string, targetPercentReduction: number): Promise<Goal> {
    if (!title || typeof title !== 'string') throw new Error('Invalid title');
    if (!Number.isFinite(targetPercentReduction) || targetPercentReduction <= 0) throw new Error('Invalid target');
    const g = await this.repo.create({ userId, title, targetPercentReduction });
    return g;
  }

  async listGoals(userId: string): Promise<Goal[]> {
    return this.repo.listByUser(userId);
  }

  async markAchieved(goalId: string): Promise<void> {
    return this.repo.markAchieved(goalId);
  }
}
