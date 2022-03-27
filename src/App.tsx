import React from 'react';
import LaundryIcon from '@mui/icons-material/LocalLaundryService';
import './css/app.css'
import Header from './components/Header';
import RoutineDay from './components/RoutineDay';
import Footer from './components/Footer';

function App() {

  return (
    <>
      <div className="app-container">
        <Header></Header>
        <RoutineDay></RoutineDay>
      </div>
      <Footer></Footer>
    </>

  );
}

export default App;
