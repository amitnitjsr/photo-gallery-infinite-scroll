import React from 'react';
import './App.css';
// const Gallery = React.lazy(() => import('./features/photo-gallery/container/index'));
import Gallery from './features/photo-gallery/container/index';

function App() {
  return (
    <div className="App">

      <Gallery />

    </div>
  );
}

export default App;
