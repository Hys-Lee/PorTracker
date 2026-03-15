import { setupServer } from 'msw/node';
import { allHandlers } from './_legacy_/handlers';

export const server = setupServer(...allHandlers);
