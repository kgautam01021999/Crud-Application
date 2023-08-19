import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button, TextField } from "@mui/material";

function EditUser({ user, onUpdateUser, onCancel }) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedUser = {
      id: user.id,
      name,
      email,
      phone,
    };

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });

      const data = await response.json();
      onUpdateUser(data);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
    setPhone(user.phone);
  }, [user]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5">Edit User</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Phone"
            variant="outlined"
            fullWidth
            margin="normal"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary">
            Update
          </Button>
          <Button type="button" variant="outlined" color="secondary" onClick={onCancel}>
            Cancel
          </Button>
        </form>
      </Grid>
    </Grid>
  );
}

export default EditUser;
