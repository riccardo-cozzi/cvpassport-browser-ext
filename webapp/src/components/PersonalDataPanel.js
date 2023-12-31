import { Box, Paper, Typography } from "@mui/material";
import * as React from 'react';
import Grid from '@mui/material/Grid';
import { useState, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { apiSetUserData, apiGetUserData } from "../api";

const PersonalDataPanel = () => {


  const [userId, setUserId] = useState(localStorage.getItem('user_id'));

  // PERSONAL INFORMATION
  const [personalData, setPersonalData] = useState({
    firstName: '',
    middleName: '',
    surname: '',
    age: '',
    homeAddress: '',
    homeCity: '',
    homeState: '',
    homePostalCode: '',
    workAddress: '',
    phoneNumber: '',
    emailAddress: '',
    socialSecurityNumber: '',
    nationality: '',
    otherVisa: '',
    visaSponsorship: '',
    disability: '',
    veteranStatus: '',
    sexualOrientation: '',
    ethnicity: '',
    religion: '',
    previousPositionAtCompany: '',
    familiarsWorkingThere: '',
  });

  const [updated, setUpdated] = useState(false);

  // Get user data from server
  useEffect(() => {
    apiGetUserData(userId)
    .then((data) => {
      let userPersonalData = {}
      for (let key in data) {
        if (key in personalData) {
          userPersonalData[key] = data[key];
        }
      }
      setPersonalData(userPersonalData);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }, []);


  const handleChangePersonalData = (field) => (event) => {
    if (updated === false) {
      setUpdated(true);
    }
    setPersonalData({ ...personalData, [field]: event.target.value });
  };


  const handleChangeUserID = (event) => {
    setUserId(event.target.value);
    console.log("changed user id in local storage:", event.target.value);
    localStorage.setItem('user_id', event.target.value);
  }

  



  const handleSubmit = (event) => {
    event.preventDefault();
    
    apiSetUserData(personalData)
    .then((data) => {
      console.log("response", data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };



  const handleGetData = (event) => {
    event.preventDefault();
    
    apiSetUserData()
    .then((data) => {
      console.log("response", data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }


  return (
    <div>
      <form onSubmit={handleSubmit}>


        {/* ----------------------------- Personal information ----------------------------- */}
        <Grid container spacing={2}>
          
          <Grid item xs={12}>
            <Typography variant="h4" component="div" gutterBottom>
              Personal information
            </Typography>
          </Grid>

          {/* user id */}
          <Grid item xs={12}>
            <TextField label="User ID" fullWidth value={userId} onChange={handleChangeUserID} />
          </Grid>

          {/* Name */}
          <Grid item xs={4}>
            <TextField label="Name" fullWidth value={personalData.firstName} onChange={handleChangePersonalData('firstName')} />
          </Grid>

          {/* Middle name */}
          <Grid item xs={4}>
            <TextField label="Middle Name" fullWidth value={personalData.middleName} onChange={handleChangePersonalData('middleName')} />
          </Grid>

          {/* Surname */}
          <Grid item xs={4}>
            <TextField label="Surname" fullWidth value={personalData.surname} onChange={handleChangePersonalData('surname')} />
          </Grid>

          {/* Age */}
          <Grid item xs={2}>
            <TextField label="Age" fullWidth value={personalData.age} onChange={handleChangePersonalData('age')} />
          </Grid>

          {/* Phone number */}
          <Grid item xs={4}>
            <TextField label="Phone Number" fullWidth value={personalData.phoneNumber} onChange={handleChangePersonalData('phoneNumber')} />
          </Grid>

          {/* Email address */}
          <Grid item xs={6}>
            <TextField label="Email Address" fullWidth value={personalData.emailAddress} onChange={handleChangePersonalData('emailAddress')} />
          </Grid>

          {/* Home Address */}
          <Grid item xs={4}>
            <TextField label="Home Address" fullWidth value={personalData.homeAddress} onChange={handleChangePersonalData('homeAddress')} />
          </Grid>

          {/* Home City */}
          <Grid item xs={3}>
            <TextField label="Home City" fullWidth value={personalData.homeCity} onChange={handleChangePersonalData('homeCity')} />
          </Grid>

          {/* Home State */}
          <Grid item xs={3}>
            <TextField label="Home State" fullWidth value={personalData.homeState} onChange={handleChangePersonalData('homeState')} />
          </Grid>

          {/* Home Postal Code */}
          <Grid item xs={2}>
            <TextField label="Home Postal Code" fullWidth value={personalData.homePostalCode} onChange={handleChangePersonalData('homePostalCode')} />
          </Grid>

          {/* Work Address */}
          <Grid item xs={6}>
            <TextField label="Work Address" fullWidth value={personalData.workAddress} onChange={handleChangePersonalData('workAddress')} />
          </Grid>
          
          {/* Social Security Number */}
          <Grid item xs={6}>
            <TextField label="Nationality" fullWidth value={personalData.nationality} onChange={handleChangePersonalData('nationality')} />
          </Grid>

          {/* Other Visa */}
          <Grid item xs={6}>
            <TextField label="Social Security Number" fullWidth value={personalData.socialSecurityNumber} onChange={handleChangePersonalData('socialSecurityNumber')} />
          </Grid>

          {/* Visa Sponsorship */}
          <Grid item xs={6}>
            <TextField label="Other Visa" fullWidth value={personalData.otherVisa} onChange={handleChangePersonalData('otherVisa')} />
          </Grid>

          {/* Visa Sponsorship */}
          <Grid item xs={6}>
            <TextField label="Visa Sponsorship" fullWidth value={personalData.visaSponsorship} onChange={handleChangePersonalData('visaSponsorship')} />
          </Grid>

          {/* Disability */}
          <Grid item xs={6}>
            <TextField label="Disability" fullWidth value={personalData.disability} onChange={handleChangePersonalData('disability')} />
          </Grid>

          {/* Veteran status */}
          <Grid item xs={6}>
            <TextField label="Veteran Status" fullWidth value={personalData.veteranStatus} onChange={handleChangePersonalData('veteranStatus')} />
          </Grid>

          {/* Sexual orientation */}
          <Grid item xs={6}>
            <TextField label="Sexual Orientation" fullWidth value={personalData.sexualOrientation} onChange={handleChangePersonalData('sexualOrientation')} />
          </Grid>

          {/* Ethnicity */}
          <Grid item xs={6}>
            <TextField label="Ethnicity" fullWidth value={personalData.ethnicity} onChange={handleChangePersonalData('ethnicity')} />
          </Grid>

          {/* Religion */}
          <Grid item xs={6}>
            <TextField label="Religion" fullWidth value={personalData.religion} onChange={handleChangePersonalData('religion')} />
          </Grid>

          {/* Previous position at company */}
          <Grid item xs={6}>
            <TextField label="Previous Position at Company" fullWidth value={personalData.previousPositionAtCompany} onChange={handleChangePersonalData('previousPositionAtCompany')} />
          </Grid>

          {/* Familiars working there */}
          <Grid item xs={6}>
            <TextField label="Familiars Working There" fullWidth value={personalData.familiarsWorkingThere} onChange={handleChangePersonalData('familiarsWorkingThere')} />
          </Grid>

        </Grid>




        {/* ----------------------------- SUBMIT ----------------------------- */}
       
        <Box sx={{display:'flex', justifyContent:'right'}}> 
          <Button sx={{margin:10, width:300, height:50, fontSize:20}} 
                  type="submit" variant="contained" color="primary"
                  onClick={handleSubmit}
                  disabled={!updated}
          >
            Save
          </Button>
        </Box>

        <Box sx={{display:'flex', justifyContent:'right'}}> 
          
        </Box>
      </form>
    </div>
  );
}

export default PersonalDataPanel;