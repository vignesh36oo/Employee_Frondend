import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, CircularProgress,
  IconButton, Dialog, DialogTitle, DialogContent,
  DialogActions, Button, TextField, Snackbar, Alert,
  Pagination, Stack, Grid, Tooltip
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import axios from '../api/axios';

function EmployeeTable({ refreshTrigger }) {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastSeverity, setToastSeverity] = useState('success');

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [filters, setFilters] = useState({
    name: '',
    email: '',
    department: '',
    salary: ''
  });

  const [searchParams, setSearchParams] = useState(filters);

  const fetchEmployees = () => {
    setLoading(true);
    axios.get('/', {
      params: {
        page,
        limit: 10,
        ...searchParams
      }
    })
      .then(res => {
        setEmployees(res.data.result);
        setTotalPages(res.data.pages);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setToastMessage('Failed to fetch employees');
        setToastSeverity('error');
        setToastOpen(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchEmployees();
  }, [refreshTrigger, page, searchParams]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) return;
    try {
      const res = await axios.delete(`/${id}`);
      setEmployees(prev => prev.filter(emp => emp._id !== id));
      setToastMessage(res.data.message || 'Employee deleted successfully');
      setToastSeverity('success');
      setToastOpen(true);
    } catch (err) {
      setToastMessage(err.response?.data?.message || 'Failed to delete employee');
      setToastSeverity('error');
      setToastOpen(true);
    }
  };

  const handleEditOpen = (employee) => {
    setSelectedEmployee(employee);
    setEditDialogOpen(true);
  };

  const handleEditClose = () => {
    setEditDialogOpen(false);
    setSelectedEmployee(null);
  };

  const handleEditSave = async () => {
    try {
      const res = await axios.put('/', selectedEmployee);
      setEditDialogOpen(false);
      setSelectedEmployee(null);
      fetchEmployees();
      setToastMessage(res.data.message || 'Employee updated successfully');
      setToastSeverity('success');
      setToastOpen(true);
    } catch (err) {
      setToastMessage(err.response?.data?.message || 'Failed to update employee');
      setToastSeverity('error');
      setToastOpen(true);
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const parsedValue = type === 'number' ? Number(value) || '' : value;
    setSelectedEmployee({ ...selectedEmployee, [name]: parsedValue });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    setSearchParams(filters);
    setPage(1);
  };

  const handleReset = () => {
    const cleared = { name: '', email: '', department: '', salary: '' };
    setFilters(cleared);
    setSearchParams(cleared);
    setPage(1);
  };

  if (loading) return <CircularProgress sx={{ mt: 4 }} />;

  return (
    <>
      {/* Filter Fields */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Grid container spacing={2}>
          {['name', 'department'].map((field) => (
            <Grid item xs={12} sm={6} md={3} key={field}>
              <TextField
                label={`Filter by ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                name={field}
                value={filters[field]}
                onChange={handleFilterChange}
                fullWidth
                variant="outlined"
                size="small"
                type={['salary'].includes(field) ? 'number' : 'text'}
              />
            </Grid>
          ))}
          <Grid item xs={12} sm={6} md={3}>
            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
              <Button variant="contained" onClick={handleSearch}>Search</Button>
              <Button variant="outlined" color="secondary" onClick={handleReset}>Reset</Button>
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      {/* Employee Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{
              bgcolor: '#e3f2fd',
              '& th': {
                fontWeight: 'bold',
                fontSize: '0.95rem',
                color: '#0d47a1',
                borderBottom: '2px solid #bbdefb',
              },
            }}>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.length ? employees.map(emp => (
              <TableRow key={emp._id} sx={{
                transition: 'background-color 0.2s ease',
                '&:hover': { backgroundColor: '#f5f5f5' },
              }}>
                <TableCell>{emp.name}</TableCell>
                <TableCell>{emp.email}</TableCell>
                <TableCell>{emp.department}</TableCell>
                <TableCell>
                 {emp.salary?.$numberDecimal || emp.salary.toString()}
                  </TableCell>
                <TableCell>
                  <Tooltip title="Edit Employee" arrow>
                    <IconButton onClick={() => handleEditOpen(emp)} color="primary"><Edit /></IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Employee" arrow>
                    <IconButton onClick={() => handleDelete(emp._id)} color="error"><Delete /></IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={5} align="center">No Data Found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Stack spacing={2} sx={{ mt: 2, alignItems: 'center' }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, value) => setPage(value)}
          color="primary"
        />
      </Stack>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={handleEditClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit Employee</DialogTitle>
        <DialogContent dividers sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          mt: 1,
          maxHeight: '60vh',
          overflowY: 'auto',
          minWidth: { xs: '300px', sm: '400px' }
        }}>
          <TextField label="Name" name="name" value={selectedEmployee?.name || ''} onChange={handleChange} />
          <TextField
            label="Email"
            name="email"
            value={selectedEmployee?.email || ''}
            InputProps={{ readOnly: true }}
            sx={{
              cursor: 'not-allowed',
              '& .MuiInputBase-input': { cursor: 'not-allowed' },
            }}
          />
          <TextField label="Department" name="department" value={selectedEmployee?.department || ''} onChange={handleChange} />
          <TextField label="Salary" name="salary" type="number" value={selectedEmployee?.salary || ''} onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button variant="contained" onClick={handleEditSave}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Toast Notification */}
      <Snackbar
        open={toastOpen}
        autoHideDuration={4000}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity={toastSeverity}
          onClose={() => setToastOpen(false)}
          sx={{ width: '100%' }}
        >
          {toastMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default EmployeeTable;
