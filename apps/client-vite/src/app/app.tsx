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
            <Route path="/portfolios" element={<Home />} />
            <Route path="/memos" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
