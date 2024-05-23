import React, { useEffect, useState, useRef } from 'react';
import feather from 'feather-icons';
import { useDispatch, useSelector } from 'react-redux';
import { addKeyword, getKeywords } from '../../redux/Admin/admin.action';
import axios from 'axios';

const Keywords = () => {
    const [keywordName, setNewKeywordName] = useState("");
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [keywordToDelete, setKeywordToDelete] = useState(null);
    const [showAddKeywordModal, setShowAddKeywordModal] = useState(false);
    const dispatch = useDispatch();
    const keywords = useSelector(state => state.masterData.keywords);
    


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
        dispatch(getKeywords());
        // Cleanup function to remove the scripts when the component unmounts
        return () => {
            document.body.removeChild(script1);
            document.body.removeChild(script2);
            document.body.removeChild(script3);
            document.body.removeChild(script4);
        };
        
       
       
    }, []); // Empty dependency array means this effect runs only once after the component mounts

    const handleDelete = async(keyword) => {
        // Define the logic for canceling delete action
        setKeywordToDelete(keyword);
        setShowDeleteConfirmation(true);
    };

    const handleCancelDelete = () => {
        // Define the logic for canceling delete action
        setShowDeleteConfirmation(false);
    };
    
    const handleConfirmDelete = async() => {
        const keyword = keywordToDelete;
        try {
          const userString =  sessionStorage.getItem('user');
          const user = JSON.parse(userString);
          const encUserId = user.encUserId;
      
          // Include both encUserId and encKeywordId in the payload
          const payload = {
            encUserId
          };
      
          // Perform delete operation using encKeywordId and encUserId
          const response = await axios.delete(`http://127.0.0.1:8000/api/keywords/${keyword.encKeywordId}`, { data: payload });      
          //console.log("Keyword deleted successfully:", response.data);
          
          // Refetch keywords after deletion
          dispatch(getKeywords());
        } catch (error) {
          console.error("Error deleting keyword:", error);
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
          keywordName,encUserId   
        }
        console.log(payload);

        try {
          
            console.log("in try block");
            
            await dispatch(addKeyword(payload));
            console.log("keyword added");
            
           // const response = await axios.post("http://127.0.0.1:8000/api/categories", payload);
            dispatch(getKeywords());
            console.log("update redux");
            // console.log("keyword added successfully:", response.data);
      
           // fetchCategories();
            closeButtonRef.current.click();
           
            
            
          } catch (error) {
            console.error("Error adding keyword:", error);
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
                                    <div className="card-header">
                                        <div>
                                            <button
                                                style={{
                                                    position: 'absolute',
                                                    top: 10,
                                                    right: 10,
                                                    padding: '1px 20px',
                                                    backgroundColor: '#527c90',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '5px',
                                                    cursor: 'pointer',
                                                }}
                                                onClick={() => setShowAddKeywordModal(true)}
                                            >
                                                {/* Plus sign icon */}
                                                <i className="feather icon-plus"></i>
                                                Add New
                                            </button>
                                        </div>
                                        <h4>Keywords</h4>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <table className="table table-striped table-hover" id="save-stage" style={{width: '100%'}}>
                                                <thead>
                                                    <tr>
                                                        <th>Sr. No.</th>
                                                        <th>Keyword</th>
                                                        <th>Action</th>
                                                    
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {keywords.map((keyword, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{keyword.keyword_name}</td> {/* Displaying the keyword name */}
                              <td>

                              <button
                                type="button"
                                className="btn btn-danger btn-sm"
                                style={{ marginRight: "8px", color: 'black', backgroundColor: 'transparent', borderColor: 'transparent' }}
                                onClick={() => handleDelete(keyword)}
                            >
                                {/* <i data-feather="trash" style={{ alignContent: 'center' }}></i> */}
                                delete
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
                                Are you sure you want to delete keyword{" "}
                                {keywordToDelete && keywordToDelete.keyword_name}?
                            </div>
                            <div className="modal-footer">
                                {/* <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={handleCancelDelete}
                                >
                                    Cancel
                                </button> */}
                                <button
                                type="button"
                                className="btn btn-danger btn-sm"
                                style={{ marginRight: "8px", color: 'black', backgroundColor: 'transparent', borderColor: 'transparent' }}
                                onClick={() => handleConfirmDelete(keywordToDelete)}
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
                    className={`modal fade ${showAddKeywordModal ? "show" : ""}`}
                    id="addUnitModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="addUnitModalLabel"
                    aria-hidden={!showAddKeywordModal}
                    style={{ display: showAddKeywordModal ? "block" : "none" }}
                >
<div className="modal-dialog modal-dialog-centered" role="document" style={{maxWidth:'70vh', maxHeight: '20vh' }}>
    <div className="modal-backdrop" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backdropFilter: 'blur(2px)', backgroundColor: 'rgba(0, 0, 0, 0.3)', zIndex: 0 }}></div>
    <div className="modal-content">
        <div className="modal-header">
            <h5 className="modal-title" id="exampleModalCenterTitle">Add New keyword</h5>
            <button type="button" className="close" onClick={() => setShowAddKeywordModal(false)} aria-label="Close" ref={closeButtonRef} style={{ border: 'none', outline: 'none' }}>
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div className="modal-body">
            <div className="form-group"style={{textAlign:'left'}}>
                <label htmlFor="keywordName">Keyword Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="keywordName"
                    placeholder="Enter keyword Name"
                    value={keywordName}
                    onChange={(e) => setNewKeywordName(e.target.value)}
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

export default Keywords;
