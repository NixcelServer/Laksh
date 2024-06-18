import { Box, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';

import { useSelector ,useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import HomeGrid from './HomeGrid';
import { setSelectedCategory } from '../../redux/User/user.action';
import { getSubCategoryWiseProducts } from '../../redux/Product/product.action';
//import{getUserSubCategoriesAPI } from '../../redux/User/user.api'

export default function HomeSections() {
  const selectedCategories = useSelector((state) => state.productReducer.selectedProducts);
  console.log("console",selectedCategories)
  // Ensure selectedCategories.data is an array
  const categories = selectedCategories && Array.isArray(selectedCategories.data) ? selectedCategories.data : [];
  console.log("print cats",categories);
  const products = useSelector((state) => state.productReducer.selectedProducts);
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  const subCategories = useSelector(state => state.masterData.subCategories);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCategoryClick = async (category) => {
    console.log("in cat",category);
    console.log("sub cat",subCategories)
    try {
      await dispatch(setSelectedCategory(category));

      await dispatch(getSubCategoryWiseProducts(category));
     
       // Filter subcategories based on the selected category
    const filteredSubcategories = subCategories.filter(
      (subcategories) => subcategories.encCatId === category
    );
    console.log("filtered sub cat", filteredSubcategories);
   
    } catch (error) {
      console.error('Error selecting category:', error);
      // Optionally, show an error message to the user
    }
    navigate(`/categoriess/${category}`);
  };

  return (
    <VStack p='10px' spacing={4}>
       {categories.map((category) => (
        <Box 
          key={category.encCatId} 
          width="100%" 
          mt="0" 
          bg="white" 
          
          cursor="pointer"
        >
          <HomeGrid 
            title={category.cat_name} 
            single={{
              img: category.cat_img_path, // Category image
              title: "", // Example static title
              sub1: "", // Example static detail
              sub2: "", // Example static detail
              sub3: ""  // Example static detail
            }}
            info={category.products}
            onTitleClick={() => handleCategoryClick(category.encCatId)}
            posts={category.posts}
          />
           
        </Box>
      ))}
    </VStack>
  );
}


