//import React, { useEffect, useState } from "react";
import feather from "feather-icons";
import axios from 'axios';
import Select from 'react-select';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, getSubCategories,getKeywords,getUOM  } from '../../redux/Admin/admin.action';

import { getProducts } from "../../redux/Product/product.action";
import { Link, useNavigate } from "react-router-dom";

// import { getKeywords } from '../../redux/Admin/Keywords/keyword.action';
// import { getUOM } from '../../redux/Admin/UOM/uom.action';

const Product = () => {
  useEffect(() => {
    feather.replace();
    dispatch(getCategories());
    dispatch(getSubCategories());
    dispatch(getKeywords());
    dispatch(getUOM());

    const userString = sessionStorage.getItem('user');
    const user = JSON.parse(userString);
    const encCompanyId = user.encCompanyId;
    dispatch(getProducts(encCompanyId));

  }, []);

  const [selectedOptions, setSelectedOptions] = useState([]);

  // Sample data (you will get this from your reducer)

  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    // Add more options as needed
  ];


  const [showForm, setShowForm] = useState(false); // Initially hide the add product form
  const [photoPreview, setPhotoPreview] = useState(null);
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [showKeywords, setShowKeywords] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  //te to hold product details
  const [updateMode, setUpdateMode] = useState(false); 
  const dispatch = useDispatch();
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const navigate = useNavigate();
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


  const products = useSelector(state => state.productReducer.products)
  console.log("pro",products)

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

  
  const handleChange = selected => {
    setSelectedOptions(selected);
    const selectedKeywords = selected.map(option => option.value); // Extracting keyword names
    setProductDetails(prevState => ({
      ...prevState,
      keywords: selectedKeywords // Update the keywords field in productDetails
    }));
    console.log(productDetails);
    console.log(JSON.stringify(productDetails, null, 2));
    console.log("Selected File:", productDetails.file);

  };

  const categoryNameFromId = (encCatId) => {
    const category = categories.find(cat => cat.encCatId === encCatId);
    return category ? category.cat_name : 'Category not found';
  };

  const subCategoryNameFromId = (encSubCatId) => {
    const subCategory = subCategories.find(subCat =>subCat.encSubCatId === encSubCatId);
    return subCategory ? subCategory.sub_cat_name : 'Sub-Category not found';
  }

  const uomNameFromId = (encUomId) => {
    const uom = uoms.find(uom =>uom.encUomId === encUomId);
    return uom ? uom.unit_name : 'Uom not found';
  }

  const keywordsNameFromId = (encKeywords) => {
    const keywordNames = encKeywords.map(encKeywordId => {
      const keyword = keywords.find(keyword => keyword.encKeywordId === encKeywordId);
      return keyword ? keyword.keyword_name : 'Unknown'; // Return 'Unknown' if no match found
  });

  return keywordNames.join(', '); // Return comma-separated keyword names

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

const handleSaveAndContinue = async(e) => {
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
  const res = await axios.post("http://127.0.0.1:8000/api/product/store", productDetails, {
      headers: {
          'Content-Type': 'multipart/form-data'
      }

  });
  await dispatch(getProducts(encCompanyId));
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
      dispatch(getProducts(encCompanyId));
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



  const handleUpdateProductDetails = (product) => {
    navigate('/product/update-product', { state: { product } });
    
  };

  // Function to handle delete product details
  const handleDeleteProductDetails = (product) => {
    setProductToDelete(product);
    setShowDeleteConfirmation(true)
    console.log("product",product);
    document.querySelector('.modal-content').style.display = 'block';  // Reset product details
    // Hide the add product form after submitting
   // setShowForm(false);

    // Function to map encCatId to categoryName
 

  
    
  };

  const handleConfirmDelete = async() => {
    const product = productToDelete;
    try {
      const userString =  sessionStorage.getItem('user');
      const user = JSON.parse(userString);
      const encUserId = user.encUserId;
  
      const payload = {
        encUserId
      };
  
      const response = await axios.delete(`http://127.0.0.1:8000/api/product/${product.encProdId}`, { data: payload }); 
      dispatch(getProducts(encCompanyId));     
      // dispatch(getCategories());
    } catch (error) {
      console.error("Error deleting keyword:", error);
    }
    setShowDeleteConfirmation(false);
  };


  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  }

  return (
    <div style={{ background: "#f2f2f2", padding: "0px", marginTop: "-120px" }}>
      <div className="main-content" style={{ maxWidth: "1600px", maxHeight:"1400px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "right", marginBottom: "20px" }}>
          <Link to="/product/add-product">
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
           
          >
            <span style={{ marginRight: "5px", fontWeight: "bold" }}>+</span> Add Product
          </button>
          </Link>
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
                                <div className="product-details" style={{ textAlign:"left", padding: "10px", background: "#fff", borderRadius: "10px" }}>
                                  <div className="form-group" style={{marginBottom:'50px'}}>
                                    <label>Product Name:</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      style={{ height: "40px" }}
                                      name="productName"
                                      onChange={(e) => setProductDetails({ ...productDetails, prodName: e.target.value })}

                                    />
                                  </div>
                                  <div className="form-group" >
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
                                    <label>Price :</label>
                                    <input
                                      type="number"
                                      className="form-control"
                                      style={{ height: "40px" }}
                                      name="price"
                                      onChange={(e) => setProductDetails({ ...productDetails, prodPrice: e.target.value })}

                                    />
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
                                </div>
                              </div>
                            </section>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="card-content">
                            <section className="section">
                              <div className="section-body">
                                <div className="product-details" style={{  textAlign:"left",padding: "10px", background: "#fff", borderRadius: "10px" }}>
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
  <label>Keywords:</label>
  <div style={{ position: "relative" }}>
    <Select
      options={formattedOptions}
      isMulti
      onChange={handleChange}
      value={selectedOptions}
      menuPlacement="auto" // Ensure the dropdown opens based on available space
      menuShouldScrollIntoView={true}
      menuPosition="fixed" // Fix the position of the dropdown to avoid it being cut off by overflow
      menuPortalTarget={document.body} // Render the dropdown in the body to avoid overflow issues
      styles={{ // Custom styles for the dropdown menu
        menu: provided => ({
          ...provided,
          maxHeight: "200px", // Set the fixed height of the dropdown menu container
          overflowY: "auto", // Enable vertical scrolling
          "&::-webkit-scrollbar": {
            display: "none", // Hide scrollbar for Chrome, Safari, and Opera
          },
          scrollbarWidth: "none", // Hide scrollbar for Firefox
        }),
        menuList: provided => ({
          ...provided,
          "&::-webkit-scrollbar": {
            display: "none", // Hide any additional scrollbars in WebKit browsers
          },
          scrollbarWidth: "none", // Hide any additional scrollbars in Firefox
        }),
      }}
    />
    <div>
      {/* Render selected values */}
      {selectedOptions.map(option => (
        <div key={option.value}>{option.keyword_name}</div>
      ))}
    </div>
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
        {products && products.map((product, index) => (
  <div className="card" key={index} style={{ 
    padding: '20px',
    maxWidth: '1000px', 
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.15)',
    marginTop: '20px', // Add margin top for separation
    position: 'relative' // Position relative for absolute positioning of delete button
  }}>
    <div className="row">
      <div className="col-lg-6" style={{ padding: '20px' }}>
        <div style={{ marginTop: '30px',marginLeft:'20px',maxWidth: '400px' }}>
        {product.prod_img_path && (
            <img src={`http://127.0.0.1:8000/storage/${product.prod_img_path}`} alt="Product Preview" style={{ width: '800%', height: '200px' }}  />
            
          )}
        </div>
      </div>
      <div className="col-lg-6" style={{ padding: '10px' }}>
        <div style={{ textAlign: 'left', color: 'black', marginBottom: '10px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: 'black', borderBottom: '2px solid #333', paddingBottom: '5px', marginBottom: '10px' }}>Product Details</h3>
          <p style={{ fontSize: '14px', lineHeight: '1.4', marginBottom: '5px' }}>Product Name: {product.prod_name || 'Sample Product'}</p>
          <p style={{ fontSize: '14px', lineHeight: '1.4', marginBottom: '5px' }}>Description: {product.prod_description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}</p>
          <p style={{ fontSize: '14px', lineHeight: '1.4', marginBottom: '5px' }}>Category: {categoryNameFromId(product.encCatId)} </p>
          <p style={{ fontSize: '14px', lineHeight: '1.4', marginBottom: '5px' }}>Subcategory: {subCategoryNameFromId(product.encSubCatId)} </p>
          <p style={{ fontSize: '14px', lineHeight: '1.4', marginBottom: '5px' }}>Keywords: {keywordsNameFromId(product.encKeywords)}</p>
          <p style={{ fontSize: '14px', lineHeight: '1.4', marginBottom: '5px' }}>Price: {product.prod_price || '$50'}</p>
          <p style={{ fontSize: '14px', lineHeight: '1.4', marginBottom: '5px' }}>Unit of Measurement: {uomNameFromId(product.encUomId)}</p>

          {/* Update and Delete buttons */}
          {updateMode ? (
            <>
              <button onClick={handleUpdate} style={{ marginRight: '5px', fontWeight: 'bold' }}>Update</button>
              <button onClick={handleCancelUpdate} style={{ marginRight: '5px', fontWeight: 'bold', backgroundColor:'#F9E79F' }}>Cancel</button>
            </>
          ) : (
            <button onClick={() => handleUpdateProductDetails(product)} style={{
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
            }}>Update</button>
          )}

          {/* Delete button */}
          <button
            type="button"
            onClick={() => handleDeleteProductDetails(product)}
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
))}
   <div
                    className={`modal fade ${showDeleteConfirmation ? "show" : ""}`}
                    id="deleteConfirmationModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="deleteConfirmationModalLabel"
                    aria-hidden={!showDeleteConfirmation}
                    style={{ display: showDeleteConfirmation ? "block" : "none" }}
                >
                    <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-backdrop" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backdropFilter: 'blur(2px)', backgroundColor: 'rgba(0, 0, 0, 0.3)', zIndex: 0 }}></div>

        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="deleteConfirmationModalLabel">Confirm Deletion</h5>
                <button type="button" className="close" onClick={handleCancelDelete} aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>                            
                
            </div>
            <div className="modal-body">
                Are you sure you want to delete 
            </div>
            <div className="modal-footer">
                
                <button type="button" className="btn btn-danger" onClick={handleConfirmDelete}
                style={{ marginRight: "8px", color: 'black', backgroundColor: 'transparent', borderColor: 'transparent' }}                                                >
                    Delete
                </button>
            </div>
        </div>
    </div>
                </div>
  <div className="modal-content" style={{ display: 'none' }}>
  <div className="col-12 col-sm-6 col-lg-3">
    <div className="card">
      <div className="card-body text-center">
        <div className="mb-2">Confirmation</div>
        <button className="btn btn-primary" id="swal-6">Launch</button>
      </div>
    </div>
  </div>

            {/* <div className="modal-body">
                Are you sure you want to delete {categoryToDelete && categoryToDelete.cat_name}?
            </div> */}
            {/* <div className="modal-footer">
               
                <button type="button" className="btn btn-danger" onClick={handleConfirmDelete}
                style={{ marginRight: "8px", color: 'black', backgroundColor: 'transparent', borderColor: 'transparent' }}                                                >
                    Delete
                </button>
            </div> */}
        </div>

      </div>
    </div>
  );
};

export default Product;