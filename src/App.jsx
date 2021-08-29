import React from 'react'
import Header from './components/Header';
import TaskManager from './components/TaskManager';


function App() {
  return (
    <div className="container">
      <Header></Header>
      <TaskManager/>
    </div>
  );
}

export default App;
