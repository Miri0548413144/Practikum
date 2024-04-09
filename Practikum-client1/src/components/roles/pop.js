import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';

function NewWorkerPopup() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="contained" onClick={handleOpen}>Add New Worker</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Worker Form</DialogTitle>
                <DialogContent>
                    <TextField label="First Name" fullWidth />
                    <TextField label="Last Name" fullWidth />
                    {/* Add more form fields as needed */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default NewWorkerPopup;
