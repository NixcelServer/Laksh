import React, { useEffect, useRef, useState } from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/dataTables.dataTables.css';
import { useDispatch, useSelector } from 'react-redux';
import { addUOM, getUOM } from '../../redux/Admin/admin.action';

const AdminProduct = () => {
  const dispatch = useDispatch();
  const uoms = useSelector(state => state.masterData.uom);
  const [showAddUOMModal, setShowAddUOMModal] = useState(false);
  const closeButtonRef = useRef(null);
  const [uomName, setNewUOMName] = useState("");

  const dataTable = useRef(null);
  const isDataTableInitialized = useRef(false);

  useEffect(() => {
    // Initialize DataTables
    if (!isDataTableInitialized.current) {
      dataTable.current = $('#table-1').DataTable({
        autoWidth: true,
        destroy: true, // Ensure DataTable instance is destroyed on reinitialization
        columns: [
          { title: '#' },
          { title: 'UOM Name' },
          { title: 'Action' }
        ]
      });
      isDataTableInitialized.current = true;
    }

    // Fetch initial UOM data
    getUnitOfMeasurement();

    return () => {
      // Cleanup: Destroy DataTable instance on unmount
      if (dataTable.current) {
        dataTable.current.destroy(true);
        isDataTableInitialized.current = false;
      }
    };
  }, []);

  useEffect(() => {
    // Update DataTable when 'uoms' changes
    if (dataTable.current && uoms) {
      // Clear existing table rows and add new rows based on 'uoms'
      dataTable.current.clear().rows.add(
        uoms.map((uom, index) => [
          index + 1,
          uom.unit_name,
          <a href="#" className="btn btn-primary">Delete</a> // Adjust action as needed
        ])
      ).draw();
    }
  }, [uoms]);

  const getUnitOfMeasurement = () => {
    dispatch(getUOM());
  };

  const handleSaveChanges = async (event) => {
    event.preventDefault();

    const userString = sessionStorage.getItem('user');
    const user = JSON.parse(userString);
    const encUserId = user.encUserId;

    const payload = {
      uomName,
      encUserId
    };

    try {
      await dispatch(addUOM(payload));
      dispatch(getUOM()); // Fetch updated UOMs after adding
      closeButtonRef.current.click(); // Close modal after adding
    } catch (error) {
      console.error("Error adding UOM:", error);
    }
  };

  return (
    <>
      <div className="main-content">
        <section className="section">
          <div className="section-body">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h4>Basic DataTables</h4>
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
                        <i className="feather icon-plus"></i>
                        Add New
                      </button>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-striped" id="table-1">
                        <thead>
                          <tr>
                            <th className="text-center">#</th>
                            <th>UOM Name</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* Render table rows dynamically */}
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
              <h5 className="modal-title" id="exampleModalCenterTitle">Add New UOM</h5>
              <button type="button" className="close" onClick={() => setShowAddUOMModal(false)} ref={closeButtonRef} aria-label="Close" style={{ border: 'none', outline: 'none' }}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group" style={{ textAlign: 'left' }}>
                <label htmlFor="uomName">UOM Name</label>
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
    </>
  );
};

export default AdminProduct;
