import React from 'react';

const Adapprove = () => {
  return (
    <div className="main-content" >
     
       
           
              <div className="card">
              <div className="header" style={{ position: 'relative' }}>
  <h4 style={{ padding:'20px',marginBottom: '5px', transition: 'color 0.3s ease-in-out',backgroundColor:'#FCF3CF' }}>Approve Images for Advertisement</h4>
  <p style={{ 
    fontStyle: 'italic', 
    color: 'gray', 
    marginTop: '5px', 
    textAlign: 'left', 
    padding: '5px', 
    marginLeft: '20px', 
    marginBottom: '0px', 
    transition: 'color 0.3s ease-in-out' 
  }}>
    Image once approved cannot be unapproved
  </p>
  <style jsx>{`
    .header:hover h4 {
      color: #FF5722; /* Change color on hover */
    }
    
    .header:hover p {
      color: #607D8B; /* Change color on hover */
    }
  `}</style>
</div>


                
                <div className="card-body">
                <div className="modal-body" style={{ paddingTop: '0px' }}>
              <form>
                <div style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif', padding: '10px' }}>
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '20px',
                      justifyContent: 'center'
                    }}
                  >
        <div
  style={{
    display: 'flex',
    flexDirection: 'column', // Arrange children in a column layout
    alignItems: 'center', // Center align items horizontally
    justifyContent: 'center', // Center align items vertically
    backgroundColor: '#f9f9f9',
    border: '1px solid #ddd',
    borderRadius: '10px',
    width: '100%',
    maxWidth: '400px',
    maxHeight: '400px',
    padding: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    transition: 'transform 0.3s ease',
    cursor: 'pointer'
  }}
  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
>
  {/* Image in top half */}
  <div style={{ flex: 1 }}> {/* Takes up half of the card's height */}
    <img src="images/p2.png" alt="Company Image" style={{ width: '400px', height: '220px' }} />
  </div>
  
  {/* Company info and buttons in bottom half */}
  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}> {/* Takes up half of the card's height */}
    <h6>Company Name</h6>
    <p>Description or additional info</p>
    <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '10px' }}>
     
<button className="btn btn-outline-success" onClick={() => {}}>
  Approve
</button>

<button className="btn btn-outline-danger" onClick={() => {}}>
  Reject
</button>
    </div>
  </div>
</div>

<div
  style={{
    display: 'flex',
    flexDirection: 'column', // Arrange children in a column layout
    alignItems: 'center', // Center align items horizontally
    justifyContent: 'center', // Center align items vertically
    backgroundColor: '#f9f9f9',
    border: '1px solid #ddd',
    borderRadius: '10px',
    width: '100%',
    maxWidth: '400px',
    maxHeight: '400px',
    padding: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    transition: 'transform 0.3s ease',
    cursor: 'pointer'
  }}
  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
>
  {/* Image in top half */}
  <div style={{ flex: 1 }}> {/* Takes up half of the card's height */}
    <img src="images/p3.png" alt="Company Image" style={{ width: '400px', height: '220px' }} />
  </div>
  
  {/* Company info and buttons in bottom half */}
  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}> {/* Takes up half of the card's height */}
    <h6>Company Name</h6>
    <p>Description or additional info</p>
    <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '10px' }}>
     
<button className="btn btn-outline-success" onClick={() => {}}>
  Approve
</button>

<button className="btn btn-outline-danger" onClick={() => {}}>
  Reject
</button>
    </div>
  </div>
</div>

<div
  style={{
    display: 'flex',
    flexDirection: 'column', // Arrange children in a column layout
    alignItems: 'center', // Center align items horizontally
    justifyContent: 'center', // Center align items vertically
    backgroundColor: '#f9f9f9',
    border: '1px solid #ddd',
    borderRadius: '10px',
    width: '100%',
    maxWidth: '400px',
    maxHeight: '400px',
    padding: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    transition: 'transform 0.3s ease',
    cursor: 'pointer'
  }}
  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
>
  {/* Image in top half */}
  <div style={{ flex: 1 }}> {/* Takes up half of the card's height */}
    <img src="images/p4.png" alt="Company Image" style={{ width: '400px', height: '220px' }} />
  </div>
  
  {/* Company info and buttons in bottom half */}
  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}> {/* Takes up half of the card's height */}
    <h6>Company Name</h6>
    <p>Description or additional info</p>
    <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '10px' }}>
     
<button className="btn btn-outline-success" onClick={() => {}}>
  Approve
</button>

<button className="btn btn-outline-danger" onClick={() => {}}>
  Reject
</button>
    </div>
  </div>
</div>

<div
  style={{
    display: 'flex',
    flexDirection: 'column', // Arrange children in a column layout
    alignItems: 'center', // Center align items horizontally
    justifyContent: 'center', // Center align items vertically
    backgroundColor: '#f9f9f9',
    border: '1px solid #ddd',
    borderRadius: '10px',
    width: '100%',
    maxWidth: '400px',
    maxHeight: '400px',
    padding: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    transition: 'transform 0.3s ease',
    cursor: 'pointer'
  }}
  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
>
  {/* Image in top half */}
  <div style={{ flex: 1 }}> {/* Takes up half of the card's height */}
    <img src="images/p5.png" alt="Company Image" style={{ width: '400px', height: '220px' }} />
  </div>
  
  {/* Company info and buttons in bottom half */}
  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}> {/* Takes up half of the card's height */}
    <h6>Company Name</h6>
    <p>Description or additional info</p>
    <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '10px' }}>
     
<button className="btn btn-outline-success" onClick={() => {}}>
  Approve
</button>

<button className="btn btn-outline-danger" onClick={() => {}}>
  Reject
</button>
    </div>
  </div>
</div>









                  
                    
                  </div>
                </div>
                <button type="button" className="btn btn-primary m-t-15 waves-effect">
                  Subscribe
                </button>
              </form>
            </div>
                  
                </div>
              </div>
            
         
     

     
    </div>
  );
};

export default Adapprove;
