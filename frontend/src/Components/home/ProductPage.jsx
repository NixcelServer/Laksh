// ProductPage.js
import React from 'react';
import { useParams, useHistory  } from 'react-router-dom';

const ProductPage = () => {
  const { categoryName, subcategoryId } = useParams();

  // Fetch product details based on subcategoryId

  const productDetails = {}; // Fetch product details based on subcategoryId

  return (
    <div className="product-details">
      <h2>{productDetails.name}</h2>
      <img src={productDetails.imageUrl} alt={productDetails.name} />
      <p>{productDetails.description}</p>
      <p>{productDetails.price}</p>
    </div>
  );
};

export default ProductPage;
