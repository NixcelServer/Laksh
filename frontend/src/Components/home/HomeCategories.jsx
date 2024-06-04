import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const CategoryPage = () => {
  const [viewAllClicked, setViewAllClicked] = useState(false);
  const [showAdditionalImages, setShowAdditionalImages] = useState(false);
  const [showSubcategories, setShowSubcategories] = useState(false);
  const [showPharmaceuticalsProducts, setShowPharmaceuticalsProducts] = useState(false);
  const [showChemicalsProducts, setShowChemicalsProducts] = useState(false); // New state for Chemicals
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [showProductDetails, setShowProductDetails] = useState(false);

  const handleProductDetails = () => {
    setShowProductDetails(true);
  };

  const handleViewAllClick = () => {
    setViewAllClicked(true);
    setShowAdditionalImages(true);
  };

  const handleShowAllClick = () => {
    setShowAllProducts(true);
  };

  const handleHideAllClick = () => {
    setShowAdditionalImages(false);
    setShowAllProducts(false);
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

  const handlePharmaceuticalsClick = () => {
    setShowPharmaceuticalsProducts(!showPharmaceuticalsProducts);
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
    <div className="main-content" style={{ position:'absolute',margin: '100px auto', maxWidth: '1300px', padding: '0 15px', backgroundColor: 'white' }}>
      <section className="section">
        <div className="section-body">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
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
                  </h4>
                  <Link to="/allcategories" className="btn btn-primary" style={{backgroundColor:'#A569BD'}}>Explore More Categories</Link>
                </div>
                <div className="card-body">
                  {!showPharmaceuticalsProducts && !showChemicalsProducts && (
                    <>
                      <div className="mb-2 text-left" onClick={handlePharmaceuticalsClick} style={{ color: '#A569BD', fontWeight: 'bold', fontSize: '1.5rem' }}>Pharmaceuticals</div>
                      <div className="mb-2 text-left" onClick={handleChemicalsClick} style={{ color: '#A569BD', fontWeight: 'bold', fontSize: '1.5rem' }}>Chemicals</div>
                    </>
                  )}

                  {showSubcategories && (
                    <div>
                <div className="mb-2 text-left" style={{ color: '#A569BD', fontWeight: 'bold', fontSize: '1.5rem' }}>Pharmaceuticals</div>

                      {showPharmaceuticalsProducts && (
                        <div>
                          <div className="mb-2 text-left" style={{ color: 'black', fontWeight: 'bold', fontSize: '1.5rem' }}>Medicines</div>
                          <div className="row">
                            <div className="col-12 col-md-3 col-lg-2">
                              <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', overflowX: 'auto' }}>
                                <div style={{ marginRight: '10px' }}>
                                  <div className="mb-2 text-muted">Product 1</div>
                                  <img src="assets/img/image-gallery/1.png" alt="Product 1" className="img-fluid" onClick={handleProductDetails} />
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-md-3 col-lg-2">
                              <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', overflowX: 'auto' }}>
                                <div style={{ marginRight: '10px' }}>
                                  <div className="mb-2 text-muted">Product 2</div>
                                  <img src="assets/img/image-gallery/1.png" alt="Product 2" className="img-fluid" />
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-md-3 col-lg-2">
                              <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', overflowX: 'auto' }}>
                                <div style={{ marginRight: '10px' }}>
                                  <div className="mb-2 text-muted">Product 3</div>
                                  <img src="assets/img/image-gallery/1.png" alt="Product 3" className="img-fluid" />
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-md-3 col-lg-2">
                              <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', overflowX: 'auto' }}>
                                <div style={{ marginRight: '10px' }}>
                                  <div className="mb-2 text-muted">Product 4</div>
                                  <img src="assets/img/image-gallery/1.png" alt="Product 4" className="img-fluid" />
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-md-3 col-lg-2">
                              <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', overflowX: 'auto' }}>
                                <div style={{ marginRight: '10px' }}>
                                  <div className="mb-2 text-muted">Product 5</div>
                                  <img src="assets/img/image-gallery/1.png" alt="Product 5" className="img-fluid" />
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-md-3 col-lg-2">
                              <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', overflowX: 'auto' }}>
                                <div style={{ marginRight: '10px' }}>
                                  <div className="mb-2 text-muted">Product 6</div>
                                  <img src="assets/img/image-gallery/1.png" alt="Product 6" className="img-fluid" />
                                </div>
                              </div>
                            </div>
                          </div>

                          {showAllProducts && (
                            <div className="row">
                              <div className="col-12 col-md-3 col-lg-2">
                                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', overflowX: 'auto' }}>
                                  <div style={{ marginRight: '10px' }}>
                                    <div className="mb-2 text-muted">Product 11</div>
                                    <img src="assets/img/image-gallery/1.png" alt="Product 11" className="img-fluid" />
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-md-3 col-lg-2">
                                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', overflowX: 'auto' }}>
                                  <div style={{ marginRight: '10px' }}>
                                    <div className="mb-2 text-muted">Product 12</div>
                                    <img src="assets/img/image-gallery/1.png" alt="Product 12" className="img-fluid" />
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-md-3 col-lg-2">
                                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', overflowX: 'auto' }}>
                                  <div style={{ marginRight: '10px' }}>
                                    <div className="mb-2 text-muted">Product 13</div>
                                    <img src="assets/img/image-gallery/1.png" alt="Product 13" className="img-fluid" />
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-md-3 col-lg-2">
                                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', overflowX: 'auto' }}>
                                  <div style={{ marginRight: '10px' }}>
                                    <div className="mb-2 text-muted">Product 14</div>
                                    <img src="assets/img/image-gallery/1.png" alt="Product 14" className="img-fluid" />
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-md-3 col-lg-2">
                                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', overflowX: 'auto' }}>
                                  <div style={{ marginRight: '10px' }}>
                                    <div className="mb-2 text-muted">Product 15</div>
                                    <img src="assets/img/image-gallery/1.png" alt="Product 15" className="img-fluid" />
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-md-3 col-lg-2">
                                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', overflowX: 'auto' }}>
                                  <div style={{ marginRight: '10px' }}>
                                    <div className="mb-2 text-muted">Product 16</div>
                                    <img src="assets/img/image-gallery/1.png" alt="Product 16" className="img-fluid" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                      {showChemicalsProducts && (
                        
                        <div>
               <div className="mb-2 text-left" style={{ color: '#A569BD', fontWeight: 'bold', fontSize: '1.5rem' }}>Chemicals</div>

                          <div className="mb-2 text-left" style={{ color: 'black', fontWeight: 'bold', fontSize: '1.5rem' }}>Chemical Equipments</div>
                          <div className="row">
                            <div className="col-12 col-md-3 col-lg-2">
                              <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', overflowX: 'auto' }}>
                                <div style={{ marginRight: '10px' }}>
                                  <div className="mb-2 text-muted">Product 1</div>
                                  <img src="assets/img/image-gallery/1.png" alt="Product 1" className="img-fluid" onClick={handleProductDetails} />
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-md-3 col-lg-2">
                              <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', overflowX: 'auto' }}>
                                <div style={{ marginRight: '10px' }}>
                                  <div className="mb-2 text-muted">Product 2</div>
                                  <img src="assets/img/image-gallery/1.png" alt="Product 2" className="img-fluid" />
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-md-3 col-lg-2">
                              <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', overflowX: 'auto' }}>
                                <div style={{ marginRight: '10px' }}>
                                  <div className="mb-2 text-muted">Product 3</div>
                                  <img src="assets/img/image-gallery/1.png" alt="Product 3" className="img-fluid" />
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-md-3 col-lg-2">
                              <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', overflowX: 'auto' }}>
                                <div style={{ marginRight: '10px' }}>
                                  <div className="mb-2 text-muted">Product 4</div>
                                  <img src="assets/img/image-gallery/1.png" alt="Product 4" className="img-fluid" />
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-md-3 col-lg-2">
                              <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', overflowX: 'auto' }}>
                                <div style={{ marginRight: '10px' }}>
                                  <div className="mb-2 text-muted">Product 5</div>
                                  <img src="assets/img/image-gallery/1.png" alt="Product 5" className="img-fluid" />
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-md-3 col-lg-2">
                              <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', overflowX: 'auto' }}>
                                <div style={{ marginRight: '10px' }}>
                                  <div className="mb-2 text-muted">Product 6</div>
                                  <img src="assets/img/image-gallery/1.png" alt="Product 6" className="img-fluid" />
                                </div>
                              </div>
                            </div>
                          </div>

                          {showAllProducts && (
                            <div className="row">
                              <div className="col-12 col-md-3 col-lg-2">
                                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', overflowX: 'auto' }}>
                                  <div style={{ marginRight: '10px' }}>
                                    <div className="mb-2 text-muted">Product 11</div>
                                    <img src="assets/img/image-gallery/1.png" alt="Product 11" className="img-fluid" />
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-md-3 col-lg-2">
                                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', overflowX: 'auto' }}>
                                  <div style={{ marginRight: '10px' }}>
                                    <div className="mb-2 text-muted">Product 12</div>
                                    <img src="assets/img/image-gallery/1.png" alt="Product 12" className="img-fluid" />
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-md-3 col-lg-2">
                                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', overflowX: 'auto' }}>
                                  <div style={{ marginRight: '10px' }}>
                                    <div className="mb-2 text-muted">Product 13</div>
                                    <img src="assets/img/image-gallery/1.png" alt="Product 13" className="img-fluid" />
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-md-3 col-lg-2">
                                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', overflowX: 'auto' }}>
                                  <div style={{ marginRight: '10px' }}>
                                    <div className="mb-2 text-muted">Product 14</div>
                                    <img src="assets/img/image-gallery/1.png" alt="Product 14" className="img-fluid" />
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-md-3 col-lg-2">
                                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', overflowX: 'auto' }}>
                                  <div style={{ marginRight: '10px' }}>
                                    <div className="mb-2 text-muted">Product 15</div>
                                    <img src="assets/img/image-gallery/1.png" alt="Product 15" className="img-fluid" />
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-md-3 col-lg-2">
                                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', overflowX: 'auto' }}>
                                  <div style={{ marginRight: '10px' }}>
                                    <div className="mb-2 text-muted">Product 16</div>
                                    <img src="assets/img/image-gallery/1.png" alt="Product 16" className="img-fluid" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                  <div className="text-center mt-4">
                    {!showAllProducts && (showPharmaceuticalsProducts || showChemicalsProducts) && (
                      <button className="btn btn-primary" onClick={handleShowAllClick}>Show All</button>
                    )}
                    {showAllProducts && (
                      <button className="btn btn-primary" onClick={handleHideAllClick}>Hide All</button>
                    )}
                  </div>
                  {showProductDetails && (
                    <div>
                      <h3>Product Details</h3>
                      <p>Details of the selected product will be shown here.</p>
                      <button className="btn btn-primary" onClick={() => setShowProductDetails(false)}>Back</button>
                    </div>
                  )}
                  {!showAllProducts && (showPharmaceuticalsProducts || showChemicalsProducts) && (
                    <div className="text-center mt-4">
                      <button className="btn btn-primary" style={{ position: 'absolute', bottom: '10px', right: '10px' }} onClick={handleGoBackClick}>Go Back</button>
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
