//import React, { useEffect, useState } from "react";
import feather from "feather-icons";
import axios from 'axios';
import Select from 'react-select';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, getSubCategories,getKeywords,getUOM  } from '../../redux/Admin/admin.action';
// import { getKeywords } from '../../redux/Admin/Keywords/keyword.action';
// import { getUOM } from '../../redux/Admin/UOM/uom.action';

const AddNewProduct = () => {
  useEffect(() => {
    feather.replace();
    dispatch(getCategories());
    dispatch(getSubCategories());
    dispatch(getKeywords());
    dispatch(getUOM());
  }, []);

  const [selectedOptions, setSelectedOptions] = useState([]);

  // Sample data (you will get this from your reducer)
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    // Add more options as needed
  ];

  const handleChange = selected => {
    setSelectedOptions(selected);
    const selectedKeywords = selected.map(option => option.label); // Extracting keyword names
    setProductDetails(prevState => ({
      ...prevState,
      keywords: selectedKeywords // Update the keywords field in productDetails
    }));
    console.log(productDetails);
    console.log(JSON.stringify(productDetails, null, 2));
    console.log("Selected File:", productDetails.file);

  };

  const [showForm, setShowForm] = useState(false); // Initially hide the add product form
  const [photoPreview, setPhotoPreview] = useState(null);
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [showKeywords, setShowKeywords] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  //te to hold product details
  const [updateMode, setUpdateMode] = useState(false); 
  const dispatch = useDispatch();
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  // const categories = useSelector(state => state.adminReducer.categories);
  // console.log("in categoreis",categories);
  
  const [productDetails, setProductDetails] = useState({
    encCompanyId: '',
    prodName: '',
    prodDescription: '',
    prodCat: '',
    prodSubCat: '',
    keywords: [],
    prodPrice: '',
    pricePer: '',
    minOrderQty: '',
    prodUOM: '',
    file: '',
});


  const [selectedCategory, setSelectedCategory] = useState('');
 
   // useEffect will run whenever dispatch changes

   const categories = useSelector(state => state.masterData.categories);
  const subCategories = useSelector(state => state.masterData.subCategories);
  
 

  const keywords = useSelector(state => state.masterData.keywords);

  const uoms = useSelector(state => state.masterData.uom);

   //filtered out the sub categories based on category selected
   const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    console.log("selected category",selectedCategory)
    setProductDetails({ ...productDetails, prodCat: selectedCategory });
    // Filter subcategories based on the selected category
    const filteredSubcategories = subCategories.filter(subCategory => subCategory.encCatId === selectedCategory);
    console.log("filtered sub cat", filteredSubcategories);
    setFilteredSubCategories(filteredSubcategories);
};

  const handleUomChange = (e) => {
    const selectedUom = e.target.value;
    setProductDetails({...productDetails, prodUOM:selectedUom,});
    
  }

  const handleCheckboxChange = () =>{}

  const handleContextMenu = () => {}

  const handleKeywordOptionClick = () => {
  }

  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };

  const handleSaveChanges = () => {
    // Logic to save changes
    console.log('Changes saved!');
  };

  const handleFileChange = (e, setPreview) => {
    const file = e.target.files[0]; // Get the selected file
    setProductDetails({ ...productDetails, file });
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
//   const handleFileChange = (e) => {
//     setProductDetails({ ...productDetails, file: e.target.files[0] })
// };

const handleSaveAndContinue = (e) => {
  e.preventDefault();

  
console.log(encCompanyId);

  // Update productDetails state with the obtained encCompanyId
setProductDetails(prevProductDetails => ({
...prevProductDetails,
encCompanyId: encCompanyId
}));
  // Logic to save changes and continue
  console.log(productDetails);
  //debugger;
  const res = axios.post("http://127.0.0.1:8000/api/product/store", productDetails, {
      headers: {
          'Content-Type': 'multipart/form-data'
      }

  });
  //navigate('/');
  setShowForm(false); // Hide the form after saving
};
const userString = sessionStorage.getItem('user');
    const user = JSON.parse(userString);
    const encCompanyId = user.encCompanyId;

    useEffect(() => {
        setProductDetails(prevProductDetails => ({
            ...prevProductDetails,
            encCompanyId: encCompanyId
        }));
    }, [encCompanyId]);
  const handleSubmit = (e) => {
    e.preventDefault();

    
  
    console.log(encCompanyId);
    
      // Update productDetails state with the obtained encCompanyId
    setProductDetails(prevProductDetails => ({
    ...prevProductDetails,
    encCompanyId: encCompanyId
    }));
      // Logic to save changes and continue
      console.log(productDetails);
      //debugger;
      const res = axios.post("http://127.0.0.1:8000/api/product/store", productDetails, {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
    
      });
      //navigate('/');
      setShowForm(false); // Hide the form after saving
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
  const formattedOptions = keywords.map(keyword => ({
    value: keyword.encKeywordId, // assuming keyword_id is the unique identifier
    label: keyword.keyword_name
  }));
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
    setProductDetails(false); // Reset product details
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
                                      style={{ height: "40px" }}
                                      name="productName"
                                      onChange={(e) => setProductDetails({ ...productDetails, prodName: e.target.value })}

                                    />
                                  </div>
                                  <div className="form-group">
                                    <label>Category:</label>
                                    <select
                                    id="category"
                                      className="form-control"
                                      style={{ height: "40px" }}
                                      name="category"
                                      value={productDetails.prodCat}
                                      onChange={handleCategoryChange}
                                    >
                                      <option value="">Select Category</option>
                                      {categories.map(category => (
                                        <option key={category.encCatId} value={category.encCatId}>{category.cat_name}</option>
                                    ))}
                                    </select>
                                  </div>
                                

                                  <div className="form-group">
                                    <label>Price per:</label>
                                    <select
                                      className="form-control"
                                      style={{ height: "40px" }}
                                      name="unit"
                                      onChange={handleUomChange}
                                      
                                    >
                                       <option value="">Select Unit of Measurements</option>
                                      {uoms.map(uom => (
                                        <option key={uom.encUomId} value={uom.encUomId}>{uom.unit_name}</option>
                                    ))}
                                    </select>
                                  </div>
                                  <div className="form-group">
                                    <label>Price :</label>
                                    <input
                                      type="number"
                                      className="form-control"
                                      style={{ height: "40px" }}
                                      name="price"
                                      onChange={(e) => setProductDetails({ ...productDetails, prodPrice: e.target.value })}
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
                                      onChange={(e) => setProductDetails({ ...productDetails, prodDescription: e.target.value })}

                                    ></textarea>
                                  </div>
                                  <div className="form-group">
                                    <label>Subcategory:</label>
                                    <select
                                      className="form-control"
                                      style={{ height: "40px" }}
                                      name="subcategory"
                                      onChange={(e) => setProductDetails({ ...productDetails, prodSubCat: e.target.value })}

                                    >
                                      <option value="">Select Subcategory</option>
                                      {filteredSubCategories.map(subCategory => (
                                        <option key={subCategory.encSubCatId} value={subCategory.encSubCatId}>{subCategory.sub_cat_name}</option>
                                    ))}
                                    </select>
                                  </div>
                                  
                                  <div className="form-group">
                                    <label>Minimum Order Quantity:</label>
                                    <input
                                      type="number"
                                      className="form-control"
                                      style={{ height: "40px" }}
                                      name="pricePer"
                                      onChange={(e) => setProductDetails({ ...productDetails, minOrderQty: e.target.value })}
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label>Keywords:</label>
                                  <div>
      <Select
        options={formattedOptions}
        isMulti
        onChange={handleChange}
        value={selectedOptions}
      />
      <div>
        {/* Render selected values */}
        {selectedOptions.map(option => (
          <div key={option.value}>{option.keyword_name}</div>
        ))}
      </div>
    </div>
      </div>                           
                                  <div className="form-group">
                                    <label>Keywords:</label>
                                    <div
                                      className="form-control"
                                      style={{ height: "40px", fontSize:"14px", textAlign:"center", position: "relative", cursor: "pointer" }}
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
                                                // onChange={handleCheckboxChange}
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
