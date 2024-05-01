import { useNavigate } from "react-router-dom";
import { getUOM } from "../../redux/Admin/UOM/uom.action";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from 'react';




const UOM = () => {

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [uomToDelete, setUomToDelete] = useState(null);
  const closeButtonRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();


  const uoms = useSelector(state => state.uomReducer.uoms);
  console.log("delete", uoms);

  
  const dispatch = useDispatch();

  const [uomName, setNewUomName] = useState("");

  const fetchUOM = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/unit-of-measurements");
      const uom = response.data // Assuming the category data is under the "message" key
      //console.log("delete", keywords)

      dispatch(getUOM(uom));

    } catch (error) {
      console.error("Error fetching keywords:", error);
      return null; // Return null or handle the error as needed
    }

  };

  useEffect(() => {
    fetchUOM();
  }, []);


  const handleDelete = async (uom) => {

    setUomToDelete(uom);
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = async() => {
    const uom = uomToDelete;
    try {
      const userString =  sessionStorage.getItem('user');
      const user = JSON.parse(userString);
      const encUserId = user.encUserId;
  
      // Include both encUserId and encKeywordId in the payload
      const payload = {
        encUserId
      };
  
      // Perform delete operation using encKeywordId and encUserId
      const response = await axios.delete(`http://127.0.0.1:8000/api/unit-of-measurements/${uom.encUomId}`, { data: payload });      
      //console.log("Keyword deleted successfully:", response.data);
      
      // Refetch keywords after deletion
      fetchUOM();
    } catch (error) {
      console.error("Error deleting keyword:", error);
    }
    //dispatch(getCategories(updatedCategories));
    setShowDeleteConfirmation(false);
    
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  const handleSaveChanges = async (event) => {
    
    event.preventDefault();

    const userString = sessionStorage.getItem('user');
    // Parse the user object from the string format stored in sessionStorage
    const user = JSON.parse(userString);

    // Retrieve the encUserId from the user object

   // const encUserId = user.encUserId;
   const encUserId = 'dDJUd0VsSFlIMmM9';


    console.log(encUserId);

    const payload = {
      uomName, encUserId
    }
    console.log(payload);
    

    try {

      console.log("in try block");
      
      console.log(payload);
      
      const response = await axios.post("http://127.0.0.1:8000/api/unit-of-measurements", payload);
      console.log("Keyword added successfully:", response.data);
     fetchUOM();
      
      closeButtonRef.current.click();
      

       navigate("/UOM");
       console.log("navigate");
    } catch (error) {
     //console.error("Error adding category:", error);
      // setError(error.message); // Set error state
    }
  }
    return (
      <div>
      <div class='content-body'>
      <div class='row page-titles mx-0'>
        <div class='col p-md-0'>
          <ol class='breadcrumb'>
            <li class='breadcrumb-item'>
              <a href='#'>Dashboard</a>
            </li>
            <li class='breadcrumb-item active'>
              <a href='#'>Home</a>
            </li>
          </ol>
        </div>
      </div>
      <div class='container-fluid'>
        <div class='row'>
          <div class='col-12'>
            <div class='card'>
              <div class='card-body'>
                <div class='d-flex justify-content-between align-items-center mb-3'>
                  <h4 class='card-title'>Unit of Measurements</h4>
                  <button
                    type='button'
                    class='btn btn-primary'
                    data-toggle='modal'
                    data-target='#addUnitModal'
                    onClick={() => setShowModal(true)}
                  >
                    Add New
                  </button>
                </div>
                <div class='table-responsive'>
                  <table class='table table-striped table-bordered zero-configuration'>
                  <thead>
                          <tr>
                            <th>Sr no.</th>
                            <th>Unit of Measurement</th>

                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {uoms.map((uom, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{uom.unit_name}</td> {/* Displaying the keyword name */}
                              <td>

                              <button
                                type="button"
                                className="btn btn-danger btn-sm"
                                style={{ marginRight: "8px" }}
                                onClick={() => handleDelete(uom)}
                              >
                                Delete
                              </button>                             
                               </td>

                            </tr>
                          ))}
                        </tbody>
                    <tfoot></tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
                {uomToDelete && uomToDelete.unit_name}?
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

      {/* <!-- Add Unit Modal --> */}
      <div
        class='modal fade'
        id='addUnitModal'
        tabindex='-1'
        role='dialog'
        aria-labelledby='addUnitModalLabel'
        aria-hidden='true'
      >
        <div class='modal-dialog' role='document'>
          <div class='modal-content'>
            <form>
              <div class='modal-header'>
                <h5 class='modal-title' id='addUnitModalLabel'>
                  Add New Unit of Measurement
                </h5>
                <button
                  type='button'
                  class='close'
                  data-dismiss='modal'
                  aria-label='Close'
                >
                  <span aria-hidden='true'>&times;</span>
                </button>
              </div>
              <div class='modal-body'>
                <div class='form-group'>
                  <label for='unitName'>Unit of Measurement</label>
                  <input
                    type='text'
                    className='form-control'
                    id='unitName'
                    placeholder='Enter UOM Name'
                    value={uomName} // Bind value to state
                        onChange={(e) => setNewUomName(e.target.value)}
                  />
                </div>
              </div>
              <div class='modal-footer'>
                <button
                ref={closeButtonRef}
                  type='button'
                  class='btn btn-secondary'
                  data-dismiss='modal'
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
      </div>
    );
  };
  
  export default UOM;