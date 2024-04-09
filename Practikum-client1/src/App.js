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
import { getRoles } from './service/roleServer';
import Roles from './components/roles/roles';
import PopupExample from './components/roles/pop';
function App() {
  // const navig = useNavigate();
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getWorker())
    dispatch(getRoles())
  }, [])
  return (
    <div >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/homePage" element={<HomePage />} />
        <Route path="/workersTable" element={<WorkersTable />} />
        <Route path="/addWorker" element={<AddWorker/>} />
        <Route path="/editWorker" element={<AddWorker/>} />
        <Route path="/addRole" element={<Roles/>} />
        <Route path="/popup" element={<PopupExample/>} />
      </Routes>
      <HomePage />
      <Link to="/workersTable">  workers Table</Link>
      <br/>
      <Link to="/addWorker">  add worker</Link>
      <br/>
      <Link to="/addRole">  add role</Link>
      <br/>
      <Link to="/popup">  popup</Link>
      <div>helloApp</div>
    </div>

  );
}

export default App;
