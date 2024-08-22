import { Box, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import HomeGrid from './HomeGrid';
import { setSelectedCategory } from '../../redux/User/user.action';
import { getSubCategoryWiseProducts } from '../../redux/Product/product.action';

export default function HomeSections() {
  const selectedCategories = useSelector((state) => state.productReducer.selectedProducts);
  const categories = selectedCategories && Array.isArray(selectedCategories.data) ? selectedCategories.data : [];
  const products = useSelector((state) => state.productReducer.selectedProducts);
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  const subCategories = useSelector(state => state.masterData.subCategories);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCategoryClick = async (category) => {
    try {
      await dispatch(setSelectedCategory(category));
      await dispatch(getSubCategoryWiseProducts(category));
      
      const filteredSubcategories = subCategories.filter(
        (subcategories) => subcategories.encCatId === category
      );
      setFilteredSubCategories(filteredSubcategories);
    } catch (error) {
      console.error('Error selecting category:', error);
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
              img: category.cat_img_path, 
              title: "", 
              sub1: "", 
              sub2: "", 
              sub3: ""
            }}
            info={category.products}
            onTitleClick={() => handleCategoryClick(category.encCatId)}
            posts={category.posts}
            cat = {category}
          />
        </Box>
      ))}
    </VStack>
  );
}
