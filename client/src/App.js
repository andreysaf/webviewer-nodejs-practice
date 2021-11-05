import { useEffect, useRef } from 'react';
import Viewer from './components/WebViewer';
import List from './components/List';
import './App.css';

function App() {

  useEffect(() => {

  }, []);

  return (
    <div className="App">
      <List />
      <Viewer />
    </div>
  );
}

export default App;
