import React, { useEffect, useState, useRef } from 'react';
import feather from 'feather-icons';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addSubCategory, getCategories, getSubCategories } from '../../redux/Admin/admin.action';
import axios from 'axios';
const AdminProducts =() =>{

    const dispatch = useDispatch();
    const [subcategory, setSubcategory] = useState('');
    const [subCategoryToDelete, setSubCategoryToDelete] = useState(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showAddsubCategoryModal, setShowAddsubCategoryModal] = useState(false);
    const [subCategoryName, setNewsubCategoryName] = useState("");


    const { encCatId } = useParams();
    console.log("in assign  subcat", encCatId);


    const categories = useSelector(state => state.masterData.categories);
    const [showCannotDeleteConfirmation, setShowCannotDeleteConfirmation] = useState(false);


    const subCategories = useSelector(state => state.masterData.subCategories);

    const filteredSubCats = subCategories.filter(subCategory => subCategory.encCatId === encCatId);


    // Find the category with the matching encryptedCategoryId
    // 

    // Log the matching category (optional)
    //console.log(matchingCategory);

    const handleDelete = async (subCategory) => {
        if (subCategory.prodCount > 0) {
            setSubCategoryToDelete(subCategory);
            setShowCannotDeleteConfirmation(true);
        }
        else {
            setSubCategoryToDelete(subCategory);
            setShowDeleteConfirmation(true);
            // console.log(encCatId);
        }

    };

    const handleCancelDelete = () => {
        setShowDeleteConfirmation(false);
    };

    const handleOK = () => {
        setShowCannotDeleteConfirmation(false);
    };



    const handleConfirmDelete = async () => {
        const subCategory = subCategoryToDelete;
        try {
            const userString = sessionStorage.getItem('user');
            const user = JSON.parse(userString);
            const encUserId = user.encUserId;

            // Include both encUserId and encKeywordId in the payload
            const payload = {
                encUserId
            };

            // Perform delete operation using encKeywordId and encUserId
            const response = await axios.delete(`http://127.0.0.1:8000/api/sub-categories/${subCategory.encSubCatId}`, { data: payload });
            //console.log("Keyword deleted successfully:", response.data);

            // Refetch keywords after deletion
            dispatch(getSubCategories());
            dispatch(getCategories());
        } catch (error) {
            console.error("Error deleting keyword:", error);
        }
        //dispatch(getCategories(updatedCategories));
        setShowDeleteConfirmation(false);

    };

    const closeButtonRef = useRef(null);


    const handleSubmit = async (event) => {
        event.preventDefault();
        // Perform form submission logic here
        // console.log('Category:', encCatId);
        // console.log('Subcategory:', subcategory);

        const userString = sessionStorage.getItem('user');
        // Parse the user object from the string format stored in sessionStorage
        const user = JSON.parse(userString);

        // Retrieve the encUserId from the user object
        const encUserId = user.encUserId;
        const subCategoryName = subcategory;

        // console.log(encUserId);

        const payload = {
            subCategoryName, encUserId, encCatId
        }
        // console.log("payload",payload);

        try {

            //console.log("in try block");

            // const response = await axios.post("http://127.0.0.1:8000/api/sub-categories", payload);
            await dispatch(addSubCategory(payload));
            // console.log("Category added successfully:", response.data);

            //fetchSubCategories();
            //closeButtonRef.current.click();

            dispatch(getSubCategories());

        } catch (error) {
            console.error("Error adding category:", error);
            // setError(error.message); // Set error state
        }

        // Reset form fields

        setSubcategory('');
    };

    useEffect(() => {

        const loadScripts = async () => {
            console.log("hello");
            feather.replace();
            await dispatch(getCategories());
            await dispatch(getSubCategories());

            const script1 = document.createElement('script');
            script1.src = '/assets/bundles/datatables/datatables.min.js';
            script1.async = true;
            document.body.appendChild(script1);

            const script2 = document.createElement('script');
            script2.src = '/assets/bundles/datatables/DataTables-1.10.16/js/dataTables.bootstrap4.min.js';
            script2.async = true;
            document.body.appendChild(script2);

            const script3 = document.createElement('script');
            script3.src = '/assets/bundles/jquery-ui/jquery-ui.min.js';
            script3.async = true;
            document.body.appendChild(script3);

            const script4 = document.createElement('script');
            script4.src = '/assets/js/page/datatables.js';
            script4.async = true;
            document.body.appendChild(script4);

        }

        loadScripts();


    }, []); // Empty dependency array means this effect runs only once after the component mounts
    const matchingCategory = categories.find(category => category.encCatId === encCatId);

    const handleSaveChanges = async (event) => {
        event.preventDefault();

        const userString = sessionStorage.getItem('user');
        const user = JSON.parse(userString);
        const encUserId = user.encUserId;

        const payload = {
            categoryName, encUserId
        }

        try {
            await dispatch(addCategory(payload));
            dispatch(getCategories());
            closeButtonRef.current.click();
            // Reinitialize Feather Icons after adding a new category
            feather.replace();

        } catch (error) {
            console.error("Error adding category:", error);
        }
    };

    const [showAllProductsModal, setShowAllProductsModal] = useState(false);

    const handleShowAllProducts = () => {
        setShowAllProductsModal(true);
    };

    const handleCloseAllProductsModal = () => {
        setShowAllProductsModal(false);
    };
    return(
        <div className="main-content">
        <section className="section">
            <div className="section-body" style={{ marginTop: '-3%' }}>
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="row" style={{ paddingRight: '0', paddingTop: '3%', width: '100%', marginLeft: '3px', marginTop: '-5%' }}>
                                <div className="col-xl-4 col-lg-8 col-md-8 col-sm-8 col-xs-12" style={{ paddingRight: '0', paddingTop: '3%', width: '150%', marginLeft: '3px' }}>
                                    <div className="card-content" style={{ marginBottom: '6%' }}>
                                        <h5 className="font-15" style={{ marginBottom: '6%', marginTop: '1%', color: '#A569BD' }}>Add New</h5>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pl-0">
                                    <div className="banner-img">
                                        {/* <img src="assets/img/banner/1.png" alt="" /> */}
                                    </div>
                                </div>
                                <div className="col-12 d-flex justify-content-end" style={{ marginBottom: '10px' }}>
                                    <button onClick={handleShowAllProducts} className="btn btn-primary" style={{ backgroundColor: '#6777EF' }}>
                                        All Products
                                    </button>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-striped table-hover" id="save-stage" style={{ width: '100%' }}>
                                        <thead>
                                            <tr>
                                                <th>Sr. No.</th>
                                                <th>Sub Category</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredSubCats.map((subCategory, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{subCategory.sub_cat_name} ({subCategory.prodCount})</td>
                                                    <td>
                                                        <button
                                                            type="button"
                                                            className="btn btn-danger btn-sm"
                                                            style={{ marginRight: "8px", color: 'black', backgroundColor: 'transparent', borderColor: 'transparent' }}
                                                            onClick={() => handleDelete(subCategory)}
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* All Products Modal */}
                        <div
    className={`modal fade ${showAllProductsModal ? "show" : ""}`}
    tabIndex="0"
    role="dialog"
    aria-labelledby="allProductsModalLabel"
    aria-hidden={!showAllProductsModal}
    style={{ display: showAllProductsModal ? "block" : "none", backdropFilter: "blur(5px)" }} // Apply backdrop blur effect
>
    <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content" style={{ maxHeight: "80vh", fontSize: "10px" }}>
            <div className="modal-header" style={{ backgroundColor: "#6777EF", display: "flex", justifyContent: "center",borderRadius:"8px 8px 0 0" }}>
                <h5 className="modal-title" id="allProductsModalLabel" style={{ color: "white", marginLeft: "180px" }}>Product Info</h5>
                <button type="button" className="close" onClick={handleCloseAllProductsModal} aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body" style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", marginBottom: "1rem" }}>
                    <label htmlFor="productName" style={{ flex: "0 0 120px", marginRight: "1rem", textAlign: "left", fontWeight: "bold", fontSize: "11px" }}>Product Name</label>
                    <input type="text" className="form-control" id="productName" placeholder="Enter product name" style={{ fontSize: "11px", height: "25px", width: "200px", padding: "0.25rem 0.5rem" }} />
                </div>
                <div style={{ display: "flex", marginBottom: "1rem" }}>
                    <label htmlFor="productDescription" style={{ flex: "0 0 120px", marginRight: "1rem", textAlign: "left", fontWeight: "bold", fontSize: "11px" }}>Product Description</label>
                    <textarea type="text" className="form-control" id="productDescription" placeholder="Enter product description" style={{ fontSize: "11px", height: "25px", width: "200px", padding: "0.25rem 0.5rem" }} />
                </div>
                <div style={{ display: "flex", marginBottom: "1rem" }}>
                    <label htmlFor="productCategory" style={{ flex: "0 0 120px", marginRight: "1rem", textAlign: "left", fontWeight: "bold", fontSize: "11px" }}>Product Category</label>
                    <input type="text" className="form-control" id="productCategory" placeholder="Enter product category" style={{ fontSize: "11px", height: "25px", width: "200px", padding: "0.25rem 0.5rem" }} />
                </div>
                <div style={{ display: "flex", marginBottom: "1rem" }}>
                    <label htmlFor="productPrice" style={{ flex: "0 0 120px", marginRight: "1rem", textAlign: "left", fontWeight: "bold", fontSize: "11px" }}>Product Subcategory</label>
                    <input type="text" className="form-control" id="productPrice" placeholder="Enter product subcategory" style={{ fontSize: "11px", height: "25px", width: "200px", padding: "0.25rem 0.5rem" }} />
                </div>
            </div>
            <div className="modal-footer">
                {/* <button type="button" className="btn btn-secondary" onClick={handleCloseAllProductsModal}>Close</button> */}
                <button type="button" className="btn btn-primary">Save changes</button>
            </div>
        </div>
    </div>
</div>


                        {/* End of All Products Modal */}

                    </div>
                </div>
            </div>
        
    </section>
</div>
        
    )
}
export default AdminProducts;