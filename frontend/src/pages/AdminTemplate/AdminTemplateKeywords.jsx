import { useNavigate } from "react-router-dom";
import { getKeywords } from "../../redux/Admin/Keywords/keyword.action";
import axios from "axios";

import { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";




const Keywords = () => {

  const closeButtonRef = useRef(null);
  const navigate = useNavigate;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const keywords = useSelector(state => state.keywordReducer.keywords);
  

  
  console.log("delete", keywords);


  const dispatch = useDispatch();

  // Updated mock data with only "Category 1"
  const mockCategories = [
    { id: 1, cat_name: "Category 1", add_date: "2024-04-18" }
  ];

  const fetchCategories = () => {
    // Simulate fetching data from API (useEffect used for simulation)
    dispatch(getKeywords(mockCategories));
  };

  const [keywordName, setNewKeywordName] = useState("");

  const fetchKeywords = async () => {

    setLoading(true); // Set loading state to true
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/keywords");
      const keywords = response.data;
      dispatch(getKeywords(keywords));
    } catch (error) {
      console.error("Error fetching keywords:", error);
      setError("Failed to fetch keywords. Please try again later.");
    } finally {
      setLoading(false); // Set loading state to false regardless of success or failure

    }

  };

  useEffect(() => {
    fetchKeywords();
  }, []);


  const handleDelete = async (encKeywordId) => {
    try {
      const userString =  sessionStorage.getItem('user');
      const user = JSON.parse(userString);
      const encUserId = user.encUserId;
  
      // Include both encUserId and encKeywordId in the payload
      const payload = {
        encUserId
      };
  
      // Perform delete operation using encKeywordId and encUserId
      const response = await axios.delete(`http://127.0.0.1:8000/api/keywords/${encKeywordId}`, { data: payload });      
      //console.log("Keyword deleted successfully:", response.data);
      
      // Refetch keywords after deletion
      fetchKeywords();
    } catch (error) {
      console.error("Error deleting keyword:", error);
    }
  };

  const handleSaveChanges = async (event) => {
    event.preventDefault();
    const userString = sessionStorage.getItem('user');
    const user = JSON.parse(userString);
    const encUserId = user.encUserId;
    console.log(encUserId);

    const payload = {
      keywordName, encUserId
    }

    
    try {
      let response = await axios.post("http://127.0.0.1:8000/api/keywords", payload);
    console.warn("Response Status:", response.status); // Log response status
    console.warn("Response Data:", response.data); // Log response data
    fetchKeywords();
    closeButtonRef.current.click();
    
    
  } catch (error) {
      console.warn(error.response); // Log the response as a warning
      setError("Failed to add keyword. Please try again later.");
  } finally {
      setLoading(false); // Set loading state to false regardless of success or failure
  }

  }
    return (
      
      

        <div>
      {/* Error message display */}
      {error && <div className="error-message">{error}</div>}


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
                      <h4 class='card-title'>Keywords</h4>
                      <button
                        type='button'
                        class='btn btn-primary'
                        data-toggle='modal'
                        data-target='#addUnitModal'
                      >
                        Add New
                      </button>
                    </div>
                    <div class='table-responsive'>
                      <table class='table table-striped table-bordered zero-configuration'>
                        <thead>
                          <tr>
                            <th>Sr no.</th>
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
                                style={{ marginRight: "8px" }}
                                onClick={() => handleDelete(keyword)}
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
                      Add New Keyword
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
                      <label for='unitName'>Keyword</label>
                      <input
                        type='text'
                        className='form-control'
                        id='unitName'
                        placeholder='Enter Keyword'
                        value={keywordName} // Bind value to state
                        onChange={(e) => setNewKeywordName(e.target.value)}
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

  export default Keywords; 