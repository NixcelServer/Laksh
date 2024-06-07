import React, { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from "@chakra-ui/react";

const ProductDetailsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [productName, setProductName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [packingDetails, setPackingDetails] = useState('');
  const [otherSpecifications, setOtherSpecifications] = useState('');
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [uoms, setUoms] = useState([]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const onOpen = () => setShowModal(true);
  const onClose = () => {
    setShowModal(false);
    setProductName('');
    setSelectedCategory('');
    setSelectedSubcategory('');
    setSelectedUnit('');
    setProductPrice('');
    setProductDescription('');
    setProductQuantity('');
    setPackingDetails('');
    setOtherSpecifications('');
  }

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    // Update filteredSubCategories based on selected category
  }

  const checkSessionAndSubmit = () => {
    // Add your form submission logic here
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Full viewport height to center vertically
        padding: '20px', // Padding to ensure space around the card
        position: 'relative', // Make the parent container relative for absolute positioning of the button
      }}
    >
      <div
        className="card-container"
        style={{
          position: 'relative',
          padding: '20px',
          maxWidth: '1000px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.15)',
          margin: '20px', // Even margins on all sides
          backgroundColor: 'white', // Ensure the card has a background color
        }}
      >
        <div className="row">
          <div className="col-lg-6" style={{ padding: '20px' }}>
            <div style={{ marginTop: '30px', marginLeft: '20px', maxWidth: '400px' }}>
              <img
                src="https://via.placeholder.com/400x200"
                alt="Product Preview"
                style={{ width: '100%', height: '200px' }}
              />
            </div>
          </div>
          <div className="col-lg-6" style={{ padding: '10px' }}>
            <div style={{ textAlign: 'left', color: 'black', marginBottom: '10px' }}>
              <h3
                style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: 'black',
                  borderBottom: '2px solid #333',
                  paddingBottom: '5px',
                  marginBottom: '10px',
                }}
              >
                Product Name
              </h3>
              <p style={{ fontSize: '14px', lineHeight: '1.4', marginBottom: '5px' }}>
                <span style={{ fontWeight: 'bold' }}>Description:</span> Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
              <p style={{ fontSize: '14px', lineHeight: '1.4', marginBottom: '5px' }}>
                <span style={{ fontWeight: 'bold' }}>Category:</span> Sample Category
              </p>
              <p style={{ fontSize: '14px', lineHeight: '1.4', marginBottom: '5px' }}>
                <span style={{ fontWeight: 'bold' }}>SubCategory:</span> Sample SubCategory
              </p>
              <p style={{ fontSize: '14px', lineHeight: '1.4', marginBottom: '5px' }}>
                <span style={{ fontWeight: 'bold' }}>Keywords:</span> Keyword1, Keyword2, Keyword3
              </p>
              <p style={{ fontSize: '14px', lineHeight: '1.4', marginBottom: '5px' }}>
                <span style={{ fontWeight: 'bold' }}>Price:</span> $50
              </p>
              <p style={{ fontSize: '14px', lineHeight: '1.4', marginBottom: '5px' }}>
                <span style={{ fontWeight: 'bold' }}>Unit Of Measurement:</span> Sample UOM
              </p>
            </div>
          </div>
          <button
            className="btn btn-icon icon-left btn-info"
            style={{
              position: 'absolute',
              bottom: '10px',
              right: '10px',
              backgroundColor: '#A569BD',
              display: 'flex',
              alignItems: 'center',
              padding: '2px 3px',
              fontSize: '12px', // Reduce text size
            }}    
            onClick={onOpen}
          >
            <i className="fas fa-info-circle" style={{ fontSize: '14px', marginRight: '5px' }}></i> {/* Keep icon size larger */}
            Enquire Now
          </button>
        </div>
      </div>

      <Modal isOpen={showModal} onClose={onClose} isCentered size="lg">
  <ModalOverlay />
  <ModalContent>
    <ModalHeader
      textAlign="center"
      fontWeight="bold"
      fontSize="xl"
      color="black#9f98e9"
      borderRadius="0 0 0 0"
      backgroundColor="lightblue"
      borderBottomWidth="1px"
      pb="2"
    >
      Product Details
    </ModalHeader>
    <ModalCloseButton _focus={{ border: "none" }} _hover={{ bg: "none" }} />
    <ModalBody>
        <div style={{ flex: '1 1 48%' }}>
          <label style={{fontWeight:'bold'}}>Product Name</label>
        </div>
        <div style={{ flex: '1 1 48%' }}>
          <label>Product Description:</label>
        </div>
        
        
      <div className="form-group" style={{ display: "flex", gap: "10px", marginTop: "5px" }}>
                    <div style={{ flex: 1 }}>
                        <label>Product Quantity:</label>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <input
                                type="number"
                                className="form-control"
                                style={{ height: "30px", width: "20% ",fontSize:"12px",padding:"2px" }} // Reduced height and width
                                name="Prod_qty"
                                value={productQuantity}
                                onChange={(e) => setProductQuantity(e.target.value)}
                            />
                            <span style={{ marginLeft: "5px" }}>unit/-</span> 
                            <select
                                className="form-control"
                                style={{ height: "30px", width: "20%",fontSize:"12px",padding:"2px" }} // Reduced height and width
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
                    
                </div>

                <div style={{ flex: '1 1 48%', marginTop: '1px' }}>
                <label>Requirement Details</label>
          <textarea
            className="form-control"
            placeholder="Enter Requirement Details"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            style={{ height: "auto", maxHeight: "50px", width: "90%", padding: "2px", fontSize: "12px", overflowY: "auto" }} // Reduced height and width

          />
        </div>
      
    </ModalBody>
    <ModalFooter mt={-8}>
    <Button 
  colorScheme="blue" 
  mr={1} 
  
  onClick={checkSessionAndSubmit} 
  style={{ 
    height: '30px', 
    minWidth: '60px', 
    padding: '0 6px', 
    fontSize: '14px',
    marginTop:'17px',
    marginBottom:'-8px'
  }}
>
  Submit
</Button>


     
    </ModalFooter>
  </ModalContent>
</Modal>

    </div>
  );
};

export default ProductDetailsPage;
