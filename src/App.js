
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import EmployeePage from './components/EmployeePage';
import { Box } from '@mui/material';

const Layout = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar onNavigate={(key) => navigate(`/${key}`)} activePage={window.location.pathname.slice(1)} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/employee" element={<EmployeePage />} />
        </Routes>
      </Box>
    </Box>
  );
};

const AppLayout = () => (
  <Router>
    <Layout />
  </Router>
);

export default AppLayout;



