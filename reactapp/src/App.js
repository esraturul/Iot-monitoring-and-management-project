import React from 'react';
import { useRoutes } from 'react-router-dom';
import routes from './Routes';

function App() {
  const routing = useRoutes(routes);

  return <div className="App">{routing}</div>;
}

export default App;
