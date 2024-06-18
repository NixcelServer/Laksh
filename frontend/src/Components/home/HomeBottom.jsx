import React, { useState } from 'react';
import {
  Box,
  Text,
  Flex,
  Heading,
  Icon,
  Grid,
  GridItem,
  HStack,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Image
} from '@chakra-ui/react';
import { MdVerified } from 'react-icons/md';
import { FiFlag, FiMoreVertical } from 'react-icons/fi';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const ProductBox = ({ countryFlag, title, buyerCountry, details, date, flagLink }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} m={2}>
      <Flex justify="space-between" align="center" mb={2}>
        <HStack>
          <Link href={flagLink} isExternal>
            <Icon as={FiFlag} />
          </Link>
          <Text color="blue.500" mr={2}>{title}</Text>
          <Flex alignItems="center">
            <Icon as={MdVerified} color="green.500" onClick={onOpen} cursor="pointer" aria-label="Verified" />
            <Text ml={1} mb={0} fontSize="sm" color="green.500" fontWeight="bold" onClick={onOpen} cursor="pointer">Verified</Text>
          </Flex>
        </HStack>
        <Text fontSize="xs" color="gray.400">{date}</Text>
      </Flex>
      <Text fontSize="sm" color="gray.500" mb={2}>{buyerCountry}</Text>
      <Text fontSize="sm">
        {showMore ? details : `${details.substring(0, 100)}...`}
        <Link color="blue.500" onClick={toggleShowMore} cursor="pointer">
          {showMore ? <span style={{ color: "blue", marginLeft: "10px" }}>See Less</span> : <span style={{ color: "blue" }}>See More</span>}
        </Link>
      </Text>
      <Menu>
        <MenuButton as={Icon} icon={<FiMoreVertical />} color="gray.400" position="absolute" bottom={2} right={2} />
        <MenuList>
          <MenuItem onClick={toggleShowMore}>{showMore ? 'See Less' : 'See More'}</MenuItem>
        </MenuList>
      </Menu>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent>
          <ModalHeader>Verified Information</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            This product is verified by our quality team. You can trust the authenticity and quality of this product.
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default function HomeBottom() {
  

  const carouselImages = [
    { src: '/images/image1.png', alt: 'Carousel Image 1' },
    { src: '/images/image2.png', alt: 'Carousel Image 2' },
    { src: '/images/image3.png', alt: 'Carousel Image 3' }
  ];

  return (
    <Box p='20px' textAlign={'center'} bg={'white'}>
      {/* <Heading p='20px' size={{ base: "md", md: 'lg' }}>Product Buyers</Heading>
      <Box>
        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={3} bg="white">
          {products.map((product, index) => (
            <GridItem key={index} colSpan={1}>
              <ProductBox {...product} />
            </GridItem>
          ))}
        </Grid>
      </Box> */}
        <Box>
        <Box  bg={'white'} p={6}> {/* Adjust box size based on screen size */}
    <div className="row" style={{marginLeft:'4px'}}>
    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12">
        <div className="card" style={{ height: '300px', width: '200px' }}>
          <div className="card-statistic-4">
            <div className="align-items-center justify-content-between">
              <div className="row ">
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pr-0 pt-3">
                  {/* <div className="card-content">
                    <h5 className="font-15">New Booking</h5>
                    <h2 className="mb-3 font-18">258</h2>
                    <p className="mb-0"><span className="col-green">10%</span> Increase</p>
                  </div> */}
                  <h5 className="font-15">Info</h5>
                </div>
                {/* <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pl-0">
                  <div className="banner-img">
                    <img src="assets/img/banner/1.png" alt="" />
                  </div>
                </div> */}
                
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12">
        <div className="card" style={{ height: '300px', width: '200px' }}>
          <div className="card-statistic-4">
            <div className="align-items-center justify-content-between">
              <div className="row ">
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pr-0 pt-3">
                  {/* <div className="card-content">
                    <h5 className="font-15">New Booking</h5>
                    <h2 className="mb-3 font-18">258</h2>
                    <p className="mb-0"><span className="col-green">10%</span> Increase</p>
                  </div> */}
                  <h5 className="font-15">Info</h5>
                </div>
                {/* <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pl-0">
                  <div className="banner-img">
                    <img src="assets/img/banner/1.png" alt="" />
                  </div>
                </div> */}
                
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12">
        <div className="card" style={{ height: '300px', width: '200px' }}>
          <div className="card-statistic-4">
            <div className="align-items-center justify-content-between">
              <div className="row ">
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pr-0 pt-3">
                  {/* <div className="card-content">
                    <h5 className="font-15">New Booking</h5>
                    <h2 className="mb-3 font-18">258</h2>
                    <p className="mb-0"><span className="col-green">10%</span> Increase</p>
                  </div> */}
                  <h5 className="font-15">Info</h5>
                </div>
                {/* <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pl-0">
                  <div className="banner-img">
                    <img src="assets/img/banner/1.png" alt="" />
                  </div>
                </div> */}
                
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12">
        <div className="card" style={{ height: '300px', width: '200px' }}>
          <div className="card-statistic-4">
            <div className="align-items-center justify-content-between">
              <div className="row ">
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pr-0 pt-3">
                  {/* <div className="card-content">
                    <h5 className="font-15">New Booking</h5>
                    <h2 className="mb-3 font-18">258</h2>
                    <p className="mb-0"><span className="col-green">10%</span> Increase</p>
                  </div> */}
                   <h5 className="font-15">Info</h5>
                </div>
                {/* <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pl-0">
                  <div className="banner-img">
                    <img src="assets/img/banner/1.png" alt="" />
                  </div>
                </div> */}
                
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Repeat other cards as needed */}
    </div>
  </Box>


      </Box>
      <Heading p='20px' size={{ base: "md", md: 'lg' }}>Explore related products from Premium Brands</Heading>
      <Box>
        <Image objectFit={'cover'} src='/images/poster1.png' alt='poster1' />
      </Box>
      <Heading p='10px' size={{ base: "md", md: 'lg' }}></Heading>
      {/* <Box>
        <HomeAdv />
      </Box> */}
      {/* <Box>
        <Flex flexDirection={{ base: "column", md: "row" }}>
          <Box>
            <Image src='/images/poster2.1.png' objectFit={'cover'} alt='poster2.1' />
          </Box>
          <Box>
            <Image src='/images/poster2.2.png' objectFit={'cover'} alt='poster2.2' />
          </Box>
        </Flex>
      </Box> */}
      {/* <Heading p='20px' size={{ base: "md", md: 'lg' }}>Carousel</Heading> */}
      
      
      <Box>
        <Carousel showThumbs={false} autoPlay infiniteLoop>
          {carouselImages.map((image, index) => (
            <div key={index}>
              <img 
                src={image.src} 
                alt={image.alt} 
                style={{ maxHeight: '300px', objectFit: 'cover' }} 
              />
            </div>
          ))}
        </Carousel>
      </Box>
    </Box>
  );
}
