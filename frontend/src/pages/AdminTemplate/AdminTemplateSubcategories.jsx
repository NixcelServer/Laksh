import React, { useEffect, useState, useRef } from 'react';
import feather from 'feather-icons';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addSubCategory, getCategories, getSubCategories } from '../../redux/Admin/admin.action';
import axios from 'axios';
import { baseURL } from '../../utils/variables';
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import 'datatables.net-buttons-bs4/css/buttons.bootstrap4.min.css';
import 'datatables.net';
import 'datatables.net-bs4';
import 'datatables.net-responsive';
import 'datatables.net-buttons';

const AdminTemplateSubcategories = () => {

    const dispatch = useDispatch();
    const [subcategory, setSubcategory] = useState('');
    const [subCategoryToDelete, setSubCategoryToDelete] = useState(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showAddsubCategoryModal, setShowAddsubCategoryModal] = useState(false);
    const [subCategoryName, setNewsubCategoryName] = useState("");
    const [dataLoaded, setDataLoaded] = useState(false);
    const location = useLocation();
  const { encCatId } = location.state || {};



    // const { encCatId } = useParams();
    console.log("in assign  subcat", encCatId);


    const categories = useSelector(state => state.masterData.categories);
    const [showCannotDeleteConfirmation, setShowCannotDeleteConfirmation] = useState(false);


    const subCategories = useSelector(state => state.masterData.subCategories);

    const filteredSubCats = subCategories.filter(subCategory => subCategory.encCatId === encCatId);


    // Find the category with the matching encryptedCategoryId
    // 

    // Log the matching category (optional)
    //console.log(matchingCategory);

    useEffect(() => {
        if (filteredSubCats.length > 0) {
          setDataLoaded(true);
        }
      }, [filteredSubCats]);

      useEffect(() => {
        if (dataLoaded) {
          $(document).ready(function () {
            if (!$.fn.DataTable.isDataTable('#example1')) {
              $("#example1").DataTable({
                "responsive": true,
                "lengthChange": false,
                "autoWidth": false,
               // "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
              }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');
            }
          });
        }
      }, [dataLoaded]);

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
    
            const payload = { encUserId };
    
            const response = await axios.delete(`${baseURL}api/sub-categories/${subCategory.encSubCatId}`, { data: payload });
    
            // Destroy the existing DataTable before re-fetching data
            if ($.fn.DataTable.isDataTable('#example1')) {
                $('#example1').DataTable().destroy();
            }
    
            // Re-fetch categories and reinitialize DataTable
            await dispatch(getCategories());
            dispatch(getSubCategories()).then(() => {
                setDataLoaded(false);
    
                // Reinitialize DataTable with updated data
                $("#example1").DataTable({
                    "responsive": true,
                    "lengthChange": false,
                    "autoWidth": false,
                }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');
    
                feather.replace(); // Reinitialize Feather icons if used
            });
    
    
        } catch (error) {
            console.error("Error deleting subcategory:", error);
        } finally {
            setShowDeleteConfirmation(false);
        }
    };
    
    const closeButtonRef = useRef(null);


    const handleSubmit = async (event) => {
        event.preventDefault();
    
        // Extract user info from session
        const userString = sessionStorage.getItem('user');
        const user = JSON.parse(userString);
        const encUserId = user.encUserId;
    
        // Prepare payload
        const payload = { subCategoryName: subcategory, encUserId, encCatId };
    
        try {
            // Send POST request
            await axios.post(`${baseURL}api/sub-categories`, payload);
    
            // Destroy and reinitialize DataTable
            if ($.fn.DataTable.isDataTable('#example1')) {
                $('#example1').DataTable().destroy();
            }
             dispatch(getSubCategories());
    
            $("#example1").DataTable({
                "responsive": true,
                "lengthChange": false,
                "autoWidth": false,
            }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');
    
            feather.replace();
    
            // Close modal and reset form
            closeButtonRef.current.click();
            setSubcategory('');
        } catch (error) {
            console.error("Error adding subcategory:", error);
        }
    };
    
   
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

    return (

        <div className="main-content">
            <section className="section">
                <div className="section-body" style={{ marginTop: '-3%' }}>

                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="row" style={{ paddingRight: '0', paddingTop: '3%', width: '100%', marginLeft: '3px', marginTop: '-5%' }}>
                                    <div className="col-xl-4 col-lg-8 col-md-8 col-sm-8 col-xs-12" style={{ paddingRight: '0', paddingTop: '3%', width: '150%', marginLeft: '3px' }}>
                                        <div className="card-content" style={{ marginBottom: '6%' }}>
                                        <h5 className="font-15" style={{ marginBottom: '6%', marginTop: '1%', color: '#A569BD', textAlign: 'left' }}>Assign Subcategory</h5>
                                        {/* Start of Assign Subcategory Form */}
                                            <form>

                                            <div className="form-group" style={{ marginBottom: '-2%', textAlign: 'left' }}>
                                                <label htmlFor="category" style={{ fontSize: '15px' }}>Category :</label>
                                                <span>{matchingCategory && matchingCategory.cat_name}</span>
                                            </div>



                                                <div className="form-group">
                                                    <label htmlFor="subcategory" style={{ textAlign: 'left', display: 'block', marginTop: '4%', fontSize: '15px' }}>Subcategory Name</label>
                                                    <input type="text" className="form-control" id="subcategory" style={{ width: "200px" }} placeholder="Enter subcategory name" value={subcategory}
                                                        onChange={(e) => setSubcategory(e.target.value)} />


                                                </div>
                                                {/* Additional form fields can be added here as needed */}
                                                <div style={{ textAlign: 'left' }}>
                                                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}
                                                        style={{ float: 'left', height: '25px', padding: '3px' }}>Assign Subcategory</button>
                                                </div>
                                            </form>
                                            {/* End of Assign Subcategory Form */}
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pl-0">
                                        <div className="banner-img">
                                            {/* <img src="assets/img/banner/1.png" alt="" /> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                <div className="table-responsive">
                                        <table id="example1" className="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th>Sr No</th>
                        <th>Name</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                                                {filteredSubCats.map((subCategory, index) => (
                                                    <tr >
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
                    <tfoot>
                      <tr>
                        <th>Sr No</th>
                        <th>Name</th>
                        <th>Action</th>
                      </tr>
                    </tfoot>
                  </table>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



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
                            Are you sure you want to delete {subCategoryToDelete && subCategoryToDelete.cat_name}?
                        </div>
                        <div className="modal-footer">
                            {/* <button type="button" className="btn btn-secondary" onClick={handleCancelDelete}>
                    Cancel
                </button> */}
                            <button type="button" className="btn btn-danger" onClick={handleConfirmDelete}
                                style={{ marginRight: "8px", color: 'black', backgroundColor: 'transparent', borderColor: 'transparent' }}                                                >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className={`modal fade ${showCannotDeleteConfirmation ? "show" : ""}`}
                id="cannotDeleteConfirmationModal"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="cannotDeleteConfirmationModalLabel"
                aria-hidden={!showCannotDeleteConfirmation}
                style={{ display: showCannotDeleteConfirmation ? "block" : "none" }}
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="cannotDeleteConfirmationModalLabel">
                                Cannot Delete
                            </h5>
                            <button
                                type="button"
                                className="close"
                                onClick={handleOK}
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            Unable to delete the Sub Category '{subCategoryToDelete && subCategoryToDelete.sub_cat_name}' at the moment. It appears that this Sub Category has products assigned.

                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={handleOK}
                            >
                                Ok
                            </button>

                        </div>
                    </div>
                </div>
            </div>

            <div
                className={`modal fade ${showAddsubCategoryModal ? "show" : ""}`}
                id="addUnitModal"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="addUnitModalLabel"
                aria-hidden={!showAddsubCategoryModal}
                style={{ display: showAddsubCategoryModal ? "block" : "none" }}
            >

                <div className="modal-dialog modal-dialog-centered" role="document" style={{ maxWidth: '70vh', maxHeight: '20vh' }}>
                    <div className="modal-backdrop" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backdropFilter: 'blur(2px)', backgroundColor: 'rgba(0, 0, 0, 0.3)', zIndex: 0 }}></div>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalCenterTitle">Add New subCategory</h5>
                            <button type="button" className="close" onClick={() => setShowAddsubCategoryModal(false)} aria-label="Close" ref={closeButtonRef} style={{ border: 'none', outline: 'none' }}>

                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group" style={{ textAlign: 'left' }}>
                                <label htmlFor="subCategoryName">subCategory Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="subCategoryName"
                                    placeholder="Enter subCategory Name"
                                    value={subCategoryName}
                                    onChange={(e) => setNewsubCategoryName(e.target.value)}
                                    style={{ fontSize: '12px', height: '30px' }} // Adjust the font size as needed
                                />
                            </div>
                        </div>
                        <div className="modal-footer" style={{ position: 'absolute', bottom: 0, right: 0 }}>


                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleSaveChanges}
                                style={{ height: '30px', width: '60px', fontSize: '12px', padding: '0' }}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    );
};

export default AdminTemplateSubcategories;