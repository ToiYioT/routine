import React, { } from 'react';
import './css/app.css'
import Header from './components/Header';
import RoutineDay from './components/RoutineDay';
import Footer from './components/Footer';
import { RoutineProvider } from './contexts/RoutineDataContext';


function App() {
  return (
    <RoutineProvider>

      <div className="app-container">
        <Header></Header>
        <RoutineDay></RoutineDay>
      </div>
      <Footer></Footer>

    </RoutineProvider>
  );
}

export default App;

