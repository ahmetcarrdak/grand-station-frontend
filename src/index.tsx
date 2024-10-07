import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from './App';
import "./components/assets/css/app.css"
import "./components/assets/css/setting.css"
import "./components/assets/css/widget.css"
import "./components/assets/css/component.css"


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Root /> {/* Root bileşenini render et */}
  </React.StrictMode>
);
