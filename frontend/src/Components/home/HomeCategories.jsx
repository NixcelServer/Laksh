import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom'; // Import Link from react-router-dom
import { getSubCategoryWiseProducts } from '../../redux/Product/product.action';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { baseURL } from '../../utils/variables';

const CategoryPage = () => {
  const [viewAllClicked, setViewAllClicked] = useState(false);
  const [showAdditionalImages, setShowAdditionalImages] = useState(false);
  const [showSubcategories, setShowSubcategories] = useState(false);
  const [viewMoreSubCategoryIndex, setViewMoreSubCategoryIndex] = useState(null);
  const [showPharmaceuticalsProducts, setShowPharmaceuticalsProducts] = useState(false);
  const [showChemicalsProducts, setShowChemicalsProducts] = useState(false); // New state for Chemicals
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [showProductDetails, setShowProductDetails] = useState(false);
  const { encCatId } = useParams();
  const dispatch = useDispatch();
  
  console.log("encCat",encCatId);
  const productsBySubCategory = useSelector(state => state.productReducer.productsBySubCategory);
  

  useEffect(() => {
    const getCategoryDetails = async () => {
      if (encCatId) {
        try {
          // Dispatch the action to fetch products by subcategory
          await dispatch(getSubCategoryWiseProducts(encCatId));
        } catch (error) {
          console.error('Error fetching category details:', error);
          // Handle error: show error message to the user
        }
      }
    };
  
    getCategoryDetails();
  }, [ encCatId]); // Add dispatch and encCatId to the dependency array

  const handleProductDetails = () => {
    setShowProductDetails(true);
  };

 
  const handleShowAllClick = (index) => {
    setViewMoreSubCategoryIndex(index);
  };

  const handleHideAllClick = () => {
    setViewMoreSubCategoryIndex(null);
  };
  

  const handleCategoryClick = () => {
    setShowSubcategories(true);
    setShowAdditionalImages(false);
    setShowPharmaceuticalsProducts(true);
    setShowChemicalsProducts(false);
  };

  const handleGoBackClick = () => {
    setShowAdditionalImages(false);
    setViewAllClicked(false);
    setShowSubcategories(false);
    setShowPharmaceuticalsProducts(false);
    setShowChemicalsProducts(false); // Reset Chemicals state
    setShowAllProducts(false);
  };



 

  return (
    <div className="main-content" style={{ position: 'absolute', margin: '100px auto', maxWidth: '1300px', padding: '0 15px', backgroundColor: 'white' }}>
      <section className="section">
        <div className="section-body">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                  {/* <h4
                    style={{
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '24px',
                      color: '#3366ff',
                      textAlign: 'center',
                      marginBottom: '20px',
                      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
                      transition: 'color 0.5s ease-in-out',
                    }}
                    onMouseOver={(e) => e.target.style.color = '#3366ff'}
                    onMouseOut={(e) => e.target.style.color = '#3498DB'}
                  > */}
                     {productsBySubCategory && productsBySubCategory.subCategories && (
                    <div className="mb-2 text-left" style={{ color: '#A569BD', fontWeight: 'bold', fontSize: '1.5rem' }}>
                      {productsBySubCategory.cat_name}
                    </div>
                  )}
                  {/* </h4> */}
                  <Link to="/allcategories" className="btn btn-primary" style={{ backgroundColor: '#A569BD' }}>Explore More Categories</Link>
                </div>
                <div className="card-body">
                  {/* {productsBySubCategory && productsBySubCategory.subCategories && (
                    <div className="mb-2 text-left" style={{ color: '#A569BD', fontWeight: 'bold', fontSize: '1.5rem' }}>
                      {productsBySubCategory.cat_name}
                    </div>
                  )} */}
                  <div>
                    {productsBySubCategory && productsBySubCategory.subCategories && productsBySubCategory.subCategories.map((subCategory, index) => (
                      <div key={index}>
                        <div className="mb-2 text-left" style={{ color: 'black', fontWeight: 'bold', fontSize: '1.5rem' }}>
                          {subCategory.subcategory.sub_cat_name}
                        </div>
                        <div className="row">
                          {(viewMoreSubCategoryIndex === index ? subCategory.products : subCategory.products.slice(0, 6)).map((product, prodIndex) => (
                            <div className="col-12 col-md-3 col-lg-2" key={prodIndex}>
                              <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', overflowX: 'auto' }}>
                                <div style={{ marginRight: '10px' }}>
                                <Link to={`/product-details/${product.encSubCatId}/${product.encProdId}`}>
                                  <img
                                    src={`${baseURL}storage/app/${product.prod_img_path}`}
                                    alt={product.prod_name}
                                    className="img-fluid"
                                    style={{
                                      width: '200px',
                                      height: '250px',
                                      objectFit: 'cover'
                                    }}
                                    onClick={() => handleProductDetails(product.encProdId)}
                                    onError={(e) => {
                                      console.error(e);
                                      e.target.src = `${baseURL}storage/app/default.png`;
                                    }}
                                  />
                                  <div className="mb-2" style={{ fontWeight: 'bold' }}>{product.prod_name}</div>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        {viewMoreSubCategoryIndex !== index && subCategory.products.length > 6 && (
                          <div className="text-right mt-4">
                          <span
                            style={{ cursor: 'pointer', color: '#3498DB' }}
                            onClick={() => handleShowAllClick(index)}
                            onMouseOver={(e) => e.target.style.color = '#3366ff'}
                            onMouseOut={(e) => e.target.style.color = '#3498DB'}
                          >
                            + View More
                          </span>
                        </div>
                        )}
                        {viewMoreSubCategoryIndex === index && (
                           <div className="text-right mt-4">
                           <span
                             style={{ cursor: 'pointer', color: '#3498DB' }}
                             onClick={handleHideAllClick}
                             onMouseOver={(e) => e.target.style.color = '#3366ff'}
                             onMouseOut={(e) => e.target.style.color = '#3498DB'}
                           >
                             - View Less
                           </span>
                         </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* {showProductDetails && (
                    <div>
                      <h3>Product Details</h3>
                      <p>Details of the selected product will be shown here.</p>
                      <button className="btn btn-primary" onClick={() => setShowProductDetails(false)}>Back</button>
                    </div>
                  )} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
  
};

export default CategoryPage;
