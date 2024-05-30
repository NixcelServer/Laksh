import React from 'react';
import { Link } from 'react-router-dom';

const Subscription = () => {
  return (
    <div className="main-content">
      <section className="section">
        <div className="section-body">
          <div className="row">
            <div className="col-12 col-md-6 col-lg-6">
              <div className="card">
                <div className="card-header">
                  <h4>Modal With Form</h4>
                </div>
                <div className="card-body">
                  <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                    Modal With Form
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal with form */}
      <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="formModal" aria-hidden="true">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
          <div className="header" style={{ textAlign: 'center', padding: '10px', backgroundColor: '#FCF3CF', color: 'black', position: 'relative' }}>
  <button type="button" className="close" data-dismiss="modal" aria-label="Close" style={{ position: 'absolute', top: '5px', right: '10px', color: 'white', border: 'none', background: 'transparent', fontSize: '20px' }}>
  <span aria-hidden="true" style={{ color: 'black' }}>×</span>

  </button>
  <h5 className="modal-title" id="formModal" style={{ marginBottom: '2px', transition: 'color 0.3s' }}>CHOOSE YOUR PLAN</h5>
  <p style={{ fontSize: '14px', margin: '10px 0 0px 0', transition: 'color 0.3s' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque fugit esse officia fugiat, sit excepturi ut impedit in iste laudantium maxime veritatis aliquam voluptate id qui veniam.</p>
</div>

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
                    <div
                      style={{
                        backgroundColor: '#f9f9f9',
                        border: '1px solid #ddd',
                        borderRadius: '10px',
                        width: '100%',
                        maxWidth: '180px',
                        maxHeight: '300px',
                        padding: '20px',
                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                        textAlign: 'center',
                        transition: 'transform 0.3s ease',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      <div>
    <img 
      src="images/monthly.png" 
      alt="Car Icon" 
      style={{ 
        width: '30px', 
        height: '30px', 
        display: 'inline-block', 
        verticalAlign: 'middle',
        marginTop:'0px',
      }} 
    />
    <h6 
      style={{ 
        display: 'inline-block', 
        verticalAlign: 'middle', 
        margin: '0 0 0 5px' 
      }}
    >
      Monthly
    </h6>
  </div>
                      <img src="images/month.png" alt="Company Image" style={{ width: '200px', height: '100px', marginTop: '10px' }} />

                      <p style={{ fontSize: '14px', margin: '2px 0 0 0' }}>Free</p>
<ul style={{ listStyle: 'none', padding: 0 }}>
  <li style={{ fontSize: '12px', margin: '-5px 0' }}>Unlimited Downloads</li>
  <li style={{ fontSize: '12px', margin: '-5px 0' }}>Email Support</li>
  <li style={{ fontSize: '12px', margin: '-5px 0' }}>Limited Access</li>
</ul>
<button
  style={{
    padding: '1px 4px',
    fontSize: '12px',
    marginTop: '-5px',
    cursor: 'pointer',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#ffc107', // Add your desired background color here
    transition: 'background-color 0.3s', // Smooth transition for hover effect
  }}
  onMouseEnter={(e) => e.target.style.backgroundColor = '#D35400'} // Orange color on hover
  onMouseLeave={(e) => e.target.style.backgroundColor = '#ffc107'} // Restore original color on mouse leave
  // onClick={() => history.push('/destination')} // Add your destination URL here
>
  Select
</button>

                    </div>

                    
                    <div
    style={{
      backgroundColor: '#f9f9f9',
      border: '1px solid #ddd',
      borderRadius: '10px',
      width: '100%',
      maxWidth: '180px',
      maxHeight: '300px',
      padding: '20px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
      transition: 'transform 0.3s ease',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
  >
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <img 
        src="images/quarterly.png" 
        alt="Car Icon" 
        style={{ width: '30px', height: '30px' }} 
      />
      <h6 style={{ margin: '0 0 0 5px'}}>Quarterly</h6>
    </div>
    <img src="images/quarter.png" alt="Company Image" style={{ width: '180px', height: '100px', marginTop: '10px'}} />

    <p style={{ fontSize: '14px', margin: '1px 0' }}>$49/Year</p>
    <ul style={{ listStyle: 'none', padding: 0 }}>
      <li style={{  fontSize: '12px', margin: '-5px 0' }}>Up to 10 Users</li>
      <li style={{ fontSize: '12px', margin: '-5px 0'  }}>Email/Call Support</li>
      <li style={{  fontSize: '12px', margin: '-5px 0'  }}>1 Year Access</li>
    </ul>
    <button
  style={{
    padding: '1px 4px',
    fontSize: '12px',
    marginTop: '-5px',
    cursor: 'pointer',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#ffc107', // Add your desired background color here
    transition: 'background-color 0.3s', // Smooth transition for hover effect
  }}
  onMouseEnter={(e) => e.target.style.backgroundColor = '#D35400'} // Orange color on hover
  onMouseLeave={(e) => e.target.style.backgroundColor = '#ffc107'} // Restore original color on mouse leave
  // onClick={() => history.push('/destination')} // Add your destination URL here
>
  Select
</button>
  </div>


  <div
    style={{
      backgroundColor: '#f9f9f9',
      border: '1px solid #ddd',
      borderRadius: '10px',
      width: '100%',
      maxWidth: '180px',
      maxHeight: '300px',
      padding: '20px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
      transition: 'transform 0.3s ease',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
  >
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <img 
        src="images/annually.png" 
        alt="Plane Icon" 
        style={{ width: '30px', height: '30px' }} 
      />
      <h6 style={{ margin: '0 0 0 5px'}}>Annually</h6>
    </div>
    <img 
      src="images/year.png" 
      alt="Company Image" 
      style={{ width: '140px', height: '100px', marginTop: '10px' }} 
    />
    <p style={{ fontSize: '14px', margin: '1px 0' }}>$99</p>
    <ul style={{ listStyle: 'none', padding: 0 }}>
      <li style={{  fontSize: '12px', margin: '-5px 0'  }}>Unlimited Access</li>
      <li style={{ fontSize: '12px', margin: '-5px 0'  }}>On Demand Request</li>
      <li style={{  fontSize: '12px', margin: '-5px 0'  }}>Lifetime Access</li>
    </ul>
  

  
    <button
  style={{
    padding: '1px 4px',
    fontSize: '12px',
    marginTop: '-5px',
    cursor: 'pointer',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#ffc107', // Add your desired background color here
    transition: 'background-color 0.3s', // Smooth transition for hover effect
  }}
  onMouseEnter={(e) => e.target.style.backgroundColor = '#D35400'} // Orange color on hover
  onMouseLeave={(e) => e.target.style.backgroundColor = '#ffc107'} // Restore original color on mouse leave
  // onClick={() => history.push('/destination')} // Add your destination URL here
>
  Select
</button>


  </div>
                    
                  </div>
                </div>
                <button type="button" className="btn btn-primary m-t-15 waves-effect" 
                style={{ marginBottom: '0px',backgroundColor:'#3498DB',color:'black' }}>
               Subscribe
                </button>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
