import React from 'react';
import {
  Grid,
  Typography,
  Button,
  Paper, // Import Paper from Material-UI
} from "@mui/material";

function User({ user, onDeleteUser, onEditUser }) {
  const handleDelete = async () => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`, {
        method: 'DELETE',
      });
      onDeleteUser(user.id);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
      <Grid container spacing={2} justifyContent="space-between" alignItems="center">
        <Grid item xs={12} md={6}>
          <Typography>
            {user.name} - {user.email} - {user.phone}
          </Typography>
        </Grid>
        <Grid item>
          <Button variant="outlined" color="primary" onClick={() => onEditUser(user)}>
            Edit
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" color="secondary" onClick={handleDelete}>
            Delete
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default User;
