import React, { useEffect, useState } from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  useToast,
  InputLeftElement,
  Image,
  ChakraProvider
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Signin } from '../redux/auth/auth.action';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Sign() {
const location = useLocation();
  const verifiedEmail = location.state.email;
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');
  const [mobile, setMob] = useState('');
  const [emailExists, setEmailExists] = useState(false); // State to track if email exists

  const dispatch = useDispatch();
  const { error, isSign } = useSelector((store) => store.authReducer);
  const navigate = useNavigate();
  const toast = useToast();

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };
  
  useEffect(() => {
    // Update the email state after the component mounts
    setEmail(verifiedEmail);
  }, [verifiedEmail]); 

  const checkExistingEmail = async (email) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/check-existing-email?email=${email}`);
      setEmailExists(response.data.exists); // Update emailExists state based on API response
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onSubmit = async (e) => {
    try {
      e.preventDefault();

      const payload = {
        name,
        email,
        password,
        age: 0,
        mobile,
      };
      console.log(payload);
      dispatch(Signin(payload));
    } catch (error) {
      console.error('Error:', error.response.data);
      const errorMessage = error.response.data.message || 'An error occurred';
      console.log("error", errorMessage);
      toast({
        title: errorMessage || 'An error occurred',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    if (error) {
      toast({
        title: error,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      dispatch({ type: 'SET_ERROR_FALSE', payload: false }); // Dispatch action to set isSign to false
    }
    if (isSign) {
      toast({
        title: 'Account Created Successfully',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      dispatch({ type: 'SET_SIGN_FALSE', payload: false }); // Dispatch action to set isSign to false
      navigate('/login');
    }
  }, [error, isSign]);

  return (
    <ChakraProvider>
      <Flex
      position="fixed" // Fix the content position
        minH="60vh"
        justify="center"
        backgroundColor={'white'}
        backgroundSize="30%"
        backgroundRepeat="no-repeat"
        backgroundPosition="center"
        margin="2rem" // Set margin
        direction="column"
        px={{ base: 4, sm: 6, md: 8 }} // Responsive padding on x-axis
      >
        <Box p={4}>
          <Flex alignItems="center" mb={4}>
            {/* Image in the main container */}
            <Image src="/images/signupregistration.avif" alt="Signup Illustration" boxSize={{ base: '50%', sm: '30%' }} />
            <Stack spacing={2} mx={'auto'} maxW={'lg'} py={4} px={6} flex={1}>
              <Heading color={'#3498DB'} fontSize={{ base: 20, sm: 24, md: 32 }} textAlign={'center'}>
                Sign up
              </Heading>
              <Box
  rounded={'md'}
  bg={'whiteAlpha.700'}
  boxShadow={'0px 8px 16px rgba(52, 152, 219, 0.8)'} // Set box shadow color to #3498DB
  p={3}
  maxW={'md'}
  w={'80%'}
  mx={'auto'}
  h={'100%'}
  alignSelf="center" // Align the box to the right
>
                <Stack spacing={4}>
                  <FormControl id="name" isRequired>
                    <FormLabel fontSize={{ base: 14, md: 14 }} textAlign="left">Name</FormLabel>
                    <Input type="text" value={name} onChange={(e) => setName(e.target.value)} fontSize={{ base: 14, md: 16 }} textAlign="left" />
                  </FormControl>
                 <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" value={email} onChange={onEmailChange} disabled />
                {emailExists && (
                  <FormLabel color="red.500">Email already exists</FormLabel>
                )}
            </FormControl>
                  <FormControl id="con_password" isRequired>
                    <FormLabel fontSize={{ base: 14, md: 14 }} textAlign="left">Mob No</FormLabel>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none" fontSize={{ base: 14, md: 15 }} children={countryCode} />
                      <Input type="number" value={mobile} onChange={(e) => setMob(e.target.value)} fontSize={{ base: 14, md: 16 }} textAlign="left" />
                    </InputGroup>
                  </FormControl>
                  <FormControl id="password" isRequired>
                    <FormLabel fontSize={{ base: 14, md: 14 }} textAlign="left">Password</FormLabel>
                    <InputGroup>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPass(e.target.value)}
                        fontSize={{ base: 14, md: 16 }}
                        textAlign="left"
                      />
                      <InputRightElement h={'full'}>
                        <Button
                          variant={'ghost'}
                          onClick={() => setShowPassword((showPassword) => !showPassword)}
                        >
                          {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                  <Button
                    onClick={onSubmit}
                    loadingText="Submitting"
                    size="sm"
                    width={'100%'}
                    alignSelf={'center'}
                    bg={'#3498DB'}
                    color={'white'}
                    _hover={{ bg: 'blue.500' }}
                    fontSize={{ base: 14, md: 16 }}
                    mx="auto" // Center the button horizontally
                    mt={4} // Add margin top for spacing
                  >
                    Sign up
                  </Button>
                </Stack>
              </Box>
            </Stack>
            {/* Second image */}
            <Image src="/images/signupregistration2.avif" alt="Signup Illustration 2" boxSize={{ base: '50%', sm: '30%' }} />
          </Flex>
        </Box>
      </Flex>
    </ChakraProvider>
  );
}

