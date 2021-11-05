import { useEffect, useState, useRef } from 'react';
import Viewer from './components/WebViewer';
import List from './components/List';
import './App.css';

function App() {
  const [file, setFile] = useState('');
  
  const updateFileSelected = (fileSelected) => {
    setFile(fileSelected);
  }

  return (
    <div className="App">
      <List updateFileSelected={updateFileSelected} />
      <Viewer fileToLoad={file}/>
    </div>
  );
}

export default App;
