// import React from 'react';
// import Dashboard from './pages/Dashboard';

// function App() {
//   return <Dashboard />;
// }

// export default App;



// import React, { useState } from 'react';
// import Sidebar from './components/Sidebar';
// import Dashboard from './pages/Dashboard';
// import EmployeePage from './components/EmployeeTable';

// const AppLayout = () => {
//   const [page, setPage] = useState('dashboard');

//   return (
//     <div style={{ display: 'flex' }}>
//       <Sidebar onNavigate={setPage} />
//       <main style={{ flexGrow: 1, padding: '2rem' }}>
//         {page == 'dashboard' && <Dashboard />}
//         {page == 'employee' && <EmployeePage />}
//       </main>
//     </div>
//   );
// };

// export default AppLayout;


// import React, { useState } from 'react';
// import Sidebar from './components/Sidebar';
// import Dashboard from './pages/Dashboard';
// import EmployeePage from './components/EmployeeTable';
// import { Box } from '@mui/material';

// const AppLayout = () => {
//   const [page, setPage] = useState('dashboard');

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <Sidebar onNavigate={setPage} activePage={page} />
//       <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//         {page === 'dashboard' && <Dashboard />}
//         {page === 'employee' && <EmployeePage />}
//       </Box>
//     </Box>
//   );
// };

// export default AppLayout;



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
          <Route path="/dashboard" element={<Dashboard />} />
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



