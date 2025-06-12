import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'; // Assuming your App component is here
import { NextUIProvider } from "@nextui-org/react"; // <-- Import NextUIProvider
import { BrowserRouter  } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <NextUIProvider> {/* Wrap here */}
      <App />
    </NextUIProvider>
    </BrowserRouter>
    
  </React.StrictMode>
);