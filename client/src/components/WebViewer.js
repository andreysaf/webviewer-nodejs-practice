import WebViewer from '@pdftron/webviewer';
import { useEffect, useState, useRef } from 'react';

function Viewer({ fileToLoad }) {
  const viewerRef = useRef();
  const [instance, setInstance] = useState();

  useEffect(() => {
    WebViewer({
      path: '/lib',
    }, viewerRef.current).then(instance => {
        setInstance(instance);
    });
  }, []);

  useEffect(() => {
    if (instance && fileToLoad) {
        instance.loadDocument(`http://localhost:3001/files/${fileToLoad}`)
    }
  }, [instance, fileToLoad]);

  return (
    <div className="App">
      <div id='webviewerDiv' style={{height:'100vh', width:'100%'}} ref={viewerRef}></div>
    </div>
  );
}

export default Viewer;
