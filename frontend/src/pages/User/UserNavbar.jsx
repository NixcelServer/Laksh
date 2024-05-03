

import React, { useEffect } from 'react';
import feather from 'feather-icons'; // Import feather-icons



const UserNavbar = () => {

    useEffect(() => {
        feather.replace(); // Call feather.replace() in useEffect to replace icons
    }, []); 
    
    return(
<div>
        <div className="navbar-bg" />
        
        <div className="main-sidebar sidebar-style-2" style={{ width: '10%',marginTop: '4.5em'  }}>
          <aside id="sidebar-wrapper">
           
            <ul className="sidebar-menu">
              <li className="menu-header"></li>
              <li className="dropdown active" style={{ marginBottom: '2rem' }}>
                            <a href="/" className="nav-link"><span>Dashboard</span></a>
                        </li>
                        <li className="dropdown" style={{ marginBottom: '2rem' }}>
                            <a href="#" className=""><span>Lead Manager</span></a>
                            {/* Dropdown menu content */}
                        </li>
                        <li className="dropdown" style={{ marginBottom: '2rem' }}>
                            <a href="#" className=""><span>Company Setup</span></a>
                            {/* Dropdown menu content */}
                        </li>
                        <li className="" style={{ marginBottom: '2rem' }}>
                            <a href="#" className=""><span>Buy Leads</span></a>
                            {/* Dropdown menu content */}
                        </li>
                        <li className="" style={{ marginBottom: '2rem' }}>
                            <a href="#" className=""><span>Products</span></a>
                                
                <ul className="dropdown-menu">
                  <li><a className="nav-link" href="email-inbox.html">Inbox</a></li>
                  <li><a className="nav-link" href="email-compose.html">Compose</a></li>
                  <li><a className="nav-link" href="email-read.html">read</a></li>
                </ul>
              </li>
              
             
            
              
             
             
                
            </ul>
          </aside>
        </div>

        </div>

    )
}

export default UserNavbar;