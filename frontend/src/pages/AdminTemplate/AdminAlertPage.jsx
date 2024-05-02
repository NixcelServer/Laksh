
import react,{Component} from 'react';
// import { Link } from 'react-router-dom';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


    class AdminAlertPage extends Component{
        render(){
            return(
                <div>
                <div className="loader" />
                <div id="app">
                  <div className="main-wrapper main-wrapper-1">
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
                            <a href="auth-login.html" className="dropdown-item has-icon text-danger"> <i className="fas fa-sign-out-alt" />
                              Logout
                            </a>
                          </div>
                        </li>
                      </ul>
                    </nav>
                    <div className="main-sidebar sidebar-style-2">
                      <aside id="sidebar-wrapper">
                        <div className="sidebar-brand">
                          <a href="index.html"> <img alt="" src="assets/img/logo.png" className="header-logo" /> <span className="logo-name">Laksh</span>
                          </a>
                        </div>
                        <ul className="sidebar-menu">
                          <li className="menu-header">Main</li>
                          <li className="dropdown">
                            <a href="index.html" className="nav-link"><i data-feather="monitor" /><span>Dashboard</span></a>
                          </li>
                          <li className="dropdown">
                            <a href="#" className="menu-toggle nav-link has-dropdown"><i data-feather="briefcase" /><span>Widgets</span></a>
                            <ul className="dropdown-menu">
                              <li><a className="nav-link" href="widget-chart.html">Chart Widgets</a></li>
                              <li><a className="nav-link" href="widget-data.html">Data Widgets</a></li>
                            </ul>
                          </li>
                          <li className="dropdown">
                            <a href="#" className="menu-toggle nav-link has-dropdown"><i data-feather="command" /><span>Apps</span></a>
                            
                          </li>
                          <li className="dropdown">
                            <a href="#" className="menu-toggle nav-link has-dropdown"><i data-feather="mail" /><span>Email</span></a>
                            
                          </li>
                          
                          
                          
                         
                         
                        </ul>
                      </aside>
                    </div>
                    {/* Main Content */}
                    <div className="main-content">
                      <section className="section">
                        <div className="section-body">
                          
                        </div>
                      </section>
                      <div className="settingSidebar">
                        <a href="javascript:void(0)" className="settingPanelToggle"> <i className="fa fa-spin fa-cog" />
                        </a>
                        <div className="settingSidebar-body ps-container ps-theme-default">
                          <div className=" fade show active">
                            <div className="setting-panel-header">Setting Panel
                            </div>
                            <div className="p-15 border-bottom">
                              <h6 className="font-medium m-b-10">Select Layout</h6>
                              <div className="selectgroup layout-color w-50">
                                <label className="selectgroup-item">
                                  <input type="radio" name="value" defaultValue={1} className="selectgroup-input-radio select-layout" defaultChecked />
                                  <span className="selectgroup-button">Light</span>
                                </label>
                                <label className="selectgroup-item">
                                  <input type="radio" name="value" defaultValue={2} className="selectgroup-input-radio select-layout" />
                                  <span className="selectgroup-button">Dark</span>
                                </label>
                              </div>
                            </div>
                            <div className="p-15 border-bottom">
                              <h6 className="font-medium m-b-10">Sidebar Color</h6>
                              <div className="selectgroup selectgroup-pills sidebar-color">
                                <label className="selectgroup-item">
                                  <input type="radio" name="icon-input" defaultValue={1} className="selectgroup-input select-sidebar" />
                                  <span className="selectgroup-button selectgroup-button-icon" data-toggle="tooltip" data-original-title="Light Sidebar"><i className="fas fa-sun" /></span>
                                </label>
                                <label className="selectgroup-item">
                                  <input type="radio" name="icon-input" defaultValue={2} className="selectgroup-input select-sidebar" defaultChecked />
                                  <span className="selectgroup-button selectgroup-button-icon" data-toggle="tooltip" data-original-title="Dark Sidebar"><i className="fas fa-moon" /></span>
                                </label>
                              </div>
                            </div>
                            <div className="p-15 border-bottom">
                              <h6 className="font-medium m-b-10">Color Theme</h6>
                              <div className="theme-setting-options">
                                <ul className="choose-theme list-unstyled mb-0">
                                  <li title="white" className="active">
                                    <div className="white" />
                                  </li>
                                  <li title="cyan">
                                    <div className="cyan" />
                                  </li>
                                  <li title="black">
                                    <div className="black" />
                                  </li>
                                  <li title="purple">
                                    <div className="purple" />
                                  </li>
                                  <li title="orange">
                                    <div className="orange" />
                                  </li>
                                  <li title="green">
                                    <div className="green" />
                                  </li>
                                  <li title="red">
                                    <div className="red" />
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="p-15 border-bottom">
                              <div className="theme-setting-options">
                                <label className="m-b-0">
                                  <input type="checkbox" name="custom-switch-checkbox" className="custom-switch-input" id="mini_sidebar_setting" />
                                  <span className="custom-switch-indicator" />
                                  <span className="control-label p-l-10">Mini Sidebar</span>
                                </label>
                              </div>
                            </div>
                            <div className="p-15 border-bottom">
                              <div className="theme-setting-options">
                                <label className="m-b-0">
                                  <input type="checkbox" name="custom-switch-checkbox" className="custom-switch-input" id="sticky_header_setting" />
                                  <span className="custom-switch-indicator" />
                                  <span className="control-label p-l-10">Sticky Header</span>
                                </label>
                              </div>
                            </div>
                            <div className="mt-4 mb-4 p-3 align-center rt-sidebar-last-ele">
                              <a href="#" className="btn btn-icon icon-left btn-primary btn-restore-theme">
                                <i className="fas fa-undo" /> Restore Default
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>  
                  </div>
                </div>
              </div>
            )
        }
    }

{/* <!-- alert.html  21 Nov 2019 03:51:00 GMT --> */}

export default AdminAlertPage;




