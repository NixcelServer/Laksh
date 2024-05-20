import React, { useEffect, useState } from "react";
import axios from "axios"; // Import Axios library
import {
  Box,
  Grid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Center,
} from "@chakra-ui/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getCategories, getSubCategories, getUOM } from "../../redux/Admin/admin.action";
import { useDispatch,useSelector } from "react-redux";
import { getOrders } from "../../redux/Order/order.action";


const SubmitRequirement = () => {
  const dispatch = useDispatch(); // Initialize useDispatch
  const categories = useSelector(state => state.masterData.categories);
  //const keywords = useSelector(state => state.masterData.keywords);
  const subcategories = useSelector(state => state.masterData.subCategories);
  const uoms = useSelector(state => state.masterData.uom);
  const [requirements, setRequirements] = useState('');
  const [productName, setProductName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [pricePerPiece, setPricePerPiece] = useState('');
  const [enccomapnyId, setEnccomapnyId] = useState('');
  const[productQuantity,setProductQuantity]=useState('');
  //const [isOpen, setIsOpen] = useState(false);
  
  
    useEffect(()=>{
      feather.replace();
      dispatch(getCategories());
      dispatch(getSubCategories()); 
      dispatch(getUOM());

    },
  []);
  
  //const orders = useSelector(state => state.orders);

  // Carousel settings
  const carouselSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Enable autosliding
    autoplaySpeed: 2000, // Set autoslide speed in milliseconds
    arrows: false, // Hide navigation arrows
  };

 
  // State for modal
  const [isOpen, setIsOpen] = useState(false);

  // Function to handle modal open
  const onOpen = () => setIsOpen(true);

  // Function to handle modal close
  const onClose = () => {
    setIsOpen(false);
    // Reset form data
    setRequirements('');
    setProductName('');
    setSelectedCategory('');
    setSelectedSubcategory('');
    setSelectedUnit('');
    setProductPrice('');
    setProductDescription('');
    setProductQuantity('');
    setEnccomapnyId('');
  }


  
  const [showForm, setShowForm] = useState(false);

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    console.log("selected category",selectedCategory)
    setSelectedCategory(selectedCategory);
    // Filter subcategories based on the selected category
    const filteredSubcategories = subcategories.filter(subCategory => subCategory.encCatId === selectedCategory);
    console.log("filtered sub cat", filteredSubcategories);
    setFilteredSubCategories(filteredSubcategories);
};
  
  const handleRequirementsChange = (event) => {
    const { value } = event.target; 
    setRequirements(value);
    setProductName(value);
  };

  const handleSubmit = async () => {
  try {
    const userString = sessionStorage.getItem('user');
    const user = JSON.parse(userString);
    const encCompanyId = user.encCompanyId;

    const formData = {
      productName: productName,
      encCatId: selectedCategory,
      encSubCatId: selectedSubcategory,
      encUomId: selectedUnit,
      price: productPrice,
      productDes: productDescription,
      encCompanyId: encCompanyId, // Include encCompanyId in formData
      productQty: productQuantity,
    };
    //dispatch(submitRequirement(formData));
  console.log("form data",formData);
      
    const response = await axios.post('http://127.0.0.1:8000/api/submit-requirement', formData);

    console.log('Response:', response);

    if (response.success) {
      console.log('Form submitted successfully');
    } else {
      console.error('Form submission failed');
    }
  } catch (error) {
    console.error('Error submitting form:', error);
  }
};
  return (
    <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={7}  height = '250px' overflow="hidden">
    <Box className="main-content" p={{ base: "10px", md: "20px" }} height = 'auto' mb="0px"  >
      <div className="card" style={{ padding: "10px", borderRadius: "12px" ,height: "213px", }}>
          <div className="card-body" style={{ marginBottom: "0px" }}>
              <div className="form-group">
                <label
                  style={{
                    fontSize: "1rem",
                    fontStyle: "oblique",
                    marginBottom: "5px",
                  }}
                >
                  Requirements
                </label>
                <input
                  type="text"
                  className="form-control text-center"
                  placeholder="Enter Your Requirements"
                  style={{
                    textAlign: "center",
                    height: "30px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                  value={requirements}
            onChange={handleRequirementsChange}
                />
              </div>
          </div>
          <label style={{ fontSize: "0.9rem", marginBottom: "5px" }}>
            We are here to help!! Discover your needs.
          </label>
          <div className="d-grid gap-2">
            <button
              className="btn btn-primary"
              type="submit"
              style={{ padding: "8px", fontSize: "0.9rem" , backgroundColor:"#9B59B6"}}
              onClick={onOpen}
            >
              Submit Requirement
            </button>
          </div>
        </div>
      </Box>

      <Box
        className="main-content"
        p={{ base: "10px", md: "20px" }}
        mb="0px"
        style={{ overflow: "hidden" }}
      >
        <div
          className="card"
          style={{ padding: "0px", borderRadius: "12px", height: "212px" }}
        >
          <div className="card-body" style={{ marginBottom: "0px" }}>
            <Slider {...carouselSettings}>
              <div>
                <img
                  src="/images/image1.png"
                  alt="carousel-image-1"
                  style={{ margin: "0 auto" }}
                />
              </div>
              <div>
                <img
                  src="/images/image2.png"
                  alt="carousel-image-2"
                  style={{ margin: "0 auto" }}
                />
              </div>
              <div>
                <img
                  src="/images/image1.png"
                  alt="carousel-image-3"
                  style={{ margin: "0 auto" }}
                />
              </div>
              <div>
                <img
                  src="/images/image2.png"
                  alt="carousel-image-2"
                  style={{ margin: "0 auto" }}
                />
              </div>
            </Slider>
          </div>
        </div>
      </Box>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
  <ModalOverlay />
  <ModalContent style={{ maxWidth: "500px", maxHeight: "500px", borderRadius: "40px"  }}>
  <ModalHeader textAlign="center" fontWeight="bold" fontSize="xl" color="black#9f98e9"   borderRadius="20px 20px 0 0"  backgroundColor="#b4e998" borderBottomWidth="1px" pb="2">
  Submit Requirement
</ModalHeader>    <ModalCloseButton  _focus={{ border: "none" }} _hover={{ bg: "none" }}/>
    <ModalBody>
     
    <div className="row">
                        
                        <div className="col-lg-6">
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
                                      value={productName}
                                      onChange={(e) => setProductName(e.target.value)}
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label>Category:</label>
                                    <select
                                      className="form-control"
                                      style={{ height: "40px" }}
                                      name="category"
                                      value={selectedCategory} // Set the value of the select input to selectedCategory
                                      onChange={handleCategoryChange}
                                    >
                                      <option value="">Select Category</option>
                                      {categories.map(category => (
                                      <option key={category.encCatId} value={category.encCatId}>{category.cat_name}</option>
                                    ))}
                                    </select>
                                  </div>
                                  <div className="form-group">
                                    <label>Unit of Measurement:</label>
                                    <select
                                      className="form-control"
                                      style={{ height: "40px" }}
                                      name="unit"
                                      value={selectedUnit} // Set the value of the select input to selectedUnit
                                      onChange={(e) => setSelectedUnit(e.target.value)} // Update selectedUnit when an option is selected
                                    >
                                      <option value="">Select Unit</option>
                                      {uoms.map(unit => (
                                      <option key={unit.encUomId} value={unit.encUomId}>{unit.unit_name}</option>
                                    ))}
                                    </select>
                                  </div>
                                  {/* <div className="form-group">
                                    <label>Price :</label>
                                    <input
                                      type="number"
                                      className="form-control"
                                      style={{ height: "40px" }}
                                      name="price"
                                      value={productPrice}
                                       onChange={(e) => setProductPrice(e.target.value)}
                                    />
                                  </div> */}
                                </div>
                              </div>
                            </section>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="card-content">
                            <section className="section">
                              <div className="section-body">
                                <div className="product-details" style={{ padding: "10px", background: "#fff", borderRadius: "10px" }}>
                                <div className="form-group">
                                <label>Product Description:</label>
                                <textarea
                                  className="form-control"
                                  rows="3"
                                  style={{ height: "70px" }}
                                  name="productDescription"
                                  value={productDescription}
                                  onChange={(e) => setProductDescription(e.target.value)}
                                ></textarea>
                              </div>
                                  <div className="form-group">
                                    <label>Subcategory:</label>
                                    <select
                                      className="form-control"
                                      style={{ height: "40px" }}
                                      name="subcategory"
                                      value={selectedSubcategory} // Set the value of the select input to selectedSubcategory
                                      onChange={(e) => setSelectedSubcategory(e.target.value)}
                                    >
                                      <option value="">Select Subcategory</option>
                                      {filteredSubCategories.map(subCategory => (
                                      <option key={subCategory.encSubCatId} value={subCategory.encSubCatId}>{subCategory.sub_cat_name}</option>
                                    ))}
                                    </select>
                                  </div>
                                  <div className="form-group">
                                    <label>Product Quantity :</label>
                                    <input
                                      type="number"
                                      className="form-control"
                                      style={{ height: "40px" }}
                                      name="Prod_qty"
                                      value={productQuantity}
                                      onChange={(e) => setProductQuantity(e.target.value)}
                                    />
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
      
    </ModalBody>
    <ModalFooter>
      <button
        type="button"
        style={{
          bottom: "20px",
          right: "80px",
          backgroundColor: "#4CAF50",
          border: "none",
          color: "white",
          padding: "3px 5px",
          fontSize: "1em",
          cursor: "pointer",
          borderRadius: "5px",
          marginRight: "4px",
        }}
        onClick={() => {
          handleSubmit();
          onClose()}}
      >
        Submit
      </button>
    </ModalFooter>
  </ModalContent>
</Modal>

    </Grid>
  );
};

export default SubmitRequirement;