import React, { useState } from 'react';
import HomeAdv from './HomeAdv';
import {
  Box,
  Text,
  Flex,
  Heading,
  Image,
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
  useDisclosure
} from '@chakra-ui/react';
import { MdVerified } from 'react-icons/md';
import { FiFlag ,FiMoreVertical} from 'react-icons/fi';

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
  <Link href={flagLink} isExternal >
    <Icon as={FiFlag} />
  </Link>
  <Text  color="blue.500" mr={2}>{title}</Text>
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
    {showMore ? <span style={{color:"blue", marginLeft:"10px"}}>See Less</span> : <span style={{color:"blue"}}>See More</span>}
  </Link>
</Text>


      <Menu>
        <MenuButton as={Icon} icon={<FiMoreVertical />} color="gray.400" position="absolute" bottom={2} right={2} />
        <MenuList>
          <MenuItem onClick={toggleShowMore} >{showMore ? 'See Less' : 'See More'}</MenuItem>
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
  const products = [
    {
      countryFlag: '🇹🇹',
      title: 'WANTED: Fruit Juices Like Apple Juice, Orange',
      buyerCountry: 'Buyer From Trinidad and Tobago',
      details: 'The buyer would like to receive quotations for - Product Name: Fruit Juices Specifications: Like Apple Juice, Orange, Etc Catalog Required Origin: India Or China',
      date: 'Jun-04-24',
      flagLink: 'https://example.com/flag1'
    },
    {
      countryFlag: '🇮🇩',
      title: 'WANTED: Frozen Fish Like Sardine Fish',
      buyerCountry: 'Buyer From Indonesia',
      details: 'Please provide a quotation to the following requirement from importer - Product Name: Frozen Fish irdksfngjn Specifications: Type: Sardine Fish Style: Frozen Quantity Required: 1',
      date: 'Jun-04-24',
      flagLink: 'https://example.com/flag2'
    },
    {
      countryFlag: '🇷🇴',
      title: 'WANTED: Yellow Corn',
      buyerCountry: 'Buyer From Romania',
      details: 'Provide a quotation to the following requirement from importer-Product Name: Yellow Corn aihjfdj Specifications: Maturity: 100% Length (cm): 2 Grade 1 Quantity Required: 1',
      date: 'Jun-04-24',
      flagLink: 'https://example.com/flag3'
    },
    {
      countryFlag: '🇬🇧',
      title: 'WANTED: Frozen Seafood Like Groupers Fish, Tuna, Squid',
      buyerCountry: 'Buyer From United Kingdom',
      details: 'Please provide a quotation to the following requirement from importer - Product Name: Frozen Seafood Specification: Type 1. Baracudda 2. Kingfish (3-5 ,5-10) 3. Emperor All',
      date: 'Jun-04-24',
      flagLink: 'https://example.com/flag4'
    }
  ];

  

  return (
    <Box p='20px' textAlign={'center'} bg={'black'} >
            <Heading p='20px' size={{ base: "md", md: 'lg' }}>

 Product Buyers</Heading>
      <Box   >
      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={3} bg="white">
        {products.map((product, index) => (
          <GridItem key={index} colSpan={1}>
            <ProductBox {...product} />
          </GridItem>
        ))}
      </Grid>
      </Box>
      <Heading p='20px' size={{ base: "md", md: 'lg' }}>Explore related products from Premium Brands</Heading>
      <Box>
        <Image objectFit={'cover'} src='/images/poster1.png' alt='poster1' />
      </Box>
      <Heading p='10px' size={{ base: "md", md: 'lg' }}>More For You</Heading>
      <Box>
        <HomeAdv />
      </Box>
      <Box>
        <Flex flexDirection={{ base: "column", md: "row" }}>
          <Box>
            <Image src='/images/poster2.1.png' objectFit={'cover'} alt='poster2.1' />
          </Box>
          <Box>
            <Image src='/images/poster2.2.png' objectFit={'cover'} alt='poster2.2' />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
