import React, { useEffect, useState } from "react";
import feather from "feather-icons";

const AddNewProduct = () => {
  useEffect(() => {
    feather.replace();
  }, []);

  const [showForm, setShowForm] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [showKeywords, setShowKeywords] = useState(false);

  const toggleFormVisibility = () => {
    setShowForm(!showForm);
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

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedKeywords([...selectedKeywords, value]);
    } else {
      setSelectedKeywords(selectedKeywords.filter((keyword) => keyword !== value));
    }
  };

  const handleContextMenu = (event) => {
    event.preventDefault();
    const { value, checked } = event.target;
    if (!checked) {
      setSelectedKeywords([...selectedKeywords, value]);
    } else {
      setSelectedKeywords(selectedKeywords.filter((keyword) => keyword !== value));
    }
  };

  const handleDropdownClick = () => {
    setShowKeywords(!showKeywords);
  };

  const handleKeywordOptionClick = (keyword) => {
    setSelectedKeywords((prevKeywords) =>
      prevKeywords.includes(keyword)
        ? prevKeywords.filter((k) => k !== keyword)
        : [...prevKeywords, keyword]
    );
  };

  return (
    <div style={{ background: "#f2f2f2", padding: "0px" }}>
      <div className="main-content" style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
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
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label>Category:</label>
                                    <select className="form-control" style={{ height: "20px" }}>
                                      <option value="">Select Category</option>
                                    </select>
                                  </div>
                                  <div className="form-group">
                                    <label>Unit of Measurement:</label>
                                    <select className="form-control" style={{ height: "20px" }}>
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
                                    <textarea className="form-control" rows="3" style={{ height: "20px !important" }}></textarea>
                                  </div>
                                  <div className="form-group">
                                    <label>Subcategory:</label>
                                    <select className="form-control" style={{ height: "20px" }}>
                                      <option value="">Select Subcategory</option>
                                    </select>
                                  </div>
                                  <div className="form-group">
                                    <label>Price per:</label>
                                    <input
                                      type="number"
                                      className="form-control"
                                      style={{ height: "20px" }}
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
                                      {/* {showKeywords && (
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
                                      )} */}
                                    </div>
                                  </div>
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
      </div>
    </div>
  );
};

export default AddNewProduct;
