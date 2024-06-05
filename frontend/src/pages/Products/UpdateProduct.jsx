//import React, { useEffect, useState } from "react";
import feather from "feather-icons";
import axios from 'axios';
import Select from 'react-select';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, getSubCategories,getKeywords,getUOM  } from '../../redux/Admin/admin.action';

import { getProducts } from "../../redux/Product/product.action";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { RiImageAddLine } from "react-icons/ri";
import { Carousel } from "react-responsive-carousel";
// import { getKeywords } from '../../redux/Admin/Keywords/keyword.action';
// import { getUOM } from '../../redux/Admin/UOM/uom.action';

const UpdateProduct = () => {
  useEffect(() => {
    feather.replace();
    dispatch(getCategories());
    dispatch(getSubCategories());
    dispatch(getKeywords());
    dispatch(getUOM());

    

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
  const location = useLocation();
  const { product } = location.state || {};

  const keywords = useSelector(state => state.masterData.keywords);
  const categories = useSelector(state => state.masterData.categories);
  const subCategories = useSelector(state => state.masterData.subCategories);
  const uoms = useSelector(state => state.masterData.uom);


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
    display_price: "yes",
    //pricePer: '',
    minOrderQty: '',
    prodUOM: '',
    files: '',
    prodId:'',
});

const [currentIndex, setCurrentIndex] = useState(0);
useEffect(() => {

    const userString = sessionStorage.getItem('user');
    const user = JSON.parse(userString);
    const encCompanyId = user.encCompanyId;

    if (product && keywords) {
      // Set selectedOptions with product.encKeywords
      const selectedOptionsWithNames = product.encKeywords.map(keywordId => {
        const keyword = keywords.find(kw => kw.encKeywordId === keywordId);
        return {
          value: keywordId,
          label: keyword ? keyword.keyword_name : '' // Check if keyword exists and get its name
        };
      });
      setSelectedOptions(selectedOptionsWithNames || []);
  
      // Update productDetails
      setProductDetails(prevState => ({
        ...prevState,
        encCompanyId: encCompanyId || '',
        prodName: product.prod_name || '',
        prodDescription: product.prod_description || '',
        prodCat: product.encCatId || '',
        prodSubCat: product.encSubCatId || '',
        keywords: selectedOptionsWithNames || [], // Update with selectedOptionsWithNames
        prodPrice: product.prod_price || '',
        // pricePer: '', // Assuming this field does not exist in the product object
        display_price: "yes"||'',
        minOrderQty: product.prod_min_order_qty || '',
        prodUOM: product.encUomId || '',
        files: product.image_paths || prevState.files || [],  // Assuming file is a new upload, not present in the product object
        prodId:product.encProdId
      }));
      console.log(product);
      setPhotoPreviews(product.image_paths || [])

      const filteredSubcategories = subCategories.filter(subCategory => subCategory.encCatId === product.encCatId);
    console.log("filtered sub cat", filteredSubcategories);
    setFilteredSubCategories(filteredSubcategories);

    const reader = new FileReader();

    // if (productDetails.files) {
    //     setPhotoPreview(`http://127.0.0.1:8000/storage/${productDetails.file}`);
    //   } else {
    //     setPhotoPreview(null);
    //   }

  
    }
  }, [product, keywords]);
  

  console.log("product Deets",productDetails);
  console.log("selectedOptions",selectedKeywords);

  const [selectedCategory, setSelectedCategory] = useState('');
 
   // useEffect will run whenever dispatch changes

  

 
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
    console.log("Selected File:", productDetails.files);

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

  // const handleFileChange = (e) => {
  //   const files = e.target.files;
  //   setProductDetails({ ...productDetails, files });
  //     const reader = new FileReader();
  //   const maxFiles = 4; // Maximum number of files allowed

  //   //Check if the number of selected files exceeds the maximum
  //   if (files.length > maxFiles) {
  //     alert(`You can only upload a maximum of ${maxFiles} images.`);
  //     e.target.value = null; // Reset the input field to clear selected files
  //     return;
  //   }

  //   const previews = [];

  //   for (let i = 0; i < files.length; i++) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       previews.push(e.target.result);
  //       if (previews.length === files.length) {
  //         const newPreviews = [...photoPreviews, ...previews];
  //         setPhotoPreviews(newPreviews.slice(-maxFiles)); // Keep only the latest `maxFiles` images
  //         setCurrentIndex(newPreviews.length - 1); // Set the current index to the last added image
  //       }
  //     };
  //     reader.readAsDataURL(files[i]);
  //   }
  // };
//   const handleFileChange = (e) => {
//     setProductDetails({ ...productDetails, file: e.target.files[0] })
// };

const handleFileChange = (e) => {
  const newFiles = Array.from(e.target.files);
  const maxFiles = 4; // Maximum number of files allowed

  // Retrieve existing files from the state
  const currentFiles = productDetails.files || [];

  // Combine old and new files
  let combinedFiles = [...currentFiles, ...newFiles];

  // Check if the total number of files exceeds the maximum
  if (combinedFiles.length > maxFiles) {
    alert(`You can only upload a maximum of ${maxFiles} images.`);
    combinedFiles = combinedFiles.slice(0, maxFiles); // Keep only the first `maxFiles` files
  }

  // Update state with combined files
  setProductDetails({ ...productDetails, files: combinedFiles });

  const previews = [];

  // Generate previews for each valid file
  combinedFiles.forEach((file) => {
    if (file instanceof File) { // Ensure the file is a valid File object
      const reader = new FileReader();
      reader.onload = (event) => {
        previews.push(event.target.result);
        if (previews.length === combinedFiles.length) {
          setPhotoPreviews(previews.slice(-maxFiles)); // Keep only the latest `maxFiles` images
          setCurrentIndex(previews.length - 1); // Set the current index to the last added image
        }
      };
      reader.readAsDataURL(file);
    }
  });
};


const [pricingStatus, setPricingStatus] = useState('yes');

  const handlePricingStatusChange = (event) => {
    setPricingStatus(event.target.value);
    setProductDetails({ ...productDetails, display_price: event.target.value });
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
    
    const selectedKeys = selectedOptions.map(option => option.value);
      // Update productDetails state with the obtained encCompanyId
    setProductDetails(prevProductDetails => ({
    ...prevProductDetails,
    encCompanyId: encCompanyId,
    keywords:selectedKeys,
    display_price: pricingStatus
    }));
      // Logic to save changes and continue
      console.log("submit",productDetails);
      
      //debugger;
      axios.post("http://127.0.0.1:8000/api/product/update-product", {
        ...productDetails,
        keywords: selectedKeys // Ensure keywords are updated
    }, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    .then(response => {
        navigate('/products')
        console.log(response.data);
    })
    .catch(error => {
        console.error(error);
    });
    //   dispatch(getProducts(encCompanyId));
    //   //navigate('/');
    //   setShowForm(false); // Hide the form after saving
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

  const [photoPreviews, setPhotoPreviews] = useState([]);

  const addMoreImages = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.multiple = true;
    input.onchange = handleFileChange;
    input.click();
  };

  

  return (
    <div style={{ background: "#f2f2f2", padding: "0px", marginTop: "-20px" }}>
      <div className="main-content" style={{ maxWidth: "1600px", maxHeight:"1400px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "right", marginBottom: "20px" }}>
          
        </div>

        
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
        onChange={(index) => setCurrentIndex(index)}
      >
        {photoPreviews.map((preview, index) => (
          <div key={index}>
            <img
              src={preview.startsWith('data:') ? preview : `http://127.0.0.1:8000/storage/${preview}`}
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
        onChange={handleFileChange}
      />
    </div>
    {photoPreviews.length < 4 && (
      <h6 style={{ color: "GrayText" }}>
        Add More Images
        <button
          onClick={() => document.getElementById('photo').click()}
          style={{
            padding: "8px 9px",
            backgroundColor: "#AF7AC5",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
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
      <div style={{ color: "gray", marginTop: "10px" }}>
        <span style={{ fontWeight: "bold", color: "#7DCEA0" }}>Warning:</span> Maximum number of images reached
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
                                <div className="product-details" style={{ textAlign:"left", padding: "10px", background: "#fff", borderRadius: "10px" }}>
                                  <div className="form-group" style={{marginBottom:'50px'}}>
                                    <label>Product Name:</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      style={{ height: "40px" }}
                                      name="productName"
                                      value={productDetails.prodName}
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
                                

                               
                                  <div className="form-group"  
                                  style={{
                                    display: "flex",
                                    gap: "10px",
                                    marginTop: "10px",
                                  }}>
                                     <div style={{ flex: 1 }}>
                                    <label  style={{
                                        fontSize: "12px",
                                        fontWeight: "bold",
                                        color: "#2E4053",
                                        fontFamily: "sans-serif",
                                      }}>Price :</label>
                                       <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                    <input
                                      type="number"
                                      className="form-control"
                                      style={{ height: "40px" }}
                                      name="price"
                                      value ={productDetails.prodPrice}
                                      onChange={(e) => setProductDetails({ ...productDetails, prodPrice: e.target.value })}

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
                                <div className="product-details" style={{  textAlign:"left",padding: "10px", background: "#fff", borderRadius: "10px" }}>
                                  <div className="form-group">
                                    <label>Product Description:</label>
                                    <textarea
                                      className="form-control"
                                      rows="3"
                                      style={{ height: "20px !important" }}
                                      name="description"
                                      value = {productDetails.prodDescription}
                                      onChange={(e) => setProductDetails({ ...productDetails, prodDescription: e.target.value })}

                                    ></textarea>
                                  </div>
                                  <div className="form-group">
                                    <label>Subcategory:</label>
                                    <select
                                      className="form-control"
                                      style={{ height: "40px" }}
                                      name="subcategory"
                                      value={productDetails.prodSubCat}
                                      onChange={(e) => setProductDetails({ ...productDetails, prodSubCat: e.target.value })}

                                    >
                                      <option value="">Select Subcategory</option>
                                      {filteredSubCategories.map(subCategory => (
                                        <option key={subCategory.encSubCatId} value={subCategory.encSubCatId}>{subCategory.sub_cat_name}</option>
                                    ))}
                                    </select>
                                  </div>
                                  

                                    {/* <div className="form-group">
                                    <label>Price per:</label>
                                    <select
                                      className="form-control"
                                      style={{ height: "40px" }}
                                      name="unit"
                                      value = {productDetails.prodUOM}
                                      onChange={handleUomChange}
                                      
                                    >
                                       <option value="">Select Unit of Measurements</option>
                                      {uoms.map(uom => (
                                        <option key={uom.encUomId} value={uom.encUomId}>{uom.unit_name}</option>
                                    ))}
                                    </select>
                                  </div> */}
                                  
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

export default UpdateProduct;