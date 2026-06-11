import { EmissionsBreakdown } from '../models/types';

export interface IFootprintRepo {
  saveSnapshot(userId: string, snapshot: EmissionsBreakdown, timestamp?: string): Promise<void>;
  getSnapshots(userId: string): Promise<Array<{ timestamp: string; snapshot: EmissionsBreakdown }>>;
}
