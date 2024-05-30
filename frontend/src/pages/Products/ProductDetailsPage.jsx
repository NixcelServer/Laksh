import React from 'react';

const ProductDetailsPage = () => {
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
      <div className="card" style={{ 
        padding: '20px',
        maxWidth: '1000px', 
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.15)',
        margin: '20px', // Even margins on all sides
        position: 'relative',
        backgroundColor: 'white', // Ensure the card has a background color
      }}>
        <div className="row">
          <div className="col-lg-6" style={{ padding: '20px' }}>
            <div style={{ marginTop: '30px', marginLeft: '20px', maxWidth: '400px' }}>
              <img src="https://via.placeholder.com/400x200" alt="Product Preview" style={{ width: '100%', height: '200px' }} />
            </div>
          </div>
          <div className="col-lg-6" style={{ padding: '10px' }}>
            <div style={{ textAlign: 'left', color: 'black', marginBottom: '10px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: 'black', borderBottom: '2px solid #333', paddingBottom: '5px', marginBottom: '10px' }}>
                Sample Product
              </h3>
              <p style={{ fontSize: '14px', lineHeight: '1.4', marginBottom: '5px' }}>
                <span style={{ fontWeight: 'bold' }}>Description:</span> Lorem ipsum dolor sit amet, consectetur adipiscing elit.
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
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
