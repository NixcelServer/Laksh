import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCategories, getKeywords, getSubCategories, getUOM } from '../../redux/Admin/admin.action';
import Slider from 'react-slick';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from "@chakra-ui/react";
import { baseURL } from '../../utils/variables';
import axios from 'axios';


const ProductDetailsPage = () => {
  

    const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const { encSubCatId, encProdId } = useParams();
  const [productQuantity, setProductQuantity] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('');
  const [productName, setProductName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
 
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
 
  const [packingDetails, setPackingDetails] = useState('');
  const [otherSpecifications, setOtherSpecifications] = useState('');
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  const [product,setProduct] = useState(null);
 


  
  
  const productsBySubCategory = useSelector(state => state.productReducer.productsBySubCategory);
  const categories = useSelector(state => state.masterData.categories);
  const subCategories = useSelector(state => state.masterData.subCategories);
  const keywords = useSelector(state => state.masterData.keywords);

  const uoms = useSelector(state => state.masterData.uom);
  
  useEffect(() => {
     
    dispatch(getCategories());
    dispatch(getSubCategories());
    dispatch(getKeywords());
    dispatch(getUOM());
    console.log("in use effect",encProdId)
    getProd(encProdId);

  }, []);

  const getProd = async (encProdId) => {
    try {
    //  const res = await axios.get(`${baseURL}api/get-prod-details/${encProdId}`);//http://127.0.0.1:8000
      const res = await axios.get(`http://127.0.0.1:8000/api/get-prod-details/${encProdId}`);
      setProduct(res.data);
      console.log(res.data);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
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

    // let product = null;

    // Iterate over each object in the subCategories array
    // productsBySubCategory.subCategories.forEach(subCategoryObj => {
    //   // Check if the subCategoryObj has the desired encSubCatId
    //   if (subCategoryObj.subcategory.encSubCatId === encSubCatId) {
    //     // If found, iterate over the products array of that subcategory
        
    //     subCategoryObj.products.forEach(productObj => {
    //       // Check if the productObj has the desired encProdId
    //       if (productObj.encProdId === encProdId) {
    //         // If found, assign the product object to the 'product' variable
    //         product = productObj;
    //         console.log("product");
    //       }
    //     });
    //   }
    // });
    
    if (!product) {
      // Handle case when product is not found
      console.log("product not found")
      return <div>Product not found</div>;
    }
    
 
  

  const toggleModal = () => {
    setShowModal(!showModal);
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
            {product.image_paths && product.image_paths.length === 1 ? (
  <img 
    src={`${baseURL}storage/app/${product.image_paths[0]}`} 
    alt="Product Preview" 
    style={{ width: '100%', height: '200px', marginBottom: '10px' }} 
  />
) : product.image_paths && product.image_paths.length > 1 ? (
  <Slider
    dots
    infinite
    speed={500}
    slidesToShow={1}
    slidesToScroll={1}
    autoplay
    autoplaySpeed={3000}
  >
    {product.image_paths.map((prod_img_path, imgIndex) => (
      <div key={imgIndex}>
        <img 
          src={`${baseURL}storage/app/${prod_img_path}`} 
          alt={`Product Preview ${imgIndex + 1}`} 
          style={{ width: '100%', height: '200px', marginBottom: '10px', padding: '2px' }} 
        />
      </div>
    ))}
  </Slider>
) : (
  <img 
    src="images/default_image.jpg" // replace with the actual path to your default image
    alt="Default Product Preview" 
    style={{ width: '100%', height: '200px', marginBottom: '10px' }} 
  />
)}
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
                 {product.prod_name}
              </h3>
              <p style={{ fontSize: '14px', lineHeight: '1.4', marginBottom: '5px' }}>
                <span style={{ fontWeight: 'bold' }}>Description:</span> {product.prod_description}
              </p>
             <p style={{ fontSize: '14px', lineHeight: '1.4', marginBottom: '5px' }}><span style={{ fontWeight: 'bold' }}>Category:</span> {categoryNameFromId(product.encCatId)} </p>
          <p style={{ fontSize: '14px', lineHeight: '1.4', marginBottom: '5px' }}><span style={{ fontWeight: 'bold' }}>SubCategory:</span> {subCategoryNameFromId(product.encSubCatId)} </p>
          {product.display_price === 'yes' && (
          <p style={{ fontSize: '14px', lineHeight: '1.4', marginBottom: '5px' }}><span style={{ fontWeight: 'bold' }}>Price:</span> {product.prod_price || '$50'}</p>
        )}
          <p style={{ fontSize: '14px', lineHeight: '1.4', marginBottom: '5px' }}><span style={{ fontWeight: 'bold' }}>Unit Of Measurement:</span> {uomNameFromId(product.encUomId)}</p>
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
            onClick={toggleModal}
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
          <label style={{fontWeight:'bold'}}>{product.prod_name}</label>
        </div>
        <div style={{ flex: '1 1 48%' }}>
          <label>{product.prod_description}</label>
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
           // value={productDescription}
           // onChange={(e) => setProductDescription(e.target.value)}
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
