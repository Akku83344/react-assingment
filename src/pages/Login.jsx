import  { useState } from 'react';
import { TextField, Button } from '@mui/material';
import {  useNavigate } from 'react-router-dom';
import styled from '@emotion/styled'

const Container = styled.div`
  background-color: #E3F4F4;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Box = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  @media (max-width: 600px) {
    width: 90vw;
  }
`
const Title = styled.h1`
  font-size: 34px;
  font-weight: 600;
  color: #537188;
  text-align: center;
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
`
const Login = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset errors
    setNameError(false);
    setEmailError(false);
    setPhoneError(false);

    // Validate inputs
    if (name.trim() === '') {
      setNameError(true);
      return;
    }
    if (!validateEmail(email)) {
      setEmailError(true);
      return;
    }
    if (!validatePhone(phone)) {
      setPhoneError(true);
      return;
    }

    // Save form data to local storage
    const formData = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim()
    };
    localStorage.setItem('formData', JSON.stringify(formData));

    // Clear form fields
    setName('');
    setEmail('');
    setPhone('');

    // Route to the second page
    navigate('/post-details');
  };

  const validateEmail = (email) => {
    // Simple email validation using regex
    const emailPattern = /^\S+@\S+\.\S+$/;
    return emailPattern.test(email);
  };

  const validatePhone = (phone) => {
    // Simple phone number validation using regex
    const phonePattern = /^[0-9]{10}$/;
    return phonePattern.test(phone);
  };

  return (
    <Container>
    <Box >
    <Title>LOG IN</Title>
      <Form onSubmit={handleSubmit}>
      <TextField
        label="Name"
        variant="outlined" 
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
        required
        error={nameError}
        helperText={nameError && 'Please enter your name'}
      />
      <TextField
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
        required
        error={emailError}
        helperText={emailError && 'Please enter a valid email'}
      />
      <TextField
        label="Phone Number"
        variant="outlined"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        fullWidth
        margin="normal"
        required
        error={phoneError}
        helperText={phoneError && 'Please enter a valid phone number'}
      />
      <Button  type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Form>

    </Box>
    </Container>
    
  );
};

export default Login;
