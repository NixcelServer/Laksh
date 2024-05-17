import React, { useEffect,useState } from 'react';
import feather from 'feather-icons';
import axios from 'axios';
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
//import { SET_PRODUCT_DETAILS } from '../../redux/Product/product.action.type';
import { useSelector, useDispatch } from 'react-redux';
import { getOrders } from '../../redux/Order/order.action';
import { getCategories, getSubCategories, getUOM } from "../../redux/Admin/admin.action";
//import { useDispatch,useSelector } from "react-redux";



const MyOrder = () => {

    const categories = useSelector(state => state.masterData.categories);
  //const keywords = useSelector(state => state.masterData.keywords);
  const subcategories = useSelector(state => state.masterData.subCategories);
  const uoms = useSelector(state => state.masterData.uom);
  const [requirements, setRequirements] = useState('');
  const [productName, setProductName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const[productQuantity,setProductQuantity]=useState('');

     const dispatch = useDispatch();
     const orders  = useSelector(state => state.orderReducer.orders);
    
    useEffect(()=>{
        feather.replace();
        const userString = sessionStorage.getItem('user');
        const user = JSON.parse(userString);
        const encCompanyId = user.encCompanyId;
        dispatch(getOrders(encCompanyId));
        dispatch(getCategories());
        dispatch(getSubCategories()); 
        dispatch(getUOM());
     
    },[]);


    const getNameById = (type, id) => {
      let data;
      switch (type) {
        case 'category':
          data = categories.find(cat => cat.encCatId === id);
          return data ? data.cat_name : '';
        case 'subcategory':
          data = subcategories.find(subCat => subCat.encSubCatId === id);
          return data ? data.sub_cat_name : '';
        case 'uom':
          data = uoms.find(unit => unit.encUomId === id);
          return data ? data.unit_name : '';
        default:
          return '';
      }
    };

    

    
    const handleCloseRequirement = (encPostId) => {
        const userString = sessionStorage.getItem('user');
        const user = JSON.parse(userString);
        const encCompanyId = user.encCompanyId;
        // Make an API call to close the requirement
        axios.delete(`http://127.0.0.1:8000/api/delete-order/${encPostId}`)
        .then(() => {
            // If the request is successful, update the state to reflect the closed requirement
            const updatedOrders = orders.filter(order => order.encPostId !== encPostId);
            dispatch(getOrders(encCompanyId));
            console.log('Requirement closed successfully');
        })
        .catch(error => {
            console.error('Error closing requirement:', error);
        });
    };
    
    const [isOpen, setIsOpen] = useState(false);
    const onOpen = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);
    const [showForm, setShowForm] = useState(false);

    

    const  [orderDetails, setOrderDetails] =useState({
      encPostId: '',
      prod_name: productName,
      encCatId: selectedCategory,
      encSubCatId: selectedSubcategory,
      encUomId: selectedUnit,
      //price: productPrice,
      prod_des: productDescription,
      prod_qty:productQuantity,
      //encCompanyId: encCompanyId, // Include encCompanyId in formData
    });

    const handleUpdateOrderDetails = (order) => {
      console.log('Order details:', order);
      
        setOrderDetails(prevState => ({
          ...prevState,
          encPostId:order.encPostId || '',
          prod_name: order.prod_name || '',
          encCatId: order.encCatId || '',
          encSubCatId: order.encSubCatId || '',
          encUomId: order.encUomId || '',
          //price: order.price || '',
          prod_des: order.prod_des || '',
          prod_qty: order.prod_qty || '',
          // encCompanyId: order.encCompanyId || '', // Include encCompanyId in formData
        }));
        // console.log("psot",orderDetails);
      
      setIsOpen(true);
      // console.log(orderDetails);
    };

    const handleUpdateRequirement = () => {
    
      console.log(orderDetails);

      const userString = sessionStorage.getItem('user');
        const user = JSON.parse(userString);
        const encCompanyId = user.encCompanyId;
      // setOrderDetails(prevOrderDetails => ({
      //   ...prevOrderDetails,
      //   encPostId: encPostId,
      //   }));
        //Make an API call to update the order
        axios.post(`http://127.0.0.1:8000/api/update-order/`,orderDetails)
          .then(() => {
            console.log('Requirement updated successfully');
            // You may want to fetch the updated orders from the server again or update the local state here
            dispatch(getOrders(encCompanyId));
          })
          .catch(error => {
            console.error('Error updating requirement:', error);
          });
      };
  

    return (
        /* Main Content */
        <div className="main-content" style={{ marginTop: '-40px' }}>
             {orders && orders.map((order, index) => (
    <section className="section">
        <div className="section-body">
            <div className="row">
                <div className="col-12">
                    
                    <div className="card card-primary w-100">
                    <div className="card-header">
                       
                    <h4>Orders</h4>
                             <div className="card-header-action">
                           
                            <div className="btn-group">
                                    <a href="#" className="btn btn-primary" style={{ fontSize: '12px', padding: '3px 10px' ,backgroundColor:'#9B59B6 '}}>Share Feedback</a>
                                    <a href="#" className="btn btn-primary" style={{ fontSize: '12px', padding: '3px 10px',backgroundColor:'#9B59B6 ' }}>Repost Requrirement</a>
                                    <a href="#" className="btn btn-primary" style={{ fontSize: '12px', padding: '3px 10px',backgroundColor:'#9B59B6 ' }}onClick={() => handleCloseRequirement(order.encPostId)}>Close Requrirement</a>
                                    <a href="#" className="btn btn-primary" style={{ fontSize: '12px', padding: '3px 10px',backgroundColor:'#9B59B6 ' }} onClick={()=> handleUpdateOrderDetails(order)}>Enrich Your Requrirement</a>
                                </div>
                            </div>
                        </div>
                        <div class="card-body"> 
             <div className="row gx-1">
                 <div className="col-lg-6" style={{  paddingRight: '0%'  }}>
                    <div style={{ textAlign: 'left', color: 'black', marginBottom: '10px' }}>
                    <p style={{ fontSize: '14px', lineHeight: '1.4', marginBottom: '5px', marginTop: '-2%' }}>Product Name: {order.prod_name }</p>
                    <p style={{ fontSize: '14px', lineHeight: '1.4', marginBottom: '5px',}}>Description: {order. prod_des}</p>
                    <p style={{ fontSize: '14px', lineHeight: '1.4', marginBottom: '5px' }}>Category: {getNameById('category', order.encCatId)}</p>
                    <p style={{ fontSize: '14px', lineHeight: '1.4', marginBottom: '5px' }}>Sub Category: {getNameById('subcategory', order.encSubCatId)}</p>
                    <p style={{ fontSize: '14px', lineHeight: '1.4', marginBottom: '5px' }}>Unit of Measurment: {getNameById('uom', order.encUomId)}</p>
                    <p style={{ fontSize: '14px', lineHeight: '1.4', marginBottom: '5px' }}>Product Quantity: { order.prod_qty}</p>
                </div>
            </div>
                 </div>
                </div>

                   
                </div>
            </div>
        </div>
        </div>
    </section>
    
    
    ))}
    <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={7}>
      

      

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
                                      value={orderDetails.prod_name}
                                      onChange={(e) => setOrderDetails({...orderDetails, prod_name: e.target.value})} 
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label>Category:</label>
                                    <select
                                      className="form-control"
                                      style={{ height: "40px" }}
                                      name="category"
                                      value={orderDetails.
                                        encCatId} // Set the value of the select input to selectedCategory
                                      onChange={(e) => setOrderDetails({...orderDetails, encCatId: e.target.value})}
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
                                      value={orderDetails.encUomId} // Set the value of the select input to selectedUnit
                                      onChange={(e) => setOrderDetails({...orderDetails, encUomId: e.target.value})} // Update selectedUnit when an option is selected
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
                                  value={orderDetails.prod_des}
                                  onChange={(e) => setOrderDetails({...orderDetails, prod_des: e.target.value})}
                                ></textarea>
                              </div>
                                  <div className="form-group">
                                    <label>Subcategory:</label>
                                    <select
                                      className="form-control"
                                      style={{ height: "40px" }}
                                      name="subcategory"
                                      value={orderDetails.encSubCatId} // Set the value of the select input to selectedSubcategory
                                      onChange={(e) => setOrderDetails({...orderDetails, encSubCatId: e.target.value})}
                                    >
                                      <option value="">Select Subcategory</option>
                                      {subcategories.map(subCategory => (
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
                                      name="productQuantity"
                                      value={orderDetails.prod_qty}
                                      onChange={(e) => setOrderDetails({...orderDetails, prod_qty: e.target.value})}
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
                                     // onClick={handleSubmit}
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
        onClick={()=>{handleUpdateRequirement();onClose()}}
      >
        Submit
      </button>
    </ModalFooter>
  </ModalContent>
</Modal>

    </Grid>
     {/* : (
        <div>No orders found.</div>
    ) */}
</div>

    );

    
};

export default MyOrder ;
