import React, { useState } from 'react';
import { TextField, Button, Box, Snackbar, Alert } from '@mui/material';
import axios from '../api/axios';

function EmployeeForm({ onSuccess }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    department: '',
    salary: ''
  });

  const [errors, setErrors] = useState({});
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastSeverity, setToastSeverity] = useState('success');
  const [shouldTriggerSuccess, setShouldTriggerSuccess] = useState(false);

  const handleChange = e => {
    if (
      (e.target.name === 'name' || e.target.name === 'department') &&
      e.target.value &&
      !/^[a-zA-Z\s]*$/.test(e.target.value)
    ) {
      setErrors(prev => ({
        ...prev,
        [e.target.name]: `${e.target.name.charAt(0).toUpperCase() + e.target.name.slice(1)} must contain only letters`
      }));
      return;
    }

    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors(prev => ({ ...prev, [e.target.name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Email must be valid';
    if (!form.department.trim()) newErrors.department = 'Department is required';
    if (!form.salary) newErrors.salary = 'Salary is required';
    else if (isNaN(form.salary)) newErrors.salary = 'Salary must be a number';
    else if (parseFloat(form.salary) <= 0) newErrors.salary = 'Salary must be greater than 0';
    return newErrors;
  };

  const handleSubmit = async () => {
    const clientErrors = validateForm();
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      setToastMessage('Please fix the highlighted fields');
      setToastSeverity('error');
      setToastOpen(true);
      return;
    }

    try {
      const res = await axios.post('/', form);
      setForm({ name: '', email: '', department: '', salary: '' });
      setErrors({});
      setToastMessage(res.data.message || 'Employee created successfully');
      setToastSeverity('success');
      setToastOpen(true);
      setShouldTriggerSuccess(true); // defer onSuccess
    } catch (err) {
      const apiErrors = {};
      if (Array.isArray(err.response?.data?.errors)) {
        err.response.data.errors.forEach(e => {
          apiErrors[e.path] = e.msg;
        });
        setErrors(apiErrors);
        setToastMessage('Please fix the highlighted errors');
      } else {
        setToastMessage(err.response?.data?.message || 'Failed to create employee');
      }
      setToastSeverity('error');
      setToastOpen(true);
    }
  };

  const handleToastClose = () => {
    setToastOpen(false);
    if (shouldTriggerSuccess) {
      onSuccess();
      setShouldTriggerSuccess(false);
    }
  };

  return (
    <>
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
        <TextField
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name}
          fullWidth
        />
        <TextField
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          fullWidth
        />
        <TextField
          label="Department"
          name="department"
          value={form.department}
          onChange={handleChange}
          error={!!errors.department}
          helperText={errors.department}
          fullWidth
        />
        <TextField
          label="Salary"
          name="salary"
          value={form.salary}
          onChange={handleChange}
          type="number"
          inputProps={{ min: 0 }}
          error={!!errors.salary}
          helperText={errors.salary}
          fullWidth
        />
        <Box sx={{ gridColumn: '1 / -1', textAlign: 'right' }}>
          <Button variant="contained" onClick={handleSubmit}>Create Employee</Button>
        </Box>
      </Box>

      <Snackbar
        open={toastOpen}
        autoHideDuration={2000}
        onClose={handleToastClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity={toastSeverity}
          onClose={handleToastClose}
          sx={{ width: '100%' }}
        >
          {toastMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default EmployeeForm;