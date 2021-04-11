import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [ready, setReady] = useState(false);
  const [initError, setInitError] = useState(false);

  function onAppReady() {
    console.log('It got here');
    setReady(true);
  }

  function onAppInitFailure(error) {
    setInitError(true);
  }

  useEffect(
    () => {
      window.api.send('ui-ready-for-events');
      window.api.on('app-init-success', onAppReady);
      window.api.on('app-init-failure', onAppInitFailure);

      return () => {
        window.api.removeListener('app-init-success', onAppReady);
        window.api.removeListener('app-init-failure', onAppInitFailure);
      }
    },
    [],
  );

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>{ready ? 'Ready' : (initError ? 'There was an error initializing the database': 'Loading')}</p>
      </header>
    </div>
  );
}

export default App;
