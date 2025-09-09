import React, { useState } from 'react';
import EmployeeForm from '../components/EmployeeForm';
import EmployeeTable from '../components/EmployeeTable';

function Dashboard() {
  const [refreshKey, setRefreshKey] = useState(0);

  const triggerRefresh = () => setRefreshKey(prev => prev + 1);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Employee Dashboard</h2>
      <EmployeeForm onSuccess={triggerRefresh} />
      <EmployeeTable refreshTrigger={refreshKey} />
    </div>
  );
}

export default Dashboard;