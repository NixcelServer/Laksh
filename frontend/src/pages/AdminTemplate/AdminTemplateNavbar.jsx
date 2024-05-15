

import React, { useEffect } from 'react';
import feather from 'feather-icons'; // Import feather-icons
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authLogout } from '../../redux/auth/auth.action';



const AdminTemplateNavbar = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate();

    useEffect(() => {
        feather.replace(); // Call feather.replace() in useEffect to replace icons
    }, []); 

    const handleLogout = () => {
      // Clear user session data
      sessionStorage.removeItem('user');
      dispatch(authLogout());
      navigate('/');
    };
    
    return(
<div>
        <div className="navbar-bg" />
        <nav className="navbar navbar-expand-lg main-navbar sticky">
          <div className="form-inline mr-auto">
            <ul className="navbar-nav mr-3">
              <li><a href="#" data-toggle="sidebar" className="nav-link nav-link-lg
                collapse-btn"> <i data-feather="align-justify" /></a></li>
              {/* <li><a href="#" className="nav-link nav-link-lg fullscreen-btn">
                  <i data-feather="maximize" />
                </a></li> */}
              <li>
                <form className="form-inline mr-auto">
                  {/* <div className="search-element">
                    <input className="form-control" type="search" placeholder="Search" aria-label="Search" data-width={200} />
                    <button className="btn" type="submit">
                      <i className="fas fa-search" />
                    </button>
                  </div> */}
                </form>
              </li>
            </ul>
          </div>
          <ul className="navbar-nav navbar-right">
           
           
            <li className="dropdown"><a href="#" data-toggle="dropdown"style={{ boxShadow: 'none',marginTop:'25px' }} className="nav-link dropdown-toggle nav-link-lg nav-link-user"> <img alt="image" src="images/adminlogos.png" className="user-img-radious-style" /> <span className="d-sm-none d-lg-inline-block" /></a>
              <div className="dropdown-menu dropdown-menu-right pullDown">
                <div className="dropdown-title"></div>
                <a href="#" className="dropdown-item has-icon"> <i className="far
                                              fa-user" /> Profile
                </a> <a href="#" className="dropdown-item has-icon"> <i className="fas fa-bolt" />
                  Activities
                </a> <a href="#" className="dropdown-item has-icon"> <i className="fas fa-cog" />
                  Settings
                </a>
                <div className="dropdown-divider" />
                <Link to="/" className="dropdown-item has-icon text-danger" onClick={handleLogout}>
      <i className="fas fa-sign-out-alt" />
      Logout
    </Link>
              </div>
            </li>
          </ul>
        </nav>
        <div className="main-sidebar sidebar-style-2" >
          <aside id="sidebar-wrapper">
            <div className="sidebar-brand" >
            <Link to="/admintemplatedashboard"> 
          <img alt="" src="" style={{ margin: '-10px' }} className="header-logo" /> 
          <span style={{ margin: '-10px' }} className="logo-name">Laksh</span>
      </Link>
      
            </div>
            <ul className="sidebar-menu">
              <li className="menu-header"></li>
              <li className="dropdown active">
                {/* <i data-feather="monitor" /> */}
                <Link to="/admintemplatedashboard" className="nav-link"><i data-feather="monitor" /><span>Dashboard</span></Link>
              </li>
              <li className="dropdown">
                {/* <i data-feather="briefcase" /> */}
                <Link to="/admintemplatecategories" className=""><i data-feather="grid" /><span>Categories</span></Link>
                <ul className="dropdown-menu">
                  <li><a className="nav-link" href="widget-chart.html">Chart Widgets</a></li>
                  <li><a className="nav-link" href="widget-data.html">Data Widgets</a></li>
                </ul>
              </li>
              <li className="dropdown">
                {/* <a href="#" className="menu-toggle nav-link has-dropdown"><i data-feather="command" /><span>Apps</span></a> */}
                {/* <i data-feather="command" /> */}
                <Link to="/admintemplatekeywords" className=""><i data-feather="key" /><span>Keywords</span></Link>
      
                <ul className="dropdown-menu">
                  <li><a className="nav-link" href="chat.html">Chat</a></li>
                  <li><a className="nav-link" href="portfolio.html">Portfolio</a></li>
                  <li><a className="nav-link" href="blog.html">Blog</a></li>
                  <li><a className="nav-link" href="calendar.html">Calendar</a></li>
                </ul>
              </li>
              <li className="">
                {/* If you want to give feather icon to this use <i data-feather="mail" /> after className */}
                <Link to="/admintemplateuom" className=""> <i data-feather="layers" /><span>UOM</span></Link>
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

export default AdminTemplateNavbar;