import React, { useEffect, useState } from "react";
import feather from "feather-icons";

const AddNewProduct = () => {
  useEffect(() => {
    feather.replace();
  }, []);

  const [showForm, setShowForm] = useState(false); // Initially hide the add product form
  const [photoPreview, setPhotoPreview] = useState(null);
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [showKeywords, setShowKeywords] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [productDetails, setProductDetails] = useState(null); // State to hold product details
  const [updateMode, setUpdateMode] = useState(false); 

  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };

  const handleSaveChanges = () => {
    // Logic to save changes
    console.log('Changes saved!');
  };

  const handleFileChange = (event, setPreview) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setPreview(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSaveAndContinue = () => {
    // Logic to save changes and continue
    console.log('Changes saved and continue to next step!');
    const formData = new FormData(document.querySelector('form'));
    const data = Object.fromEntries(formData.entries());
    setProductDetails(data);
    setShowForm(false); // Hide the form after saving
  };

  const handleSubmit = () => {
    setShowPopup(true);
    // Set product details here
    setProductDetails({
      productName: document.getElementsByName("productName")[0].value,
      category: document.getElementsByName("category")[0].value,
      unit: document.getElementsByName("unit")[0].value,
      price: document.getElementsByName("price")[0].value,
      description: document.getElementsByName("description")[0].value,
      subcategory: document.getElementsByName("subcategory")[0].value,
      pricePer: document.getElementsByName("pricePer")[0].value,
      keywords: selectedKeywords.join(", "),
    });
    // Hide the add product form after submitting
    setShowForm(false);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleDropdownClick = () => {
    setShowKeywords(!showKeywords);
  };

  const handleCancelUpdate = () => {
    setUpdateMode(false); // Exit update mode
  };

  // Function to handle update
  const handleUpdate = () => {
    // Logic to update product details
    console.log('Product details updated!');
    setUpdateMode(false); // Exit update mode after updating
  };

  const handleUpdateProductDetails = () => {
    setShowForm(!showForm);
  };

  // Function to handle delete product details
  const handleDeleteProductDetails = () => {
    setProductDetails(falls); // Reset product details
    // Hide the add product form after submitting
   // setShowForm(false);

    
  };
  return (
    <div style={{ background: "#f2f2f2", padding: "0px", marginTop: "-90px" }}>
      <div className="main-content" style={{ maxWidth: "1600px", maxHeight:"1400px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "right", marginBottom: "20px" }}>
          <button
            type="button"
            style={{
              backgroundColor: "#4CAF50",
              border: "none",
              color: "white",
              padding: "1px 10px",
              fontSize: "1.5em",
              cursor: "pointer",
              borderRadius: "20px",
              fontSize: "1em" 
            }}
            onClick={toggleFormVisibility}
          >
            <span style={{ marginRight: "5px", fontWeight: "bold" }}>+</span> Add Product
          </button>
        </div>

        {showForm && (
          <section className="section" style={{ background: "#fff", borderRadius: "10px", boxShadow: "none", border: "none" }}>
            <div className="row">
              <div className="col-lg-12">
                <div className="card" style={{ width: "100%", marginBottom: "20px", background: "#fff", borderRadius: "10px", boxShadow: "none", border: "none" }}>
                  <div className="card-statistic-4">
                    <div className="align-items-center justify-content-between">
                      <div className="row">
                        <div className="col-lg-4">
                          <div className="card-content">
                            <section className="section">
                              <div className="section-body">
                                <div className="image-section" style={{ padding: "10px", background: "#fff", borderRadius: "10px" }}>
                                  <div className="card">
                                    <div className="card-header">
                                      <h4>Add Image</h4>
                                    </div>
                                    {photoPreview && (
                                      <div className="file-preview">
                                        <img
                                          src={photoPreview}
                                          alt="Photo Preview"
                                          style={{ width: "100%", height: "auto" }}
                                        />
                                      </div>
                                    )}
                                    <div className="card-body">
                                      <div className="fallback">
                                        <input
                                          type="file"
                                          id="photo"
                                          name="photo"
                                          accept="image/*"
                                          onChange={(e) =>
                                            handleFileChange(
                                              e,
                                              setPhotoPreview
                                            )
                                          }
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </section>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="card-content">
                            <section className="section">
                              <div className="section-body">
                                <div className="product-details" style={{ padding: "10px", background: "#fff", borderRadius: "10px" }}>
                                  <div className="form-group">
                                    <label>Product Name:</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      style={{ height: "20px" }}
                                      name="productName"
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label>Category:</label>
                                    <select
                                      className="form-control"
                                      style={{ height: "20px" }}
                                      name="category"
                                    >
                                      <option value="">Select Category</option>
                                    </select>
                                  </div>
                                  <div className="form-group">
                                    <label>Unit of Measurement:</label>
                                    <select
                                      className="form-control"
                                      style={{ height: "20px" }}
                                      name="unit"
                                    >
                                      <option value="">Select Unit</option>
                                      <option value="kg">Kilogram</option>
                                      <option value="gm">Gram</option>
                                      <option value="ltr">Liter</option>
                                    </select>
                                  </div>
                                  <div className="form-group">
                                    <label>Price :</label>
                                    <input
                                      type="number"
                                      className="form-control"
                                      style={{ height: "20px" }}
                                      name="price"
                                    />
                                  </div>
                                </div>
                              </div>
                            </section>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="card-content">
                            <section className="section">
                              <div className="section-body">
                                <div className="product-details" style={{ padding: "10px", background: "#fff", borderRadius: "10px" }}>
                                  <div className="form-group">
                                    <label>Product Description:</label>
                                    <textarea
                                      className="form-control"
                                      rows="3"
                                      style={{ height: "20px !important" }}
                                      name="description"
                                    ></textarea>
                                  </div>
                                  <div className="form-group">
                                    <label>Subcategory:</label>
                                    <select
                                      className="form-control"
                                      style={{ height: "20px" }}
                                      name="subcategory"
                                    >
                                      <option value="">Select Subcategory</option>
                                    </select>
                                  </div>
                                  <div className="form-group">
                                    <label>Price per:</label>
                                    <input
                                      type="number"
                                      className="form-control"
                                      style={{ height: "20px" }}
                                      name="pricePer"
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label>Keywords:</label>
                                    <div
                                      className="form-control"
                                      style={{ height: "20px", fontSize:"14px", textAlign:"center", position: "relative", cursor: "pointer" }}
                                      onClick={handleDropdownClick}
                                    >
                                      <span style={{ textAlign: "center" , padding:"0"}}></span>
                                      {showKeywords && (
                                        <div
                                          style={{
                                            position: "absolute",
                                            zIndex: 1,
                                            top: "100%",
                                            left: 0,
                                            background: "#fff",
                                            border: "1px solid #ccc",
                                            borderRadius: "4px",
                                            maxHeight: "120px",
                                            overflowY: "auto",
                                            width: "100%",
                                            boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
                                            animation: "slideDown 0.3s ease forwards",
                                          }}
                                        >
                                          {['Keyword 1', 'Keyword 2', 'Keyword 3'].map((keyword) => (
                                            <div
                                              key={keyword}
                                              style={{ padding: "5px", cursor: "pointer", transition: "background-color 0.3s" }}
                                              onClick={() => handleKeywordOptionClick(keyword)}
                                            >
                                              <input
                                                type="checkbox"
                                                value={keyword}
                                                checked={selectedKeywords.includes(keyword)}
                                                onChange={handleCheckboxChange}
                                                onContextMenu={handleContextMenu}
                                                style={{ marginRight: '5px' }}
                                              />
                                              {keyword}
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  {/* Submit and Continue Button */}
                                  {showForm && (
                                    <button
                                      type="button"
                                      style={{
                                        bottom: "20px",
                                        right: "70px",
                                        backgroundColor: "#4CAF50",
                                        border: "none",
                                        color: "white",
                                        padding: "8px 5px",
                                        fontSize: "1em",
                                        cursor: "pointer",
                                        borderRadius: "5px",
                                      }}
                                      onClick={handleSubmit}
                                    >
                                      Save and Continue
                                    </button>
                                  )}
                                </div>
                              </div>
                            </section>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Display product details card */}
        {productDetails && (
          <div className="card" style={{ 
            padding: '20px',
            maxWidth: '1000px', 
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.15)',
            marginTop: '20px', // Add margin top for separation
            position: 'relative' // Position relative for absolute positioning of delete button
          }}>
            <div className="row">
              <div className="col-lg-6" style={{ padding: '20px' }}>
                <div style={{ marginTop: '30px',marginLeft:'20px',maxWidth: '400px' }}>
                  {photoPreview && (
                    <img src={photoPreview} alt="Product Preview" style={{ width: '100%', height: 'auto' }} />
                  )}
                </div>
              </div>
              <div className="col-lg-6" style={{ padding: '10px' }}>
                <div style={{ textAlign: 'left', color: 'black', marginBottom: '10px' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: 'black', borderBottom: '2px solid #333', paddingBottom: '5px', marginBottom: '10px' }}>Product Details</h3>
                  <p style={{ fontSize: '14px', lineHeight: '1.4', marginBottom: '5px' }}>Product Name: {productDetails.productName || 'Sample Product'}</p>
                  <p style={{ fontSize: '14px', lineHeight: '1.4', marginBottom: '5px' }}>Description: {productDetails.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}</p>
                  <p style={{ fontSize: '14px', lineHeight: '1.4', marginBottom: '5px' }}>Category: {productDetails.category || 'Laboratory Equipment'}</p>
                  <p style={{ fontSize: '14px', lineHeight: '1.4', marginBottom: '5px' }}>Subcategory: {productDetails.subcategory || 'Glassware'}</p>
                  <p style={{ fontSize: '14px', lineHeight: '1.4', marginBottom: '5px' }}>Keywords: {productDetails.keywords || 'Flask, Laboratory, Chemistry'}</p>
                  <p style={{ fontSize: '14px', lineHeight: '1.4', marginBottom: '5px' }}>Price: {productDetails.price || '$50'}</p>
                  <p style={{ fontSize: '14px', lineHeight: '1.4', marginBottom: '5px' }}>Unit of Measurement: {productDetails.unit || 'Each'}</p>
{/* Buttons for update and delete */}
{updateMode ? (
              <>
                <button onClick={handleUpdate} style={{ marginRight: '5px',marginRight: '5px', fontWeight: 'bold' }}>Update</button>
                <button onClick={handleCancelUpdate} style={{marginRight: '5px', fontWeight: 'bold',backgroundColor:'#F9E79F'}}>Cancel</button>
              </>
            ) : (
              <button onClick={handleUpdateProductDetails}style={{
                backgroundColor: '#58D68D',
                border: 'none',
                color: 'white',
                padding: '2px 12px',
                textAlign: 'center',
                textDecoration: 'none',
                display: 'inline-block',
                fontSize: '14px',
                margin: '10px 0',
                cursor: 'pointer',
                borderRadius: '4px',
                
              }}  >Update</button>
            )}



            {/* Delete button */}
            <button
              type="button"
              onClick={handleDeleteProductDetails}
              style={{
                backgroundColor: '#ff0000',
                border: 'none',
                color: 'white',
                padding: '2px 12px',
                textAlign: 'center',
                textDecoration: 'none',
                display: 'inline-block',
                fontSize: '14px',
                margin: '10px 0',
                cursor: 'pointer',
                borderRadius: '4px',
                
              }}
            >
              Delete
            </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddNewProduct;
