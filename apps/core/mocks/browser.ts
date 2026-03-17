import { setupWorker } from 'msw/browser';
// import { allHandlers } from './_legacy_/handlers';
import { allHandlers } from './repositories/handlers';

export const worker = setupWorker(...allHandlers);
