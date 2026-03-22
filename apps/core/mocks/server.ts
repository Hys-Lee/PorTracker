import { setupServer } from 'msw/node';
// import { allHandlers } from './_legacy_/handlers';
import { allHandlers } from './repositories/handlers';
export const server = setupServer(...allHandlers);
