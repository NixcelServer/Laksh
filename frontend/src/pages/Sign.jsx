import React, { useEffect, useState } from 'react'
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  useToast,
  InputLeftElement,
} from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Signin } from '../redux/auth/auth.action';
import axios from 'axios';
export default function Sign() {
  const location = useLocation();
  const verifiedEmail = location.state.email;
  // console.log(email1);
  const [showPassword, setShowPassword] = useState(false);
  const [name,setname] = useState('')
  const [countryCode, setCountryCode] = useState('+91');
  
  const [email,setEmail] = useState('')
  
  const [password,setPass] = useState('')
  const [mobile,setmob] = useState('')
  const [emailExists, setEmailExists] = useState(false); // State to track if email exists
  const [passwordError, setPasswordError] = useState('');
  const [initialized, setInitialized] = useState(false); // State to track if component is initialize

  const dispatch = useDispatch()
  const {error,isSign} = useSelector((store)=>store.authReducer)
  const navigate = useNavigate();
  const toast = useToast()
  // console.log(error,isSign)

  
  useEffect(() => {
    // Update the email state after the component mounts
    setEmail(verifiedEmail);
  }, [verifiedEmail]); 

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      // Execute your logic when the user navigates away from the page
      // Here, you can clear any data or reset the state if needed
      setEmail(null);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const checkExistingEmail = async (email) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/check-existing-email?email=${email}`
      );
      setEmailExists(response.data.exists); // Update emailExists state based on API response
    } catch (error) {
      console.error('Error:', error);
      
    }
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
    // setEmailExists(false); // Reset emailExists state when user changes the email
    // checkExistingEmail(e.target.value); // Check if the entered email exists
  };

  
  const onsubmit = async(e)=>{
    // const payload ={
    //   name,
    //   email,
    //   password,
    //   age: 0,
    //   mobile,
     
      
    // }
    // console.log(payload);
    // dispatch(Signin(payload))

    try {
      e.preventDefault();

      // if (!validatePassword(password)) {
      //   setPasswordError('Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character.');
      //   toast({
      //     title: 'Invalid Password',
      //     description: 'Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character.',
      //     status: 'error',
      //     duration: 3000,
      //     isClosable: true,
      //   });
      //   return;
      // }
        const payload ={
      name,
      email,
      password,
      age: 0,
      mobile,
     
      
    }
    console.log(payload);
    dispatch(Signin(payload))

      
      // toast({
      //   title: 'Account Created Successfully',
      //   status: 'success',
      //   duration: 3000,
      //   isClosable: true,
      // });
      // navigate('/'); // Redirect to home page after successful signup
    } catch (error) {
      // Handle error
      console.error('Error:', error.response.data);
      const errorMessage = error.response.data.message || 'An error occurred';
      console.log("erroer",errorMessage);
      toast({
        title: errorMessage|| 'An error occurred',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }


  }

  useEffect(()=>{
    if(error){
      toast({
        title: error ,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      dispatch({ type: 'SET_ERROR_FALSE', payload: false }); // Dispatch action to set isSign to false
      
    }
    if(isSign){
      toast({
        title: 'Account Created Sucessfully',
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
      
      dispatch({ type: 'SET_SIGN_FALSE', payload: false }); // Dispatch action to set isSign to false
      navigate('/login')
    }

  },[error,isSign])

  return (
    <>
       <Flex
      minH={'100vh'}
      // align={'center'}
      justify={'center'}
      backgroundImage="url('https://c4.wallpaperflare.com/wallpaper/311/864/40/minimalism-blue-green-gradient-wallpaper-preview.jpg')"
      backgroundSize="cover"
      
      >
      <Stack spacing={3} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading  pb='10px'  color={'whiteAlpha.800'} fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
    
        </Stack>
        <Box
          rounded={'lg'}
          bg={'whiteAlpha.700'}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="name" isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input type="text" value={name} onChange={(e)=>{setname(e.target.value)}} />
                </FormControl>
              </Box>
             
            </HStack>
           
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" value={email} onChange={onEmailChange} disabled />
                {emailExists && (
                  <FormLabel color="red.500">Email already exists</FormLabel>
                )}
            </FormControl>
            <FormControl id="con_password" isRequired>
              <FormLabel>Mob No </FormLabel>
              <InputGroup>3
              <InputLeftElement
            pointerEvents="none"
            children={countryCode}
          />
          <Input
            type="number"
            value={mobile}
            onChange={(e)=>{setmob(e.target.value)}}
          />
              </InputGroup>
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} value={password} onChange={(e)=>{setPass(e.target.value)}}/>
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Stack spacing={10} pt={2}>
              <Button
                onClick={onsubmit}           
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign up
              </Button>
            </Stack>
           
          </Stack>
        </Box>
      </Stack>
    </Flex>
    </>
  )
}
