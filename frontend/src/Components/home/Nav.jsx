
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
import { MdSell,MdOutlineMessage,MdHome } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { HamburgerIcon, CloseIcon, ChevronDownIcon, Search2Icon } from '@chakra-ui/icons';
import {Link as Navlink} from 'react-router-dom'
import React, { useState,useEffect } from 'react';
import { Link as NavLink } from 'react-router-dom';
 import {authLogout} from '../../redux/auth/auth.action'
 import { Link } from 'react-router-dom';
 import { FaUser, FaBolt, FaCog } from 'react-icons/fa';





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
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4} position='sticky' top={'0'} zIndex='2' >
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

                <Image src='' w='60px' objectFit={'cover'} onClick={()=>{navigate('/')}}  />
            </Box>
                <Heading color={'#9B59B6 '} size={{ md: 'md', lg: 'lg' }} onClick={()=>{navigate('/')}} style={{ fontWeight: 'bold', marginLeft: '-60px'  }}>Laksh</Heading>

           
          </HStack>
          {
            isLogin &&  <Flex >
                        <Box display={{ base: 'none', md: 'flex' }} >
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
                        </Box>
                        <Box>
                        <InputGroup>
                            <Input type='text' placeholder='Enter Product / service' borderColor={'teal'} />
                            <Button colorScheme={'teal'} ml='5px' mr='5px' >
                                <Search2Icon   />
                            </Button>
                        </InputGroup>
                        </Box>
                    </Flex>
          }        
          <Flex alignItems={'center'}>
          <HStack
              as={'nav'}
              spacing={4}
              justifyContent='space-evenly'
              pr='15px'
              display={{ base: 'none', md: 'flex' }}>
                <Button flexDirection={'column'} size='lg' p='10px' _hover={{ color:'teal' }} onClick={()=>{navigate('/sell')}} >
                     <Icon   as={MdSell} boxSize={5}  /> 
                     <Text  fontWeight={'bold'}>sell</Text>
                </Button>
                <Button flexDirection={'column'} size='lg' p='10px'  >
                     <Icon  as={''} boxSize={5} /> 
                     <Text  fontWeight={'bold'} _hover={{ color:'teal' }}  style={{ fontSize: '16px' }} >Help</Text>
                </Button>
                <Button flexDirection={'column'} size='lg' p='10px' _hover={{ color:'teal' }} style={{ fontSize: '16px' }}   >
                     <Icon   as={MdOutlineMessage} boxSize={5} /> 
                     <Text  fontWeight={'bold'}>Message</Text>
                </Button>
                <Button flexDirection={'column'} size='lg' p='10px' _hover={{ color:'teal' }}  style={{ fontSize: '16px' }}  >
                     <Icon   as={MdOutlineMessage} boxSize={5} /> 
                     <Text  fontWeight={'bold'}>About us</Text>
                </Button>
            </HStack>

            <Menu>
          

<MenuButton as={Link} to="#" style={{ boxShadow: 'none' }} className="nav-link dropdown-toggle nav-link-lg nav-link-user">
  <Image src="images/adminlogo.png" className="user-img-radious-style" alt="image" boxSize="30px" /> {/* Adjust the boxSize as needed */}
  <Box as="span" className="d-sm-none d-lg-inline-block" />
</MenuButton>

      <MenuList>
        <MenuItem as={Link} to="login" icon={<FaUser />}>login</MenuItem>
        <MenuItem as={Link} to="alogin" icon={<FaBolt />}>Admin</MenuItem>
        <MenuItem as={Link} to="#" icon={<FaCog />}>Settings</MenuItem>
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