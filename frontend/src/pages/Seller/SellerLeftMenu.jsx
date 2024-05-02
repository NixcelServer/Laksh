import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const SellerLeftMenu = () => {
    return (
        <div className="left-menu" style={{ position:'fixed',width: '130px', margintop:'200px',padding: '20px',height:'100%',backgroundColor: '#f0f0f0'}}>
          <ul style={{ listStyleType: 'none', padding: '0', margin: '0' }}>
            
            <li style={{ padding: '10px 0', borderBottom: '1px solid #34495e', marginBottom: '20px', margintop:'-100px' }}>
              <a href="/sell" style={{ textDecoration: 'none', color: 'black', display: 'block' }}>
                  {/* <img src="/images/userLogo.png" alt="Dashboard Logo" style={{ width: '30px', marginRight: '10px', borderRadius: '0%' }} /> */}
                Dashboard
              </a>
            </li>
    
            <li  style={{ padding: '10px 0', borderBottom: '1px solid #34495e', marginBottom: '20px' }}>
              <a href="#" style={{ textDecoration: 'none', color: 'black', display: 'block' }}>
              {/* <img src="/images/leadmanagerlogo.png" alt="Dashboard Logo" style={{ width: '30px', marginRight: '08px' }} /> */}
    
                Lead Manager
              </a>
            </li>

            <li style={{ padding: '10px 0', borderBottom: '1px solid #34495e', marginBottom: '20px' }}>
          <Link to="/companysetup" style={{ textDecoration: 'none', color: 'black', display: 'block' }}>Company Setup</Link>
        </li>
          
            <li style={{ padding: '10px 0', borderBottom: '1px solid #34495e', marginBottom: '20px' }}>
          <Link to="/buyleads" style={{ textDecoration: 'none', color: 'black', display: 'block' }}>Buy Leads</Link>
        </li>
            <li style={{ padding: '10px 0', borderBottom: '1px solid #34495e', marginBottom: '20px' }}>
              <a href="/addmyproduct" style={{ textDecoration: 'none', color: 'black', display: 'block' }}>Products</a>
            </li>
            <li style={{ padding: '10px 0', borderBottom: '1px solid #34495e', marginBottom: '20px' }}>
              <a href="#" style={{ textDecoration: 'none', color: 'black', display: 'block' }}>Photos and Docs</a>
            </li>
            <li style={{ padding: '10px 0', marginBottom: '20px' }}>
              <a href="#" style={{ textDecoration: 'none', color: 'black', display: 'block' }}>Settings</a>
            </li>
          </ul>
        </div>
      );
  
}

export default SellerLeftMenu;