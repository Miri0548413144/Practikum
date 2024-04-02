import logo from './logo.svg';
import './App.css';
import { getWorker } from './service/workerServer';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import WorkersTable from './components/workers/workersTable';
import HomePage from './components/homePage';
import AddWorker from './components/workers/addWorker';

function App() {
  // const navig = useNavigate();
  // <WorkersTable/>
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getWorker())
  }, [])
  const workers = useSelector(state => state.workers);
  console.log(workers, "workers")
  return (
    <div >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/homePage" element={<HomePage />} />
        <Route path="/workersTable" element={<WorkersTable />} />
        <Route path="/addWorker" element={<AddWorker/>} />
      </Routes>
      <HomePage />
      <Link to="/workersTable">  workers Table</Link>
      <br/>
      <Link to="/addWorker">  add worker</Link>
      <div>helloApp</div>
      {/* <div>
      <h1>Workers List</h1>
      <WorkersTable/>
    </div> */}
    </div>

  );
}

export default App;
