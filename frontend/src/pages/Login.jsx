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
          //  backgroundColor={'#002D62'}
          // backgroundImage="url('/images/loginbackground.jpg')"
// backgroundImage="url('/images/loginimage.jpg')"

          backgroundColor={'#E0FFFF'}
          backgroundSize="100% 100%"
  backgroundRepeat="no-repeat"
        //  style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/images/greenillustration'})` }}
          
      >
        <Box p={4}>
        <Flex alignItems="center"   
       
        >
<img 
  src="/images/loginimage.jpg" 
  alt="Signup Illustration" 
  style={{
    width: '40%',
    marginLeft: '7%',
    borderRadius: '20px', // Adjust the value to your desired border radius
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)' // Adjust the shadow properties as needed
  }}
  boxSize={{ base: '50%', sm: '30%' }}
/>
       {/* <img src="/images/loginbackground1.jpg" alt="Signup Illustration" style={{width:'40%',marginLeft:'7%'}}boxSize={{ base: '50%', sm: '30%' }}/> */}

      <Stack spacing={3} mx={'auto'} maxW={'lg'} py={18} ml={{ base: 0, md: 'auto' }}>
        <Stack align={'center'} mb={'-5'} mt={'4'}>
          <Heading  p='10px' color={'#034694'} fontSize={'4xl'}>Login</Heading>
        </Stack>
        <Box
          rounded={'lg'}
          backgroundColor={'rgba(255, 255, 255, 0.8)'}
          boxShadow={'0 0 10px rgba(0, 0, 0, 0.5)'} 
          p={8}
          
          >

          <Stack spacing={4} style={{color:"#034694"}}
          >
            <FormControl id="email" required>
              <FormLabel >Email address</FormLabel>
              <Input type="email" value={email} onChange={(e)=>{setEmail(e.target.value) }}borderColor={'blue.500'}  />
            </FormControl>
            <FormControl id="password" required>
              <FormLabel>Password</FormLabel >
              <Input type="password" value={password} onChange={(e)=>{setPass(e.target.value)}} borderColor={'blue.500'} />
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
                bg={'#034694'}
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
