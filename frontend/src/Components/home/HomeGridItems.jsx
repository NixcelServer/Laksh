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
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" width="250px" height="120px" display="flex" alignItems="center" >
      <Image src={`http://127.0.0.1:8000/storage/${product.prod_img_path}`} alt={product.prod_name} width="120px" height="auto" objectFit="cover" />
      <Box p="6" flex="1" ml="2">
      <Text fontWeight="bold" textTransform="uppercase" fontSize="l" noOfLines={3}>
      {product.prod_name}
    </Text>
        {/* <Text mt="2">{product.prod_description}</Text>
        <Text mt="2">Price: {product.prod_price}</Text>
        <Text mt="2">Min Order Qty: {product.prod_min_order_qty}</Text> */}
      </Box>
    </Box>
  );
  
  export default HomeGridItems;