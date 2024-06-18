import React, { useEffect, useState } from 'react';
import feather from 'feather-icons';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { baseURL } from '../../utils/variables';

const UserDashboard = () => {

  const [prodCount,setProdCount] = useState('');
  const [buyleadsCount,setBuyleadsCount] = useState('');
    useEffect(() => {
        feather.replace();
        const userString = sessionStorage.getItem("user");
    const user = JSON.parse(userString);
    const encCompanyId = user.encCompanyId;

        fetchDashboardDetails(encCompanyId);
    }, []); // Empty dependency array means this effect runs only once after the component mounts

    const fetchDashboardDetails = async(encCompanyId) => {
      console.log("fetch dashboard details",encCompanyId);
      const res = await axios.get(`${baseURL}api/user-dash-info/${encCompanyId}`);
      console.log(res.data);
      setBuyleadsCount(res.data.buyLeadsCount);
      // Access the productsCount property from the response data
      setProdCount(res.data.productsCount);
    }
    console.log(buyleadsCount);

    return (
        <div>
            {/* // <!-- Main Content --> */}
      <div className="main-content">
  <section className="section">
    <div className="row ">
      <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12">
      <Link to="/products">
        <div className="card">
          <div className="card-statistic-4">
            <div className="align-items-center justify-content-between">
              <div className="row ">
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pr-0 pt-3">
                  <div className="card-content">
                    <h5 className="font-15">Products</h5>
                    <h2 className="mb-3 font-18">{prodCount}</h2>
                    <p className="mb-0"><span className="col-green">10%</span> Increase</p>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pl-0">
                  <div className="banner-img">
                    <img src="assets/img/banner/1.png" alt />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </Link>
      </div>
      <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12">
      <Link to="/buylead">
        <div className="card">
          <div className="card-statistic-4">
            <div className="align-items-center justify-content-between">
              <div className="row ">
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pr-0 pt-3">
                  <div className="card-content">
                    <h5 className="font-15"> Buy Leads</h5>
                    <h2 className="mb-3 font-18">{buyleadsCount}</h2>
                    <p className="mb-0"><span className="col-orange">09%</span> Decrease</p>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pl-0">
                  <div className="banner-img">
                    <img src="assets/img/banner/2.png" alt />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </Link>
      </div>
      {/* <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12">
        <div className="card">
          <div className="card-statistic-4">
            <div className="align-items-center justify-content-between">
              <div className="row ">
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pr-0 pt-3">
                  <div className="card-content">
                    <h5 className="font-15">New Project</h5>
                    <h2 className="mb-3 font-18">128</h2>
                    <p className="mb-0"><span className="col-green">18%</span>
                      Increase</p>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pl-0">
                  <div className="banner-img">
                    <img src="assets/img/banner/3.png" alt />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12">
        <div className="card">
          <div className="card-statistic-4">
            <div className="align-items-center justify-content-between">
              <div className="row ">
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pr-0 pt-3">
                  <div className="card-content">
                    <h5 className="font-15">Revenue</h5>
                    <h2 className="mb-3 font-18">$48,697</h2>
                    <p className="mb-0"><span className="col-green">42%</span> Increase</p>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pl-0">
                  <div className="banner-img">
                    <img src="assets/img/banner/4.png" alt />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
   
   
  </section>
  
</div>
        </div>
    );
};

export default UserDashboard;
