import React, { useEffect, useState } from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useToast,
  ChakraProvider
} from '@chakra-ui/react';
import { Link as Navlink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AdminLog } from '../redux/auth/auth.action';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');
  const toast = useToast();
  const navigate = useNavigate();
  const { error, isLogin } = useSelector((store) => store.authReducer);
  const dispatch = useDispatch();

  const onsubmit = () => {
    const payload = {
      email,
      password
    };
    dispatch(AdminLog(payload));
  };

  useEffect(() => {
    if (error) {
      toast({
        title: error,
        status: 'error',
        duration: 1000,
        isClosable: true
      });
      dispatch({ type: 'SET_ERROR_FALSE', payload: false });
    }
    if (isLogin) {
      toast({
        title: 'Login Sucessfull.',
        status: 'success',
        duration: 1000,
        isClosable: true
      });
      navigate('/admintemplatedashboard');
    }
  }, [error, isLogin]);

  return (
    <ChakraProvider>
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        backgroundColor={'black'}
        backgroundSize="cover"
        // style={{
        //   background:
        //     'linear-gradient(109.6deg, rgb(255, 230, 109) 11.2%, rgb(87, 232, 107) 100.2%)'
        // }}
      >
        <Box p={4}>
  <Flex alignItems="center">
    <Box
      display={{ base: 'none', md: 'block' }} // Hide image on mobile, show on desktop
      mr={4} // Reduce the distance between image and login section
    >
      <img
        src="/images/loginlogo"
        alt="Signup Illustration"
        style={{ width: '80%', marginBottom: '-4%' }} // Increase the image size
        boxSize={{ base: '50%', sm: '30%' }}
      />
    </Box>
    <Stack spacing={0} mx={'auto'} maxW={'lg'} py={18} px={6}>
      <Stack align={'center'} mt={4} mb={-4}>
        <Heading p="10px" color={'#00C6A8'} fontSize={'4xl'}>
          Login
        </Heading>
      </Stack>
      <Box rounded={'lg'}  
       boxShadow={'xl'} p={8} color={'#00C6A8'}>
       {/* boxShadow={'0px 2px 4px gray'} p={8}> */}
        <Stack spacing={4}>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              borderColor="green.200"
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPass(e.target.value)}
              borderColor="green.200"
            />
          </FormControl>
          <Stack spacing={10}>
            <Stack direction={{ base: 'column', sm: 'row' }} align={'start'}>
              <Text>Create New Account</Text>
              <Navlink to={'/sign'} color={'#2ECC71'}>
                SignUp
              </Navlink>
            </Stack>
            <Button
              onClick={onsubmit}
              bg={'#00C6A8'}
              color={'white'}
              _hover={{
                bg: 'blue.500'
              }}
            >
              Login
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  </Flex>
</Box>

      </Flex>
    </ChakraProvider>
  );
}
