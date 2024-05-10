import React, { useEffect, useState, useRef } from 'react';
import feather from 'feather-icons';
import { useDispatch, useSelector } from "react-redux";
import { addCategory, getCategories, getSubCategories } from '../../redux/Admin/admin.action';
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';

const Categories = () => {
    const categories = useSelector(state => state.masterData.categories);
    const subCategories = useSelector(state => state.masterData.subCategories);
    
    const [categoryName, setNewCategoryName] = useState("");
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showCannotDeleteConfirmation, setShowCannotDeleteConfirmation] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const closeButtonRef = useRef(null);
    
    useEffect(() => {
        const script1 = document.createElement('script');
        script1.src = 'assets/bundles/datatables/datatables.min.js';
        script1.async = true;
        document.body.appendChild(script1);

        const script2 = document.createElement('script');
        script2.src = 'assets/bundles/datatables/DataTables-1.10.16/js/dataTables.bootstrap4.min.js';
        script2.async = true;
        document.body.appendChild(script2);

        const script3 = document.createElement('script');
        script3.src = 'assets/bundles/jquery-ui/jquery-ui.min.js';
        script3.async = true;
        document.body.appendChild(script3);

        const script4 = document.createElement('script');
        script4.src = 'assets/js/page/datatables.js';
        script4.async = true;
        document.body.appendChild(script4);

        // Initialize Feather icons
        feather.replace();
        dispatch(getCategories());
        dispatch(getSubCategories());
        // Cleanup function to remove the scripts when the component unmounts
        return () => {
            document.body.removeChild(script1);
            document.body.removeChild(script2);
            document.body.removeChild(script3);
            document.body.removeChild(script4);
        };
        
       
    }, []); // Empty dependency array means this effect runs only once after the component mounts

    const handleDelete = async (category) => {
        const subcategoriesAssigned = subCategories.some(subCategory => subCategory.encCatId === category.encCatId);

        if (subcategoriesAssigned) {
            setCategoryToDelete(category);
            setShowCannotDeleteConfirmation(true);
        } else {
            setCategoryToDelete(category);
            setShowDeleteConfirmation(true);
        }
    };
    

    const handleAssign = (category) => {
        const encCatId = category.encCatId;
        navigate(`/subcategories/${encCatId}`);
    };

    const handleCancelDelete = () => {
        setShowDeleteConfirmation(false);
    };

    const handleOK = () => {
        setShowCannotDeleteConfirmation(false);
    };
    
    
    const handleConfirmDelete = async() => {
        const category = categoryToDelete;
        try {
          const userString =  sessionStorage.getItem('user');
          const user = JSON.parse(userString);
          const encUserId = user.encUserId;
      
          const payload = {
            encUserId
          };
      
          const response = await axios.delete(`http://127.0.0.1:8000/api/categories/${category.encCatId}`, { data: payload });      
          dispatch(getCategories());
        } catch (error) {
          console.error("Error deleting keyword:", error);
        }
        setShowDeleteConfirmation(false);
      };
    
    const handleSaveChanges = async(event) => {
        event.preventDefault();

        const userString = sessionStorage.getItem('user');
        const user = JSON.parse(userString);
        const encUserId = user.encUserId;
        
        const payload ={
          categoryName,encUserId   
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
                                            <table className="table table-striped table-hover" id="save-stage" style={{width: '100%'}}>
                                                <thead>
                                                    <tr>
                                                        <th>Sr. No.</th>
                                                        <th>Category</th>
                                                        <th>Action</th>
                                                        
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {categories.map((category, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>

                            <td>{category.cat_name}</td>

                            <td>
                            <button
                                type="button"
                                className="btn btn-danger btn-sm"
                                style={{ marginRight: "8px", color: 'black', backgroundColor: 'transparent', borderColor: 'transparent' }}
                                onClick={() => handleDelete(category)}
                            >
                                {/* <i data-feather="trash" style={{ alignContent: 'center' }}></i> */}
                                delete
                            </button>

                            <Link to="/subcategories">
                              <button
                                type="button"
                                className="btn btn-success btn-sm"
                                style={{ margintop: "100px"}}
                                onClick={() => handleAssign(category)}
                                
                                >
                                Assign
                              </button>
                              </Link>
                            </td>
                          </tr>
                        ))}
                                                </tbody>
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
                   
                   <div className="modal-dialog modal-dialog-centered" role="document" style={{maxWidth:'70vh', maxHeight: '20vh' }}>
    <div className="modal-backdrop" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backdropFilter: 'blur(2px)', backgroundColor: 'rgba(0, 0, 0, 0.3)', zIndex: 0 }}></div>
    <div className="modal-content">
        <div className="modal-header">
            <h5 className="modal-title" id="exampleModalCenterTitle">Add New Category</h5>
            <button type="button" className="close" onClick={() => setShowAddCategoryModal(false)} aria-label="Close" style={{ border: 'none', outline: 'none' }}>
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div className="modal-body">
            <div className="form-group"style={{textAlign:'left'}}>
                <label htmlFor="categoryName">Category Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="categoryName"
                    placeholder="Enter Category Name"
                    value={categoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    style={{ fontSize: '12px' , height: '30px' }} // Adjust the font size as needed
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
