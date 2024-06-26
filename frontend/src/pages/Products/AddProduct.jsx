

//import React, { useEffect, useState } from "react";
import feather from "feather-icons";
import axios from "axios";
import Select from "react-select";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategories,
  getSubCategories,
  getKeywords,
  getUOM,
} from "../../redux/Admin/admin.action";

import { getProducts } from "../../redux/Product/product.action";
import { Link, useNavigate } from "react-router-dom";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { RiImageAddLine } from "react-icons/ri";
import { IoArrowRedoOutline } from "react-icons/io5";

// import { getKeywords } from '../../redux/Admin/Keywords/keyword.action';
// import { getUOM } from '../../redux/Admin/UOM/uom.action';

const AddProduct = () => {
  useEffect(() => {
    feather.replace();
    dispatch(getCategories());
    dispatch(getSubCategories());
    dispatch(getKeywords());
    dispatch(getUOM());

    const userString = sessionStorage.getItem("user");
    const user = JSON.parse(userString);
    const encCompanyId = user.encCompanyId;
    dispatch(getProducts(encCompanyId));
  }, []);

  const [selectedOptions, setSelectedOptions] = useState([]);

  // Sample data (you will get this from your reducer)

  const navigate = useNavigate();
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
  // const categories = useSelector(state => state.adminReducer.categories);
  // console.log("in categoreis",categories);
  const [errors, setErrors] = useState({}); // State for validation errors

  const [productDetails, setProductDetails] = useState({
    encCompanyId: "",
    prodName: "",
    prodDescription: "",
    prodCat: "",
    prodSubCat: "",
    keywords: [],
    prodPrice: "",
    display_price: "yes",
    minOrderQty: "",
    prodUOM: "",
    files: "",
  });

  const [selectedCategory, setSelectedCategory] = useState("");

  // useEffect will run whenever dispatch changes

  const categories = useSelector((state) => state.masterData.categories);
  const subCategories = useSelector((state) => state.masterData.subCategories);

  const keywords = useSelector((state) => state.masterData.keywords);

  const uoms = useSelector((state) => state.masterData.uom);

  const [currentIndex, setCurrentIndex] = useState(0);

  const products = useSelector((state) => state.productReducer.products);
  console.log("pro", products);

  //filtered out the sub categories based on category selected
  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    console.log("selected category", selectedCategory);
    setProductDetails({ ...productDetails, prodCat: selectedCategory });
    // Filter subcategories based on the selected category
    const filteredSubcategories = subCategories.filter(
      (subCategory) => subCategory.encCatId === selectedCategory
    );
    console.log("filtered sub cat", filteredSubcategories);
    setFilteredSubCategories(filteredSubcategories);
  };

  const handleUomChange = (e) => {
    const selectedUom = e.target.value;
    setProductDetails({ ...productDetails, prodUOM: selectedUom });
  };

  const handleChange = (selected) => {
    setSelectedOptions(selected);
    const selectedKeywords = selected.map((option) => option.value); // Extracting keyword names
    setProductDetails((prevState) => ({
      ...prevState,
      keywords: selectedKeywords, // Update the keywords field in productDetails
    }));
    console.log(productDetails);
    console.log(JSON.stringify(productDetails, null, 2));
    console.log("Selected File:", productDetails.files);
    console.log("in sele", selectedOptions);
  };

  const categoryNameFromId = (encCatId) => {
    const category = categories.find((cat) => cat.encCatId === encCatId);
    return category ? category.cat_name : "Category not found";
  };

  const subCategoryNameFromId = (encSubCatId) => {
    const subCategory = subCategories.find(
      (subCat) => subCat.encSubCatId === encSubCatId
    );
    return subCategory ? subCategory.sub_cat_name : "Sub-Category not found";
  };

  const uomNameFromId = (encUomId) => {
    const uom = uoms.find((uom) => uom.encUomId === encUomId);
    return uom ? uom.unit_name : "Uom not found";
  };

  const keywordsNameFromId = (encKeywords) => {
    const keywordNames = encKeywords.map((encKeywordId) => {
      const keyword = keywords.find(
        (keyword) => keyword.encKeywordId === encKeywordId
      );
      return keyword ? keyword.keyword_name : "Unknown"; // Return 'Unknown' if no match found
    });

    return keywordNames.join(", "); // Return comma-separated keyword names
  };

  const handleCheckboxChange = () => {};

  const handleContextMenu = () => {};

  const handleKeywordOptionClick = () => {};

  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };

  const handleSaveChanges = () => {
    // Logic to save changes
    console.log("Changes saved!");
  };

  
  const handleFileChange = (e) => {
    const files = e.target.files;
    setProductDetails({ ...productDetails, files });
      const reader = new FileReader();
    const maxFiles = 4; // Maximum number of files allowed

    //Check if the number of selected files exceeds the maximum
    if (files.length > maxFiles) {
      alert(`You can only upload a maximum of ${maxFiles} images.`);
      e.target.value = null; // Reset the input field to clear selected files
      return;
    }

    const previews = [];

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = (e) => {
        previews.push(e.target.result);
        if (previews.length === files.length) {
          const newPreviews = [...photoPreviews, ...previews];
          setPhotoPreviews(newPreviews.slice(-maxFiles)); // Keep only the latest `maxFiles` images
          setCurrentIndex(newPreviews.length - 1); // Set the current index to the last added image
        }
      };
      reader.readAsDataURL(files[i]);
    }
  };

  const handleSaveAndContinue = async (e) => {
    e.preventDefault();

    console.log(encCompanyId);

    // Update productDetails state with the obtained encCompanyId
    setProductDetails((prevProductDetails) => ({
      ...prevProductDetails,
      encCompanyId: encCompanyId,
    }));
    // Logic to save changes and continue
    console.log(productDetails);
    //debugger;
    const res = await axios.post(
      "http://127.0.0.1:8000/api/product/store",
      productDetails,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("in res",res);
    
    await dispatch(getProducts(encCompanyId));
    //navigate('/');
    setShowForm(false); // Hide the form after saving
  };

  const userString = sessionStorage.getItem("user");
  const user = JSON.parse(userString);
  const encCompanyId = user.encCompanyId;

  useEffect(() => {
    setProductDetails((prevProductDetails) => ({
      ...prevProductDetails,
      encCompanyId: encCompanyId,
    }));
  }, [encCompanyId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log(encCompanyId);

    // Update productDetails state with the obtained encCompanyId
    setProductDetails((prevProductDetails) => ({
      ...prevProductDetails,
      encCompanyId: encCompanyId,
      display_price: pricingStatus
      
    }));
    // Logic to save changes and continue
    console.log(productDetails);
   
    const res = axios.post(
      "http://127.0.0.1:8000/api/product/store",
      productDetails,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    dispatch(getProducts(encCompanyId));
    navigate("/products");
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
  const formattedOptions = keywords.map((keyword) => ({
    value: keyword.encKeywordId, // assuming keyword_id is the unique identifier
    label: keyword.keyword_name,
  }));
  // Function to handle update
  const handleUpdate = () => {
    // Logic to update product details
    console.log("Product details updated!");
    setUpdateMode(false); // Exit update mode after updating
  };

  const handleUpdateProductDetails = () => {
    setShowForm(!showForm);
  };

  // Function to handle delete product details
  const handleDeleteProductDetails = (product) => {
    setProductToDelete(product);
    setShowDeleteConfirmation(true);
    console.log("product", product);
    document.querySelector(".modal-content").style.display = "block"; // Reset product details
    // Hide the add product form after submitting
    // setShowForm(false);

    // Function to map encCatId to categoryName
  };

  const handleConfirmDelete = async () => {
    const product = productToDelete;
    try {
      const userString = sessionStorage.getItem("user");
      const user = JSON.parse(userString);
      const encUserId = user.encUserId;

      const payload = {
        encUserId,
      };

      const response = await axios.delete(
        `http://127.0.0.1:8000/api/product/${product.encProdId}`,
        { data: payload }
      );
      dispatch(getProducts(encCompanyId));
      // dispatch(getCategories());
    } catch (error) {
      console.error("Error deleting keyword:", error);
    }
    setShowDeleteConfirmation(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  const [photoPreviews, setPhotoPreviews] = useState([]);

  const addMoreImages = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.multiple = true;
    input.onchange = handleFileChange;
    input.click();
  };

  const [pricingStatus, setPricingStatus] = useState('yes');

  const handlePricingStatusChange = (event) => {
    setPricingStatus(event.target.value);
    setProductDetails({ ...productDetails, display_price: event.target.value });
  };

  // const handlePriceChange = (event) => {
  //   setProductDetails({ ...productDetails, display_price: event.target.value });
  // };

  const [isProductNameAvailable, setIsProductNameAvailable] = useState(true);
  const checkProductName = async (productName) => {
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/check-product-name/${encCompanyId}`, {
        prod_name: productName
      });
      setIsProductNameAvailable(!response.data);
    } catch (error) {
      console.error("Error checking product name:", error);
    }
  };

  const handleProductNameChange = (e) => {
    const productName = e.target.value;
    setProductDetails({ ...productDetails, prodName: productName });
    checkProductName(productName);
  };
  
  const validateForm = () => {
    const newErrors = {};
    if (!productDetails.prodName) newErrors.prodName = "Product name is required";
    if (!isProductNameAvailable) newErrors.prodName = "Product name already exists";

     setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  return (
    <div
      style={{
        background: "#f2f2f2",
        padding: "0px",
        marginTop: "-25px",
        marginBottom: "60%px",
      }}
    >
      <div
        className="main-content"
        style={{ maxWidth: "1600px", maxHeight: "1400px", margin: "0 auto" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "right",
            marginBottom: "20px",
          }}
        ></div>

        <section
          className="section"
          style={{
            background: "#fff",
            borderRadius: "10px",
            boxShadow: "none",
            border: "none",
          }}
        >
          <div className="row">
            <div className="col-lg-12">
              <div
                className="card"
                style={{
                  width: "100%",
                  marginBottom: "20px",
                  background: "#fff",
                  borderRadius: "10px",
                  boxShadow: "none",
                  border: "none",
                }}
              >
                <div className="card-statistic-4">
                  <div className="align-items-center justify-content-between">
                    <div className="row">
                      <div className="col-lg-4">
                        <div className="card-content">
                          <section className="section">
                            <div className="section-body">
                              <div
                                className="image-section"
                                style={{
                                  padding: "10px",
                                  background: "#fff",
                                  borderRadius: "10px",
                                }}
                              >
                                <div className="card">
                                  <div className="card-header">
                                    <h4>Add Image</h4>
                                  </div>
                                  {photoPreviews.length > 0 && (
                                    <div className="file-preview">
                                      <Carousel
                                        autoPlay
                                        infiniteLoop
                                        showThumbs={false}
                                        showStatus={false}
                                        showIndicators={true}
                                        showArrows={true}
                                        dynamicHeight={true}
                                        className="carousel"
                                        selectedItem={currentIndex}
                                        onChange={(index) =>
                                          setCurrentIndex(index)
                                        }
                                      >
                                        {photoPreviews.map((preview, index) => (
                                          <div key={index}>
                                            <img
                                              src={preview}
                                              alt={`Photo Preview ${index + 1}`}
                                              style={{
                                                width: "300px",
                                                height: "200px",
                                                objectFit: "cover",
                                              }}
                                            />
                                          </div>
                                        ))}
                                      </Carousel>
                                    </div>
                                  )}
                                  <div className="card-body">
                                    <div className="fallback">
                                      <input
                                        type="file"
                                        id="photo"
                                        name="photo"
                                        accept="image/*"
                                        multiple
                                        onChange={(e) =>
                                             handleFileChange(e)
                                               }
                                    />
                                    </div>
                                    {photoPreviews.length < 4 && (
                                      <h6 style={{ color: "GrayText" }}>
                                        Add More Images
                                        <button
                                          onClick={addMoreImages}
                                          style={{
                                            padding: "8px 9px",
                                            backgroundColor: "#AF7AC5",
                                            color: "white",
                                            border: "none",
                                            borderRadius: "5px",
                                            cursor: "pointer",
                                            boxShadow:
                                              "0 4px 8px 0 rgba(0,0,0,0.2)",
                                            transition: "0.3s",
                                            marginTop: "20px",
                                            marginLeft: "10px",
                                          }}
                                        >
                                          <RiImageAddLine />
                                        </button>
                                      </h6>
                                    )}
                                    {photoPreviews.length >= 4 && (
                                      <div
                                        style={{
                                          color: "gray",
                                          marginTop: "10px",
                                        }}
                                      >
                                        <span
                                          style={{
                                            fontWeight: "bold",
                                            color: "#7DCEA0",
                                          }}
                                        >
                                          Warning:
                                        </span>{" "}
                                        Maximum number of images reached
                                      </div>
                                    )}
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
                              <div
                                className="product-details"
                                style={{
                                  textAlign: "left",
                                  padding: "10px",
                                  background: "#fff",
                                  borderRadius: "10px",
                                }}
                              >
                                <div
                                  className="form-group"
                                  style={{ marginBottom: "35px" }}>
                                
                                <label>Product Name :</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      style={{ height: "40px" }}
                                      name="productName"
                                      // onChange={(e) => setProductDetails({ ...productDetails, prodName: e.target.value })}
                                      value={productDetails.prodName}
                                      onChange={handleProductNameChange}
                                    />
                                    {!isProductNameAvailable && (
                                      <p style={{ color: "red" }}>Product name already exists</p>
                                    )}
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
                                    {categories.map((category) => (
                                      <option
                                        key={category.encCatId}
                                        value={category.encCatId}
                                      >
                                        {category.cat_name}
                                      </option>
                                    ))}
                                  </select>
                                </div>

                                <div
                                  className="form-group"
                                  style={{
                                    display: "flex",
                                    gap: "10px",
                                    marginTop: "10px",
                                  }}
                                >
                                   {/* {pricingStatus === 'yes' && ( */}
                                  <div style={{ flex: 1 }}>
                                    <label
                                      style={{
                                        fontSize: "12px",
                                        fontWeight: "bold",
                                        color: "#2E4053",
                                        fontFamily: "sans-serif",
                                      }}
                                    >
                                      Price:
                                    </label>
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      <input
                                        type="number"
                                        className="form-control"
                                        style={{
                                          height: "30px",
                                          width: "calc(60%)",
                                          fontSize: "12px",
                                          padding: "2px",
                                        }} // Reduced height and width
                                        name="price"
                                        onChange={(e) =>
                                          setProductDetails({
                                            ...productDetails,
                                            prodPrice: e.target.value,
                                          })
                                        }
                                      />
                                      
                                      <span
                                        style={{
                                          marginLeft: "5px",
                                          marginRight: "5px",
                                        }}
                                      >
                                        per/-
                                      </span>
                                      <select
                                      className="form-control"
                                      style={{ height: "40px" }}
                                      name="unit"
                                      value={productDetails.prodUOM}
                                      onChange={handleUomChange}
                                      
                                    >
                                       <option value="">Select Unit</option>
                                      {uoms.map(uom => (
                                        <option key={uom.encUomId} value={uom.encUomId}>{uom.unit_name}</option>
                                    ))}
                                    </select>
                                    </div>
                                  </div>
                                    {/* )} */}
                                </div>
                            
                                <div
                                  className="form-group"
                                  style={{
                                    display: "flex",
                                    gap: "10px",
                                    marginTop: "10px",
                                  }}
                                >
                                  <div style={{ flex: 1 }}>
                                    <label
                                      style={{
                                        fontSize: "12px",
                                        fontWeight: "bold",
                                        color: "#2E4053",
                                        fontFamily: "",
                                      }}
                                    >
                                      Minimum Order Quantity:
                                    </label>
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      <input
                                        type="number"
                                        className="form-control"
                                        style={{
                                          height: "30px",
                                          width: "calc(60%)",
                                          fontSize: "12px",
                                          padding: "2px",
                                        }} // Reduced height and width
                                        name="units"
                                        onChange={(e) => setProductDetails({ ...productDetails, minOrderQty: e.target.value })}
                                        
                                      />
                                      <span
                                        style={{
                                          marginLeft: "5px",
                                          marginRight: "5px",
                                        }}
                                      >
                                        Unit/-
                                      </span>
                                      {/* <select
                                        className="form-control"
                                        style={{
                                          height: "30px",
                                          width: "calc(60%)",
                                          fontSize: "12px",
                                          padding: "2px",
                                        }} // Reduced height and width
                                      > */}
                                          <select
                                      className="form-control"
                                      style={{ height: "40px" }}
                                      name="unit"
                                      value={productDetails.prodUOM}
                                      onChange={handleUomChange}
                                      
                                    >
                                       <option value="">Select Unit</option>
                                      {uoms.map(uom => (
                                        <option key={uom.encUomId} value={uom.encUomId}>{uom.unit_name}</option>
                                    ))}
                                    </select>
                                      {/* </select> */}
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
                              <div
                                className="product-details"
                                style={{
                                  textAlign: "left",
                                  padding: "10px",
                                  background: "#fff",
                                  borderRadius: "10px",
                                }}
                              >
                                <div className="form-group">
                                  <label>Product Description:</label>
                                  <textarea
                                    className="form-control"
                                    rows="3"
                                    style={{ height: "auto", maxHeight: "50px", width: "90%", padding: "2px", fontSize: "12px", overflowY: "auto" }} // Reduced height and width
                                    name="description"
                                    onChange={(e) =>
                                      setProductDetails({
                                        ...productDetails,
                                        prodDescription: e.target.value,
                                      })
                                    }
                                  ></textarea>
                                </div>
                                <div className="form-group" >
                                  <label >Subcategory: </label>
                                  <select
                                    className="form-control"
                                    style={{ height: "40px"}}
                                    name="subcategory"
                                    onChange={(e) =>
                                      setProductDetails({
                                        ...productDetails,
                                        prodSubCat: e.target.value,
                                      })
                                    }
                                  >
                                    <option value="">Select Subcategory</option>
                                    {filteredSubCategories.map(
                                      (subCategory) => (
                                        <option
                                          key={subCategory.encSubCatId}
                                          value={subCategory.encSubCatId}
                                        >
                                          {subCategory.sub_cat_name}
                                        </option>
                                      )
                                    )}
                                  </select>
                                </div>

                                <div className="form-group" style={{ marginBottom: "16px" }}>
                                  <label>Keywords:</label>
                                  <div>
                                    <Select
                                      options={formattedOptions}
                                      isMulti
                                      onChange={handleChange}
                                      value={selectedOptions}
                                      menuPlacement="auto" // Ensure the dropdown opens based on available space
                                      menuShouldScrollIntoView={true}
                                      menuPosition="fixed" // Fix the position of the dropdown to avoid it being cut off by overflow
                                      menuPortalTarget={document.body} // Render the dropdown in the body to avoid overflow issues
                                      styles={{  height: "40px",
                                        
                                        // Custom styles for the dropdown menu
                                        menu: (provided) => ({
                                          ...provided,
                                          maxHeight: "200px", // Set the fixed height of the dropdown menu container
                                          overflowY: "auto", // Enable vertical scrolling
                                          "&::-webkit-scrollbar": {
                                            display: "none", // Hide scrollbar for Chrome, Safari, and Opera
                                          },
                                          scrollbarWidth: "none", // Hide scrollbar for Firefox
                                        }),
                                        menuList: (provided) => ({
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
                                      {selectedOptions.map((option) => (
                                        <div key={option.value}>
                                          {option.keyword_name}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>

                                <div className="form-group">
                                <label>Do you want to display Price :</label>
                                <div style={{ position: "relative" }}>
                                  <label style={{ marginRight: '10px', marginLeft: '10px' }}>
                                    <input
                                      type="radio"
                                      value="yes"
                                      checked={pricingStatus === 'yes'}
                                      onChange={handlePricingStatusChange}
                                    />
                                    Yes
                                  </label>
                                  <label>
                                    <input
                                      type="radio"
                                      value="no"
                                      checked={pricingStatus === 'no'}
                                      onChange={handlePricingStatusChange}
                                    />
                                    No
                                  </label>
                                </div>
                              </div>
                                      
                                {/* Submit and Continue Button */}

                                <div style={{ textAlign: 'right' }}>
                                <button
                                  type="button"
                                  style={{
                                    backgroundColor: "#4CAF50",
                                    border: "none",
                                    color: "white",
                                    padding: "8px 15px",
                                    fontSize: "1em",
                                    cursor: "pointer",
                                    borderRadius: "5px",
                                  }}
                                  onClick={handleSubmit}
                                >
                                  Save and Continue
                                </button>
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

        {/* Display product details card */}

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
            <div
              className="modal-backdrop"
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backdropFilter: "blur(2px)",
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                zIndex: 0,
              }}
            ></div>

            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="deleteConfirmationModalLabel">
                  Confirm Deletion
                </h5>
                <button
                  type="button"
                  className="close"
                  onClick={handleCancelDelete}
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">Are you sure you want to delete</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleConfirmDelete}
                  style={{
                    marginRight: "8px",
                    color: "black",
                    backgroundColor: "transparent",
                    borderColor: "transparent",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-content" style={{ display: "none" }}>
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="card">
              <div className="card-body text-center">
                <div className="mb-2">Confirmation</div>
                <button className="btn btn-primary" id="swal-6">
                  Launch
                </button>
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

export default AddProduct;