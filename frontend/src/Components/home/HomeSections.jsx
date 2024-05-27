import { Box, Grid, Heading, VStack } from '@chakra-ui/react'
import React from 'react'
import { data } from '../../utils/data'
import HomeGrid from './HomeGrid'
import { useSelector } from 'react-redux';

export default function HomeSections() {

  const selectedCategories = useSelector(state => state.masterData.selectedCategories);
  const products = useSelector((state) => state.productReducer.selectedProducts);
  
  
  return (
    <>
        {/* <VStack p='10px'>
            {
                data.map((el,i)=>(<HomeGrid key={i} data1={el} />))
            }
        </VStack> */}
        <VStack p='10px' spacing={4}  >
      {selectedCategories.map((category) => (
        <Box key={category.encCatId} width="100%" mt="0" bg="white">
        
          <HomeGrid 
            title={category.cat_name}
            single={{
              img: category.cat_img_path, // Category image
              title: "Category Highlight", // Example static title
              sub1: "Detail 1", // Example static detail
              sub2: "Detail 2", // Example static detail
              sub3: "Detail 3"  // Example static detail
            }}
            info={products[category.encCatId] || []} // Pass products belonging to the category
          />
        </Box>
      ))}
    </VStack>
    </>
  )
}
