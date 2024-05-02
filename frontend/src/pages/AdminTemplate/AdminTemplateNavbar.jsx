

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
              <li><a href="#" className="nav-link nav-link-lg fullscreen-btn">
                  <i data-feather="maximize" />
                </a></li>
              <li>
                <form className="form-inline mr-auto">
                  <div className="search-element">
                    <input className="form-control" type="search" placeholder="Search" aria-label="Search" data-width={200} />
                    <button className="btn" type="submit">
                      <i className="fas fa-search" />
                    </button>
                  </div>
                </form>
              </li>
            </ul>
          </div>
          <ul className="navbar-nav navbar-right">
            <li className="dropdown dropdown-list-toggle"><a href="#" data-toggle="dropdown" className="nav-link nav-link-lg message-toggle"><i data-feather="mail" />
                <span className="badge headerBadge1">
                  6 </span> </a>
              <div className="dropdown-menu dropdown-list dropdown-menu-right pullDown">
                <div className="dropdown-header">
                  Messages
                  <div className="float-right">
                    <a href="#">Mark All As Read</a>
                  </div>
                </div>
                <div className="dropdown-list-content dropdown-list-message">
                  <a href="#" className="dropdown-item"> <span className="dropdown-item-avatar
                                                  text-white"> <img alt="image" src="assets/img/users/user-1.png" className="rounded-circle" />
                    </span> <span className="dropdown-item-desc"> <span className="message-user">John
                        Deo</span>
                      <span className="time messege-text">Please check your mail !!</span>
                      <span className="time">2 Min Ago</span>
                    </span>
                  </a> <a href="#" className="dropdown-item"> <span className="dropdown-item-avatar text-white">
                      <img alt="image" src="assets/img/users/user-2.png" className="rounded-circle" />
                    </span> <span className="dropdown-item-desc"> <span className="message-user">Sarah
                        Smith</span> <span className="time messege-text">Request for leave
                        application</span>
                      <span className="time">5 Min Ago</span>
                    </span>
                  </a> <a href="#" className="dropdown-item"> <span className="dropdown-item-avatar text-white">
                      <img alt="image" src="assets/img/users/user-5.png" className="rounded-circle" />
                    </span> <span className="dropdown-item-desc"> <span className="message-user">Jacob
                        Ryan</span> <span className="time messege-text">Your payment invoice is
                        generated.</span> <span className="time">12 Min Ago</span>
                    </span>
                  </a> <a href="#" className="dropdown-item"> <span className="dropdown-item-avatar text-white">
                      <img alt="image" src="assets/img/users/user-4.png" className="rounded-circle" />
                    </span> <span className="dropdown-item-desc"> <span className="message-user">Lina
                        Smith</span> <span className="time messege-text">hii John, I have upload
                        doc
                        related to task.</span> <span className="time">30
                        Min Ago</span>
                    </span>
                  </a> <a href="#" className="dropdown-item"> <span className="dropdown-item-avatar text-white">
                      <img alt="image" src="assets/img/users/user-3.png" className="rounded-circle" />
                    </span> <span className="dropdown-item-desc"> <span className="message-user">Jalpa
                        Joshi</span> <span className="time messege-text">Please do as specify.
                        Let me
                        know if you have any query.</span> <span className="time">1
                        Days Ago</span>
                    </span>
                  </a> <a href="#" className="dropdown-item"> <span className="dropdown-item-avatar text-white">
                      <img alt="image" src="assets/img/users/user-2.png" className="rounded-circle" />
                    </span> <span className="dropdown-item-desc"> <span className="message-user">Sarah
                        Smith</span> <span className="time messege-text">Client Requirements</span>
                      <span className="time">2 Days Ago</span>
                    </span>
                  </a>
                </div>
                <div className="dropdown-footer text-center">
                  <a href="#">View All <i className="fas fa-chevron-right" /></a>
                </div>
              </div>
            </li>
            <li className="dropdown dropdown-list-toggle"><a href="#" data-toggle="dropdown" className="nav-link notification-toggle nav-link-lg"><i data-feather="bell" className="bell" />
              </a>
              <div className="dropdown-menu dropdown-list dropdown-menu-right pullDown">
                <div className="dropdown-header">
                  Notifications
                  <div className="float-right">
                    <a href="#">Mark All As Read</a>
                  </div>
                </div>
                <div className="dropdown-list-content dropdown-list-icons">
                  <a href="#" className="dropdown-item dropdown-item-unread"> <span className="dropdown-item-icon bg-primary text-white"> <i className="fas
                                                      fa-code" />
                    </span> <span className="dropdown-item-desc"> Template update is
                      available now! <span className="time">2 Min
                        Ago</span>
                    </span>
                  </a> <a href="#" className="dropdown-item"> <span className="dropdown-item-icon bg-info text-white"> <i className="far
                                                      fa-user" />
                    </span> <span className="dropdown-item-desc"> <b>You</b> and <b>Dedik
                        Sugiharto</b> are now friends <span className="time">10 Hours
                        Ago</span>
                    </span>
                  </a> <a href="#" className="dropdown-item"> <span className="dropdown-item-icon bg-success text-white"> <i className="fas
                                                      fa-check" />
                    </span> <span className="dropdown-item-desc"> <b>Kusnaedi</b> has
                      moved task <b>Fix bug header</b> to <b>Done</b> <span className="time">12
                        Hours
                        Ago</span>
                    </span>
                  </a> <a href="#" className="dropdown-item"> <span className="dropdown-item-icon bg-danger text-white"> <i className="fas fa-exclamation-triangle" />
                    </span> <span className="dropdown-item-desc"> Low disk space. Let's
                      clean it! <span className="time">17 Hours Ago</span>
                    </span>
                  </a> <a href="#" className="dropdown-item"> <span className="dropdown-item-icon bg-info text-white"> <i className="fas
                                                      fa-bell" />
                    </span> <span className="dropdown-item-desc"> Welcome to Laksh
                      template! <span className="time">Yesterday</span>
                    </span>
                  </a>
                </div>
                <div className="dropdown-footer text-center">
                  <a href="#">View All <i className="fas fa-chevron-right" /></a>
                </div>
              </div>
            </li>
            <li className="dropdown"><a href="#" data-toggle="dropdown" className="nav-link dropdown-toggle nav-link-lg nav-link-user"> <img alt="image" src="assets/img/user.png" className="user-img-radious-style" /> <span className="d-sm-none d-lg-inline-block" /></a>
              <div className="dropdown-menu dropdown-menu-right pullDown">
                <div className="dropdown-title">Hello Sarah Smith</div>
                <a href="profile.html" className="dropdown-item has-icon"> <i className="far
                                              fa-user" /> Profile
                </a> <a href="timeline.html" className="dropdown-item has-icon"> <i className="fas fa-bolt" />
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
        <div className="main-sidebar sidebar-style-2">
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
                <Link to="/admintemplatedashboard" className="nav-link"><span>Dashboard</span></Link>
              </li>
              <li className="dropdown">
                {/* <i data-feather="briefcase" /> */}
                <Link to="/admintemplatecategories" className=""><span>Categories</span></Link>
                <ul className="dropdown-menu">
                  <li><a className="nav-link" href="widget-chart.html">Chart Widgets</a></li>
                  <li><a className="nav-link" href="widget-data.html">Data Widgets</a></li>
                </ul>
              </li>
              <li className="dropdown">
                {/* <a href="#" className="menu-toggle nav-link has-dropdown"><i data-feather="command" /><span>Apps</span></a> */}
                {/* <i data-feather="command" /> */}
                <Link to="/admintemplatekeywords" className=""><span>Keywords</span></Link>
      
                <ul className="dropdown-menu">
                  <li><a className="nav-link" href="chat.html">Chat</a></li>
                  <li><a className="nav-link" href="portfolio.html">Portfolio</a></li>
                  <li><a className="nav-link" href="blog.html">Blog</a></li>
                  <li><a className="nav-link" href="calendar.html">Calendar</a></li>
                </ul>
              </li>
              <li className="">
                {/* If you want to give feather icon to this use <i data-feather="mail" /> after className */}
                <Link to="/admintemplateuom" className=""><span>UOM</span></Link>
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