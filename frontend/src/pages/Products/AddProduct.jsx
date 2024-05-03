import React, { useEffect, useState } from "react";
import feather from "feather-icons";

const Addnewproduct = () => {
  useEffect(() => {
    feather.replace();
  }, []); // Empty dependency array means this effect runs only once after the component mounts

  const [showForm, setShowForm] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [productDetails, setProductDetails] = useState(false);
  const [updateMode, setUpdateMode] = useState(false);

  const handleSaveChanges = () => {
    // Logic to save changes
    console.log("Changes saved!");
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
    console.log("Changes saved and continue to next step!");
    const formData = new FormData(document.querySelector("form"));
    const data = Object.fromEntries(formData.entries());
    setProductDetails(data);
    setShowForm(false); // Hide the form after saving
  };

  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };

  const handleDeleteProductDetails = () => {
    // Logic to delete product details
    setProductDetails(false);
  };

  const handleUpdateProductDetails = () => {
    setShowForm(!showForm);
  };

  const handleCancelUpdate = () => {
    setUpdateMode(false); // Exit update mode
  };

  const handleUpdate = () => {
    // Logic to update product details
    console.log("Product details updated!");
    setUpdateMode(false); // Exit update mode after updating
  };

  return (
    <div>
      {/* Main Content */}
      <div className="main-content">
        {/* Add Product Button */}
        <div style={{ marginTop:"-10%",marginLeft: "30%", marginBottom: "2%", color: "black" }}>
          <button
            type="button"
            style={{
              backgroundColor: "#4CAF50",
              border: "none",
              color: "white",
              padding: "2vh 4vw",
              textAlign: "center",
              textDecoration: "none",
              display: "inline-block",
              fontSize: "2.5vh",
              margin: "1vh 1vw",
              cursor: "pointer",
              borderRadius: "2vw",
              transition: "background-color 0.3s ease",
            }}
            onClick={toggleFormVisibility}
          >
            <span
              style={{ marginRight: "1vw", fontWeight: "bold", color: "black" }}
            >
              +
            </span>{" "}
            Add Product
          </button>
        </div>

        {/* Product Details Section */}
        <section className="section">
          <div className="row ">
            <div className="col-xl-9 col-lg-6 col-md-6 col-sm-6 col-xs-12">
              <div className="card" style={{ height: "60vh", width: "120%" }}>
                <div className="card-statistic-4">
                  <div className="align-items-center justify-content-between">
                    <div className="row ">
                      {/* Add Image Section */}
                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pr-0 pt-3">
                        <div className="card-content">
                          <section className="section">
                            <div className="section-body">
                              <div className="row">
                                <div className="col-7">
                                  <div className="card">
                                    <div className="card-header">
                                      <h4>Add Image</h4>
                                    </div>
                                    {photoPreview && (
                              <div className="file-preview">
                                <img
                                  src={photoPreview}
                                  alt="Photo Preview"
                                  style={{
                                    height: "20%",
                                    width: "110%",
                                    marginTop: "1%",
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                />
                              </div>
                            )}
                                    <div
                                      className="card-body"
                                    
                                    >
                                      
                                    
                                      
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
                            </div>
                          </section>
                        </div>
                      </div>
                      {/* Other Product Details */}
                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pl-0">
                        <div className="d-flex">
                          <div
                            className="flex-grow-1 "
                            style={{ marginLeft: "-20vh" }}
                          >
                            <div className="form-group" style={{ textAlign: "left" }}>
                              <label>Product Name:</label>
                              <input
                                type="text"
                                className="form-control"
                                style={{ height: "20px", width: "200px" }}
                              />
                            </div>
                            
                            <div className="form-group" style={{ textAlign: "left" }}>
                              <label>Category:</label>
                              <select
                                className="form-control"
                                style={{ height: "20px", width: "200px" }}
                              >
                                <option value="">Select Category</option>
                                {/* options will be populated dynamically */}
                              </select>
                            </div>
                            <div className="form-group" style={{ textAlign: "left" }}>
                              <label>Subcategory:</label>
                              <select
                                className="form-control"
                                style={{ height: "20px", width: "200px" }}
                              >
                                <option value="">Select Subcategory</option>
                                {/* options will be populated dynamically */}
                              </select>
                            </div>
                            <div className="form-group" style={{ textAlign: "left" }}>
                              <label>Unit of Measurement:</label>
                              <select
                                className="form-control"
                                style={{ height: "20px", width: "200px" }}
                              >
                                <option value="">Select Unit</option>
                                <option value="kg">Kilogram</option>
                                <option value="gm">Gram</option>
                                <option value="ltr">Liter</option>
                                {/* more options can be added */}
                              </select>
                            </div>
                          </div>
                          <div
                            className="flex-grow-1"
                            style={{ marginLeft: "6%" }}
                          >
                            <div className="form-group" style={{ textAlign: "left" }}>
                              <label>Product Description:</label>
                              <textarea
                                className="form-control" 
                                rows="1"
                                style={{ height: "20px", width: "200px" }}
                              ></textarea>
                            </div>
                            
                            
                            <div className="form-group" style={{ textAlign: "left" }}>
                              <label>Price per:</label>
                              <input
                                type="number"
                                className="form-control"
                                style={{ height: "20px", width: "200px" }}
                              />
                              <select
                                className="form-control"
                                style={{ height: "20px", width: "200px" }}
                              >
                                <option value="">Select Unit</option>
                                <option value="kg">Kilogram</option>
                                <option value="gm">Gram</option>
                                <option value="ltr">Liter</option>
                                {/* more options can be added */}
                              </select>
                            </div>
                            <div className="form-group" style={{ textAlign: "left" }}>
                              <label>Keywords:</label>
                              <input
                                type="text"
                                className="form-control"
                                style={{ height: "20px", width: "200px" }}
                              />
                            </div>

                          
                            
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Addnewproduct;
