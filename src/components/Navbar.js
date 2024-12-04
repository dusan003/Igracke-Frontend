import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6">
          <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>
            Početna
          </Link>
        </Typography>
        <Button
          component={Link}
          to="/cart"
          variant="contained"
          sx={{
            backgroundColor: '#fff',
            color: '#1976d2',
            textDecoration: 'none',
            '&:hover': {
              backgroundColor: '#e3f2fd',
            },
          }}
        >
          Korpa
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
