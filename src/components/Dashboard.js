// Dashboard.js
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, CircularProgress } from '@mui/material';
import axios from '../api/axios';

function Dashboard() {
  const [totalEmployees, setTotalEmployees] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/', { params: { page: 1, limit: 1 } })
      .then(res => {
        setTotalEmployees(res.data.total);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch employee count:', err);
        setLoading(false);
      });
  }, []);

  return (
    <Card sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Total Employees
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          <Typography variant="h3" color="primary">
            {totalEmployees}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

export default Dashboard;