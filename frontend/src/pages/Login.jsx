import React, { useEffect, useState } from 'react'
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useToast,
    ChakraProvider
  } from '@chakra-ui/react';
  import {Link as Navlink, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Log } from '../redux/auth/auth.action';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

export default function Login() {
    const [email,setEmail] = useState('')
    const [password,setPass] = useState('')
    const toast = useToast()
    const navigate = useNavigate();
    const {error,isLogin} = useSelector((store)=>store.authReducer)
    const dispatch = useDispatch()


    const onsubmit = ()=>{
      const payload ={
        email,
        password
      }
  
      dispatch(Log(payload))
    }
    useEffect(()=>{
      if(error){
        toast({
          title: error,
          status: 'error',
          duration: 1000,
          isClosable: true,
        })
        dispatch({ type: 'SET_ERROR_FALSE', payload: false }); // Dispatch action to set isSign to false

      }
      if(isLogin){
        toast({
          title: 'Login Sucessfull.',
          status: 'success',
          duration: 1000,
          isClosable: true,
        })
        navigate('/')
      }
  
    },[error,isLogin])


  return (
    <div>
      <ChakraProvider>
        <Flex
          minH={'100vh'}
          align={'center'}
          justify={'center'}
          // backgroundImage="url('https://c4.wallpaperflare.com/wallpaper/311/864/40/minimalism-blue-green-gradient-wallpaper-preview.jpg')"
          backgroundColor={'white'}
          backgroundSize="cover"
      >
        <Box p={4}>
        <Flex alignItems="center" 
       
        >
       <img src="/images/loginillustration.png" alt="Signup Illustration" style={{width:'50%'}}boxSize={{ base: '50%', sm: '30%' }}/>

      <Stack spacing={3} mx={'auto'} maxW={'lg'} py={18}  >
        <Stack align={'center'} mb={'-5'} mt={'4'}>
          <Heading  p='10px' color={'#4197E0'} fontSize={'4xl'}>Login</Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={'whiteAlpha.700'}
          boxShadow={'0px 8px 30px rgba(52, 152, 219, 0.8)'} 
          p={8}
          
          >

          <Stack spacing={4}
          >
            <FormControl id="email" required>
              <FormLabel>Email address</FormLabel>
              <Input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
            </FormControl>
            <FormControl id="password" required>
              <FormLabel>Password</FormLabel >
              <Input type="password" value={password} onChange={(e)=>{setPass(e.target.value)}} />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                >
                <Text>Create New Account</Text>
                <Navlink to={'/signup'} color={'blue'} style={{marginTop:"1.5%" ,color:"blue"}}>SignUp</Navlink>
              </Stack>
              <Button
              onClick={onsubmit}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
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
    </div>
  )
}
