import React, { useState } from 'react';
import Grid from '@mui/material/Grid';


const Page1: React.FC = () => {
	const [name,setName] = useState<string>();
	const [gender,setGender] = useState<string>();
	const [sleepDuration,setSleepDuration] = useState<number>(0);
	
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/sleepduration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
					name: name,
					gender: gender,
					sleepDuration: sleepDuration,
        }),
      });
      if (response.ok) {
        alert('Data submitted successfully!');
        setName('')
				setSleepDuration(0)
				setGender('')
      } else {
        alert('Failed to submit data. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('An error occurred while submitting data. Please try again later.');
    }
  };

  return (
    <div >
      <Grid container spacing={2} style={{margin:'auto'}}>
        <Grid item xs={2} style={{textAlign:'left'}} >
          <label >Name:</label> 
        </Grid>
        <Grid item xs={2} >
          <input  style={{width:'100%'}} type="text" id="name" name="name" value={name} onChange={e => setName(e.target.value)}  />
        </Grid>
        <Grid item xs={8} />
        <Grid item xs={2} style={{textAlign:'left'}} >
          <label >Gender:</label>
        </Grid>
        <Grid item xs={2} >
          <select  style={{width:'100%'}}  id="gender" name="gender" value={gender} onChange={e => setGender(e.target.value)} >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </Grid>
        <Grid item xs={8} />
        <Grid item xs={2} style={{textAlign:'left'}} >
          <label >Sleep Duration (hours):</label>
        </Grid>
        <Grid item xs={2} >
          <input  style={{width:'100%'}} type="number" id="sleepDuration" name="sleepDuration" value={sleepDuration} onChange={e => setSleepDuration(Number(e.target.value))}  />
        </Grid>
        <Grid item xs={8} />
        <Grid item xs={2} />
        <Grid item xs={2} >
          <button type="submit" onClick={handleSubmit}> Submit</button>
        </Grid>
        <Grid item xs={8} />
      </Grid>
    </div>
  );
};

export default Page1;
