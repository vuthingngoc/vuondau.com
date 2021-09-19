import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import Homepage from './pages/HomePage';

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" render={() => <Homepage />} />
      <Redirect to="/" />
    </BrowserRouter>
  );
}
export default App;
