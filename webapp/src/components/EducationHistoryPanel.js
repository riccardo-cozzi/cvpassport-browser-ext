import { Box, Paper, Typography } from "@mui/material";
import * as React from 'react';
import Grid from '@mui/material/Grid';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { apiGetUserData } from "../api";


const EducationHistoryPanel = () => {
  
  // EDUCATION
  const emptyEducationData = {
    schoolName: "",
    typeOfSchool: "",
    program: "",
    degree: "",
    enrollmentDate: "",
    graduationDate: "",
    graduationMark: "",
    graduationMarkScale: "",
  }
  const [educationHistory, setEducationHistory] = useState([]);

  const handleChangeEducationHistory = (index, field) => (event) => {
    if (educationHistory.length === 0) {
      educationHistory.push(emptyEducationData);
    }
    educationHistory[index][field] = event.target.value;
  }

  const addEmptyEducationHistory = () => {
    let newEducationHistory = [...educationHistory];
    newEducationHistory.push(emptyEducationData); 
    setEducationHistory(newEducationHistory);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let payload = {
      educationHistory: educationHistory,
    }
    console.log("payload for EducationalHistory", payload);
    // Inserisci qui la logica per inviare i dati, ad esempio a un server
  };


  // Get user data from server
  useEffect(() => {
    apiGetUserData()
    .then((data) => {
      console.log("data", data);
      let userEducationHistory = []
      if (data.educationHistory) {
        userEducationHistory = data.educationHistory;
      } else {
        console.log("No education history found");
      }
      
      setEducationHistory(userEducationHistory);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }, []);


  return (
    <div>
        
        {/* ----------------------------- Education ----------------------------- */} 
        <Grid container spacing={2}>

          <Grid item xs={12}>
            <Box sx={{display:'flex', justifyContent:'center'}}>
              <Typography variant="h4" component="div" gutterBottom>
                Education history
              </Typography>
            </Box>
          </Grid>
          
          {
            
            educationHistory.length === 0 ?
            <Grid item xs={12}>
            <Box sx={{display:'flex', justifyContent:'center'}}>
              <Typography variant="body2" gutterBottom>
                Please list your education history, starting from the most recent.
              </Typography>
            </Box>
            </Grid>

            :

            educationHistory.map((education, index) => {
              return (
                <Grid key={index} item xs={12}>
                  <Paper sx={{margin:2, padding:10, boxShadow: 3, borderRadius: 5}}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <TextField label="School name" fullWidth value={educationHistory[index].name} onChange={handleChangeEducationHistory(index, 'schoolName')} />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField label="Type of school" fullWidth value={educationHistory[index].name} onChange={handleChangeEducationHistory(index, 'typeOfSchool')} />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField label="Program" fullWidth value={educationHistory[index].name} onChange={handleChangeEducationHistory(index, 'program')} />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField label="Degree" fullWidth value={educationHistory[index].name} onChange={handleChangeEducationHistory(index, 'degree')} />
                      </Grid>
                      <Grid item xs={3}>
                        <TextField label="Enrollment date" fullWidth value={educationHistory[index].name} onChange={handleChangeEducationHistory(index, 'enrollmentDate')} />
                      </Grid>
                      <Grid item xs={3}>
                        <TextField label="Graduation date" fullWidth value={educationHistory[index].name} onChange={handleChangeEducationHistory(index, 'graduationDate')} />
                      </Grid>
                      <Grid item xs={3}>
                        <TextField label="Graduation mark" fullWidth value={educationHistory[index].name} onChange={handleChangeEducationHistory(index, 'graduationMark')} />
                      </Grid>
                      <Grid item xs={3}>
                        <TextField label="Graduation mark scale" fullWidth value={educationHistory[index].name} onChange={handleChangeEducationHistory(index, 'graduationMarkScale')} />
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
              <Button sx={{width:100, marginTop:1, height:40, fontSize:15}} variant="outlined" color="primary" onClick={addEmptyEducationHistory}>
                Add
              </Button>
            </Box>
          </Grid>

        </Grid>

        {/* ----------------------------- SUBMIT ----------------------------- */}
        {
          educationHistory.length > 0 ?
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

export default EducationHistoryPanel;