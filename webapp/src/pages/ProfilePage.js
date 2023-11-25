import { Box, Paper, Typography } from "@mui/material";
import * as React from 'react';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import PersonalDataPanel from "../components/PersonalDataPanel";
import EducationHistoryPanel from "../components/EducationHistoryPanel";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import WorkHistoryPanel from "../components/WorkHistoryPanel";
import { FloatingButtonBack, FloatingButtonNext } from "../components/FloatingButton";

const steps = [
  'Personal data',
  'Education history',
  'Work history',
  'Skills',
  'Other information',
];

const panels = [
  <PersonalDataPanel />,
  <EducationHistoryPanel />,
  <WorkHistoryPanel />,
]




const Profile = () => {

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    if (activeStep < steps.length) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };
  
  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  }

  return (
    <>
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>

    <Box sx={{ width: '100%', paddingTop:5 }}>
      {panels[activeStep]}
    </Box>
    
    <FloatingButtonNext onClick={handleNext} disabled={activeStep === steps.length-1}/>
    <FloatingButtonBack onClick={handleBack} disabled={activeStep === 0}/>
    
  </>
  );
}

export default Profile;