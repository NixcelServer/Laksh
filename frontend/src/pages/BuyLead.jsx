import React, { useState } from 'react';

const Buyleads = (buyLead) => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div style={{ background: "#f2f2f2", padding: "0px", marginTop: "-90px" }}>
      <div className="main-content" style={{ maxWidth: "1600px", maxHeight: "1400px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "right", marginBottom: "20px" }}>

        </div>

        <section className="section" style={{ background: "#fff", borderRadius: "10px", boxShadow: "none", border: "none" }}>
          <div className="row">
            <div className="col-lg-12">
              <div className="card" style={{ position: 'relative', width: "100%", marginBottom: "20px", background: "#fff", borderRadius: "10px", boxShadow: "none", border: "none" }}>
                <div className="card-statistic-4">
                  <div className="align-items-center justify-content-between">
                    <div className="row">
                      <div className="col-lg-4">
                        <div className="card-content">
                          <section className="section">
                            <div className="section-body">
                              <div className="left-side" style={{ textAlign: 'left', padding: "10px", background: "#fff", borderRadius: "10px" }}>
                                <h5 className="card-title" style={{ color: '#2AA699', fontSize: '15px', marginTop: '20px', fontFamily: 'sans-serif' }}>{buyLead.productName} Boat Headphones</h5>
                                <label style={{ fontStyle: 'italic', fontSize: '12px' }}>I want to purchase Boat Rockers 400. Kindly send me price and other details.</label>

                                <p style={{ color: '#666', fontSize: '12px', marginBottom: '-8px' }}>Quantity: {buyLead.quantity} 2 piece</p>
                                <p style={{ color: '#666', fontSize: '12px', marginBottom: '-8px' }}>Category: {buyLead.category} Electronics</p>
                                <p style={{ color: '#666', fontSize: '12px', marginBottom: '1px' }}>Subcategory: {buyLead.subcategory} Accessories</p>
                                <p style={{ color: '#666', fontSize: '12px', marginBottom: '-9px' }}>Unit of Measurement: {buyLead.unit}--</p>
                                {/* <p style={{ color: '#666', fontSize: '12px', marginBottom: '0px' }}>Order Placed: {buyLead.date} 24/3/2020 </p> */}
                                <p style={{ color: '#666', fontSize: '12px', marginBottom: '-8px' }}>Description: {buyLead.description} Boat Rockers 400</p>
                              </div>
                            </div>
                          </section>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="card-content">
                          <section className="section">
                            <div className="section-body">
                              <div className="right-side" style={{ textAlign: 'left', padding: "10px", background: "#fff", borderRadius: "10px" }}>
                                <h5 className="card-title" style={{ color: '#2AA699', fontSize: '15px', marginTop: '20px', fontFamily: 'sans-serif' }}>Buyer Details</h5>
                                <p style={{ color: '#666', fontSize: '12px', marginBottom: '-8px' }}>Member: {buyLead.member ? 'Yes' : 'No'} member since 2 years</p>
                                <p style={{ color: '#666', fontSize: '12px', marginBottom: '10px' }}>Available: {buyLead.available ? 'Yes' : 'No'} Email/Mobile</p>
                                <button className="btn btn-primary" onClick={togglePopup} style={{ backgroundColor: '#9B59B6', padding: '2px', fontSize: '11px' }}>View Buyer Details</button>
                              </div>
                            </div>
                          </section>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section" style={{ marginTop:"20px",background: "#fff", borderRadius: "10px", boxShadow: "none", border: "none" }}>
          <div className="row">
            <div className="col-lg-12">
              <div className="card" style={{ position: 'relative', width: "100%", marginBottom: "20px", background: "#fff", borderRadius: "10px", boxShadow: "none", border: "none" }}>
                <div className="card-statistic-4">
                  <div className="align-items-center justify-content-between">
                    <div className="row">
                      <div className="col-lg-4">
                        <div className="card-content">
                          <section className="section">
                            <div className="section-body">
                              <div className="left-side" style={{ textAlign: 'left', padding: "10px", background: "#fff", borderRadius: "10px" }}>
                                <h5 className="card-title" style={{ color: '#2AA699', fontSize: '15px', marginTop: '20px', fontFamily: 'sans-serif' }}>{buyLead.productName} Boat Headphones</h5>
                                <label style={{ fontStyle: 'italic', fontSize: '12px' }}>I want to purchase Boat Rockers 400. Kindly send me price and other details.</label>

                                <p style={{ color: '#666', fontSize: '12px', marginBottom: '-8px' }}>Quantity: {buyLead.quantity} 2 piece</p>
                                <p style={{ color: '#666', fontSize: '12px', marginBottom: '-8px' }}>Category: {buyLead.category} Electronics</p>
                                <p style={{ color: '#666', fontSize: '12px', marginBottom: '1px' }}>Subcategory: {buyLead.subcategory} Accessories</p>
                                <p style={{ color: '#666', fontSize: '12px', marginBottom: '-9px' }}>Unit of Measurement: {buyLead.unit}--</p>
                                {/* <p style={{ color: '#666', fontSize: '12px', marginBottom: '0px' }}>Order Placed: {buyLead.date} 24/3/2020 </p> */}
                                <p style={{ color: '#666', fontSize: '12px', marginBottom: '-8px' }}>Description: {buyLead.description} Boat Rockers 400</p>
                              </div>
                            </div>
                          </section>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="card-content">
                          <section className="section">
                            <div className="section-body">
                              <div className="right-side" style={{ textAlign: 'left', padding: "10px", background: "#fff", borderRadius: "10px" }}>
                                <h5 className="card-title" style={{ color: '#2AA699', fontSize: '15px', marginTop: '20px', fontFamily: 'sans-serif' }}>Buyer Details</h5>
                                <p style={{ color: '#666', fontSize: '12px', marginBottom: '-8px' }}>Member: {buyLead.member ? 'Yes' : 'No'} member since 2 years</p>
                                <p style={{ color: '#666', fontSize: '12px', marginBottom: '10px' }}>Available: {buyLead.available ? 'Yes' : 'No'} Email/Mobile</p>
                                <button className="btn btn-primary" onClick={togglePopup} style={{ backgroundColor: '#9B59B6', padding: '2px', fontSize: '11px' }}>View Buyer Details</button>
                              </div>
                            </div>
                          </section>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {showPopup && (
          <div className="popup" style={{ position: 'fixed', zIndex: 9999, top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.3)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="popup-inner" style={{ backgroundColor: 'white', top: 0, left: 20, height: '200px', width: '500px', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
              <h4 style={{ backgroundColor: '#D1F2EB', textAlign: 'center', color: '#333', marginBottom: '10px', fontFamily: 'sedan' }}>Buyer Details</h4>
              <p style={{ textAlign: 'left', marginBottom: '6px', fontFamily: 'sedan' }}>Name: {buyLead.productsOfInterest}</p>
              <p style={{ textAlign: 'left', marginBottom: '6px', fontFamily: 'sedan' }}>Email: {buyLead.requirements}</p>
              <p style={{ textAlign: 'left', marginBottom: '6px', fontFamily: 'sedan' }}>Conctact: {buyLead.calls}</p>

              <button className="btn btn-secondary" onClick={togglePopup} style={{ marginBottom: '60px', backgroundColor: '#D1F2EB', color: '#333' }}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Buyleads;
