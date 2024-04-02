import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Collapse, Typography, IconButton } from '@mui/material';
import { ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon, AddCircle as AddCircleIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

export default function WorkersTable() {
    const workers = useSelector(state => state.workers);
    const [expandedRow, setExpandedRow] = useState(null);
    const [showAddWorkerForm, setShowAddWorkerForm] = useState(false);

    const handleRowClick = (index) => {
        setExpandedRow(expandedRow === index ? null : index);
    };

    const handleAddWorker = () => {
        setShowAddWorkerForm(true);
    };

    return (
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
                    </TableRow>
                </TableHead>
                <TableBody>
                    {workers.map((worker, index) => (
                        <React.Fragment key={worker.id}>
                            <TableRow onClick={() => handleRowClick(index)} sx={{ cursor: 'pointer' }}>
                                <TableCell>{worker.firstName}</TableCell>
                                <TableCell>{worker.lastName}</TableCell>
                                <TableCell>{worker.tz}</TableCell>
                                <TableCell>{worker.startDate}</TableCell>
                                <TableCell>
                                    <IconButton size="small">
                                        {expandedRow === index ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    <IconButton size="small">
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton size="small">
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                    <Collapse in={expandedRow === index}>
                                        <Typography variant="body2" gutterBottom>
                                            Active: {worker.active ? 'Yes' : 'No'}
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            Birth Date: {worker.birthDate}
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            Image:
                                            <img src={worker.imageURL} alt={`Image of ${worker.firstName} ${worker.lastName}`} style={{ width: '100%', height: 'auto' }} />
                                        </Typography>
                                    </Collapse>
                                </TableCell>
                            </TableRow>
                        </React.Fragment>
                    ))}
                </TableBody>
            </Table>
            <IconButton onClick={handleAddWorker}>
                <AddCircleIcon />
            </IconButton>
            {showAddWorkerForm }
        </TableContainer>
    );
}