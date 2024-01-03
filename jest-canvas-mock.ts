import 'jest-canvas-mock';
import { setupJestCanvasMock } from 'jest-canvas-mock';

beforeEach(() => {
  jest.resetAllMocks();
  setupJestCanvasMock();
});