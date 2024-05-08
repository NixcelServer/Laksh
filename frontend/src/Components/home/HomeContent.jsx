import React, { useState } from "react";
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

const HomeContent = () => {
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
  const onClose = () => setIsOpen(false);

  // State for keywords dropdown
  const [showKeywords, setShowKeywords] = useState(false);
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Function to handle dropdown click
  const handleDropdownClick = () => {
    setShowKeywords(!showKeywords);
  };

  // Function to handle checkbox change
  const handleCheckboxChange = (event) => {
    const { value } = event.target;
    if (selectedKeywords.includes(value)) {
      setSelectedKeywords(
        selectedKeywords.filter((keyword) => keyword !== value)
      );
    } else {
      setSelectedKeywords([...selectedKeywords, value]);
    }
  };

  // Function to handle keyword option click
  const handleKeywordOptionClick = (keyword) => {
    if (selectedKeywords.includes(keyword)) {
      setSelectedKeywords(selectedKeywords.filter((k) => k !== keyword));
    } else {
      setSelectedKeywords([...selectedKeywords, keyword]);
    }
  };

  const handleSubmit = () => {
    //add
  };
  return (
    <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={7}>
      <Box className="main-content" p={{ base: "10px", md: "20px" }} mb="0px">
        <div className="card" style={{ padding: "10px", borderRadius: "12px" }}>
          <div className="card-body" style={{ marginBottom: "0px" }}>
            <div className="form-group">
              <label
                style={{
                  fontSize: "1rem",
                  fontStyle: "oblique",
                  marginBottom: "5px",
                }}
              >
                Product
              </label>
              <input
                type="text"
                className="form-control text-center"
                placeholder="Enter Product Name"
                style={{
                  textAlign: "center",
                  height: "30px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
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
              style={{ padding: "8px", fontSize: "0.9rem" }}
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
          style={{ padding: "0px", borderRadius: "12px", height: "220px" }}
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
                        <div className="col-lg-6">
                          <div className="card-content">
                            <section className="section">
                              <div className="section-body">
                                <div className="product-details" style={{ padding: "10px", background: "#fff", borderRadius: "10px" }}>
                                  <div className="form-group">
                                    <label>Product Description:</label>
                                    <textarea
                                      className="form-control"
                                      rows="1"
                                      style={{ height: "5px !important" }}
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
        onClick={handleSubmit}
      >
        Submit
      </button>
    </ModalFooter>
  </ModalContent>
</Modal>

    </Grid>
  );
};

export default HomeContent;
