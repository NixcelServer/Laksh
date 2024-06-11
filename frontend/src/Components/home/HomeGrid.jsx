import { Box, Flex, Grid, Heading, Text,GridItem,useDisclosure,HStack,Link,Icon,Menu,
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
  Button, } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react';
import { FiFlag ,FiMoreVertical} from 'react-icons/fi';
import { MdVerified } from 'react-icons/md';


import HomeGridItems from './HomeGridItems'

export default function HomeGrid({ title, single, info,onTitleClick,posts }) {
console.log("posts",posts)

  const ProductBox = ({ countryFlag, prod_name, prod_desc, add_date,companyDetails, other_specifications,packing_details, flagLink}) => {
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
    <Text  color="blue.500" mr={2}>WANTED: {prod_name}</Text>
    <Flex alignItems="center">
      <Icon as={MdVerified} color="green.500" onClick={onOpen} cursor="pointer" aria-label="Verified" />
      <Text ml={1} mb={0} fontSize="sm" color="green.500" fontWeight="bold" onClick={onOpen} cursor="pointer">Verified</Text>
    </Flex>
  </HStack>
  
          <Text fontSize="xs" color="gray.400">{add_date}</Text>
        </Flex>
        <Text fontSize="sm" color="gray.500" mb={2}>Buyer From India</Text>
        <Text fontSize="sm">
          {showMore ? (
            <>
              The buyer would like to receive quotations for -{" "}
              Product Name: <strong>{prod_name}</strong>{" "}
              Requirement Details: {prod_desc || "Not provided"}{" "}
              Other Specifications: {other_specifications || "Not provided"}{" "}
              Packing Details: {packing_details || "Not provided"}{" "}
              Origin: {companyDetails.origin ? companyDetails.origin : 'Not specified'}{" "}
              <Link color="blue.500" onClick={toggleShowMore} cursor="pointer">
                <span style={{ color: "blue" }}>See Less</span>
              </Link>
            </>
          ) : (
            <>
              The buyer would like to receive quotations for -{" "}
              Product Name: <strong>{prod_name}</strong>{" "}
              Requirement Details:{" "}
              {prod_desc ? (prod_desc.length > 20 ? `${prod_desc.substring(0, 20)}...` : prod_desc) : 'Not provided'}{" "}
              <Link color="blue.500" onClick={toggleShowMore} cursor="pointer">
                <span style={{ color: "blue" }}>See More</span>
              </Link>
            </>
          )}
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

 console.log("hello",info);
  return (
  <>
  
    <Box m='10px' p='30px' boxShadow='md' rounded='md'  width="100%" height="500px" overflow="hidden">
    <hr style={{ border: '1px solid teal', marginTop: '-4px' }} />

<Heading p='10px' m="-2" size={{ base: "md", md: "lg" }} textAlign='left' onClick={onTitleClick}>{title}</Heading>
{/* Rest of the content */}
<Flex alignItems={'center'} >
<Box display={{ base: "none", md: 'flex' }}
>
<div
  style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    rowGap: '10px',
    height: '400px',
    width: "300px",
    
    backgroundImage: `url(http://127.0.0.1:8000/storage/${encodeURIComponent(single.img)})`,
    opacity: 0.9,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  }}
  onClick={onTitleClick}
>
  <Text fontWeight={'bold'} >{single.title}</Text>
  <Text fontWeight={'semibold'}>{single.sub1}</Text>
  <Text fontWeight={'semibold'}>{single.sub2}</Text>
  <Text fontWeight={'semibold'}>{single.sub3}</Text>
</div>
</Box>
<Box m='auto'>
<Grid templateColumns={{ base: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)' }} p='10px' gap={3}>
  {info.map((product, i) => (
    <HomeGridItems key={i} product={product} />
  ))}
</Grid>
</Box>
</Flex>
<hr style={{ border: '1px solid teal', marginBottom: '-20px', marginTop: '20px' }} />
</Box>

    <Box m='10px' p='30px' boxShadow='md' rounded='md'  width="100%" height="500px" overflow="hidden">
            <hr style={{ border: '1px solid teal', marginTop: '-4px' }} />

    {/* <Heading p='10px' m="-2" size={{ base: "md", md: "lg" }} textAlign='left' onClick={onTitleClick}>{title} Buyers</Heading> */}
    <Heading p='10px' m="-2" size={{ base: "md", md: "lg" }} textAlign='left' >Buyer's Requirements</Heading>
    {/* Rest of the content */}
    <Flex alignItems={'center'} >
    <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={3} bg="white">
        {posts.map((post, index) => (
          <GridItem key={index} colSpan={1}>
            <ProductBox 
            prod_name={post.prod_name}
            prod_des={post.prod_des}
            add_date = {post.add_date}
            companyDetails = {post.companyDetails}
            other_specification = {post.other_specifications}
            packing_details = {post.packing_details}
            flagLink = 'https://example.com/flag2'
            />
          </GridItem>
        ))}
      </Grid>
    </Flex>
    <hr style={{ border: '1px solid teal', marginBottom: '-20px', marginTop: '20px' }} />
  </Box>
  </>
  )
}
