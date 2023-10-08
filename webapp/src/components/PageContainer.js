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


export default function PageContainer() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
    <Box bgcolor={"#0585fc"} width={"100%"} padding={"10px 50px 10px 50px"}>
      <Typography variant="h4" component="div" gutterBottom>
        CVPassport
      </Typography>
    </Box>

    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', width: '100%' }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label="Profile"  icon={<AssignmentIndIcon />}/>
        <Tab label="Settings" icon={<SettingsIcon />}/>
        <Tab label="Info"     icon={<HelpIcon />}/>
       
      </Tabs>
      { value == 0 ? <ProfilePage /> : null }
      { value == 1 ? <SettingsPage /> : null }
      { value == 2 ? <AboutPage /> : null }
      
    </Box>
    </>
    
  );
}