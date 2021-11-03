import logo from './logo.svg';
import WebViewer from '@pdftron/webviewer';
import { useEffect, useRef } from 'react';
import './App.css';

function App() {
  const viewerRef = useRef();

  useEffect(() => {
    WebViewer({
      path: '/lib',
      initialDoc: 'http://localhost:3001/files/blank.pdf'
    }, viewerRef.current).then(instance => {

    });
  }, []);

  return (
    <div className="App">
      <div id='webviewerDiv' ref={viewerRef}></div>
    </div>
  );
}

export default App;
