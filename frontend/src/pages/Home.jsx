
import { Box } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import HomeBottom from '../Components/home/HomeBottom'
// import HomeCatgory from '../Components/home/HomeCatgory'
import HomeSections from '../Components/home/HomeSections'
import HomeTop from '../Components/home/HomeTop'
import HomeContent from '../Components/home/HomeContent'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories, setCategories } from '../redux/Admin/admin.action'
import { getProducts, setSelectedProducts } from '../redux/Product/product.action'
import axios from 'axios'
import { baseURL } from '../utils/variables'


export default function Home() {

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const catWiseProducts = await axios.get(`${baseURL}api/categories-with-products`);
        dispatch(setSelectedProducts(catWiseProducts));

        const categoriesResponse = await axios.get(`${baseURL}api/categories`);
        const allCategories = categoriesResponse.data;
        const selectedCategories = allCategories.slice(0, 6);
        dispatch(setCategories(selectedCategories));


  const productPromises = selectedCategories.map(category =>
    axios.get(`${baseURL}api/limited-products/${category.encCatId}`)
  );
//console.log(productPromises);
const productsResponses = await Promise.all(productPromises);

// Map responses to categories
// const productsByCategory = productsResponses.reduce((acc, response, index) => {
//   const categoryId = selectedCategories[index].encCatId;
//   acc[categoryId] = response.data;
//   return acc;
// }, {});

// dispatch(setSelectedProducts(productsByCategory));
        // dispatch(getProducts());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [dispatch]);
  return (
    <div>
      {/* banner */}
      <Box>
        <HomeTop />
      </Box>
      {/* Catagory nav-bar */}
      {/* <Box>
        <HomeCatgory />
      </Box> */}
      <Box>
        <HomeContent />
      </Box>
      {/* Product Gridr */}
      <Box>
        <HomeSections />
      </Box>
      {/* Bottom posters - features */}
      <Box>
        <HomeBottom />
      </Box>
    </div>
  );
}
