import React, { useState } from 'react';
import './css/app.css'
import Header from './components/Header';
import RoutineDay from './components/RoutineDay';
import Footer from './components/Footer';
import { RoutineProvider } from './contexts/RoutineDataContext';

import { Modal } from '@mantine/core';
import AddRoutineView from './components/AddRoutineView';

export interface AppContext {
  selectedTaskId: string | null
  setSelectedTaskId: (id: string | null) => void
  setAddTaskModalOpen: (open: boolean) => void
}
export const AppContext = React.createContext<AppContext | null>(null);

function App() {

  const [addTaskModalOpen, setAddTaskModalOpen] = useState<boolean>(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  return (
    <AppContext.Provider
      value={
        {
          setAddTaskModalOpen,
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

        <Modal
          opened={addTaskModalOpen}
          onClose={() => setAddTaskModalOpen(false)}
          title="Add new routine"
        >
          <AddRoutineView
            closeModal={() => setAddTaskModalOpen(false)}
          />
        </Modal>

      </RoutineProvider>
    </AppContext.Provider>
  );
}

export default App;

