import { Box, Flex, Grid, Heading, Text } from '@chakra-ui/react'
import React from 'react'

import HomeGridItems from './HomeGridItems'

export default function HomeGrid({ title, single, info,onTitleClick }) {
  const firstProductImage = info.length > 0 ? info[0] : '';

 
  return (
    // <Box m='10px' p='30px' boxShadow='md' rounded='md'   >
    //     <Heading p='10px' size={{base:"md",md:"lg"}} textAlign='left'  >{data1.title}</Heading>
    //     <Flex alignItems={'center'} >
    //         <Box display={{base:"none",md:'flex'}}>
    //             <div
    //                 style={{
    //                 display:'flex',
    //                 justifyContent:'center',
    //                 alignItems:'center',
    //                 flexDirection:'column',
    //                 rowGap:'10px',
    //                 height: '60vh',
    //                 width:"300px",
    //                 backgroundImage: `url(${data1.single.img})`,
    //                 opacity:0.9,
    //                 backgroundPosition: 'center',
    //                 }}
    //              >
    //                 <Text fontWeight={'bold'}   >{data1.single.tittle}</Text>
                   
    //                     <Text fontWeight={'semibold'} >{data1.single.sub1}</Text>
    //                     <Text fontWeight={'semibold'}>{data1.single.sub2}</Text>
    //                     <Text fontWeight={'semibold'}>{data1.single.sub3}</Text>
                   
    //             </div>
    //         </Box>
    //         <Box m='auto' >
    //             <Grid templateColumns={{base:'repeat(2, 1fr)',sm:'repeat(3, 1fr)'}} p='10px'  gap={3}>
    //                 {
    //                     data1.info.map((el,i)=>(<HomeGridItems key={i} {...el} />))
    //                 }
                    
    //             </Grid>
    //         </Box>
    //     </Flex>
    //     <hr  style={{border:'1px solid teal',marginBottom:'-20px',marginTop:'20px'}} />
    // </Box>
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
  )
}
