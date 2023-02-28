import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Routers from './routes';

function App() {
  return (
    <div className='App'>
      <Routers />
      <ToastContainer />
    </div>
  );
}

export default App;
