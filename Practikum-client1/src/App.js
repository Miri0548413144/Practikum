import logo from './logo.svg';
import './App.css';
import { getWorker } from './server/workerServer';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import WorkersTable from './components/workers/workersTable';

function App() {
  // const navig = useNavigate();
  // <WorkersTable/>
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getWorker())
  },[])
  const workers = useSelector(state => state.workers);
  console.log(workers,"workers")
  return (
    <div >
      <div>helloApp</div>
      <div>
      <h1>Workers List</h1>
      <WorkersTable/>
    </div>
    </div>
    
  );
}

export default App;
