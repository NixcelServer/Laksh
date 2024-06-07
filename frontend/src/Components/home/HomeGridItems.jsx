import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";

// export default function HomeGridItems({ img, tittle, sub1, sub2, sub3 }) {
//   return <Box boxShadow='md' rounded='md' bg='white'>

//             <Flex columnGap={'10px'} flexDirection={{base:"column",md:'row'}} >
//                 <Box  >
//                     <Image  src={img} />
//                 </Box>
//                 <Box >
//                     <Text fontWeight={'bold'}  >{tittle}</Text>
//                     <Box display={{base:'none',md:"contents"}} >
//                         <Text fontWeight={'semibold'} >{sub1}</Text>
//                         {/* <Text fontWeight={'semibold'}>{sub2}</Text>
//                         <Text fontWeight={'semibold'}>{sub3}</Text> */}
//                     </Box>
//                 </Box>
//             </Flex>

//     </Box>
// }
const HomeGridItems = ({ product }) => (
 
  <Box borderWidth="1px" borderRadius="lg" overflow="hidden" width="150px" height="120px" position="relative">
    <Image
      src={`http://127.0.0.1:8000/storage/${product.prod_img_path}`}
      alt={product.prod_name}
      width="100%"
      height="100%"
      objectFit="cover"
    />
    <Text fontWeight="bold" color="white" textTransform="uppercase" fontSize="xs" noOfLines={2}>text image
        {product.prod_name}
      </Text>
  </Box>
  

  
  

  
  );
  
  export default HomeGridItems;

