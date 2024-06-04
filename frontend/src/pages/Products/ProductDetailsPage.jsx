import React, { useState } from 'react';

const ProductDetailsPage = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Full viewport height to center vertically
        padding: '20px', // Padding to ensure space around the card
      }}
    >
      <div
        className="card-container"
        style={{
          position: 'relative',
          padding: '20px',
          maxWidth: '1000px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.15)',
          margin: '20px', // Even margins on all sides
          backgroundColor: 'white', // Ensure the card has a background color
        }}
      >
        <div className="row">
          <div className="col-lg-6" style={{ padding: '20px' }}>
            <div style={{ marginTop: '30px', marginLeft: '20px', maxWidth: '400px' }}>
              <img
                src="https://via.placeholder.com/400x200"
                alt="Product Preview"
                style={{ width: '100%', height: '200px' }}
              />
            </div>
          </div>
          <div className="col-lg-6" style={{ padding: '10px' }}>
            <div style={{ textAlign: 'left', color: 'black', marginBottom: '10px' }}>
              <h3
                style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: 'black',
                  borderBottom: '2px solid #333',
                  paddingBottom: '5px',
                  marginBottom: '10px',
                }}
              >
                 Product Name
              </h3>
              <p style={{ fontSize: '14px', lineHeight: '1.4', marginBottom: '5px' }}>
                <span style={{ fontWeight: 'bold' }}>Description:</span> Lorem ipsum dolor sit amet, consectetur
                adipiscing elit.
              </p>
              <p style={{ fontSize: '14px', lineHeight: '1.4', marginBottom: '5px' }}>
                <span style={{ fontWeight: 'bold' }}>Category:</span> Sample Category
              </p>
              <p style={{ fontSize: '14px', lineHeight: '1.4', marginBottom: '5px' }}>
                <span style={{ fontWeight: 'bold' }}>SubCategory:</span> Sample SubCategory
              </p>
              <p style={{ fontSize: '14px', lineHeight: '1.4', marginBottom: '5px' }}>
                <span style={{ fontWeight: 'bold' }}>Keywords:</span> Keyword1, Keyword2, Keyword3
              </p>
              <p style={{ fontSize: '14px', lineHeight: '1.4', marginBottom: '5px' }}>
                <span style={{ fontWeight: 'bold' }}>Price:</span> $50
              </p>
              <p style={{ fontSize: '14px', lineHeight: '1.4', marginBottom: '5px' }}>
                <span style={{ fontWeight: 'bold' }}>Unit Of Measurement:</span> Sample UOM
              </p>
            </div>
          </div>
          <button
            className="btn btn-icon icon-left btn-info"
            style={{ 
              width: '100px',
              height:'5px', 
              position: 'absolute', 
              bottom: '10px', 
              right: '10px', 
              backgroundColor: '#A569BD' 
            }}            onClick={toggleModal}
          >
            <i className="fas fa-info-circle"></i> Enquire Now
          </button>
        </div>
      </div>
 {showModal && (
  <div
    className="modal"
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <div
      className="modal-content"
      style={{
        width: '40%',
        height: '80%',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        position: 'relative', // Relative positioning for the submit button
      }}
    >
      <div style={{ backgroundColor: '#C39BD3', padding: '10px', borderRadius: '8px 8px 0 0', position: 'relative' }}>
        <h2 style={{ color: 'black', textAlign: 'center' }}>Product Information</h2>
        <button
          onClick={toggleModal}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            backgroundColor: 'transparent',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer',
          }}
        >
          &times;
        </button>
      </div>

      <div style={{ marginTop: '40px' }}>
        <div style={{ marginBottom: '10px', alignItems: 'left' }}>
          <label htmlFor="productName" style={{ color: '#333', fontStyle: 'italic', marginRight: '10px', width: '150px' }}>Product Name :</label>
          <input type="text" id="productName" name="productName" style={{ border: '1px solid #A569BD', borderRadius: '4px', padding: '8px', flex: '1' }} />
        </div>

        <div style={{ marginBottom: '10px', alignItems: 'left' }}>
          <label htmlFor="description" style={{ color: '#333', fontStyle: 'italic', marginRight: '10px', width: '150px' }}>Description :</label>
          <input type="text" id="description" name="description" style={{ border: '1px solid #A569BD', borderRadius: '4px', padding: '8px', flex: '1' }} />
        </div>

        <div style={{ marginBottom: '10px', alignItems: 'left' }}>
          <label htmlFor="quantity" style={{ color: '#333', fontStyle: 'italic', marginRight: '10px', width: '150px' }}>Quantity :</label>
          <input type="text" id="quantity" name="quantity" style={{ border: '1px solid #A569BD', borderRadius: '4px', padding: '8px', flex: '1' }} />
        </div>

        <div style={{ marginBottom: '10px', alignItems: 'left' }}>
          <label htmlFor="uom" style={{ color: '#333', marginRight: '10px', width: '130px' }}>Unit of Measure :</label>
          <input type="text" id="uom" name="uom" style={{ border: '1px solid #A569BD', borderRadius: '4px', padding: '8px', flex: '1', marginLeft: '20px' }} />
        </div>
      </div>

      <button
        className="btn btn-primary"
        onClick={toggleModal}
        style={{ position: 'absolute', bottom: '10px', right: '10px', backgroundColor: '#A569BD' }}
      >
        Submit
      </button>
    </div>
  </div>
)}


    </div>
  );
};

export default ProductDetailsPage;
