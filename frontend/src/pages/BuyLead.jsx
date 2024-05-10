import React, { useState } from "react";

const Buyleads = (buyLead) => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div style={{ background: "#f2f2f2", padding: "0px", marginTop: "-90px" }}>
      <div className="main-content" style={{ maxWidth: "1600px", margin: "0 auto" }}>
        <input
          type="text"
          placeholder="Search Buy Leads......"
          style={{
            paddingBottom: '10px',
            width: '500px',
            padding: '1px',
            marginBottom: '20px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            fontSize: '14px',
            textAlign: 'center'
          }}
        />
        <section className="section" style={{ background: "#fff", borderRadius: "10px", boxShadow: "none", border: "none" }}>
          <div className="row">
            <div className="col-lg-12">
              <div className="card" style={{ width: "100%", margin: "0 auto", marginBottom: "20px", background: "#fff", borderRadius: "10px", boxShadow: "none", border: "none", padding: "20px" }}>
                <div className="card-statistic-4">
                  <div className="align-items-center justify-content-between">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="card-content">
                          <section className="section">
                            <div className="section-body">
                              <div className="product-details">
                                <div className="left-right-container" style={{ display: "flex", justifyContent: "space-between" }}>
                                  <div className="left-side" style={{ textAlign: 'left', marginBottom: '20px', fontFamily: 'sedan', width: "45%" }}>
                                    <h5 className="card-title" style={{ color: '#333', fontSize: '24px', marginTop: '20px' }}>{buyLead.productName} Boat Headphones</h5>
                                    <p style={{ color: '#666', fontSize: '16px', marginBottom: '10px' }}>Quantity: {buyLead.quantity} 2 piece</p>
                                    <p style={{ color: '#666', fontSize: '16px', marginBottom: '10px' }}>Category: {buyLead.category} Electronics</p>
                                    <p style={{ color: '#666', fontSize: '16px', marginBottom: '10px' }}>Subcategory: {buyLead.subcategory} Accessories</p>
                                    <p style={{ color: '#666', fontSize: '16px', marginBottom: '10px' }}>Unit of Measurement: {buyLead.unit}--</p>
                                    <p style={{ color: '#666', fontSize: '16px', marginBottom: '10px' }}>Order Placed: {buyLead.date} 24/3/2020 </p>
                                    <p style={{ color: '#666', fontSize: '16px', marginBottom: '10px' }}>Description: {buyLead.description} Boat Rockers 400</p>
                                  </div>

                                  <div className="right-side" style={{ textAlign: 'left', marginBottom: '20px', fontFamily: 'sedan', width: "45%" }}>
                                    <h5 className="card-title" style={{ color: '#333', fontSize: '24px', marginTop: '20px' }}>Buyer Details</h5>
                                    <p style={{ color: '#666', fontSize: '16px', marginBottom: '10px' }}>Member: {buyLead.member ? 'Yes' : 'No'} member since 2 years</p>
                                    <p style={{ color: '#666', fontSize: '16px', marginBottom: '10px' }}>Available: {buyLead.available ? 'Yes' : 'No'} Email/Mobile</p>
                                    <button className="btn btn-primary" onClick={togglePopup}>View Buyer Details</button>
                                  </div>

                                  {showPopup && (
  <div className="popup" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.3)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <div className="popup-inner" style={{ backgroundColor: 'white', top: 0, left: 20, height: '200px', width: '500px', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
      <h4 style={{ backgroundColor: '#D1F2EB', textAlign: 'center', color: '#333', marginBottom: '10px',fontFamily:'sedan' }}>Buyer Details</h4>
      <p style={{textAlign:'left', marginBottom: '6px',fontFamily:'sedan' }}>Name: {buyLead.productsOfInterest}</p>
      <p style={{textAlign:'left',  marginBottom: '6px' ,fontFamily:'sedan'}}>Email: {buyLead.requirements}</p>
      <p style={{textAlign:'left',  marginBottom: '6px',fontFamily:'sedan' }}>Conctact: {buyLead.calls}</p>
   
      <button className="btn btn-secondary" onClick={togglePopup} style={{ marginBottom: '60px', backgroundColor:'#D1F2EB', color:'#333'}}>
  close
</button>
    </div>
  </div>
)}

                        
                                </div>
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
        

        
      </div>
      
    </div>
    
  );
};

export default Buyleads;
