import React, { useEffect, useState, useRef } from 'react';
import feather from 'feather-icons';
import { useDispatch, useSelector } from "react-redux";
import { addCategory, getCategories, getSubCategories, updateCategory } from '../../redux/Admin/admin.action';
import { useNavigate, Link } from 'react-router-dom';
import { HiOutlineViewGridAdd } from "react-icons/hi";
import { IoEyeOutline } from "react-icons/io5";
import { MdOutlineAssignment, MdDeleteOutline, MdDoneAll } from "react-icons/md";
import axios from 'axios';
import { baseURL } from '../../utils/variables';
import Swal from 'sweetalert2';


import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import 'datatables.net-buttons-bs4/css/buttons.bootstrap4.min.css';
import 'datatables.net';
import 'datatables.net-bs4';
import 'datatables.net-responsive';
import 'datatables.net-buttons';


const Categories = () => {
    const categories = useSelector(state => state.masterData.categories);
    const subCategories = useSelector(state => state.masterData.subCategories);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [loading, setLoading] = useState(true);
    const [categoryName, setNewCategoryName] = useState('');
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showCannotDeleteConfirmation, setShowCannotDeleteConfirmation] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    const [categoryToUpdate, setCategoryToUpdate] = useState("");
    const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
    const [showUpdateCategoryModal, setShowUpdateCategoryModal] = useState(false);
    const [photoPreview, setPhotoPreview] = useState(null);
    const [isHovered, setIsHovered] = useState(false);
    const fileInputRef = useRef(null);
    
    const [newImageSelected, setNewImageSelected] = useState(false);
    const [categoryDetails, setCategoryDetails] = useState({
        encUserId: '',
        categoryName: '',
        file: ''
    });
    const [updateCategoryDetails, setUpdateCategoryDetails] = useState({
        encCatId:'',
        encUserId: '',
        categoryName: '',
        file: ''
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const closeButtonRef = useRef(null);

    useEffect(() => {
        dispatch(getCategories()).then(() => setLoading(false)); // Set loading to false once the data is fetched
    }, [dispatch]);

    useEffect(() => {
        if (categories.length > 0) {
          setDataLoaded(true);
        }
      }, [categories]);

      useEffect(() => {
        if (!loading) {
            if ($.fn.DataTable.isDataTable('#example1')) {
                $('#example1').DataTable().destroy();
            }
    
            $("#example1").DataTable({
                "responsive": true,
                "lengthChange": false,
                "autoWidth": false,
            }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');
        }
        setLoading(true);
    }, [loading, categories]);

  
    const handleDelete = async (category) => {
        const subcategoriesAssigned = subCategories.some(subCategory => subCategory.encCatId === category.encCatId);
    
        if (subcategoriesAssigned) {
            Swal.fire({
                icon: 'error',
                title: 'Cannot Delete',
                text: 'This category has subcategories assigned to it and cannot be deleted.',
                confirmButtonText: 'OK'
            });
        } else {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    handleConfirmDelete(category);
                }
            });
        }
    };
    

    

    const viewCategory = (category) => {
        console.log("view cat" , category);
        setCategoryToUpdate(category)
        setPhotoPreview(`${baseURL}storage/app/${category.cat_img_path}`);
        setUpdateCategoryDetails({...updateCategoryDetails,categoryName:category.cat_name,encCatId:category.encCatId})
        setShowUpdateCategoryModal(true)
    }

    const handleAssign = (category) => {
        const encCatId = category.encCatId;
        navigate(`/subcategories`, {
            state: { encCatId } // Passing encCatId in state
        });
    };

    const handleCancelDelete = () => {
        setShowDeleteConfirmation(false);
    };

    const handleOK = () => {
        setShowCannotDeleteConfirmation(false);
    };


    const handleConfirmDelete = async () => {
        const category = categoryToDelete;
        try {
            const userString = sessionStorage.getItem('user');
            const user = JSON.parse(userString);
            const encUserId = user.encUserId;

            const payload = {
                encUserId
            };

            const response = await axios.delete(`${baseURL}api/categories/${category.encCatId}`, { data: payload });
            
            if ($.fn.DataTable.isDataTable('#example1')) {
                $('#example1').DataTable().destroy();
            }
    
            // Fetch updated categories and reinitialize DataTable
            dispatch(getCategories()).then(() => {
                setLoading(false);
    
                // Reinitialize DataTable with updated data
                $("#example1").DataTable({
                    "responsive": true,
                    "lengthChange": false,
                    "autoWidth": false,
                }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');
    
                feather.replace(); // Reinitialize Feather icons if used
            });
        } catch (error) {
            console.error("Error deleting keyword:", error);
        }
        setShowDeleteConfirmation(false);
    };

    const handleFileChange = (e, setPreview) => {
        const file = e.target.files[0]; // Get the selected file
        setCategoryDetails({ ...categoryDetails, file });
       
        const reader = new FileReader();

        reader.onloadend = () => {
            
            setPreview(reader.result);
            
        };

        if (file) {
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    };

    const handleUpdateFileChange = (e, setPreview) => {
        const file = e.target.files[0]; // Get the selected file
        setUpdateCategoryDetails({ ...updateCategoryDetails, file });
        const reader = new FileReader();

        reader.onloadend = () => {
            setPreview(reader.result);
            setNewImageSelected(true);
        };

        if (file) {
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
            setNewImageSelected(false);
        }
    };

    

    const handleUpdateChanges = async(event) => {
        event.preventDefault();
        // Retrieve the user details from session storage
    const userString = sessionStorage.getItem('user');
    const user = JSON.parse(userString);
    const encUserId = user.encUserId;

    // Create a copy of the updateCategoryDetails and add encUserId to it
    const updatedDetails = {
        ...updateCategoryDetails,
        encUserId: encUserId
    };

    console.log("catDetails", updatedDetails);
    await dispatch(updateCategory(updatedDetails));
    dispatch(getCategories());
    setUpdateCategoryDetails(prevProductDetails => ({
        ...prevProductDetails,
        encCatId:'',
        encUserId:'',
        categoryName: '',
        file: '',
    }));
    closeModal();
    }

    const closeModal = () => {
        setShowUpdateCategoryModal(false);
        setNewImageSelected(false);
        setPhotoPreview(null);
        setUpdateCategoryDetails(prevProductDetails => ({
            ...prevProductDetails,
            encCatId:'',
            encUserId:'',
            categoryName:'',
            file: '',

        }));
        
            fileInputRef.current.value = null; // Reset the file input
          
      };

    const userString = sessionStorage.getItem('user');
    const user = JSON.parse(userString);
    const encUserId = user.encUserId;

    useEffect(() => {
        setCategoryDetails(prevProductDetails => ({
            ...prevProductDetails,
            encUserId: encUserId
        }));
    }, [encUserId]);

    const handleSaveChanges = async (event) => {
        event.preventDefault();
    
        const userString = sessionStorage.getItem('user');
        const user = JSON.parse(userString);
        const encUserId = user.encUserId;
    
        const formData = new FormData();
        formData.append('categoryName', categoryDetails.categoryName);
        formData.append('encUserId', encUserId);
    
        if (categoryDetails.file) {
            formData.append('file', categoryDetails.file);
        }
    
        try {
            const res = await axios.post(`${baseURL}api/categories`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            // Reset state after successful save
            setCategoryDetails({
                categoryName: '',
                file: null,
            });
    
            setShowAddCategoryModal(false);
    
            // Destroy existing DataTable before fetching new data
            if ($.fn.DataTable.isDataTable('#example1')) {
                $('#example1').DataTable().destroy();
            }
    
            // Fetch updated categories and reinitialize DataTable
            dispatch(getCategories()).then(() => {
                setLoading(false);
    
                // Reinitialize DataTable with updated data
                $("#example1").DataTable({
                    "responsive": true,
                    "lengthChange": false,
                    "autoWidth": false,
                }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');
    
                feather.replace(); // Reinitialize Feather icons if used
            });
    
            setPhotoPreview(null);
            closeButtonRef.current.click();
            console.log("close button clicked");
        } catch (error) {
            console.error("Error adding category:", error);
        }
    };
    


    return (
        <div>
            <div className="main-content">
                <section className="section">
                    <div className="section-body">
                        <div className="row">
                            <div className="col-12">
                                <div className="card">

                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-header">
                                        <div>
                                            <button
                                                style={{
                                                    position: 'absolute',
                                                    top: 10,
                                                    right: 10,
                                                    padding: '1px 20px',
                                                    backgroundColor: 'dodgerblue',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '5px',
                                                    cursor: 'pointer',
                                                }}
                                                onClick={() => setShowAddCategoryModal(true)}
                                            >
                                                <i className="feather icon-plus"></i>
                                                Add New
                                            </button>
                                        </div>

                                        <h4>Categories</h4>
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
                      {categories && categories.map((item, index) => (
                        <tr key={item.id}>
                          <td>{index + 1}</td>
                          <td>{item.cat_name} ({item.countOfSubCat})</td>
                          <td>
                          <button
                    type="button"
                    className=""
                    style={{
                        margintop: "100px", marginLeft: '5px',
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        color: isHovered ? 'blue' : 'inherit',
                        padding: 0
                    }}

                    onClick={() => viewCategory(item)}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <IoEyeOutline style={{ fontSize: "20px" }} />
                    {/* view */}
                </button>

                <button
                    type="button"
                    className=""
                    style={{ margintop: "100px", marginLeft: '5px' }}
                    onClick={() => handleAssign(item)}
                >
                    <MdOutlineAssignment style={{ fontSize: "20px" }} />
                    {/* Assign */}
                </button>

                <button
                    type="button"
                    className=""
                    style={{ margintop: "100px", marginLeft: '5px' }}
                    onClick={() => handleDelete(item)}
                >
                    <MdDeleteOutline style={{ fontSize: "20px" }} />
                    {/* delete */}
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
                                mbb
                            </div>
                            <div className="modal-body">
                                Are you sure you want to delete {categoryToDelete && categoryToDelete.cat_name}?
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
                                Unable to delete the category '{categoryToDelete && categoryToDelete.cat_name}' at the moment. It appears that this category still contains subcategories.

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
                    className={`modal fade ${showAddCategoryModal ? "show" : ""}`}
                    id="addUnitModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="addUnitModalLabel"
                    aria-hidden={!showAddCategoryModal}
                    style={{ display: showAddCategoryModal ? "block" : "none" }}
                >
                    <div className="modal-dialog modal-dialog-centered" role="document" style={{ maxWidth: '70vh', maxHeight: '20vh', }}>
                        <div className="modal-backdrop" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backdropFilter: 'blur(2px)', backgroundColor: 'rgba(0, 0, 0, 0.3)', zIndex: 0 }}></div>
                        <div className="modal-content">
                            <div className="modal-header " style={{ backgroundColor: '#209ccd' }} >
                                <h5 className="modal-title" id="exampleModalCenterTitle" style={{ marginLeft: '90px', backgroundColor: '#209ccd' }}>Add New Category</h5>

                                <button type="button" className="close" onClick={() => setShowAddCategoryModal(false)} aria-label="Close" ref={closeButtonRef} style={{ border: 'none', outline: 'none' }}>

                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        

                            <div className="modal-body">
                                <div className="form-group" style={{ textAlign: 'left', display: 'flex', alignItems: 'center' }}>
                                    <label htmlFor="categoryName" style={{ marginRight: '10px' }}>Category Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="categoryName"
                                        placeholder="Enter Category Name"
                                        value={categoryDetails.categoryName}
                                        onChange={(e) => setCategoryDetails({ ...categoryDetails, categoryName: e.target.value })}
                                        style={{ fontSize: '12px', height: '30px', flexGrow: 1 }} // Adjust the font size as needed
                                    />
                                </div>
                                <div className="image-section" style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                    <div className="fallback" style={{ width: '100px' }}>
                                        <input
                                            type="file"
                                            id="photo"
                                            name="photo"
                                            accept="image/*"

                                            onChange={(e) => handleFileChange(e, setPhotoPreview)}
                                            style={{ width: '95%' }} // Adjust width as needed
                                        />
                                        <p style={{ fontSize: '10px', margin: '0px 0 0 0', color: 'red' }}>Select image 200x200</p>
                                    </div>
                                    <div>
                                        {photoPreview && (
                                            <div className="file-preview">
                                                <img
                                                    src={photoPreview}
                                                    alt="Photo Preview"
                                                    style={{ width: '100px', height: '80px', marginLeft: '20px', marginBottom: '20px' }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer" style={{ position: 'absolute', bottom: 0, right: 0, width: '100%', marginTop: '20%' }}>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleSaveChanges}
                                    style={{ height: '30px', width: 'auto', fontSize: '13px', padding: '0 6px', display: 'flex', alignItems: 'center', fontWeight: 'normal', justifyContent: 'center', backgroundColor: '#209ccd', borderRadius: '20%' }}
                                >
                                    <HiOutlineViewGridAdd /> Add
                                </button>

                            </div>




                        </div>
                    </div>
                </div>

                <div
                    className={`modal fade ${showUpdateCategoryModal ? "show" : ""}`}
                    id="addUnitModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="addUnitModalLabel"
                    aria-hidden={!showUpdateCategoryModal}
                    style={{ display: showUpdateCategoryModal ? "block" : "none" }}
                >
                    <div className="modal-dialog modal-dialog-centered" role="document" style={{ maxWidth: '70vh', maxHeight: '20vh', }}>
                        <div className="modal-backdrop" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backdropFilter: 'blur(2px)', backgroundColor: 'rgba(0, 0, 0, 0.3)', zIndex: 0 }}></div>
                        <div className="modal-content">
                            <div className="modal-header " style={{ backgroundColor: '#209ccd' }} >
                                <h5 className="modal-title" id="exampleModalCenterTitle" style={{ marginLeft: '90px', backgroundColor: '#209ccd' }}>Update Category</h5>

                                <button type="button" className="close" onClick={closeModal} aria-label="Close" ref={closeButtonRef} style={{ border: 'none', outline: 'none' }}>

                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>


                            <div className="modal-body">
                                <div className="form-group" style={{ textAlign: 'left', display: 'flex', alignItems: 'center' }}>
                                    <label htmlFor="categoryName" style={{ marginRight: '10px' }}>Category Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="categoryName"
                                        placeholder="Enter Category Name"
                                         value={categoryToUpdate.cat_name}
                                        disabled
                                        style={{ fontSize: '12px', height: '30px', flexGrow: 1 }} // Adjust the font size as needed
                                    />
                                </div>
                                <div className="image-section" style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                    <div className="fallback" style={{ width: '100px' }}>
                                        <input
                                            type="file"
                                            id="photo"
                                            name="photo"
                                            accept="image/*"

                                            onChange={(e) => handleUpdateFileChange(e, setPhotoPreview)}
                                            style={{ width: '95%' }} // Adjust width as needed
                                            ref={fileInputRef}
                                        />
                                        <p style={{ fontSize: '10px', margin: '0px 0 0 0', color: 'red' }}>Select image 200x200</p>
                                    </div>
                                    <div>
                                        {photoPreview && (
                                            <div className="file-preview">
                                                <img
                                                    src={photoPreview}
                                                    alt="Photo Preview"
                                                    style={{ width: '100px', height: '80px', marginLeft: '20px', marginBottom: '20px' }}
                                                    
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer" style={{ position: 'absolute', bottom: 0, right: 0, width: '100%', marginTop: '20%' }}>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={closeModal}
                                    style={{ height: '30px', width: 'auto', fontSize: '13px', padding: '0 6px', display: 'flex', alignItems: 'center', fontWeight: 'normal', justifyContent: 'center', backgroundColor: '#209ccd', borderRadius: '20%' }}
                                >
                                     Close
                                </button>
                                {newImageSelected && (
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={handleUpdateChanges}
                                    style={{ height: '30px', width: 'auto', fontSize: '13px', padding: '0 6px', display: 'flex', alignItems: 'center', fontWeight: 'normal', justifyContent: 'center', borderRadius: '20%' }}
                                >
                                   <HiOutlineViewGridAdd /> Update
                                </button>
                                )}
                            </div>




                        </div>
                    </div>
                </div>




            </div>

            <div className="settingSidebar">
                <a href="javascript:void(0)" className="settingPanelToggle"> <i className="fa fa-spin fa-cog" />
                </a>
                <div className="settingSidebar-body ps-container ps-theme-default">
                    <div className=" fade show active">
                        <div className="setting-panel-header">Setting Panel
                        </div>
                        <div className="p-15 border-bottom">
                            <h6 className="font-medium m-b-10">Select Layout</h6>
                            <div className="selectgroup layout-color w-50">
                                <label className="selectgroup-item">
                                    <input type="radio" name="value" defaultValue={1} className="selectgroup-input-radio select-layout" defaultChecked />
                                    <span className="selectgroup-button">Light</span>
                                </label>
                                <label className="selectgroup-item">
                                    <input type="radio" name="value" defaultValue={2} className="selectgroup-input-radio select-layout" />
                                    <span className="selectgroup-button">Dark</span>
                                </label>
                            </div>
                        </div>
                        <div className="p-15 border-bottom">
                            <h6 className="font-medium m-b-10">Sidebar Color</h6>
                            <div className="selectgroup selectgroup-pills sidebar-color">
                                <label className="selectgroup-item">
                                    <input type="radio" name="icon-input" defaultValue={1} className="selectgroup-input select-sidebar" />
                                    <span className="selectgroup-button selectgroup-button-icon" data-toggle="tooltip" data-original-title="Light Sidebar"><i className="fas fa-sun" /></span>
                                </label>
                                <label className="selectgroup-item">
                                    <input type="radio" name="icon-input" defaultValue={2} className="selectgroup-input select-sidebar" defaultChecked />
                                    <span className="selectgroup-button selectgroup-button-icon" data-toggle="tooltip" data-original-title="Dark Sidebar"><i className="fas fa-moon" /></span>
                                </label>
                            </div>
                        </div>
                        <div className="p-15 border-bottom">
                            <h6 className="font-medium m-b-10">Color Theme</h6>
                            <div className="theme-setting-options">
                                <ul className="choose-theme list-unstyled mb-0">
                                    <li title="white" className="active">
                                        <div className="white" />
                                    </li>
                                    <li title="cyan">
                                        <div className="cyan" />
                                    </li>
                                    <li title="black">
                                        <div className="black" />
                                    </li>
                                    <li title="purple">
                                        <div className="purple" />
                                    </li>
                                    <li title="orange">
                                        <div className="orange" />
                                    </li>
                                    <li title="green">
                                        <div className="green" />
                                    </li>
                                    <li title="red">
                                        <div className="red" />
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="p-15 border-bottom">
                            <div className="theme-setting-options">
                                <label className="m-b-0">
                                    <input type="checkbox" name="custom-switch-checkbox" className="custom-switch-input" id="mini_sidebar_setting" />
                                    <span className="custom-switch-indicator" />
                                    <span className="control-label p-l-10">Mini Sidebar</span>
                                </label>
                            </div>
                        </div>
                        <div className="p-15 border-bottom">
                            <div className="theme-setting-options">
                                <label className="m-b-0">
                                    <input type="checkbox" name="custom-switch-checkbox" className="custom-switch-input" id="sticky_header_setting" />
                                    <span className="custom-switch-indicator" />
                                    <span className="control-label p-l-10">Sticky Header</span>
                                </label>
                            </div>
                        </div>
                        <div className="mt-4 mb-4 p-3 align-center rt-sidebar-last-ele">
                            <a href="#" className="btn btn-icon icon-left btn-primary btn-restore-theme">
                                <i className="fas fa-undo" /> Restore Default
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Categories;