import axios from 'axios';
import React, { useEffect, useState } from 'react';

const UserAdApproval = () => {

    const [pendingAdvs,setPendingAdvs] = useState([]);

    useEffect(() => {

        fetchPendingAdv();
    },[]);

    const fetchPendingAdv = async() =>{
        const res = await axios.get(`http://127.0.0.1:8000/api/get-pending-adv-imgs`);
        setPendingAdvs(res.data);
       

    }

    const handleApprove = async (id) => {
        try {
            // const userString = sessionStorage.getItem('user');
            // const user = JSON.parse(userString);
            // const encUserId = user.encUserId;
            console.log(id);
         await axios.get(`http://127.0.0.1:8000/api/approve-advertisement/${id}`,  {
            
          });
          setPendingAdvs(pendingAdvs.filter(adv => adv.encAdvImgId !== id)); // Remove approved advertisement from list
        } catch (error) {
          console.error('Error approving advertisement:', error);
        }
      };

      const handleReject = async (id) => {
        try {
            // const userString = sessionStorage.getItem('user');
            // const user = JSON.parse(userString);
            // const encUserId = user.encUserId;
            console.log(id);
         await axios.get(`http://127.0.0.1:8000/api/reject-advertisement/${id}`,  {
            
          });
          setPendingAdvs(pendingAdvs.filter(adv => adv.encAdvImgId !== id)); // Remove approved advertisement from list
        } catch (error) {
          console.error('Error approving advertisement:', error);
        }
      };
    

  return (
    <div className="main-content" >
     
       
           
              <div className="card">
              <div className="card-header">
      <h4>Approve or Reject Advertisement Images</h4>
    </div>
    <p style={{ fontStyle: 'italic', color: 'gray', marginTop: '5px', textAlign: 'left', padding: '5px', marginLeft: '20px' }}>
      Note: Images once approved cannot be unapproved.
    </p>
                
                <div className="card-body">
                <div className="modal-body" style={{ paddingTop: '6px' }}>
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
      {pendingAdvs.map((adv, index) => (              
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
    <img src={`http://127.0.0.1:8000/storage/${adv.adv_img_path}`} alt="Company Image" style={{ width: '400px', height: '220px' }} />
  </div>
  
  {/* Company info and buttons in bottom half */}
  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}> {/* Takes up half of the card's height */}
    <h4>{adv.company.c_name}</h4>
    <p>Description or additional info</p>
    <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '10px' }}>
     
<button className="btn btn-outline-success" onClick={() => handleApprove(adv.encAdvImgId)}>
  Approve
</button>

<button className="btn btn-outline-danger" onClick={() => handleReject(adv.encAdvImgId)}>
  Reject
</button>
    </div>
  </div>
</div>
))}














                  
                    
                  </div>
                </div>
               
              </form>
            </div>
                  
                </div>
              </div>
            
         
     

     
    </div>
  );
};

export default UserAdApproval;









































