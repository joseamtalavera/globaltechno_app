/* // src/Register.js
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

function Register() {
    const [email, setEmail] = useState('');
    const [emails, setEmails] = useState([]);

    

    const useStyles = makeStyles((theme) => ({
        button: {
            margin: theme.spacing(1),
            backgroundColor: 'red',
            color: 'white',
            '&:hover': {
                backgroundColor: 'darkred',
            },
        },
        box: {
            borderColor: 'red',
            borderWidth: 1,
            borderStyle: 'solid',
            padding: theme.spacing(1),
            margin: theme.spacing(1),
            width: 350,
            backgroundColor: '#f3e5f5', // light purple background
        },
        center: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            height: '100vh',
            backgroundColor: '#ede7f6', // very light purple background
        },
        input: {
            margin: theme.spacing(1),
            padding: theme.spacing(1),
            width: '80%',
            borderRadius: '5px',
            border: '1px solid #673ab7', // deep purple border
        },
    }));

    const classes = useStyles();

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('API_URL:', process.env.REACT_APP_API_URL);
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/register`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });

        if (response.ok) {
            console.log('Email registered successfully');
            setEmail('');
        } else {
            console.error('Error registering email');
            const responseData = await response.json();
            console.error('Response data:', responseData);
        }
    };

    const showEmails = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/emails`);
        const data = await response.json();
        setEmails(data);
    };

    return (
        <div className={classes.center}>
            <form onSubmit={handleSubmit}>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                <Button type="submit" variant="contained" className={classes.button}>Register your Email</Button>
            </form>
            <Button variant="contained" className={classes.button} onClick={showEmails}>Show me the Data</Button>
            <Box className={classes.box}>
                {emails.map(email => (
                    <p key={email.id}>{email.email}</p>
                ))}
            </Box>
        </div>
    );
}

export default Register; */

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

export default function Register() {
  const [email, setEmail] = React.useState('');
  const [emails, setEmails] = React.useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    });

    if (response.ok) {
      console.log('Email registered successfully');
      setEmail('');
    } else {
      console.error('Error registering email');
      const responseData = await response.json();
      console.error('Response data:', responseData);
    }
  };

  const showEmails = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/emails`);
    const data = await response.json();
    setEmails(data);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} />
          <Typography component="h1" variant="h5">
            Register your Email
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={showEmails}
            >
              Show me the Data
            </Button>
            <Box sx={{ mt: 3, mb: 2 }}>
              {emails.map(email => (
                <p key={email.id}>{email.email}</p>
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}