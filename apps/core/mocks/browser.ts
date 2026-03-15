import { setupWorker } from 'msw/browser';
import { allHandlers } from './_legacy_/handlers';

export const worker = setupWorker(...allHandlers);
