import React, { useEffect, useState, useRef } from 'react';
import feather from 'feather-icons';
import { useDispatch, useSelector } from 'react-redux';
import { addUOM, getUOM } from '../../redux/Admin/admin.action';
import axios from 'axios';
import { baseURL } from '../../utils/variables';
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import 'datatables.net-buttons-bs4/css/buttons.bootstrap4.min.css';
import 'datatables.net';
import 'datatables.net-bs4';
import 'datatables.net-responsive';
import 'datatables.net-buttons';

const UOM = () => {
    const [uomName, setNewUOMName] = useState("");
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [UOMToDelete, setUOMToDelete] = useState(null);
    const [showAddUOMModal, setShowAddUOMModal] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false);

    const dispatch = useDispatch();
    const [showCannotDeleteConfirmation, setShowCannotDeleteConfirmation] = useState(false);
    const uoms = useSelector(state => state.masterData.uom);


    const closeButtonRef = useRef(null);

    useEffect(() => {
        dispatch(getUOM());
      }, [dispatch]);

    useEffect(() => {
        if (uoms.length > 0) {
            setDataLoaded(true);
        }
    }, [uoms]);

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
    const handleDelete = async (uom) => {
        console.log(uom);
        if (uom.uomCount > 0) {
            setUOMToDelete(uom);
            setShowCannotDeleteConfirmation(true);
        }
        else {
            setUOMToDelete(uom);
            setShowDeleteConfirmation(true);
        }
    };

    const handleOK = () => {
        setShowCannotDeleteConfirmation(false);
    };

    const handleCancelDelete = () => {
        setShowDeleteConfirmation(false);
    }

    const handleConfirmDelete = async () => {
        const uom = UOMToDelete;
        try {
            const userString = sessionStorage.getItem('user');
            const user = JSON.parse(userString);
            const encUserId = user.encUserId;

            // Include both encUserId and encKeywordId in the payload
            const payload = {
                encUserId
            };

            // Perform delete operation using encKeywordId and encUserId
            const response = await axios.delete(`${baseURL}api/unit-of-measurements/${uom.encUomId}`, { data: payload });
            //console.log("Keyword deleted successfully:", response.data);

            if ($.fn.DataTable.isDataTable('#example1')) {
                $('#example1').DataTable().destroy();
            }
    
             dispatch(getUOM()).then(() => {
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

        const payload = {
            uomName, encUserId
        }
        console.log(payload);

        try {

            console.log("in try block");

            const res = await axios.post(`${baseURL}api/unit-of-measurements`, payload);
            if ($.fn.DataTable.isDataTable('#example1')) {
                $('#example1').DataTable().destroy();
            }
    
             dispatch(getUOM()).then(() => {
                setDataLoaded(false);
                setNewUOMName('');
    
                // Reinitialize DataTable with updated data
                $("#example1").DataTable({
                    "responsive": true,
                    "lengthChange": false,
                    "autoWidth": false,
                }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');
    
                feather.replace(); // Reinitialize Feather icons if used
            });
            console.log("category added");

          

            // fetchCategories();
            closeButtonRef.current.click();



        } catch (error) {
            console.error("Error adding category:", error);
            // setError(error.message); // Set error state
        }



    };

    return (
        <div >
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
                                                onClick={() => setShowAddUOMModal(true)}
                                            >
                                                {/* Plus sign icon */}
                                                <i className="feather icon-plus"></i>
                                                Add New
                                            </button>
                                        </div>
                                        <h4>Unit of Measurement</h4>
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

                                                    {uoms.map((uom, index) => (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{uom.unit_name}</td> {/* Displaying the keyword name */}
                                                            <td>

                                                                <button
                                                                    type="button"
                                                                    className="btn btn-danger btn-sm"
                                                                    style={{ marginRight: "8px", color: 'black', backgroundColor: 'transparent', borderColor: 'transparent' }}
                                                                    onClick={() => handleDelete(uom)}
                                                                >
                                                                    Delete
                                                                </button>                              </td>

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

                {/* Cannot Delete confirmation modal */}
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
                                Unable to delete the Unit of Measurement '{UOMToDelete && UOMToDelete.uom_name}' at the moment. It appears that this Unit of Measurement has been assigned.

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

                {/* Delete confirmation modal */}

                <div
                    className={`modal fade ${showDeleteConfirmation ? "show" : ""}`}
                    id="deleteConfirmationModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="deleteConfirmationModalLabel"
                    aria-hidden={!showDeleteConfirmation}
                    style={{
                        display: showDeleteConfirmation ? "block" : "none",
                    }}

                >

                    <div className="modal-dialog  modal-dialog-centered" role="document" >
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
                                    onClick={() => handleConfirmDelete(UOM)}
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
                    <div className="modal-dialog modal-dialog-centered" role="document" style={{ maxWidth: '70vh', maxHeight: '20vh' }}>
                        <div className="modal-backdrop" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backdropFilter: 'blur(2px)', backgroundColor: 'rgba(0, 0, 0, 0.3)', zIndex: 0 }}></div>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalCenterTitle">Add New uom</h5>
                                <button type="button" className="close" onClick={() => setShowAddUOMModal(false)} ref={closeButtonRef} aria-label="Close" style={{ border: 'none', outline: 'none' }}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group" style={{ textAlign: 'left' }}>
                                    <label htmlFor="uomName">UOM </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="uomName"
                                        placeholder="Enter UOM"
                                        value={uomName}
                                        onChange={(e) => setNewUOMName(e.target.value)}
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

            {/* SIDEBAR */}
            
        </div>
    );
};

export default UOM;











