import { IGoalRepo } from './IGoalRepo';
import { Goal } from '../models/types';

export class InMemoryGoalRepo implements IGoalRepo {
  private store: Record<string, Goal[]> = {};

  async create(goal: Omit<Goal, 'id' | 'createdAt' | 'achievedAt'>): Promise<Goal> {
    const id = cryptoRandomId();
    const createdAt = new Date().toISOString();
    const g: Goal = { ...goal, id, createdAt, achievedAt: null };
    if (!this.store[goal.userId]) this.store[goal.userId] = [];
    this.store[goal.userId].push(g);
    return g;
  }

  async listByUser(userId: string): Promise<Goal[]> {
    return this.store[userId] || [];
  }

  async markAchieved(goalId: string, timestamp?: string): Promise<void> {
    for (const userId of Object.keys(this.store)) {
      const list = this.store[userId];
      const g = list.find((x) => x.id === goalId);
      if (g) {
        g.achievedAt = timestamp || new Date().toISOString();
        return;
      }
    }
  }
}

function cryptoRandomId() {
  // lightweight id for demo/test purposes
  return Math.random().toString(36).slice(2, 10);
}
