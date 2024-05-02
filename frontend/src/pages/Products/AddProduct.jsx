import React, { useState } from 'react';

const AddProduct = () => {
  const [showForm, setShowForm] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [productDetails, setProductDetails] = useState(false);
  const [updateMode, setUpdateMode] = useState(false);

  const handleSaveChanges = () => {
    // Logic to save changes
    console.log('Changes saved!');
  };

  const handleFileChange = (event, setPreview) => {
    const file = event.target.files[0];
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

  const handleSaveAndContinue = () => {
    // Logic to save changes and continue
    console.log('Changes saved and continue to next step!');
    const formData = new FormData(document.querySelector('form'));
    const data = Object.fromEntries(formData.entries());
    setProductDetails(data);
    setShowForm(false); // Hide the form after saving
  };

  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };

  const handleDeleteProductDetails = () => {
    // Logic to delete product details
    setProductDetails(false);
  };

  const handleUpdateProductDetails = () => {
    setShowForm(!showForm);
  };

  const handleCancelUpdate = () => {
    setUpdateMode(false); // Exit update mode
  };

  const handleUpdate = () => {
    // Logic to update product details
    console.log('Product details updated!');
    setUpdateMode(false); // Exit update mode after updating
  };
  return (
    <div className="container" style={{ position: 'relative', transform: 'translateY(-2px)', width: '100%', marginTop: '10px auto', maxWidth: '800px' }}>
      <div style={{ marginRight: '-800px', marginTop: '40px', color: 'black' }}>
        <button
          type="button"
          style={{
            backgroundColor: '#4CAF50',
            border: 'none',
            color: 'white',
            padding: '10px 20px',
            textAlign: 'center',
            textDecoration: 'none',
            display: 'inline-block',
            fontSize: '16px',
            margin: '4px 2px',
            cursor: 'pointer',
            borderRadius: '8px',
            transition: 'background-color 0.3s ease',
          }}
          onClick={toggleFormVisibility}
        >
          <span style={{ marginRight: '5px', fontWeight: 'bold', color: 'black' }}>+</span> Add Product
        </button>
      </div>

      {showForm && (
        <form className="add-product-form" style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <div className="basic-details" style={{ maxWidth: '1000px', marginTop: '0px', marginLeft: '50px', display: 'flex', flexDirection: 'row', height: '400px' }}>
            <div style={{ marginRight: '20px' }}>
              <h3>Basic Details</h3>
              <div className="form-group" style={{ color: 'black', backgroundImage: 'white', border: '1px solid black', position: 'relative' }}>
                <label htmlFor="product-name">Product Name:</label>
                <input type="text" id="product-name" name="product-name" />
              </div>

            <div className="form-group" style={{ color: 'black',backgroundImage: 'white',border: '1px solid black' }} >
              <label htmlFor="description">Product Description: </label>
              <textarea id="description" name="description" rows="1" />
            </div>

            <div className="form-group" style={{ color: 'black',backgroundImage: 'white',border: '1px solid black' }}>
              <label htmlFor="category">Category:</label>
              <input type="text" id="category" name="category" />
            </div>

            <div className="form-group" style={{ color: 'black',backgroundImage: 'white',border: '1px solid black'  }}>
              <label htmlFor="subCategory">Subcategory:</label>
              <input type="text" id="subCategory" name="subCategory" />
            </div>

            <div className="form-group" style={{color: 'black', backgroundImage: 'white',border: '1px solid black' }}>
              <label htmlFor="keywords">Keywords:</label>
              <input type="text" id="keywords" name="keywords" />
            </div>

            <div className="form-group" style={{color: 'black', backgroundImage: 'white',border: '1px solid black'}}>
              <label htmlFor="price">Price:</label>
              <input type="number" id="price" name="price"/>
            </div>
            

            <div className="form-group" style={{color: 'black',backgroundImage: 'white',border: '1px solid black' }}>
              <label htmlFor="unitOfMeasurement">Unit of Measurement:</label>
              <input type="text" id="unitOfMeasurement" name="unitOfMeasurement" />
            </div>
          </div>

          <div>
            <h3>Additional Details</h3>

            <div className="form-group" style={{ 
  color: 'black', 
  backgroundImage: 'white',
  border: '1px solid black', 
  display: 'flex', 
  alignItems: 'center',
  justifyContent: 'center' // Center horizontally
}}>
  <label htmlFor="photo">
    <img src="/images/addphoto.png" alt="Add Photo Logo" style={{ marginRight: '1px', height: '30px' }} />
  </label><label htmlFor="photo">Add Photo:</label>
  <input type="file" id="photo" name="photo" accept="image/*" onChange={(e) => handleFileChange(e, setPhotoPreview)} />
</div>



            {photoPreview && (
              <div className="file-preview">
                <img src={photoPreview} alt="Photo Preview" style={{ height: '200px', marginTop: '10px', display: 'flex', alignItems: 'center' }} />
              </div>
            )}

            <div style={{ marginTop: '20px' }}>
            <button type="button" className="btn btn-primary" onClick={handleSaveAndContinue} style={{backgroundImage: 'white',borderBlockColor:'black'}}>Save and Continue</button>
            </div>
          </div>
        </div>
        </form>
    )}




 {/* Display product details card */}
 {productDetails && (
        <div className="card" style={{ 
          width: '1000px', 
          height:'300px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.15)',
          display: 'flex',  
          flexDirection: 'row',
          marginTop: '20px', // Add margin top for separation
          position: 'relative' // Position relative for absolute positioning of delete button
        }}>
           {photoPreview && (
              <div className="file-preview">
                <img src={photoPreview} alt="Photo Preview" style={{marginLeft:'30px', height: '200px', width:'300px', marginTop: '10px', display: 'flex', alignItems: 'center' }} />
              </div>
            )}
          
          <div style={{ display: 'inline-block', textAlign: 'left', paddingLeft: '100px', marginTop: '10px',marginLeft:'-50px', color: 'black', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: 'black', borderBottom: '2px solid #333', paddingBottom: '5px', marginBottom: '20px' }}>Product Details</h3>
            <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '10px' }}>Product Name: {productDetails.productName || 'Sample Product'}</p>
            <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '10px' }}>Description: {productDetails.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}</p>
  			<p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '10px' }}>Category: {productDetails.category || 'Laboratory Equipment'}</p>
 			<p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '10px' }}>Subcategory: {productDetails.subCategory || 'Glassware'}</p>
            <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '10px' }}>Keywords: {productDetails.keywords || 'Flask, Laboratory, Chemistry'}</p>


 {/* Buttons for update and delete */}
 {updateMode ? (
              <>
                <button onClick={handleUpdate} style={{ marginRight: '5px',marginRight: '5px', fontWeight: 'bold' }}>Update</button>
                <button onClick={handleCancelUpdate} style={{marginRight: '5px', fontWeight: 'bold',backgroundColor:'#F9E79F'}}>Cancel</button>
              </>
            ) : (
              <button onClick={handleUpdateProductDetails}style={{
                backgroundColor: '#58D68D',
                border: 'none',
                color: 'white',
                padding: '2px 12px',
                textAlign: 'center',
                textDecoration: 'none',
                display: 'inline-block',
                fontSize: '14px',
                margin: '10px 0',
                cursor: 'pointer',
                borderRadius: '4px',
                
              }}  >Update</button>
            )}



            {/* Delete button */}
            <button
              type="button"
              onClick={handleDeleteProductDetails}
              style={{
                backgroundColor: '#ff0000',
                border: 'none',
                color: 'white',
                padding: '2px 12px',
                textAlign: 'center',
                textDecoration: 'none',
                display: 'inline-block',
                fontSize: '14px',
                margin: '10px 0',
                cursor: 'pointer',
                borderRadius: '4px',
                
              }}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddProduct;