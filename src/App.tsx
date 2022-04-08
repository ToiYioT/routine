import React, { useState } from 'react';
import './css/app.css'
import Header from './components/Header';
import RoutineDay from './components/RoutineDay';
import Footer from './components/Footer';
import { RoutineProvider } from './contexts/RoutineDataContext';

import AddRoutineView from './components/AddRoutineView';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

export interface AppContext {
  selectedTaskId: string | null
  setSelectedTaskId: (id: string | null) => void
  setAddroutineModalOpen: (open: boolean) => void
  pickedDate: Date
}
export const AppContext = React.createContext<AppContext | null>(null);

function App() {

  const [addroutineModalOpen, setAddroutineModalOpen] = useState<boolean>(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [pickedDate, setPickedDate] = useState<Date>(new Date());

  return (
    <AppContext.Provider
      value={
        {
          setAddroutineModalOpen,
          selectedTaskId,
          setSelectedTaskId,
          pickedDate
        }
      }>
      <RoutineProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <> <div className="app-container">
                <Header
                  pickedDate={pickedDate}
                  setPickedDate={setPickedDate}
                ></Header>
                <RoutineDay></RoutineDay>
              </div>
                <Footer></Footer>
              </>} />


            <Route path="add-routine" element={
              <AddRoutineView
                addroutineModalOpen={addroutineModalOpen}
                setAddroutineModalOpen={setAddroutineModalOpen}
              />
            } />

          </Routes>
        </BrowserRouter>



      </RoutineProvider>
    </AppContext.Provider>
  );
}

export default App;

