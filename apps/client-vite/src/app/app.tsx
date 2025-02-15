// Uncomment this line to use CSS modules
// import styles from './app.module.css';
// import ModeController from 'src/widgets/flows/ui/ORGANISMS/ModeContoller';
import NxWelcome from './nx-welcome';
import '../styles.css';
import '@styled-system/styles.css';
import Layout from 'src/pages/Layout';
import Home from 'src/pages/home/home';
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from 'react-router';
import Flows from 'src/pages/flows/flows';
import Portfolio from 'src/pages/portfolios/portfolio';
import MemoBoard from 'src/widgets/memo/ui/ORGANISMS/MemoBoard';
import Memos from 'src/pages/memos/memos';

import Error from 'src/features/errors/DefaultErrorBoundary';
import DefaultErrorBoundary from 'src/features/errors/DefaultErrorBoundary';
import RouteErrorSection from 'src/features/errors/ui/sections/RouteErrorSection';
import LayeredErrorBoundary from 'src/features/errors/LayeredErrorBoundary';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <RouteErrorSection />,
    children: [
      { index: true, element: <Home /> },
      { path: 'flows', element: <Flows /> },
      { path: 'portfolios', element: <Portfolio /> },
      { path: 'memos', element: <Memos /> },
    ],
  },
]);

export function App() {
  return (
    <>
      {/* <ModeController /> */}
      {/* <NxWelcome title="client-vite" /> */}
      <LayeredErrorBoundary>
        <RouterProvider router={router} />
      </LayeredErrorBoundary>
    </>
  );
}

export default App;
