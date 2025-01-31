import React, {useState, useContext} from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import "../styles/login.css"
import {Link} from 'react-router-dom'
import UserContext from '../context/UserContext';
import { Box, Container } from '@mui/system'
import { Avatar, Button, Checkbox, CssBaseline, FormControlLabel, Grid, InputAdornment, TextField, Typography } from '@mui/material'
import { MdLockOutline } from 'react-icons/md'
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
import { toast } from 'react-toastify'

function Signup() {
  const [credentials, setCredentials] = useState({ firstName: "", lastName: '', email: "", phoneNumber: '', password: "" })
    const navigate = useNavigate();
    const handleOnChange = (e) => {
      setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
    const loginContainerStyle = {
        backgroundImage: "url('https://cdn.pixabay.com/photo/2015/01/15/12/46/woman-600225_1280.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh", /* Set the height to occupy the entire viewport */
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      };

      const handleSubmit = async (e) => {
        e.preventDefault()
        let phoneRegex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/gm;
        let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        try {
          if (!credentials.email && !credentials.firstName && !credentials.password && !credentials.phoneNumber && !credentials.lastName) {
            toast.error("All fields are required", { autoClose: 500, theme: 'colored' })
          }
          else if (credentials.firstName.length < 1 || credentials.lastName.length < 1) {
            toast.error("Please enter valid name", { autoClose: 500, theme: 'colored' })
          }
          else if (emailRegex.test(credentials.email)===false) {
            toast.error("Please enter valid email", { autoClose: 500, theme: 'colored' })
          }
          else if (phoneRegex.test(credentials.phoneNumber)===false) {
            toast.error("Please enter a valid phone number", { autoClose: 500, theme: 'colored' })
          }
          else if (credentials.password.length < 5) {
            toast.error("Please enter password with more than 5 characters", { autoClose: 500, theme: 'colored' })
          }
          else if (credentials.email && credentials.firstName && credentials.lastName && credentials.phoneNumber && credentials.password) {
            const sendAuth = await axios.post('http://localhost:3001/api/auth/register',
              {
                firstName: credentials.firstName,
                lastName: credentials.lastName,
                email: credentials.email,
                phoneNumber: credentials.phoneNumber,
                password: credentials.password,
              })
            const receive = await sendAuth.data
            if (receive.success === true) {
              toast.success("Registered Successfully", { autoClose: 500, theme: 'colored' })
              localStorage.setItem('Authorization', receive.authToken)
              navigate('/login')
            }
            else {
              toast.error("Something went wrong, Please try again", { autoClose: 500, theme: 'colored' })
              navigate('/')
            }
          }
        } catch (error) {
          toast.error(error.response.data.error[0].msg, { autoClose: 500, theme: 'colored' })
    
        }
    
      }
  return (
    <div style={loginContainerStyle} >
    <Container component="main" maxWidth="xs" sx={{ marginBottom: 10, backgroundColor:'white' }}>
    <CssBaseline />
    <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
        <Avatar sx={{ m: 1, bgcolor: 'black' }}>
            <MdLockOutline />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  value={credentials.firstName}
                  onChange={handleOnChange}
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  value={credentials.lastName}
                  onChange={handleOnChange}
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={credentials.email}
                  onChange={handleOnChange}
                  autoComplete="email"

                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phoneNumber"
                  label="Contact Number"
                  name="phoneNumber"
                  value={credentials.phoneNumber}
                  onChange={handleOnChange}
                  inputMode='numeric'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end" onClick={handleClickShowPassword} sx={{ cursor: 'pointer' }}>
                        {showPassword ? <RiEyeFill /> : <RiEyeOffFill />}
                      </InputAdornment>
                    )
                  }}
                  value={credentials.password}
                  onChange={handleOnChange}
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{backgroundColor:'black'}}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                Already have an account?
                <Link to='/login' style={{ color: '#1976d2', marginLeft: 3 }}>
                  Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
          </Box>
    </Container>
    </div>
    
  )
}

export default Signup