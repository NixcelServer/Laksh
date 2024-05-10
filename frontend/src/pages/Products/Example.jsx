import React, { useEffect, useState, useRef } from 'react';
import feather from 'feather-icons';
import { useDispatch, useSelector } from 'react-redux';
import { addUOM, getUOM } from '../../redux/Admin/admin.action';
import axios from 'axios';

const Example = () => {
    const [uomName, setNewUOMName] = useState("");
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [UOMToDelete, setUOMToDelete] = useState(null);
    const [showAddUOMModal, setShowAddUOMModal] = useState(false);
    const dispatch = useDispatch();
    const uoms = useSelector(state => state.masterData.uom);


    const closeButtonRef = useRef(null);

    useEffect(() => {
        feather.replace();
        dispatch(getUOM());
    }, []); // Empty dependency array means this effect runs only once after the component mounts

    const handleDelete = async (uom) => {

        setUOMToDelete(uom);
        setShowDeleteConfirmation(true);
      };

      const handleCancelDelete = () => {
        setShowDeleteConfirmation(false);
      }
    
      const handleConfirmDelete = async() => {
        const uom = UOMToDelete;
        try {
          const userString =  sessionStorage.getItem('user');
          const user = JSON.parse(userString);
          const encUserId = user.encUserId;
      
          // Include both encUserId and encuomId in the payload
          const payload = {
            encUserId
          };
      
          // Perform delete operation using encuomId and encUserId
          const response = await axios.delete(`http://127.0.0.1:8000/api/unit-of-measurements/${uom.encUomId}`, { data: payload });      
          //console.log("uom deleted successfully:", response.data);
          
          // Refetch uoms after deletion
          dispatch(getUOM());
        } catch (error) {
          console.error("Error deleting uom:", error);
        }
        //dispatch(getCategories(updatedCategories));
        setShowDeleteConfirmation(false);
        
      };
    
    const handleSaveChanges = async (event) => {
        // Define the logic for saving changes
        // Define the logic for saving changes
        event.preventDefault();

        const userString = sessionStorage.getItem('user');
        // Parse the user object from the string format stored in sessionStorage
        const user = JSON.parse(userString);
    
        // Retrieve the encUserId from the user object
        const encUserId = user.encUserId;
        console.log(encUserId);
        
        const payload ={
          uomName,encUserId   
        }
        console.log(payload);

        try {
          
            console.log("in try block");
            
            await dispatch(addUOM(payload));
            console.log("uom added");
            
           // const response = await axios.post("http://127.0.0.1:8000/api/categories", payload);
            dispatch(getUOM());
            console.log("update redux");
            // console.log("Category added successfully:", response.data);
      
           // fetchCategories();
            closeButtonRef.current.click();
           
            
            
          } catch (error) {
            console.error("Error adding uom:", error);
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
                                                onClick={() => setShowAddUOMModal(true)}
                                            >
                                                {/* Plus sign icon */}
                                                <i className="feather icon-plus"></i>
                                                Add New
                                            </button>
                                        </div>
                                        <h4>Unit of Measurement</h4>
                                    </div>
                                    

                                    <div className="main-content">
  <section className="section">
    <div className="section-body">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h4>Basic DataTables</h4>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-striped" id="table-1">
                  <thead>
                    <tr>
                      <th className="text-center">
                        #
                      </th>
                      <th>Task Name</th>
                      <th>Progress</th>
                      <th>Members</th>
                      <th>Due Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        1
                      </td>
                      <td>Create a mobile app</td>
                      <td className="align-middle">
                        <div className="progress progress-xs">
                          <div className="progress-bar bg-success width-per-40">
                          </div>
                        </div>
                      </td>
                      <td>
                        <img alt="image" src="assets/img/users/user-5.png" width={35} />
                      </td>
                      <td>2018-01-20</td>
                      <td>
                        <div className="badge badge-success badge-shadow">Completed</div>
                      </td>
                      <td><a href="#" className="btn btn-primary">Detail</a></td>
                    </tr>
                    <tr>
                      <td>
                        2
                      </td>
                      <td>Redesign homepage</td>
                      <td className="align-middle">
                        <div className="progress progress-xs">
                          <div className="progress-bar width-per-60" />
                        </div>
                      </td>
                      <td>
                        <img alt="image" src="assets/img/users/user-1.png" width={35} />
                        <img alt="image" src="assets/img/users/user-3.png" width={35} />
                        <img alt="image" src="assets/img/users/user-4.png" width={35} />
                      </td>
                      <td>2018-04-10</td>
                      <td>
                        <div className="badge badge-info badge-shadow">Todo</div>
                      </td>
                      <td><a href="#" className="btn btn-primary">Detail</a></td>
                    </tr>
                    <tr>
                      <td>
                        3
                      </td>
                      <td>Backup database</td>
                      <td className="align-middle">
                        <div className="progress progress-xs">
                          <div className="progress-bar bg-warning width-per-70" />
                        </div>
                      </td>
                      <td>
                        <img alt="image" src="assets/img/users/user-1.png" width={35} />
                        <img alt="image" src="assets/img/users/user-2.png" width={35} />
                      </td>
                      <td>2018-01-29</td>
                      <td>
                        <div className="badge badge-warning badge-shadow">In Progress</div>
                      </td>
                      <td><a href="#" className="btn btn-primary">Detail</a></td>
                    </tr>
                    <tr>
                      <td>
                        4
                      </td>
                      <td>Input data</td>
                      <td className="align-middle">
                        <div className="progress progress-xs">
                          <div className="progress-bar bg-success width-per-90" />
                        </div>
                      </td>
                      <td>
                        <img alt="image" src="assets/img/users/user-2.png" width={35} />
                        <img alt="image" src="assets/img/users/user-5.png" width={35} />
                        <img alt="image" src="assets/img/users/user-4.png" width={35} />
                        <img alt="image" src="assets/img/users/user-1.png" width={35} />
                      </td>
                      <td>2018-01-16</td>
                      <td>
                        <div className="badge badge-success badge-shadow">Completed</div>
                      </td>
                      <td><a href="#" className="btn btn-primary">Detail</a></td>
                    </tr>
                    <tr>
                      <td>
                        5
                      </td>
                      <td>Create a mobile app</td>
                      <td className="align-middle">
                        <div className="progress progress-xs">
                          <div className="progress-bar bg-success width-per-40">
                          </div>
                        </div>
                      </td>
                      <td>
                        <img alt="image" src="assets/img/users/user-5.png" width={35} />
                      </td>
                      <td>2018-01-20</td>
                      <td>
                        <div className="badge badge-success badge-shadow">Completed</div>
                      </td>
                      <td><a href="#" className="btn btn-primary">Detail</a></td>
                    </tr>
                    <tr>
                      <td>
                        6
                      </td>
                      <td>Redesign homepage</td>
                      <td className="align-middle">
                        <div className="progress progress-xs">
                          <div className="progress-bar width-per-60" />
                        </div>
                      </td>
                      <td>
                        <img alt="image" src="assets/img/users/user-1.png" width={35} />
                        <img alt="image" src="assets/img/users/user-3.png" width={35} />
                        <img alt="image" src="assets/img/users/user-4.png" width={35} />
                      </td>
                      <td>2018-04-10</td>
                      <td>
                        <div className="badge badge-info badge-shadow">Todo</div>
                      </td>
                      <td><a href="#" className="btn btn-primary">Detail</a></td>
                    </tr>
                    <tr>
                      <td>
                        7
                      </td>
                      <td>Backup database</td>
                      <td className="align-middle">
                        <div className="progress progress-xs">
                          <div className="progress-bar bg-warning width-per-70" />
                        </div>
                      </td>
                      <td>
                        <img alt="image" src="assets/img/users/user-1.png" width={35} />
                        <img alt="image" src="assets/img/users/user-2.png" width={35} />
                      </td>
                      <td>2018-01-29</td>
                      <td>
                        <div className="badge badge-warning badge-shadow">In Progress</div>
                      </td>
                      <td><a href="#" className="btn btn-primary">Detail</a></td>
                    </tr>
                    <tr>
                      <td>
                        8
                      </td>
                      <td>Input data</td>
                      <td className="align-middle">
                        <div className="progress progress-xs">
                          <div className="progress-bar bg-success width-per-90" />
                        </div>
                      </td>
                      <td>
                        <img alt="image" src="assets/img/users/user-2.png" width={35} />
                        <img alt="image" src="assets/img/users/user-5.png" width={35} />
                        <img alt="image" src="assets/img/users/user-4.png" width={35} />
                        <img alt="image" src="assets/img/users/user-1.png" width={35} />
                      </td>
                      <td>2018-01-16</td>
                      <td>
                        <div className="badge badge-success badge-shadow">Completed</div>
                      </td>
                      <td><a href="#" className="btn btn-primary">Detail</a></td>
                    </tr>
                    <tr>
                      <td>
                        9
                      </td>
                      <td>Create a mobile app</td>
                      <td className="align-middle">
                        <div className="progress progress-xs">
                          <div className="progress-bar bg-success width-per-40">
                          </div>
                        </div>
                      </td>
                      <td>
                        <img alt="image" src="assets/img/users/user-5.png" width={35} />
                      </td>
                      <td>2018-01-20</td>
                      <td>
                        <div className="badge badge-success badge-shadow">Completed</div>
                      </td>
                      <td><a href="#" className="btn btn-primary">Detail</a></td>
                    </tr>
                    <tr>
                      <td>
                        10
                      </td>
                      <td>Redesign homepage</td>
                      <td className="align-middle">
                        <div className="progress progress-xs">
                          <div className="progress-bar width-per-60" />
                        </div>
                      </td>
                      <td>
                        <img alt="image" src="assets/img/users/user-1.png" width={35} />
                        <img alt="image" src="assets/img/users/user-3.png" width={35} />
                        <img alt="image" src="assets/img/users/user-4.png" width={35} />
                      </td>
                      <td>2018-04-10</td>
                      <td>
                        <div className="badge badge-info badge-shadow">Todo</div>
                      </td>
                      <td><a href="#" className="btn btn-primary">Detail</a></td>
                    </tr>
                    <tr>
                      <td>
                        11
                      </td>
                      <td>Backup database</td>
                      <td className="align-middle">
                        <div className="progress progress-xs">
                          <div className="progress-bar bg-warning width-per-70" />
                        </div>
                      </td>
                      <td>
                        <img alt="image" src="assets/img/users/user-1.png" width={35} />
                        <img alt="image" src="assets/img/users/user-2.png" width={35} />
                      </td>
                      <td>2018-01-29</td>
                      <td>
                        <div className="badge badge-warning badge-shadow">In Progress</div>
                      </td>
                      <td><a href="#" className="btn btn-primary">Detail</a></td>
                    </tr>
                    <tr>
                      <td>
                        12
                      </td>
                      <td>Input data</td>
                      <td className="align-middle">
                        <div className="progress progress-xs">
                          <div className="progress-bar bg-success width-per-90" />
                        </div>
                      </td>
                      <td>
                        <img alt="image" src="assets/img/users/user-2.png" width={35} />
                        <img alt="image" src="assets/img/users/user-5.png" width={35} />
                        <img alt="image" src="assets/img/users/user-4.png" width={35} />
                        <img alt="image" src="assets/img/users/user-1.png" width={35} />
                      </td>
                      <td>2018-01-16</td>
                      <td>
                        <div className="badge badge-success badge-shadow">Completed</div>
                      </td>
                      <td><a href="#" className="btn btn-primary">Detail</a></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h4>Multi Select</h4>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-striped" id="table-2">
                  <thead>
                    <tr>
                      <th className="text-center pt-3">
                        <div className="custom-checkbox custom-checkbox-table custom-control">
                          <input type="checkbox" data-checkboxes="mygroup" data-checkbox-role="dad" className="custom-control-input" id="checkbox-all" />
                          <label htmlFor="checkbox-all" className="custom-control-label">&nbsp;</label>
                        </div>
                      </th>
                      <th>Task Name</th>
                      <th>Progress</th>
                      <th>Members</th>
                      <th>Due Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-center pt-2">
                        <div className="custom-checkbox custom-control">
                          <input type="checkbox" data-checkboxes="mygroup" className="custom-control-input" id="checkbox-1" />
                          <label htmlFor="checkbox-1" className="custom-control-label">&nbsp;</label>
                        </div>
                      </td>
                      <td>Create a mobile app</td>
                      <td className="align-middle">
                        <div className="progress progress-xs">
                          <div className="progress-bar width-per-70" />
                        </div>
                      </td>
                      <td>
                        <img alt="image" src="assets/img/users/user-5.png" width={35} />
                      </td>
                      <td>2018-01-20</td>
                      <td>
                        <div className="badge badge-success badge-shadow">Completed</div>
                      </td>
                      <td><a href="#" className="btn btn-primary">Detail</a></td>
                    </tr>
                    <tr>
                      <td className="text-center pt-2">
                        <div className="custom-checkbox custom-control">
                          <input type="checkbox" data-checkboxes="mygroup" className="custom-control-input" id="checkbox-2" />
                          <label htmlFor="checkbox-2" className="custom-control-label">&nbsp;</label>
                        </div>
                      </td>
                      <td>Redesign homepage</td>
                      <td className="align-middle">
                        <div className="progress progress-xs">
                          <div className="progress-bar width-per-60" />
                        </div>
                      </td>
                      <td>
                        <img alt="image" src="assets/img/users/user-1.png" width={35} />
                        <img alt="image" src="assets/img/users/user-3.png" width={35} />
                        <img alt="image" src="assets/img/users/user-4.png" width={35} />
                      </td>
                      <td>2018-04-10</td>
                      <td>
                        <div className="badge badge-info badge-shadow">Todo</div>
                      </td>
                      <td><a href="#" className="btn btn-primary">Detail</a></td>
                    </tr>
                    <tr>
                      <td className="text-center pt-2">
                        <div className="custom-checkbox custom-control">
                          <input type="checkbox" data-checkboxes="mygroup" className="custom-control-input" id="checkbox-3" />
                          <label htmlFor="checkbox-3" className="custom-control-label">&nbsp;</label>
                        </div>
                      </td>
                      <td>Backup database</td>
                      <td className="align-middle">
                        <div className="progress progress-xs">
                          <div className="progress-bar bg-warning width-per-70" />
                        </div>
                      </td>
                      <td>
                        <img alt="image" src="assets/img/users/user-1.png" width={35} />
                        <img alt="image" src="assets/img/users/user-2.png" width={35} />
                      </td>
                      <td>2018-01-29</td>
                      <td>
                        <div className="badge badge-warning badge-shadow">In Progress</div>
                      </td>
                      <td><a href="#" className="btn btn-primary">Detail</a></td>
                    </tr>
                    <tr>
                      <td className="text-center pt-2">
                        <div className="custom-checkbox custom-control">
                          <input type="checkbox" data-checkboxes="mygroup" className="custom-control-input" id="checkbox-4" />
                          <label htmlFor="checkbox-4" className="custom-control-label">&nbsp;</label>
                        </div>
                      </td>
                      <td>Input data</td>
                      <td className="align-middle">
                        <div className="progress progress-xs">
                          <div className="progress-bar bg-success width-per-40" />
                        </div>
                      </td>
                      <td>
                        <img alt="image" src="assets/img/users/user-2.png" width={35} />
                        <img alt="image" src="assets/img/users/user-5.png" width={35} />
                        <img alt="image" src="assets/img/users/user-4.png" width={35} />
                        <img alt="image" src="assets/img/users/user-1.png" width={35} />
                      </td>
                      <td>2018-01-16</td>
                      <td>
                        <div className="badge badge-success badge-shadow">Completed</div>
                      </td>
                      <td><a href="#" className="btn btn-primary">Detail</a></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h4>Table With State Save</h4>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-striped table-hover" id="save-stage" style={{width: '100%'}}>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Position</th>
                      <th>Office</th>
                      <th>Age</th>
                      <th>Start date</th>
                      <th>Salary</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Tiger Nixon</td>
                      <td>System Architect</td>
                      <td>Edinburgh</td>
                      <td>61</td>
                      <td>2011/04/25</td>
                      <td>$320,800</td>
                    </tr>   
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
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
                    style={{ display: showDeleteConfirmation ? "block" : "none" ,
                    }}
                    
                >
                    
                    <div className="modal-dialog  modal-dialog-centered" role="document" style={{maxWidth:'70vh', maxHeight: '20vh' }} >
                    <div className="modal-backdrop" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backdropFilter: 'blur(2px)', backgroundColor: 'rgba(0, 0, 0, 0.3)', zIndex: 0 }}></div>
    
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
                                {UOMToDelete && UOMToDelete.cat_name}?
                            </div>
                            <div className="modal-footer">
                                {/* <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={handleCancelDelete}
                                    style={{backgroundColor: ""}}
                                >
                                    Cancel
                                </button> */}
                                <button
                                type="button"
                                className="btn btn-danger btn-sm"
                                style={{ marginRight: "8px", color: 'black', backgroundColor: 'transparent', borderColor: 'transparent' }}
                                onClick={() => handleDelete(UOM)}
                            >
                                {/* <i data-feather="trash" style={{ alignContent: 'center' }}></i> */}
                                delete
                            </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Add Unit Modal */}
                <div
                    className={`modal fade ${showAddUOMModal ? "show" : ""}`}
                    id="addUnitModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="addUnitModalLabel"
                    aria-hidden={!showAddUOMModal}
                    style={{ display: showAddUOMModal ? "block" : "none" }}
                >
        <div className="modal-dialog modal-dialog-centered" role="document" style={{maxWidth:'70vh', maxHeight: '20vh' }}>
    <div className="modal-backdrop" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backdropFilter: 'blur(2px)', backgroundColor: 'rgba(0, 0, 0, 0.3)', zIndex: 0 }}></div>
    <div className="modal-content">
        <div className="modal-header">
            <h5 className="modal-title" id="exampleModalCenterTitle">Add New uom</h5>
            <button type="button" className="close" onClick={() => setShowAddUOMModal(false)} aria-label="Close" style={{ border: 'none', outline: 'none' }}>
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div className="modal-body">
            <div className="form-group"style={{textAlign:'left'}}>
                <label htmlFor="uomName">UOM </label>
                <input
                    type="text"
                    className="form-control"
                    id="uomName"
                    placeholder="Enter UOM"
                    value={uomName}
                    onChange={(e) => setNewUOMName(e.target.value)}
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

           
        </div>
    );
};

export default Example;
