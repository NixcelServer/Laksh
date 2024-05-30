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

    console.log('Response:', response);

    if (response.status === 200) {
      console.log('Form submitted successfully');
      // Assuming success message is returned from the server
      console.log('Success message:', response.data.message);
    } else {
      console.error('Form submission failed');
    }
  } catch (error) {
    console.error('Error submitting form:', error);
  }
};
  return (
    <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={7}  height = '250px' overflow="hidden"bg="white" marginBottom={'40px'}>
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

    






<Modal isOpen={isOpen} onClose={onClose} isCentered>
  <ModalOverlay />
  <ModalContent style={{ maxWidth: "500px", maxHeight: "550px", borderRadius: "40px", position: "relative", overflow: "hidden" }}>
    <ModalHeader textAlign="center" fontWeight="bold" fontSize="xl" color="black#9f98e9" borderRadius="20px 20px 0 0" backgroundColor="#b4e998" borderBottomWidth="1px" pb="2">
      Submit Requirement
    </ModalHeader>
    <ModalCloseButton _focus={{ border: "none" }} _hover={{ bg: "none" }} />
    <ModalBody>
      {/* Content inside the modal body */}
       {/* Body content */}
       <div className="row">
    <div className="col-lg-12">         
        <section className="section">
            <div className="product-details" style={{ padding: "10px", background: "#fff", borderRadius: "10px" }}>
                <div className="form-group" style={{ display: "flex", gap: "10px" }}>
                    <div style={{ flex: 1 }}>
                        <label>Product Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            style={{ height: "30px", width: "90%" ,fontSize:"12px",padding:"2px" }} // Reduced height and width
                            name="productName"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                        />
                    </div>
                    <div style={{ flex: 1 }}>
    <label>Requirement Details:</label>
    <textarea
        className="form-control"
        rows="2"
        style={{ height: "auto", maxHeight: "50px", width: "90%", padding: "2px", fontSize: "12px", overflowY: "auto" }} // Reduced height and width
    ></textarea>
</div>

                </div>

                <div className="form-group" style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                    <div style={{ flex: 1 }}>
                        <label>Category:</label>
                        <select
                            className="form-control"
                            style={{ height: "30px", width: "90%",fontSize:"12px",padding:"2px" }} // Reduced height and width
                            name="category"
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                        >
                            <option value="">Select Category</option>
                            {categories.map(category => (
                                <option key={category.encCatId} value={category.encCatId}>{category.cat_name}</option>
                            ))}
                        </select>
                    </div>

                    <div style={{ flex: 1 }}>
                        <label>Subcategory:</label>
                        <select
                            className="form-control"
                            style={{ height: "30px", width: "90%",fontSize:"12px",padding:"2px" }} // Reduced height and width
                            name="subcategory"
                            value={selectedSubcategory}
                            onChange={(e) => setSelectedSubcategory(e.target.value)}
                        >
                            <option value="">Select Subcategory</option>
                            {filteredSubCategories.map(subCategory => (
                                <option key={subCategory.encSubCatId} value={subCategory.encSubCatId}>{subCategory.sub_cat_name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="form-group" style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                    <div style={{ flex: 1 }}>
                        <label>Product Quantity:</label>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <input
                                type="number"
                                className="form-control"
                                style={{ height: "30px", width: "calc(25%)",fontSize:"12px",padding:"2px" }} // Reduced height and width
                                name="Prod_qty"
                                value={productQuantity}
                                onChange={(e) => setProductQuantity(e.target.value)}
                            />
                            <span style={{ marginLeft: "5px" }}>unit/-</span> 
                            <select
                                className="form-control"
                                style={{ height: "30px", width: "45%",fontSize:"12px",padding:"2px" }} // Reduced height and width
                                name="unit"
                                value={selectedUnit}
                                onChange={(e) => setSelectedUnit(e.target.value)}
                            >
                                <option value="">Select Unit</option>
                                {uoms.map(unit => (
                                    <option key={unit.encUomId} value={unit.encUomId}>{unit.unit_name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div style={{ flex: 1 }}>
                        <label>Specifications if any:</label>
                        <textarea
                            className="form-control"
                            rows="2"
                            style={{ height: "auto", maxHeight: "50px", width: "90%", padding: "2px", fontSize: "12px", overflowY: "auto" }} // Reduced height and width
                            ></textarea>
                    </div>
                </div>

                <div className="form-group" style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                    <div style={{ flex: 1 }}>
                        <label>Packing Details:</label>
                        
                        <textarea
        className="form-control"
        rows="2"
        style={{ height: "auto", maxHeight: "50px", width: "45%", padding: "2px", fontSize: "12px", overflowY: "auto" }} // Reduced height and width
    ></textarea>
                    </div>
                    
                </div>
                
                <button
                    type="button"
                    style={{
                        backgroundColor: "#4CAF50",
                        border: "none",
                        color: "white",
                        padding: "3px 10px",
                        fontSize: "1em",
                        cursor: "pointer",
                        borderRadius: "5px",
                        position: "absolute",
                        bottom: "0px",
                        right: "10px", // Adjusted to the right bottom corner
                    }}
                    onClick={() => {
                        handleSubmit();
                        onClose();
                    }}
                >
                    Submit
                </button>
            </div>
        </section>      
    </div>
</div>

    </ModalBody>

    
   
  </ModalContent>
</Modal>


    </Grid>
  );
};

export default SubmitRequirement;