import { ICoordinates } from './ICoordinates';

export interface IPositionScraper {
  getPosition(): Promise<ICoordinates>;
  // extractPosition(): void;
  getURL(): string;
}
