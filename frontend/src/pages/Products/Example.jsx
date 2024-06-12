import React, { useState } from 'react';


const Example = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name,setname] = useState('')
  const [countryCode, setCountryCode] = useState('+91');
  
  const [email,setEmail] = useState('')
  const [password,setPass] = useState('')
  const [mobile,setmob] = useState('')
  const [emailExists, setEmailExists] = useState(false); // State to track if email exists
  const [passwordError, setPasswordError] = useState('');

  const dispatch = useDispatch()
  const {error,isSign} = useSelector((store)=>store.authReducer)
  const navigate = useNavigate();
  const toast = useToast()
  // console.log(error,isSign)

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
    
      <ChakraProvider>
   
       <Flex
      minH={'100vh'}
      // align={'center'}
      justify={'center'}
      // backgroundImage="url('https://c4.wallpaperflare.com/wallpaper/311/864/40/minimalism-blue-green-gradient-wallpaper-preview.jpg')"
      backgroundSize="cover"
      backgroundColor={'white'}
      
      >
        <Box p={4}>
        <Flex alignItems="center" 
       
        >
                 <Image src="/images/loginillustration.png" alt="Signup Illustration" style={{width:'50%'}}boxSize={{ base: '50%', sm: '30%' }}/>

      <Stack spacing={3}  mx={'auto'}  py={12} >
        <Stack align={'center'}>
          <Heading  pb='10px'  color={'#4197E0'} mb={'-3'} fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
    
        </Stack>
        <Box
          rounded={'lg'}
          bg={'whiteAlpha.700'}
          boxShadow={'0px 8px 20px rgba(52, 152, 219, 0.8)'} 
          p={4}
          >
          <Stack spacing={2}>
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
              <Input type="email" value={email} onChange={onEmailChange} />
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
                  
                }}
                >
                Sign up
              </Button>
            </Stack>
           
          </Stack>
        </Box>
      </Stack>
      </Flex>
      </Box>
    </Flex>
    </ChakraProvider>
    
  )
}

export default Example;
