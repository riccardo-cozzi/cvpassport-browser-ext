import { Box, Paper, Typography } from "@mui/material";
import * as React from 'react';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';


const WorkHistoryPanel = () => {
  
  // EDUCATION
  const emptyWorkData = {
    employer: "",
    jobTitle: "",
    industryField: "",
    contractType: "",
    responsibilities: "",
    achievements: "",
    startingDate: "",
    endingDate: "",
    currentlyWorking: "",
  }
  const [workHistory, setWorkHistory] = useState([]);

  const handleChangeWorkHistory = (index, field) => (event) => {
    if (workHistory.length === 0) {
      workHistory.push(emptyWorkData);
    }
    workHistory[index][field] = event.target.value;
  }

  const addEmptyWorkHistory = () => {
    let newWorkHistory = [...workHistory];
    newWorkHistory.push(emptyWorkData); 
    setWorkHistory(newWorkHistory);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let payload = {
      user_id: localStorage.getItem('user_id'),
      data: {
        workHistory: workHistory,
      }
    }
    console.log("payload for WorkHistory", payload);
    // Inserisci qui la logica per inviare i dati, ad esempio a un server
  };



  return (
    <div>
        
        {/* ----------------------------- Education ----------------------------- */} 
        <Grid container spacing={2}>

        <Grid item xs={12}>
            <Box sx={{display:'flex', justifyContent:'center'}}>
              <Typography variant="h4" component="div" gutterBottom>
                Work history
              </Typography>
            </Box>
          </Grid>
          
          {
            
            workHistory.length === 0 ?
            <Grid item xs={12}>
            <Box sx={{display:'flex', justifyContent:'center'}}>
              <Typography variant="body2" gutterBottom>
                Please list your work history, starting from the most recent.
              </Typography>
            </Box>
            </Grid>

            :

            workHistory.map((work, index) => {
              return (
                <Grid key={index} item xs={12}>
                  <Paper sx={{margin:2, padding:10, boxShadow: 3, borderRadius: 5}}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <TextField label="School name" fullWidth value={workHistory[index].name} onChange={handleChangeWorkHistory(index, 'schoolName')} />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField label="Type of school" fullWidth value={workHistory[index].name} onChange={handleChangeWorkHistory(index, 'typeOfSchool')} />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField label="Program" fullWidth value={workHistory[index].name} onChange={handleChangeWorkHistory(index, 'program')} />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField label="Degree" fullWidth value={workHistory[index].name} onChange={handleChangeWorkHistory(index, 'degree')} />
                      </Grid>
                      <Grid item xs={3}>
                        <TextField label="Enrollment date" fullWidth value={workHistory[index].name} onChange={handleChangeWorkHistory(index, 'enrollmentDate')} />
                      </Grid>
                      <Grid item xs={3}>
                        <TextField label="Graduation date" fullWidth value={workHistory[index].name} onChange={handleChangeWorkHistory(index, 'graduationDate')} />
                      </Grid>
                      <Grid item xs={3}>
                        <TextField label="Graduation mark" fullWidth value={workHistory[index].name} onChange={handleChangeWorkHistory(index, 'graduationMark')} />
                      </Grid>
                      <Grid item xs={3}>
                        <TextField label="Graduation mark scale" fullWidth value={workHistory[index].name} onChange={handleChangeWorkHistory(index, 'graduationMarkScale')} />
                      </Grid>
                                          
                    </Grid>
                    
                  </Paper>

                  
                </Grid>
              )
            })
          }
          
          {/* Save and add another button */}
          <Grid item xs={12}>
            <Box sx={{display:'flex', justifyContent:'center'}}> 
              <Button sx={{width:100, marginTop:1, height:40, fontSize:15}} variant="outlined" color="primary" onClick={addEmptyWorkHistory}>
                Add
              </Button>
            </Box>
          </Grid>

        </Grid>

        {/* ----------------------------- SUBMIT ----------------------------- */}
        {
          workHistory.length > 0 ?
            <Box sx={{display:'flex', justifyContent:'center'}}> 
            <Button sx={{margin:10, width:300, height:50, fontSize:20}} 
                    type="submit" variant="contained" color="primary"
                    onClick={handleSubmit}
            >
              Save
            </Button>
            </Box>
            : 
            <></>
        }
    </div>
  );
}

export default WorkHistoryPanel;