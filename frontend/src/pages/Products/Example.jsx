import React, { useState } from 'react';
import { Box, Text, Flex, Icon, Grid, GridItem, HStack, Link, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, useDisclosure } from '@chakra-ui/react';
import { MdVerified } from 'react-icons/md';
import { FiFlag } from 'react-icons/fi';

const ProductBox = ({ countryFlag, title, buyerCountry, details, date, flagLink }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} m={2}>
      <Flex justify="space-between" align="center" mb={2}>
        <HStack>
          <Link href={flagLink} isExternal>
            <Icon as={FiFlag} />
          </Link>
          <Text fontWeight="bold" mr={2}>{title}</Text>
          <Icon as={MdVerified} color="green.500" onClick={onOpen} cursor="pointer" />
        </HStack>
        <Text fontSize="xs" color="gray.400">{date}</Text>
      </Flex>
      <Text fontSize="sm" color="gray.500" mb={2}>{buyerCountry}</Text>
      <Text fontSize="sm">{details}</Text>

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

const Example = () => {
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
      details: 'Please provide a quotation to the following requirement from importer - Product Name: Frozen Fish Specifications: Type: Sardine Fish Style: Frozen Quantity Required: 1',
      date: 'Jun-04-24',
      flagLink: 'https://example.com/flag2'
    },
    {
      countryFlag: '🇷🇴',
      title: 'WANTED: Yellow Corn',
      buyerCountry: 'Buyer From Romania',
      details: 'Please provide a quotation to the following requirement from importer - Product Name: Yellow Corn Specifications: Maturity: 100% Length (cm): 2 Grade 1 Quantity Required: 1',
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
    <Box>
    <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
      {products.map((product, index) => (
        <GridItem key={index} colSpan={1}>
          <ProductBox {...product} />
        </GridItem>
      ))}
    </Grid>
    </Box>
  );
};

export default Example;
