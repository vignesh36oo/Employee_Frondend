import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Box,
    TextField,
    Grid
} from '@mui/material';
import EmployeeForm from './EmployeeForm';
import EmployeeTable from './EmployeeTable';

const EmployeePage = () => {
    const [open, setOpen] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(Date.now());

    const [filters, setFilters] = useState({
        name: '',
        email: '',
        department: '',
        salary: ''
    });

    const handleSuccess = () => {
        setOpen(false);
        setRefreshTrigger(Date.now());
    };

    const handleFilterChange = (e) => {
        console.log(e.target.name, "erter", e.target.value, filters);
        setFilters({ ...filters, [e.target.name]: e.target.value.toLowerCase() });
    };

    return (
        <Box>
            {/* Styled Heading Section */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 3,
                    px: 3,
                    py: 2,
                    bgcolor: '#f0f4ff',
                    borderRadius: 2,
                    boxShadow: 1,
                }}
            >
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    Employee List
                </Typography>
                <Button variant="contained" onClick={() => setOpen(true)}>
                    Add Employee
                </Button>
            </Box>

            {/* Table with hover effects */}
            <EmployeeTable refreshTrigger={refreshTrigger} filters={filters} />

            {/* Modal for Adding Employee */}
            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle
                    sx={{
                        bgcolor: '#1976d2',
                        color: '#fff',
                        py: 2,
                        fontWeight: 500,
                        fontSize: '1.25rem',
                    }}
                >
                    Add New Employee
                </DialogTitle>
                <DialogContent dividers sx={{ px: 4, py: 3 }}>
                    <EmployeeForm onSuccess={handleSuccess} />
                </DialogContent>
                <DialogActions sx={{ px: 4, pb: 3 }}>
                    <Button onClick={() => setOpen(false)} variant="outlined" color="secondary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default EmployeePage;