import React from 'react';
import Assistant from '../components/Assistant';
import { Box } from '@mui/material';

const Home: React.FC = () => {
  return (
    <Box sx={{
        display: 'flex',
        justifyContent: 'center'
    }}>
      <Assistant />
    </Box>
  );
};

export default Home;
