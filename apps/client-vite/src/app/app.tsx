// Uncomment this line to use CSS modules
// import styles from './app.module.css';
// import ModeController from 'src/widgets/flows/ui/ORGANISMS/ModeContoller';
import NxWelcome from './nx-welcome';
import '../styles.css';
import '@styled-system/styles.css';
import Layout from 'src/pages/Layout';
import Home from 'src/pages/home/home';
import { BrowserRouter, Route, Routes } from 'react-router';
import Flows from 'src/pages/flows/flows';
import Portfolio from 'src/pages/portfolios/portfolio';
import MemoBoard from 'src/widgets/memo/ui/ORGANISMS/MemoBoard';
import Memos from 'src/pages/memos/memos';

export function App() {
  return (
    <div>
      {/* <ModeController /> */}
      {/* <NxWelcome title="client-vite" /> */}
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/flows" element={<Flows />} />
            <Route path="/portfolios" element={<Portfolio />} />
            <Route path="/memos" element={<Memos />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
