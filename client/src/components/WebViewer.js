import WebViewer from '@pdftron/webviewer';
import { useEffect, useRef } from 'react';

function Viewer() {
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
      <div id='webviewerDiv' style={{height:'100vh', width:'100%'}} ref={viewerRef}></div>
    </div>
  );
}

export default Viewer;
