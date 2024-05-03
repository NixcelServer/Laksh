import React, { useEffect, useState, useRef } from 'react';
import feather from 'feather-icons';
import { useDispatch, useSelector } from "react-redux";
import { addCategory, getCategories } from '../../redux/Admin/admin.action';

const Categories = () => {
    const categories = useSelector(state => state.masterData.categories);
    
    const [categoryName, setNewCategoryName] = useState("");
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
    const dispatch = useDispatch();

    const closeButtonRef = useRef(null);
    
    useEffect(() => {
        feather.replace();
        dispatch(getCategories());
    }, []); // Empty dependency array means this effect runs only once after the component mounts

    const handleDelete = async (category) => {
        setCategoryToDelete(category);
        setShowDeleteConfirmation(true);
        
      };

    const handleAssign = () => {
        // Define the logic for canceling delete action
    };

    const handleCancelDelete = () => {
        // Define the logic for canceling delete action
    };
    
    const handleConfirmDelete = () => {
        // Define the logic for confirming delete action
    };
    
    const handleSaveChanges = async(event) => {
        // Define the logic for saving changes
        event.preventDefault();

        const userString = sessionStorage.getItem('user');
        // Parse the user object from the string format stored in sessionStorage
        const user = JSON.parse(userString);
    
        // Retrieve the encUserId from the user object
        const encUserId = user.encUserId;
        console.log(encUserId);
        
        const payload ={
          categoryName,encUserId   
        }
        console.log(payload);

        try {
          
            console.log("in try block");
            
            await dispatch(addCategory(payload));
            console.log("category added");
            
           // const response = await axios.post("http://127.0.0.1:8000/api/categories", payload);
            dispatch(getCategories());
            console.log("update redux");
            // console.log("Category added successfully:", response.data);
      
           // fetchCategories();
            closeButtonRef.current.click();
           
            
            
          } catch (error) {
            console.error("Error adding category:", error);
           // setError(error.message); // Set error state
          }



    };
   
    
    return (
        <div>
            {/* "Add New" button */}
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

                                    

                                                {/* Plus sign icon */}
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

                            <td>{category.cat_name}</td> {/* Accessing the 'cat_name' property */}
                            {/* <button onClick={() => handleDelete(category.encCatId)}>Delete</button> Accessing the 'add_date' property */}
                            {/* Accessing the 'add_time' property */}

                            <td>
                              <button
                                type="button"
                                className="btn btn-danger btn-sm"
                                style={{ marginRight: "8px" }}
                                onClick={() => handleDelete(category)}
                              >
                                Delete
                              </button>
                              
                              <button
                                type="button"
                                className="btn btn-success btn-sm"
                                style={{ margintop: "100px"}}
                                onClick={() => handleAssign(category)}
                                
                                >
                                Assign
                              </button>
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

                {/* Delete confirmation modal */}
                <div
                    className={`modal fade ${showDeleteConfirmation ? "show" : ""}`}
                    id="deleteConfirmationModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="deleteConfirmationModalLabel"
                    aria-hidden={!showDeleteConfirmation}
                    style={{ display: showDeleteConfirmation ? "block" : "none" }}
                >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="deleteConfirmationModalLabel">
                                    Confirm Deletion
                                </h5>
                                <button
                                    type="button"
                                    className="close"
                                    onClick={handleCancelDelete}
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                Are you sure you want to delete{" "}
                                {categoryToDelete && categoryToDelete.cat_name}?
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={handleCancelDelete}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={handleConfirmDelete}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Add Unit Modal */}
                <div
                    className={`modal fade ${showAddCategoryModal ? "show" : ""}`}
                    id="addUnitModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="addUnitModalLabel"
                    aria-hidden={!showAddCategoryModal}
                    style={{ display: showAddCategoryModal ? "block" : "none" }}
                >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <form>
                                <div className="modal-header">
                                    <h5 className="modal-title" id="addUnitModalLabel">
                                        Add New Category
                                    </h5>
                                    <button
                                        type="button"
                                        className="close"
                                        onClick={() => setShowAddCategoryModal(false)}
                                        aria-label="Close"
                                    >
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label htmlFor="categoryName">Category Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="categoryName"
                                            placeholder="Enter Category Name"
                                            value={categoryName}
                                            onChange={(e) => setNewCategoryName(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        ref={closeButtonRef}
                                        type='button'
                                        className='btn btn-secondary'
                                        onClick={() => setShowAddCategoryModal(false)}
                                    >
                                        Close
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={handleSaveChanges}
                                        style={{ marginTop: '0px' }}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* SIDEBAR */}
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
            {/* <!-- General JS Scripts --> */}
  <script src="assets/js/app.min.js"></script>
  {/* <!-- JS Libraies --> */}
  <script src="assets/bundles/datatables/datatables.min.js"></script>
  <script src="assets/bundles/datatables/DataTables-1.10.16/js/dataTables.bootstrap4.min.js"></script>
  <script src="assets/bundles/jquery-ui/jquery-ui.min.js"></script>
  {/* <!-- Page Specific JS File --> */}
  <script src="assets/js/page/datatables.js"></script>
  {/* <!-- Template JS File --> */}
  <script src="assets/js/scripts.js"></script>
  {/* <!-- Custom JS File --> */}
  <script src="assets/js/custom.js"></script>
        </div>
    );
};

export default Categories;




