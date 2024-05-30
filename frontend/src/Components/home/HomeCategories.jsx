import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const CategoryPage = () => {
  const [viewAllClicked, setViewAllClicked] = useState(false);
  const [showAdditionalImages, setShowAdditionalImages] = useState(false);
  const [showSubcategories, setShowSubcategories] = useState(false);
  const [showPharmaceuticalsProducts, setShowPharmaceuticalsProducts] = useState(false);
  const [showChemicalsProducts, setShowChemicalsProducts] = useState(false); // New state for Chemicals
  const [showAllProducts, setShowAllProducts] = useState(false);

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
                  <h4>Categories</h4>
                  {/* <div className="card-header-action">
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
                    <button onClick={handleChemicalsClick} className="btn btn-primary">Chemicals</button> {/* New Chemicals button */}
                  

                  {showSubcategories && (
                    <div>
                      <div className="column">
                        <div className="col-12 col-md-4 col-lg-3">
                          <div className="mb-2 text-left" onClick={handlePharmaceuticalsClick} style={{ color: 'black', fontWeight: 'bold', fontSize: '1.5rem' }}>Medicines</div>
                          
                        </div>
                      </div>

                      {showPharmaceuticalsProducts && (
                        <div>
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
