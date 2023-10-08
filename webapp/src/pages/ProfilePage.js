import { Box } from "@mui/material";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Profile = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Paper>xs=8</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper>xs=4</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper>xs=4</Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper>xs=8</Paper>
        </Grid>
      </Grid>
    </Box>
    
  );
}

export default Profile;