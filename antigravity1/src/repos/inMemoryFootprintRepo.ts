import { IFootprintRepo } from './IFootprintRepo';
import { EmissionsBreakdown } from '../models/types';

export class InMemoryFootprintRepo implements IFootprintRepo {
  private store: Record<string, Array<{ timestamp: string; snapshot: EmissionsBreakdown }>> = {};

  async saveSnapshot(userId: string, snapshot: EmissionsBreakdown, timestamp?: string): Promise<void> {
    const ts = timestamp || new Date().toISOString();
    if (!this.store[userId]) this.store[userId] = [];
    this.store[userId].push({ timestamp: ts, snapshot });
  }

  async getSnapshots(userId: string): Promise<Array<{ timestamp: string; snapshot: EmissionsBreakdown }>> {
    return this.store[userId] || [];
  }
}
