import React, { useEffect } from 'react';
import feather from 'feather-icons'; // Import feather-icons
import { Link, useNavigate } from 'react-router-dom';
import { FaProductHunt } from 'react-icons/fa';
import { MdOutlineLeaderboard } from "react-icons/md";


const UserNavbar = () => {
    useEffect(() => {
        feather.replace(); // Call feather.replace() in useEffect to replace icons
    }, []); 

    const handleLogout = () => {
        // Clear user session data
        sessionStorage.removeItem('user');
        dispatch(authLogout());
        navigate('/');
    };

    return (
        <div>
            <div className="navbar-bg" />
            <div className="main-sidebar sidebar-style-2" style={{ marginTop: "11vh" }}>
                <ul className="sidebar-menu">
                    <li className="menu-header"></li>
                    <li className="dropdown active">

<li>
    <Link to="" data-toggle="sidebar" className="nav-link nav-link-lg collapse-btn">
        <i data-feather="align-justify" />
    </Link>
</li>


                        </li>
                       
                    
                        <li className="">
                    <Link to="/userdashboard" className=""><i data-feather="monitor" /><span style={{ fontSize: '12px',textAlign:'left'  }}>Dashboard</span></Link>
                    </li>
                    <li className="">
                    <Link to="/" className=""><i data-feather="grid" /><span style={{ fontSize: '12px',textAlign:'left'  }}>Lead Manager</span></Link>
                    </li>
                    <li className="">
                    <Link to="/buylead" className="">
                    <MdOutlineLeaderboard size={20} />
                        <span style={{ fontSize: '12px',textAlign:'left', paddingLeft: '10px'  }}>BuyLeads</span></Link>
                    </li>
                    <li className="">
                    <Link to="/products" className="">
                        <FaProductHunt size={20}/>
                        <span style={{ fontSize: '12px', textAlign: 'left', paddingLeft: '10px' }}>Products</span>
                    </Link>
                    </li>
                    <li className="">
                        <Link to="/" className=""><i data-feather="key" /><span style={{ fontSize: '12px',textAlign:'left' }}>Photos and Docs</span></Link>
                    </li>
                    <li className="">
                    <Link to="/" className=""><i data-feather="grid" /><span style={{ fontSize: '12px',textAlign:'left'  }}>Settings</span></Link>
                    </li>
                    <li className="">
                        <Link to="/" className=""><i data-feather="layers" /><span style={{ fontSize: '12px',textAlign:'left'  }}>Help</span></Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default UserNavbar;
