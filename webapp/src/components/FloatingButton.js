import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';


export const FloatingButtonNext = ({text, onClick, disabled}) => {
  return (
    <Box sx={{ height: 320, justifyContent: 'right', position: 'fixed', zIndex: 1000, right: 0, bottom: 0, m: 2,}}>
      <Fab variant="extended" color="primary" onClick={onClick} disabled={disabled}>
        <NavigateNextIcon />
        {text}
      </Fab>
    </Box>
  );
}

export const FloatingButtonBack = ({text, onClick, disabled}) => {
  return (
    <Box sx={{ height: 320, justifyContent: 'right', position: 'fixed', zIndex: 1000, left: 0, bottom: 0, m: 2,}}>
      <Fab variant="extended" color="primary" onClick={onClick} disabled={disabled}>
        <NavigateBeforeIcon />
        {text}
      </Fab>
    </Box>
  );
}

