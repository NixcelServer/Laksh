// SubcategoryPage.js
import React from 'react';
import { useParams, useHistory } from 'react-router-dom';

const SubcategoryPage = () => {
  const { categoryName } = useParams();
  const history = useHistory();

  // Fetch subcategories based on categoryName from the URL params

  const subcategories = []; // Fetch subcategories based on categoryName

  const handleSubcategoryClick = (subcategory) => {
    history.push(`/category/${categoryName}/subcategory/${subcategory.id}`);
  };

  return (
    <div className="subcategory-container">
      {subcategories.map((subcategory) => (
        <div key={subcategory.id} onClick={() => handleSubcategoryClick(subcategory)}>
          <img src={subcategory.imageUrl} alt={subcategory.name} />
          <p>{subcategory.name}</p>
        </div>
      ))}
    </div>
  );
};

export default SubcategoryPage;
