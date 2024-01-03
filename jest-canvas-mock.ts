// https://github.com/vitest-dev/vitest/discussions/395

import 'jest-canvas-mock';
import { setupJestCanvasMock } from 'jest-canvas-mock';

beforeEach(() => {
  jest.resetAllMocks();
  setupJestCanvasMock();
});