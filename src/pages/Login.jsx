import React, {useState, useContext, useEffect} from 'react'
import '../styles/login.css'
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import UserContext from '../context/UserContext';
import { Avatar, Button, Checkbox, CssBaseline, FormControlLabel, Grid, InputAdornment, TextField, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
import { toast } from 'react-toastify'
import { MdLockOutline } from 'react-icons/md'  
    
function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const navigate = useNavigate()
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
      const {email, setEmail, password, setPassword} = useContext(UserContext);
      const handleOnChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
      }

      useEffect(() => {
        let auth = localStorage.getItem('Authorization');
        if (auth) {
          navigate("/")
        }
      }, [])
      
      const handleSubmit = async (e) => {
        e.preventDefault();
        let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        try {
          if (!credentials.email && !credentials.password) {
            toast.error("All fields are required", { autoClose: 500, theme: 'colored' });
          } else if (!emailRegex.test(credentials.email)) {
            toast.error("Please enter a valid email", { autoClose: 500, theme: 'colored' });
          } else if (credentials.password.length < 5) {
            toast.error("Please enter valid password", { autoClose: 500, theme: 'colored' });
          } else if (credentials.email && credentials.password) {
            const sendAuth = await axios.post('http://localhost:3001/api/auth/login', { email: credentials.email, password: credentials.password });
            const receive = await sendAuth.data;
            if (receive.success === true) {
              toast.success("Login Successfully", { autoClose: 500, theme: 'colored' });
              localStorage.setItem('Authorization', receive.authToken);
              setEmail(credentials.email);
              if (credentials.email === "adminadmin@gmail.com") {
                navigate('/addProducts');
              } else {
                navigate('/');
              }
            } else {
              toast.error("Something went wrong, Please try again", { autoClose: 500, theme: 'colored' });
              navigate('/');
            }
          }
        } catch (error) {
          error.response.data.error.length === 1 ?
            toast.error(error.response.data.error[0].msg, { autoClose: 500, theme: 'colored' }) :
            toast.error(error.response.data.error, { autoClose: 500, theme: 'colored' });
        }
      }
      


  return (
    <div style={loginContainerStyle} >
    <Container component="main" maxWidth="xs" style={{backgroundColor:'white'}}>
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
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            value={credentials.email}
            name='email'
            onChange={handleOnChange}
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            value={credentials.password}
            name='password'
            onChange={handleOnChange}
            label="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" onClick={handleClickShowPassword} sx={{cursor:'pointer'}}>
                  {showPassword ? <RiEyeFill /> : <RiEyeOffFill />}
                </InputAdornment>
              )
            }}
            autoComplete="current-password"

          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            style={{backgroundColor:'black'}}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/forgotpassword" variant="body2" style={{ color: '#1976d2' }}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/register" variant="body2" >
                Don't have an account?<span style={{ color: '#1976d2' }}> Sign Up</span>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
      </div>
  )
}

export default Login