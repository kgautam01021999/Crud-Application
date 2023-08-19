import React, { useState } from 'react';
import {
  Grid,
  Typography,
  Button,
  TextField
} from "@mui/material";

function CreateUser({ onUserCreated }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();

   
    const errors = {};
    if (!name.trim()) {
      errors.name = 'Name is required';
    }
    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Invalid email format';
    }
    if (!phone.trim()) {
      errors.phone = 'Phone is required';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }


    const newUser = {
      name,
      email,
      phone,
    };

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();
      onUserCreated(data);
      setName('');
      setEmail('');
      setPhone('');
      setFormErrors({});
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item xs={12} display={"flex"} alignItems={"center"} justifyContent={"center"}>
        <Typography variant="h5">Create User</Typography>
      </Grid>
      <Grid item xs={12} md={6} display={"flex"} justifyContent="center" alignItems="center">
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            error={!!formErrors.name}
            helperText={formErrors.name}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            error={!!formErrors.email}
            helperText={formErrors.email}
          />
          <TextField
            label="Phone"
            variant="outlined"
            fullWidth
            margin="normal"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            error={!!formErrors.phone}
            helperText={formErrors.phone}
          />
          <Grid item xs={12} md={12} lg={12} paddingBottom={2}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Create
            </Button>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
}

export default CreateUser;
