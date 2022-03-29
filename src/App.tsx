import React, { useState } from 'react';
import './css/app.css'
import Header from './components/Header';
import RoutineDay from './components/RoutineDay';
import Footer from './components/Footer';
import { RoutineProvider } from './contexts/RoutineDataContext';

import AddRoutineView from './components/AddRoutineView';

export interface AppContext {
  selectedTaskId: string | null
  setSelectedTaskId: (id: string | null) => void
  setAddroutineModalOpen: (open: boolean) => void
}
export const AppContext = React.createContext<AppContext | null>(null);

function App() {

  const [addroutineModalOpen, setAddroutineModalOpen] = useState<boolean>(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  return (
    <AppContext.Provider
      value={
        {
          setAddroutineModalOpen,
          selectedTaskId,
          setSelectedTaskId
        }
      }>
      <RoutineProvider>

        <div className="app-container">
          <Header></Header>
          <RoutineDay></RoutineDay>
        </div>
        <Footer></Footer>

        <AddRoutineView
          addroutineModalOpen={addroutineModalOpen}
          setAddroutineModalOpen={setAddroutineModalOpen}
        />

      </RoutineProvider>
    </AppContext.Provider>
  );
}

export default App;

