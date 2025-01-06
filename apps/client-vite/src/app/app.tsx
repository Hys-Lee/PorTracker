// Uncomment this line to use CSS modules
// import styles from './app.module.css';
// import ModeController from 'src/widgets/flows/ui/ORGANISMS/ModeContoller';
import NxWelcome from './nx-welcome';
import '../styles.css';
import '@styled-system/styles.css';

export function App() {
  return (
    <div>
      {/* <ModeController /> */}
      <NxWelcome title="client-vite" />
    </div>
  );
}

export default App;
