// Sidebar.js
import React from 'react';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Box
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';

const drawerWidth = 240;

const Sidebar = ({ onNavigate, activePage }) => {
  const navItems = [
    { label: 'Dashboard', icon: <DashboardIcon />, key: '' },
    { label: 'Employee', icon: <PeopleIcon />, key: 'employee' },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#1e1e2f',
          color: '#fff',
        },
      }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ ml: 1 }}>
          Admin Panel
        </Typography>
      </Toolbar>

      <Box sx={{ mt: 2 }}>
        <List>
          {navItems.map((item) => (
            <ListItemButton
              key={item.key}
              onClick={() => onNavigate(item.key)}
              selected={activePage === item.key}
              sx={{
                color: '#fff',
                '&.Mui-selected': {
                  backgroundColor: '#2e2e42',
                  '&:hover': {
                    backgroundColor: '#3a3a55',
                  },
                },
                '&:hover': {
                  backgroundColor: '#2a2a3d',
                },
              }}
            >
              <ListItemIcon sx={{ color: '#fff' }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ fontSize: '1rem' }}
              />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;