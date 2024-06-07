import React, { useEffect, useState } from 'react';
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
    const [productQuantity, setProductQuantity] = useState('');
    const [filteredSubCategories, setFilteredSubCategories] = useState([]);
    const [otherSpecifications, setOtherSpecifications] = useState('');
    const [packingDetails, setPackingDetails] = useState('');



    const dispatch = useDispatch();
    const orders = useSelector(state => state.orderReducer.orders);

    useEffect(() => {
        feather.replace();
        const userString = sessionStorage.getItem('user');
        const user = JSON.parse(userString);
        const encCompanyId = user.encCompanyId;
        console.log(encCompanyId);
        dispatch(getOrders(encCompanyId));
        dispatch(getCategories());
        dispatch(getSubCategories());
        dispatch(getUOM());

    }, []);


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



    const [orderDetails, setOrderDetails] = useState({
        encPostId: '',
        prod_name: productName,
        encCatId: selectedCategory,
        encSubCatId: selectedSubcategory,
        encUomId: selectedUnit,
        //price: productPrice,
        prod_des: productDescription,
        prod_qty: productQuantity,
        packing_details: packingDetails,
        other_specifications: otherSpecifications
        //encCompanyId: encCompanyId, // Include encCompanyId in formData
    });

    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value;
        setOrderDetails({ ...orderDetails, encCatId: selectedCategory })
        setSelectedCategory(selectedCategory);
        // Filter subcategories based on the selected category
        const filteredSubcategories = subcategories.filter(subCategory => subCategory.encCatId === selectedCategory);
        console.log("filtered sub cat", filteredSubcategories);
        setFilteredSubCategories(filteredSubcategories);
    };

    const handleUpdateOrderDetails = (order) => {
        console.log('Order details:', order);
        // Update subcategories based on the selected category
        const filteredSubcategories = subcategories.filter(subCategory => subCategory.encCatId === order.encCatId);
        setFilteredSubCategories(filteredSubcategories);


        setOrderDetails(prevState => ({
            ...prevState,
            encPostId: order.encPostId || '',
            prod_name: order.prod_name || '',
            encCatId: order.encCatId || '',
            encSubCatId: order.encSubCatId || '',
            encUomId: order.encUomId || '',
            //price: order.price || '',
            prod_des: order.prod_des || '',
            prod_qty: order.prod_qty || '',
            packing_details: order.packing_details || '',
            other_specifications: order.other_specifications
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
        axios.post(`http://127.0.0.1:8000/api/update-order/`, orderDetails)
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
                                                <a href="#" className="btn btn-primary" style={{ fontSize: '12px', padding: '3px 10px', backgroundColor: '#9B59B6 ' }}>Share Feedback</a>
                                                <a href="#" className="btn btn-primary" style={{ fontSize: '12px', padding: '3px 10px', backgroundColor: '#9B59B6 ' }}>Repost Requrirement</a>
                                                <a href="#" className="btn btn-primary" style={{ fontSize: '12px', padding: '3px 10px', backgroundColor: '#9B59B6 ' }} onClick={() => handleCloseRequirement(order.encPostId)}>Close Requrirement</a>
                                                <a href="#" className="btn btn-primary" style={{ fontSize: '12px', padding: '3px 10px', backgroundColor: '#9B59B6 ' }} onClick={() => handleUpdateOrderDetails(order)}>Enrich Your Requrirement</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-body">
                                        <div className="row gx-1">
                                            <div className="col-lg-6" style={{ paddingRight: '0%' }}>
                                                <div style={{ textAlign: 'left', color: 'black', marginBottom: '10px' }}>
                                                    <p style={{ fontSize: '14px', lineHeight: '1.4', marginBottom: '5px', marginTop: '-2%' }}>Product Name: {order.prod_name}</p>
                                                    <p style={{ fontSize: '14px', lineHeight: '1.4', marginBottom: '5px', }}>Description: {order.prod_des}</p>
                                                    <p style={{ fontSize: '14px', lineHeight: '1.4', marginBottom: '5px' }}>Category: {getNameById('category', order.encCatId)}</p>
                                                    <p style={{ fontSize: '14px', lineHeight: '1.4', marginBottom: '5px' }}>Sub Category: {getNameById('subcategory', order.encSubCatId)}</p>
                                                    <p style={{ fontSize: '14px', lineHeight: '1.4', marginBottom: '5px' }}>Unit of Measurment: {getNameById('uom', order.encUomId)}</p>
                                                    <p style={{ fontSize: '14px', lineHeight: '1.4', marginBottom: '5px' }}>Product Quantity: {order.prod_qty}</p>
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
                    <ModalContent style={{ maxWidth: "500px", maxHeight: "500px", borderRadius: "40px" }}>
                        <ModalHeader textAlign="center" fontWeight="bold" fontSize="xl" color="black#9f98e9" borderRadius="20px 20px 0 0" backgroundColor="#b4e998" borderBottomWidth="1px" pb="2">
                            Submit Requirement
                        </ModalHeader>    <ModalCloseButton _focus={{ border: "none" }} _hover={{ bg: "none" }} />
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
                                                        style={{ height: "30px", width: "90%", fontSize: "12px", padding: "2px" }} // Reduced height and width
                                                        name="productName"
                                                        value={orderDetails.prod_name}
                                                        onChange={(e) => setOrderDetails({ ...orderDetails, prod_name: e.target.value })}
                                                    />
                                                </div>
                                                <div style={{ flex: 1 }}>
                                                    <label>Requirement Details:</label>
                                                    <textarea
                                                        className="form-control"
                                                        rows="2"
                                                        style={{ height: "auto", maxHeight: "50px", width: "90%", padding: "2px", fontSize: "12px", overflowY: "auto" }} // Reduced height and width
                                                        value={orderDetails.prod_des}
                                                        onChange={(e) => setOrderDetails({ ...orderDetails, prod_des: e.target.value })}
                                                    ></textarea>
                                                </div>

                                            </div>

                                            <div className="form-group" style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                                                <div style={{ flex: 1 }}>
                                                    <label>Category:</label>
                                                    <select
                                                        className="form-control"
                                                        style={{ height: "30px", width: "90%", fontSize: "12px", padding: "2px" }} // Reduced height and width
                                                        name="category"
                                                        value={orderDetails.encCatId}
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
                                                        style={{ height: "30px", width: "90%", fontSize: "12px", padding: "2px" }} // Reduced height and width
                                                        name="subcategory"
                                                        value={orderDetails.encSubCatId}
                                                        onChange={(e) => setOrderDetails({ ...orderDetails, encSubCatId: e.target.value })}
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
                                                            style={{ height: "30px", width: "calc(25%)", fontSize: "12px", padding: "2px" }} // Reduced height and width
                                                            name="Prod_qty"
                                                            value={orderDetails.prod_qty}
                                                            onChange={(e) => setOrderDetails({ ...orderDetails, prod_qty: e.target.value })}
                                                        />
                                                        <span style={{ marginLeft: "5px" }}>unit/-</span>
                                                        <select
                                                            className="form-control"
                                                            style={{ height: "30px", width: "45%", fontSize: "12px", padding: "2px" }} // Reduced height and width
                                                            name="unit"
                                                            value={orderDetails.encUomId}
                                                            onChange={(e) => setOrderDetails({ ...orderDetails, encUomId: e.target.value })}
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
                                                        value={orderDetails.other_specifications}
                                                        onChange={(e) => setOrderDetails({ ...orderDetails, other_specifications: e.target.value })}
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
                                                        value={orderDetails.packing_details}
                                                        onChange={(e) => setOrderDetails({ ...orderDetails, packing_details: e.target.value })}

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

                                                onClick={() => { handleUpdateRequirement(); onClose() }}
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
            {/* : (
        <div>No orders found.</div>
    ) */}
        </div>

    );


};

export default MyOrder;