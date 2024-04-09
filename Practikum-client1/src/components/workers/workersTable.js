import React, { useEffect, useState } from 'react';
import { TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Collapse, Typography, IconButton } from '@mui/material';
import { ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon, AddCircle as AddCircleIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteWorker, getWorker } from '../../service/workerServer';
import ExcelJS from 'exceljs';

export default function WorkersTable() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchText, setSearchText] = useState('');
    const [expandedRow, setExpandedRow] = useState(null);
    const [showAddWorkerForm, setShowAddWorkerForm] = useState(false);
    const workers = useSelector(state => state.workers);
    const roles = useSelector(state => state.roles);
    const handleRowClick = (index) => {
        setExpandedRow(index === expandedRow ? null : index);
    };
    const handleDeleteWorker = (id) => {
        dispatch(deleteWorker(id, navigate));
    };

    const exportToExcel = async () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Workers');

        worksheet.addRow(['First Name', 'Last Name', 'TZ', 'Start Date', 'Roles']);

        workers.forEach(worker => {
            const roles1 = worker.roles.map(rolep => {
                const role = roles.find(role => role.id === rolep.roleId);
                return role ? role.name : 'Unknown Role';
            }).join(', ');

            worksheet.addRow([worker.firstName, worker.lastName, worker.tz, worker.startDate, roles1]);
        });

        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'workers.xlsx';
        a.click();
    };

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    const filteredWorkers = workers.filter(worker =>
        worker.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
        worker.lastName.toLowerCase().includes(searchText.toLowerCase()) ||
        worker.tz.toLowerCase().includes(searchText.toLowerCase()) ||
        worker.startDate.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div>
            {/* Search text field */}
            <TextField
                label="Search"
                variant="outlined"
                value={searchText}
                onChange={handleSearchChange}
            />
            {/* Workers table */}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="Workers table">
                    <TableHead>
                        <TableRow>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>TZ</TableCell>
                            <TableCell>Start Date</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell>
                                {/* Button to navigate to add worker page */}
                                <IconButton component={Link} to="/addWorker" size="small">
                                    <AddCircleIcon />
                                </IconButton>
                                {/* Show add worker form */}
                                {showAddWorkerForm}
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredWorkers.map((worker, index) => (
                            <React.Fragment key={worker.id}>
                                {/* Table row for each worker */}
                                <TableRow onClick={() => handleRowClick(index)}>
                                    <TableCell>{worker.firstName}</TableCell>
                                    <TableCell>{worker.lastName}</TableCell>
                                    <TableCell>{worker.tz}</TableCell>
                                    <TableCell>{worker.startDate}</TableCell>
                                    <TableCell>
                                        <IconButton size="small">
                                            {/* Show expand icon based on row index */}
                                            {expandedRow === index ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton size="small" onClick={() => handleDeleteWorker(worker.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton size="small" onClick={() => { navigate("/editWorker", { state: worker }) }}>
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                                {/* Collapsed row for displaying worker details */}
                                <TableRow>
                                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                                        <Collapse in={expandedRow === index}>
                                            {/* Display worker details */}
                                            <Typography variant="body2" gutterBottom>
                                                First Name: {worker.firstName}
                                            </Typography>
                                            <Typography variant="body2" gutterBottom>
                                                Last Name: {worker.lastName}
                                            </Typography>
                                            <Typography variant="body2" gutterBottom>
                                                TZ: {worker.tz}
                                            </Typography>
                                            <Typography variant="body2" gutterBottom>
                                                Birth Date: {worker.birthDate}
                                            </Typography>
                                            <Typography variant="body2" gutterBottom>
                                                Start Date: {worker.startDate}
                                            </Typography>
                                            <Typography variant="body2" gutterBottom>
                                                My Gender: {worker.gender}
                                            </Typography>
                                            <Typography variant="body2" gutterBottom>
                                                Image:
                                                <img src={worker.imageURL} alt={`Image of ${worker.firstName} ${worker.lastName}`} style={{ width: '20%', height: 'auto' }} />
                                            </Typography>
                                            <Typography variant="body2" gutterBottom>
                                                Roles:
                                            </Typography>
                                            {/* Display worker roles */}
                                            <ul>
                                                {worker.roles.map((rolep, index) => {
                                                    const role = roles.find(role => role.id === rolep.roleId);
                                                    return <li key={index}>{role ? role.name : 'Unknown Role'}</li>;
                                                })}
                                            </ul>
                                        </Collapse>
                                    </TableCell>
                                </TableRow>
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* Button to export workers to Excel */}
            <button onClick={exportToExcel}>Export to Excel</button>
        </div>
    );
}
