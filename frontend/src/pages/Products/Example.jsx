import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const CategoryPage = () => {
  const [viewAllClicked, setViewAllClicked] = useState(false);
  const [showAdditionalImages, setShowAdditionalImages] = useState(false);
  const [showSubcategories, setShowSubcategories] = useState(false);
  const [showPharmaceuticalsProducts, setShowPharmaceuticalsProducts] = useState(false);
  const [showChemicalsProducts, setShowChemicalsProducts] = useState(false); // New state for Chemicals
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [showPrductDetails,setShowProductDetails] = useState(false);


  const handleProductDetails =() => {
setShowProductDetails(true);

  }

  const handleViewAllClick = () => {
    setViewAllClicked(true);
    setShowAdditionalImages(true);
  };

  const handleShowAllClick = () => {
    setShowAllProducts(true);
  };

  const handleHideAllClick = () => {
    setShowAdditionalImages(false);
    setViewAllClicked(false);
    setShowSubcategories(false);
    setShowPharmaceuticalsProducts(false);
    setShowChemicalsProducts(false); // Reset Chemicals state
    setShowAllProducts(false);
  };

  const handleCategoryClick = () => {
    setShowSubcategories(true);
    setShowAdditionalImages(false);
    setShowPharmaceuticalsProducts(true);
    setShowChemicalsProducts(false);
  };

  const handleGoBackClick = () => {
    setShowAllProducts(false);
    setShowPharmaceuticalsProducts(true);
    setShowChemicalsProducts(false); // Reset Chemicals state
  };

  const handlePharmaceuticalsClick = () => {
    setShowPharmaceuticalsProducts(true);
    setShowSubcategories(true);
    setShowAdditionalImages(false);
    setShowChemicalsProducts(false); // Ensure Chemicals are hidden
  };

  const handleChemicalsClick = () => {
    setShowChemicalsProducts(true);
    setShowSubcategories(true);
    setShowAdditionalImages(false);
    setShowPharmaceuticalsProducts(false); // Ensure Pharmaceuticals are hidden
  };

  return (
    <div className="main-content" style={{ margin: '100px auto', maxWidth: '1200px', padding: '0 15px', backgroundColor: 'white' }}>
      <section className="section">
        <div className="section-body">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                <h4
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
    >
      Explore our Vibrant Categories!
    </h4>                  {/* <div className="card-header-action">
                    {!viewAllClicked && (
                      <button onClick={handleViewAllClick} className="btn btn-primary">View All</button>
                    )}
                    {viewAllClicked && showAdditionalImages && (
                      <button onClick={handleHideAllClick} className="btn btn-danger">Hide All</button>
                    )}
                  </div> */}
                </div>
                <div className="card-body">
                  
                    <button onClick={handlePharmaceuticalsClick} className="btn btn-primary">Pharmaceuticals</button>
                    <button onClick={handleChemicalsClick} className="btn btn-primary" style={{marginLeft:'10px'}}>Chemicals</button> {/* New Chemicals button */}
                  

                  {showSubcategories && (
                    <div>           
                      {showPharmaceuticalsProducts && (
                        <div>
                    <div className="mb-2 text-left" style={{ color: 'black', fontWeight: 'bold', fontSize: '1.5rem' }}>Medicines</div>

                          {/* Show products for Pharmaceuticals */}
                          <div className="row">
                            <div className="col-12 col-md-3 col-lg-2">
                              <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', overflowX: 'auto' }}>
                                <div style={{ marginRight: '10px' }}>
                                  <div className="mb-2 text-muted">Product 1</div>
                                  <img src="assets/img/image-gallery/1.png" alt="Product 1" className="img-fluid" onClick={handleProductDetails}/>
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-md-3 col-lg-2">
                              <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', overflowX: 'auto' }}>
                                <div style={{ marginRight: '10px' }}>
                                  <div className="mb-2 text-muted">Product 2</div>
                                  <img src="assets/img/image-gallery/1.png" alt="Product 1" className="img-fluid" />
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-md-3 col-lg-2">
                              <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', overflowX: 'auto' }}>
                                <div style={{ marginRight: '10px' }}>
                                  <div className="mb-2 text-muted">Product 3</div>
                                  <img src="assets/img/image-gallery/1.png" alt="Product 1" className="img-fluid" />
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-md-3 col-lg-2">
                              <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', overflowX: 'auto' }}>
                                <div style={{ marginRight: '10px' }}>
                                  <div className="mb-2 text-muted">Product 4</div>
                                  <img src="assets/img/image-gallery/1.png" alt="Product 1" className="img-fluid" />
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-md-3 col-lg-2">
                              <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', overflowX: 'auto' }}>
                                <div style={{ marginRight: '10px' }}>
                                  <div className="mb-2 text-muted">Product 5</div>
                                  <img src="assets/img/image-gallery/1.png" alt="Product 1" className="img-fluid" />
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-md-3 col-lg-2">
                              <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', overflowX: 'auto' }}>
                                <div style={{ marginRight: '10px' }}>
                                  <div className="mb-2 text-muted">Product 6</div>
                                  <img src="assets/img/image-gallery/1.png" alt="Product 1" className="img-fluid" />
                                </div>
                              </div>
                            </div>
                            {/* Repeat for other initial products */}
                            
                          </div>
                       

                
                          {/* Additional products to be shown after clicking "Show All" */}
                          {showAllProducts && (
                            <div className="row">
                              <div className="col-12 col-md-3 col-lg-2">
                                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', overflowX: 'auto' }}>
                                  <div style={{ marginRight: '10px' }}>
                                    <div className="mb-2 text-muted">Product 11</div>
                                    <img src="assets/img/image-gallery/1.png" alt="Product 1" className="img-fluid" />
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-md-3 col-lg-2">
                                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', overflowX: 'auto' }}>
                                  <div style={{ marginRight: '10px' }}>
                                    <div className="mb-2 text-muted">Product 12</div>
                                    <img src="assets/img/image-gallery/1.png" alt="Product 1" className="img-fluid" />
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-md-3 col-lg-2">
                                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', overflowX: 'auto' }}>
                                  <div style={{ marginRight: '10px' }}>
                                    <div className="mb-2 text-muted">Product 13</div>
                                    <img src="assets/img/image-gallery/1.png" alt="Product 1" className="img-fluid" />
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-md-3 col-lg-2">
                                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', overflowX: 'auto' }}>
                                  <div style={{ marginRight: '10px' }}>
                                    <div className="mb-2 text-muted">Product 14</div>
                                    <img src="assets/img/image-gallery/1.png" alt="Product 1" className="img-fluid" />
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-md-3 col-lg-2">
                                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', overflowX: 'auto' }}>
                                  <div style={{ marginRight: '10px' }}>
                                    <div className="mb-2 text-muted">Product 15</div>
                                    <img src="assets/img/image-gallery/1.png" alt="Product 1" className="img-fluid" />
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-md-3 col-lg-2">
                                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', overflowX: 'auto' }}>
                                  <div style={{ marginRight: '10px' }}>
                                    <div className="mb-2 text-muted">Product 16</div>
                                    <img src="assets/img/image-gallery/1.png" alt="Product 1" className="img-fluid" />
                                  </div>
                                </div>
                              </div>
                              {/* Repeat for other additional products */}
                            </div>
                          )}


                         {/* Show/Hide "Show All" button based on the state */}
{/* Show/Hide "Show All" button based on the state */}
<div className="card-footer d-flex justify-content-end">
  {!showAllProducts && (
    <button
      onClick={handleShowAllClick}
      className="btn btn-primary align-self-end"
      style={{ marginBottom: '10px' }}
    >
      Show All
    </button>
  )}
  

  {showAllProducts && (
    <button
      onClick={handleGoBackClick}
      className="btn btn-primary align-self-end"
      style={{ marginBottom: '10px' }}
    >
      Back
    </button>
  )}
</div>




                        </div>
                      )}



{showChemicalsProducts && (
  
                        <div>
                    <div className="mb-2 text-left" style={{ color: 'black', fontWeight: 'bold', fontSize: '1.5rem' }}>Chemical Equipments</div>
                          {/* Show products for Pharmaceuticals */}
                          <div className="row">
                            <div className="col-12 col-md-3 col-lg-2">
                              <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', overflowX: 'auto' }}>
                                <div style={{ marginRight: '10px' }}>
                                  <div className="mb-2 text-muted">Product 1</div>
                                  <img src="assets/img/image-gallery/1.png" alt="Product 1" className="img-fluid" />
                                </div>
                              </div>
                            </div>
                          
                            <div className="col-12 col-md-3 col-lg-2">
                              <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', overflowX: 'auto' }}>
                                <div style={{ marginRight: '10px' }}>
                                  <div className="mb-2 text-muted">Product 3</div>
                                  <img src="assets/img/image-gallery/1.png" alt="Product 1" className="img-fluid" />
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-md-3 col-lg-2">
                              <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', overflowX: 'auto' }}>
                                <div style={{ marginRight: '10px' }}>
                                  <div className="mb-2 text-muted">Product 4</div>
                                  <img src="assets/img/image-gallery/1.png" alt="Product 1" className="img-fluid" />
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-md-3 col-lg-2">
                              <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', overflowX: 'auto' }}>
                                <div style={{ marginRight: '10px' }}>
                                  <div className="mb-2 text-muted">Product 5</div>
                                  <img src="assets/img/image-gallery/1.png" alt="Product 1" className="img-fluid" />
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-md-3 col-lg-2">
                              <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', overflowX: 'auto' }}>
                                <div style={{ marginRight: '10px' }}>
                                  <div className="mb-2 text-muted">Product 6</div>
                                  <img src="assets/img/image-gallery/1.png" alt="Product 1" className="img-fluid" />
                                </div>
                              </div>
                            </div>
                            {/* Repeat for other initial products */}
                            
                          </div>
                       

                
                          {/* Additional products to be shown after clicking "Show All" */}
                          {showAllProducts && (
                            <div className="row">
                              <div className="col-12 col-md-3 col-lg-2">
                                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', overflowX: 'auto' }}>
                                  <div style={{ marginRight: '10px' }}>
                                    <div className="mb-2 text-muted">Product 11</div>
                                    <img src="assets/img/image-gallery/1.png" alt="Product 1" className="img-fluid" />
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-md-3 col-lg-2">
                                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', overflowX: 'auto' }}>
                                  <div style={{ marginRight: '10px' }}>
                                    <div className="mb-2 text-muted">Product 12</div>
                                    <img src="assets/img/image-gallery/1.png" alt="Product 1" className="img-fluid" />
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-md-3 col-lg-2">
                                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', overflowX: 'auto' }}>
                                  <div style={{ marginRight: '10px' }}>
                                    <div className="mb-2 text-muted">Product 13</div>
                                    <img src="assets/img/image-gallery/1.png" alt="Product 1" className="img-fluid" />
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-md-3 col-lg-2">
                                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', overflowX: 'auto' }}>
                                  <div style={{ marginRight: '10px' }}>
                                    <div className="mb-2 text-muted">Product 14</div>
                                    <img src="assets/img/image-gallery/1.png" alt="Product 1" className="img-fluid" />
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-md-3 col-lg-2">
                                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', overflowX: 'auto' }}>
                                  <div style={{ marginRight: '10px' }}>
                                    <div className="mb-2 text-muted">Product 15</div>
                                    <img src="assets/img/image-gallery/1.png" alt="Product 1" className="img-fluid" />
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-md-3 col-lg-2">
                                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', overflowX: 'auto' }}>
                                  <div style={{ marginRight: '10px' }}>
                                    <div className="mb-2 text-muted">Product 16</div>
                                    <img src="assets/img/image-gallery/1.png" alt="Product 1" className="img-fluid" />
                                  </div>
                                </div>
                              </div>
                              {/* Repeat for other additional products */}
                            </div>
                          )}


                         {/* Show/Hide "Show All" button based on the state */}
{/* Show/Hide "Show All" button based on the state */}
<div className="card-footer d-flex justify-content-end">
  {!showAllProducts && (
    <button
      onClick={handleShowAllClick}
      className="btn btn-primary align-self-end"
      style={{ marginBottom: '10px' }}
    >
      Show All
    </button>
  )}
  

  {showAllProducts && (
    <button
      onClick={handleGoBackClick}
      className="btn btn-primary align-self-end"
      style={{ marginBottom: '10px' }}
    >
      Back
    </button>
  )}
</div>




                        </div>
                      )}



  {/* Display product details card */}
  {showPrductDetails &&(
<div className="card" style={{ 
  padding: '20px',
  maxWidth: '1000px', 
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.15)',
  marginTop: '20px',
  position: 'relative'
}}>
  <div className="row">
    <div className="col-lg-6" style={{ padding: '20px' }}>
      <div style={{ marginTop: '30px', marginLeft: '20px', maxWidth: '400px' }}>
        <img src="https://via.placeholder.com/400x200" alt="Product Preview" style={{ width: '100%', height: '200px' }} />
      </div>
    </div>
    <div className="col-lg-6" style={{ padding: '10px' }}>
      <div style={{ textAlign: 'left', color: 'black', marginBottom: '10px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: 'black', borderBottom: '2px solid #333', paddingBottom: '5px', marginBottom: '10px' }}>
          Sample Product
        </h3>
        <p style={{ fontSize: '14px', lineHeight: '1.4', marginBottom: '5px' }}>
          <span style={{ fontWeight: 'bold' }}>Description:</span> Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <p style={{ fontSize: '14px', lineHeight: '1.4', marginBottom: '5px' }}>
          <span style={{ fontWeight: 'bold' }}>Category:</span> Sample Category
        </p>
        <p style={{ fontSize: '14px', lineHeight: '1.4', marginBottom: '5px' }}>
          <span style={{ fontWeight: 'bold' }}>SubCategory:</span> Sample SubCategory
        </p>
        <p style={{ fontSize: '14px', lineHeight: '1.4', marginBottom: '5px' }}>
          <span style={{ fontWeight: 'bold' }}>Keywords:</span> Keyword1, Keyword2, Keyword3
        </p>
        <p style={{ fontSize: '14px', lineHeight: '1.4', marginBottom: '5px' }}>
          <span style={{ fontWeight: 'bold' }}>Price:</span> $50
        </p>
        <p style={{ fontSize: '14px', lineHeight: '1.4', marginBottom: '5px' }}>
          <span style={{ fontWeight: 'bold' }}>Unit Of Measurement:</span> Sample UOM
        </p>
      </div>
    </div>
  </div>
</div>
  )}


                    </div>
                    
                  )}
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
