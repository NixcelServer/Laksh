import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  
  Text,
  useToast,
} from '@chakra-ui/react';


const SignUp = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const toast = useToast();

  const handleEmailSubmit = async(e) => {
    e.preventDefault();
    console.log(email);
    try{
      setStep(2); // Move to the OTP step
      const response = await axios.post('http://localhost:8000/api/send-otp', { email });
      
      console.log(response);
    }catch(error){
      console.log(error)
    }

    
    // Here you would add your Gmail authentication logic
   
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
        const payload = { email, otp };
        const response = await axios.post('http://localhost:8000/api/verify-otp', payload);

        if (response.status === 200) {
            toast({
                title: 'OTP Verified!',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            navigate('/sign', { state: { email } });
        }
    } catch (error) {
        const errorMessage = error.response?.data?.error || 'An error occurred while verifying the OTP. Please try again.';
        setErrorMessage(errorMessage);
    }
};

  

  const styles = {
    app: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#002D62',
      fontSize: '14px',
      padding: '10px',
    },

    disclaimer: {
      color: '#888',
      fontSize: '12px',
      textAlign: 'center',
      marginTop: '20px',
    },
    
    container: {
      display: 'flex',
      maxWidth: '900px',
      width: '100%',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
      marginTop: '5%',
      flexDirection: 'row',
      '@media (max-width: 768px)': {
        flexDirection: 'column',
      },
    },
    
    formContainer: {
      flex: '1',
      padding: '2rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    
    input: {
      marginBottom: '1rem',
      padding: '0.75rem',
      fontSize: '1rem',
      border: '1px solid #ccc',
      borderRadius: '4px',
      width: '100%',
    },
    
    button: {
      padding: '0.75rem',
      fontSize: '1rem',
      color: 'white',
      backgroundColor: '#00a82d',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      width: '50%',
      background: 'linear-gradient(114.9deg, rgb(34, 34, 34) 8.3%, rgb(0, 40, 60) 41.6%, rgb(0, 143, 213) 93.4%)',
      '@media (max-width: 480px)': {
        width: '100%', // Make button full width on small screens
      },
    },
    
    imageContainer: {
      flex: '1',
      backgroundColor: '#5499C7',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    
    image: {
      marginTop: '20px',
      width: '100%',
      height: 'auto',
      maxWidth: '300px',
      borderRadius: '10%',
    },
    
    imageText: {
      marginBottom: '1px',
      marginTop: '10px',
      color: 'black',
      fontSize: '1.5rem',
      textAlign: 'center',
      width: '250px',
      lineHeight: '1px'
    },
    
    heading: {
      marginBottom: '0.5rem',
      color: '#333',
      fontSize: '18px'
    },
    
    text: {
      color: '#333',
      marginBottom: '1rem',
      textAlign: 'center',
    },
    
    '@media (max-width: 768px)': {
      container: {
        flexDirection: 'column',
        height: 'auto',
      },
      imageContainer: {
        flex: 'none',
        width: '100%',
      },
    },

    '@media (max-width: 480px)': {
      input: {
        width: '100%', // Make input full width on small screens
      },
      button: {
        width: '100%', // Make button full width on small screens
      },
    },
  };

  return (
    <div style={styles.app}>
      <div style={styles.container}>
        <div style={styles.formContainer}>
          {step === 1 && (
            <form onSubmit={handleEmailSubmit} style={{ width: '100%' }}>
              <img src='images/signuplogo.png' style={{ marginTop: '-50px', width: '20%', height: '25%', margin: '0 auto', marginBottom: '3%' }} />
              <h2 style={styles.heading}>Sign up for free</h2>
              <p style={styles.text}>Remember everything in one place</p>
              <div>
                <input
                  type="email"
                  placeholder="Enter Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    ...styles.input,
                    borderColor: 'lightblue',
                    height: '40px',
                    width: '100%',
                    maxWidth: '180px',
                  }}
                />
              </div>
              <div>
                <button type="submit" style={styles.button}>
                  Sign up for free
                </button>
              </div>
              <p style={styles.disclaimer}>
                By signing up, you agree to our Terms of Service and Privacy Policy.
              </p>
            </form>
          )}
          {step === 2 && (
            <form onSubmit={handleOtpSubmit} style={{ width: '100%' }}>
              <p style={{ color: 'green', fontWeight: 'bold' }}>OTP Successfully sent! </p>
              <div>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  style={{
                    ...styles.input,
                    borderColor: 'lightblue',
                    height: '40px',
                    width: '100%',
                    maxWidth: '180px',
                  }}
                  
                />
                {errorMessage && <Text color="red.500">{errorMessage}</Text>}
              </div>
              <button type="submit" style={styles.button}>
                Verify OTP
              </button>
              <p style={styles.disclaimer}>
                By signing up, you agree to our Terms of Service and Privacy Policy.
              </p>
            </form>
          )}
        </div>
        <div style={styles.imageContainer}>
          <div style={styles.imageText}>
            <h6 style={{ color: 'black' }}>Chem-Fact</h6>
            <p style={{ fontSize: '16px', fontFamily: 'serif', color: 'white' }}>A Company that manufactures products that are used as input to the production of another more complexed products.</p>
          </div>
          <img
            src="/images/chemicals1.png"
            alt="Evernote"
            style={styles.image}
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
