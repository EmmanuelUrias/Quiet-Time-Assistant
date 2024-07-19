import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const menuItems = [
    { text: 'Assistant', to: '/' },
    { text: 'Notes', to: '/notes' },
    { text: 'Surveys', to: '/surveys' },
  ];

  return (
    <>
      <AppBar sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', p: '0.3rem' }}>
        <Typography variant="h5" sx={{ ml: '1.5rem' }}>
          Quiet Time Assistant
        </Typography>
        <Toolbar sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'row', justifyContent: 'space-between', width: '28rem', mr: '3rem' }}>
          {menuItems.map((item) => (
            <Button key={item.text} color="inherit" component={RouterLink} to={item.to}>
              {item.text}
            </Button>
          ))}
        </Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ display: { xs: 'flex', md: 'none' }, mr: 2 }} onClick={toggleDrawer(true)}>
          <MenuIcon fontSize='large'/>
        </IconButton>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List>
          {menuItems.map((item) => (
            <ListItem button key={item.text} component={RouterLink} to={item.to} onClick={toggleDrawer(false)}>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
