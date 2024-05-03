import React, { useEffect, useState } from 'react';
import feather from 'feather-icons';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addSubCategory, getCategories, getSubCategories } from '../../redux/Admin/admin.action';
import axios from 'axios';

const AdminTemplateSubcategories = () => {


    const dispatch = useDispatch();
    const [subcategory, setSubcategory] = useState('');
    const [subCategoryToDelete, setSubCategoryToDelete] = useState(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const { encCatId } = useParams();
    console.log("in assign  subcat",encCatId);
    

    const categories = useSelector(state => state.masterData.categories);

    const subCategories = useSelector(state => state.masterData.subCategories);

    const filteredSubCats = subCategories.filter(subCategory => subCategory.encCatId === encCatId);

    
  // Find the category with the matching encryptedCategoryId
 // 

  // Log the matching category (optional)
  //console.log(matchingCategory);

  const handleDelete = async (subCategory) => {
    setSubCategoryToDelete(subCategory);
    setShowDeleteConfirmation(true);
   // console.log(encCatId);
    
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  const handleConfirmDelete = async() => {
    const subCategory = subCategoryToDelete;
    try {
      const userString =  sessionStorage.getItem('user');
      const user = JSON.parse(userString);
      const encUserId = user.encUserId;
  
      // Include both encUserId and encKeywordId in the payload
      const payload = {
        encUserId
      };
  
      // Perform delete operation using encKeywordId and encUserId
      const response = await axios.delete(`http://127.0.0.1:8000/api/sub-categories/${subCategory.encSubCatId}`, { data: payload });      
      //console.log("Keyword deleted successfully:", response.data);
      
      // Refetch keywords after deletion
      dispatch(getSubCategories());
    } catch (error) {
      console.error("Error deleting keyword:", error);
    }
    //dispatch(getCategories(updatedCategories));
    setShowDeleteConfirmation(false);
    
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    // Perform form submission logic here
   // console.log('Category:', encCatId);
    // console.log('Subcategory:', subcategory);

    const userString = sessionStorage.getItem('user');
    // Parse the user object from the string format stored in sessionStorage
    const user = JSON.parse(userString);

    // Retrieve the encUserId from the user object
    const encUserId = user.encUserId;
    const subCategoryName = subcategory;
    
   // console.log(encUserId);
    
    const payload ={
      subCategoryName,encUserId,encCatId   
    }
   // console.log("payload",payload);

    try {
      
      //console.log("in try block");
     
     // const response = await axios.post("http://127.0.0.1:8000/api/sub-categories", payload);
     await dispatch(addSubCategory(payload));
     // console.log("Category added successfully:", response.data);

      //fetchSubCategories();
      //closeButtonRef.current.click();
     
      dispatch(getSubCategories());
      
    } catch (error) {
      console.error("Error adding category:", error);
     // setError(error.message); // Set error state
    }

    // Reset form fields
    
    setSubcategory('');
  };
  
    useEffect(() => {
      console.log("hello");
        feather.replace();
        dispatch(getCategories());
        dispatch(getSubCategories());
        
    }, []); // Empty dependency array means this effect runs only once after the component mounts
    const matchingCategory = categories.find(category => category.encCatId === encCatId);
    return (
        
<div className="main-content">
                <section className="section">
                    <div className="section-body" style={{marginTop:'-7%'}}>
                       
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                <div className="row" style={{ paddingRight: '0', paddingTop: '3%', width: '100%',marginLeft:'3px' , marginTop:'-5%'}}>
            <div className="col-xl-4 col-lg-8 col-md-8 col-sm-8 col-xs-12" style={{ paddingRight: '0', paddingTop: '3%', width: '150%',marginLeft:'3px' }}>
        <div className="card-content" style={{marginBottom: '6%'}}>
            <h5 className="font-15"style={{marginBottom: '6%', marginTop:'1%'}}>Assign Subcategory</h5>
            {/* Start of Assign Subcategory Form */}
            <form>
                
                <div className="form-group">
                <label htmlFor="category" style={{ textAlign: 'left', display: 'inline-block' }}>Category : </label>
      <span style={{ display: 'inline-block'}} >{matchingCategory && matchingCategory.cat_name}</span>
      </div>

                    <div className="form-group">
                    <label htmlFor="subcategory"style={{ textAlign: 'left', display: 'block',marginTop:'4%' }}>Subcategory Name</label>
                    <input type="text" className="form-control" id="subcategory" placeholder="Enter subcategory name" value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}/>
                

                </div>
                {/* Additional form fields can be added here as needed */}
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Assign Subcategory</button>
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
                                            <table className="table table-striped table-hover" id="save-stage" style={{width: '100%'}}>
                                                <thead>
                                                    <tr>
                                                        <th>Sr. No.</th>
                                                        <th>Sub Category</th>
                                                        <th>Action</th>
                                                       
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {filteredSubCats.map((subCategory, index) => (
                                        <tr >
                                          <td>{index + 1}</td>
                                          <td>{subCategory.sub_cat_name}</td>
                                          <td>
                                          <button
                                type="button"
                                className="btn btn-danger btn-sm"
                                style={{ marginRight: "8px" }}
                                onClick={() => handleDelete(subCategory)}
                              >
                                Delete
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
                {subCategoryToDelete && subCategoryToDelete.sub_cat_name}?
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

            </div>
        
    );
};

export default AdminTemplateSubcategories;


