import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <AppBar sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }}>
        <Typography variant="h5" sx={{ml: '5rem'}}>
          Quiet Time Assistant
        </Typography>
      <Toolbar sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '28rem',
        mr: '3rem'
      }}>
        <Button color="inherit" component={RouterLink} to="/">
          Assistant
        </Button>
        <Button color="inherit" component={RouterLink} to="/notes">
          Notes
        </Button>
        <Button color="inherit" component={RouterLink} to="/surveys">
          Surveys
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
