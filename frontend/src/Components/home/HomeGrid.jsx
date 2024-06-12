import { Box, Flex, Grid, Heading, Text } from '@chakra-ui/react'
import React from 'react'

import HomeGridItems from './HomeGridItems'

export default function HomeGrid({ title, single, info, onTitleClick }) {
  const firstProductImage = info.length > 0 ? info[0] : '';

  return (
    <Box m='10px' p='30px' boxShadow='md' rounded='md' width="100%" overflow="hidden" >
      <hr style={{ border: '1px solid teal', marginTop: '-4px' }} />
      <Heading p='7px' m="-2" size={{ base: "md", md: "lg" }}  mb={3} textAlign='left' onClick={onTitleClick}>{title}</Heading>
      <Flex flexDirection={{ base: "column", md: 'row' }}>
        <Box flex={{ base: 'none', md: '0.5' }} mb={{ base: '20px', md: '0' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              rowGap: '10px',
              height: '400px',
              width: "100%",
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
        <Box flex={{ base: 'none', md: '1' }} ml={{ base: '0', md: '50px' }} mt={{ base: '20px', md: '0' }}>
  <Grid templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }} p='1px' gap={3}>
    {info.map((product, i) => (
      <HomeGridItems key={i} product={product} />
    ))}
  </Grid>
</Box>

      </Flex>
      <hr style={{ border: '1px solid teal', marginBottom: '-20px', marginTop: '20px' }} />
    </Box>
  )
}
