import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import ProfilePage from '../pages/ProfilePage';
import SettingsPage from '../pages/SettingsPage';
import AboutPage from '../pages/AboutPage';
import Grid from '@mui/material/Grid';
import Drawer from '@mui/material/Drawer';
import { Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export default function PageContainer() {
  const [value, setValue] = React.useState(0);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
 
  const handleChangePage = (event, newValue) => {
    setValue(newValue);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  }

  return (
    <>

    {/* APP bar stick to the top */}
    <Box sx={{ flexGrow: 1, width:"100%" }}>
        
        

        <Box sx={{ display: 'flex', justifyContent: 'center', bgcolor: '#0585fc'}}>
          <Button color="primary" variant='contained' onClick={toggleDrawer}>
            <MenuIcon />
          </Button>
          <Typography variant="h4" component="div" gutterBottom>
            CVPassport
          </Typography>
        </Box>

          

          
    </Box>
 
    {/* Page */}
    <Grid container spacing={2}>

    {/* Menu */}
    <Drawer
      anchor="left"
      open={drawerOpen}
      onClose={toggleDrawer}
    >
      <Box sx={{width: 200, marginTop:5}}>
        <Tabs
          orientation="vertical"
          value={value}
          onChange={handleChangePage}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          <Tab icon={<AssignmentIndIcon />} label="Profile" />
          <Tab icon={<SettingsIcon />} label="Settings" />
          <Tab icon={<HelpIcon />} label="About" />
        </Tabs>
      </Box>
    </Drawer>

    {/* Content */}
    <Grid item xs={11}>
      <Box sx={{padding:10, top:10}}>
        { value == 0 ? <ProfilePage /> : null }
        { value == 1 ? <SettingsPage /> : null }
        { value == 2 ? <AboutPage /> : null }
      </Box>
    </Grid>  

  </Grid>  

    

  </>
  );
}