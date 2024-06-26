
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Input,
  Text,
  Icon,
  Image,
  VStack,
  InputGroup,
  Heading,

} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { MdSell,MdOutlineMessage,MdHome, MdArchive, MdOutlineLocalMall } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { HamburgerIcon, CloseIcon, ChevronDownIcon, Search2Icon } from '@chakra-ui/icons';
import {Link as Navlink} from 'react-router-dom'
import React, { useState,useEffect } from 'react';
import { Link as NavLink } from 'react-router-dom';
 import {authLogout} from '../../redux/auth/auth.action'
 import { Link } from 'react-router-dom';
 import { FaUser, FaBolt, FaCog, FaUserCircle } from 'react-icons/fa';


 import { IoInformationOutline, IoHelp } from 'react-icons/io5';
 




export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [flag,setFlag] = useState(false)
  const {error,isLogin} = useSelector((store)=>store.authReducer)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [name,setName] = useState('')
  const btnRef = React.useRef()
    
  // handleside
  const handleSide = (val)=>{
    navigate(val)
    onClose()
  }

  const handleLogout=()=>{

    sessionStorage.removeItem('user');
     dispatch(authLogout())
     //sessionStorage.removeItem('user');
     navigate('/', { replace: true });    window.location.replace('/');

    // Prevent caching by adding additional headers
    window.location.reload(true); 

    
    

    
  }

  useEffect(()=>{

    const user = JSON.parse(sessionStorage.getItem("user"))
    if(user){
      console.log(user);
      
      //setName(user.username.firstname + " " + user.username.lastname)
      setName(user.u_name)

    }


  },[isLogin])
  

  return (
    <>
      <Box  bg="#527c90" position="fixed" top={0} left={0} right={0} zIndex={999} >
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            ref={btnRef}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />

          <HStack  alignItems={'center'} display={flag?{ base: 'none', md: 'flex' }:"flex"}    >
            <Box>

                <Image src='images/lakshlogo1.png' w='40px' objectFit={'cover'} onClick={()=>{navigate('/')}} style={{borderRadius:'20%',marginLeft:'10px'}} />
             
            </Box>
            
                <Heading color={'black '} size={{ md: 'md', lg: 'lg' }} onClick={()=>{navigate('/')}} style={{ fontWeight: 'bold', fontFamily:'Poetsen One'  }}>Laksh</Heading>

           
          </HStack>
          {
            isLogin &&  <Flex >
                        {/* <Box display={{ base: 'none', md: 'flex' }} >
                            <Menu>
                                <MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>
                                All India
                                </MenuButton>
                                <MenuList>
                                    <MenuItem>Pune</MenuItem>
                                    <MenuItem>Kolhapur</MenuItem>
                                    <MenuItem>Nashik</MenuItem>
                                    <MenuItem>Satara</MenuItem>
                                    <MenuItem>Mumbai</MenuItem>
                                </MenuList>
                            </Menu>
                        </Box> */}
                        {/* <Box>
                        <InputGroup>
                            <Input type='text' placeholder='Enter Product / service' borderColor={'teal'} />
                            <Button colorScheme={'teal'} ml='5px' mr='5px' >
                                <Search2Icon   />
                            </Button>
                        </InputGroup>
                        </Box> */}
                    </Flex>
          }       
 <Box>
                <InputGroup>
                    <Input
                    type="text"
                    _placeholder={{ opacity: 1, color: 'white' }}
                    placeholder="Enter Product Name"
                    borderColor={"gray"}
                    fontSize={'14px'}
                    textAlign="center"
                    color="white"
                    />
                    <Button colorScheme={"teal"} ml="5px" mr="5px">
                    <Search2Icon />
                    </Button>
                </InputGroup>
                </Box>


          <Flex alignItems={'center'} marginTop={'16px'}>
          <HStack
              as={'nav'}
              spacing={1}
              justifyContent='space-evenly'
              pr='15px'
              display={{ base: 'none', md: 'flex' }}>
                <Button flexDirection={'column'} size='lg' p='5px' _hover={{ color:'white' }} onClick={()=>{navigate('/userdashboard')}} style={{ fontSize: '14px', backgroundColor: 'transparent' }}  >
                     <Icon   as={MdSell} boxSize={4}  /> 
                     <Text  fontWeight={'normal'}>sell</Text>
                </Button>
                <Button flexDirection={'column'} size='lg' p='5px' _hover={{ color:'white' }} onClick={()=>{navigate('/myorders')}}style={{ fontSize: '14px', backgroundColor: 'transparent' }}  >
                     <Icon   as={MdOutlineLocalMall} boxSize={4}  /> 
                     <Text  fontWeight={'normal'}>My Orders</Text>
                </Button>

                <Button flexDirection={'column'} size='lg' p='5px' _hover={{ color:'white' }} onClick={()=>{navigate('/myorders')}}style={{ fontSize: '14px', backgroundColor: 'transparent' }}  >
                     <Icon   as={IoHelp} boxSize={4}  /> 
                     <Text  fontWeight={'normal'}>Help</Text>
                </Button>
                
                <Button flexDirection={'column'} size='lg' p='5px' _hover={{ color:'white' }} style={{ fontSize: '14px', backgroundColor: 'transparent' }}   >
                     <Icon   as={MdOutlineMessage} boxSize={4} /> 
                     <Text  fontWeight={'normal'}>Message</Text>
                </Button>
                <Button flexDirection={'column'} size='lg' p='5px' _hover={{ color:'white' }}  style={{ fontSize: '14px', backgroundColor: 'transparent' }}  >
                <Icon as={IoInformationOutline} boxSize={4} />
                     <Text  fontWeight={'normal'}>About us</Text>
                </Button>
            </HStack>

            <Menu>
          

            <MenuButton as={Link} to="#" style={{ boxShadow: 'none', flexDirection: 'column', display: 'flex', alignItems: 'center', padding: '0px', fontSize: '14px',marginRight:'10px', marginBottom: '25px', _hover: { color: 'white' },color:'black' }} className="nav-link dropdown-toggle nav-link-lg nav-link-user">
            
  <Icon as={FaUserCircle} boxSize={27} className="user-img-radious-style" /> {/* Adjust size as needed */}
  {/* <Text fontWeight={'bold'}>login</Text> */}
</MenuButton>


<MenuList minW="100px" w="120px"  textAlign="center">
  {!isLogin && (
    <>
      <MenuItem as={Link} to="login" icon={<FaUser />}>
        Login
      </MenuItem>
      <MenuItem as={Link} to="alogin" icon={<FaBolt />}>
        Admin
      </MenuItem>

      <MenuItem as={Link} to="userdashboard" icon={<MdSell />}>
        Sell
      </MenuItem>

      <MenuItem as={Link} to="" icon={<MdOutlineLocalMall />}>
      My Orders
      </MenuItem>

      <MenuItem as={Link} to="" icon={<IoHelp />}>
        Help 
      </MenuItem>

      <MenuItem as={Link} to="" icon={<MdOutlineMessage />}>
        Message
      </MenuItem>

      <MenuItem as={Link} to="" icon={<IoInformationOutline />}>
        About us
      </MenuItem>

               
               
              
          
    </>
  )}
  {isLogin && (
    <>
      <MenuItem as={Link} to="#" icon={<FaCog />}>
        Settings
      </MenuItem>
      <MenuItem as={Link} to="#" icon={<FaBolt />} onClick={handleLogout}>
        Logout
      </MenuItem>
    </>
  )}
</MenuList>

    </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Drawer
          isOpen={isOpen}
          placement='left'
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader textAlign={'center'}  >
                <Avatar
                    
                    size={'xl'}
                    src={
                        '/images/2.png'
                    }
                />
                
            </DrawerHeader>
            <hr />
            <DrawerBody >
                <VStack alignItems={'flex-start'} >
                    <Button w='100%'  size='lg' p='10px' columnGap={'10px'} onClick={()=>{handleSide('/')}}  _hover={{ color:'teal' }} >
                        <Icon   as={MdHome} boxSize={5}  /> 
                        <Text  fontWeight={'bold'}>Home</Text>
                    </Button>
                    <Button w='100%' size='lg' p='10px' columnGap={'10px'} onClick={()=>{handleSide('/sell')}} _hover={{ color:'teal' }} >
                        <Icon   as={MdSell} boxSize={5}  /> 
                        <Text  fontWeight={'bold'}>Sell</Text>
                    </Button>
                    <Button  w='100%'  size='lg' p='10px' columnGap={'10px'} onClick={()=>{handleSide('/')}} _hover={{ color:'teal' }} >
                        <Icon  as={''} boxSize={5} /> 
                        <Text  fontWeight={'bold'}>Help</Text>
                    </Button>
                    <Button  w='100%' size='lg' p='10px' columnGap={'10px'} onClick={()=>{handleSide('/')}} _hover={{ color:'teal' }}  >
                        <Icon   as={MdOutlineMessage} boxSize={5} /> 
                        <Text  fontWeight={'bold'}>Messages</Text>
                    </Button>
                </VStack>  
            </DrawerBody>          
          </DrawerContent>
        </Drawer>
        ) : false}
      </Box>

     
    </>
  );
}