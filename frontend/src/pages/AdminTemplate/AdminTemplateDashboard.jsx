import React, { useEffect, useState } from 'react';
import feather from 'feather-icons';
import axios from 'axios';
import { baseURL } from '../../utils/variables';

const AdminTemplateDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  
    useEffect(() => {
        feather.replace();

        const fetchDashboardData = async () => {
          try {
             
              const response = await axios.get(`${baseURL}api/dashcontents`);
              setDashboardData(response.data); // Set state with the parsed data
          } catch (error) {
              console.error('Error fetching dashboard data:', error);
          }
      };

      fetchDashboardData();

    }, []); // Empty dependency array means this effect runs only once after the component mounts

    return (
        <div>
            {/* // <!-- Main Content --> */}
      <div className="main-content">
  <section className="section">
    <div className="row ">
      <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12">
        <div className="card">
          <div className="card-statistic-4">
            <div className="align-items-center justify-content-between">
              <div className="row ">
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pr-0 pt-3">
                  <div className="card-content">
                    <h5 className="font-15">Categories</h5>
                    {dashboardData && (
                        <h2 className="mb-3 font-18">{dashboardData.categories}</h2>
                    )}
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
      </div>
      <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12">
        <div className="card">
          <div className="card-statistic-4">
            <div className="align-items-center justify-content-between">
              <div className="row ">
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pr-0 pt-3">
                  <div className="card-content">
                    <h5 className="font-15">Sub Categories</h5>
                    {dashboardData && (
                        <h2 className="mb-3 font-18">{dashboardData.subCategories}</h2>
                    )}
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
      </div>
      <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12">
        <div className="card">
          <div className="card-statistic-4">
            <div className="align-items-center justify-content-between">
              <div className="row ">
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pr-0 pt-3">
                  <div className="card-content">
                    <h5 className="font-15">UOM</h5>
                    {dashboardData && (
                        <h2 className="mb-3 font-18">{dashboardData.uom}</h2>
                    )}
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
                    <h5 className="font-15">Keywords</h5>
                    {dashboardData && (
                        <h2 className="mb-3 font-18">{dashboardData.keywords}</h2>
                    )}
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
      </div>

      <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12">
        <div className="card">
          <div className="card-statistic-4">
            <div className="align-items-center justify-content-between">
              <div className="row ">
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pr-0 pt-3">
                  <div className="card-content">
                    <h5 className="font-15">Companies</h5>
                    {dashboardData && (
                        <h2 className="mb-3 font-18">{dashboardData.companies}</h2>
                    )}
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
      </div>

      <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12">
        <div className="card">
          <div className="card-statistic-4">
            <div className="align-items-center justify-content-between">
              <div className="row ">
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pr-0 pt-3">
                  <div className="card-content">
                    <h5 className="font-15">Products</h5>
                    {dashboardData && (
                        <h2 className="mb-3 font-18">{dashboardData.products}</h2>
                    )}
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
      </div>
      <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12">
        <div className="card">
          <div className="card-statistic-4">
            <div className="align-items-center justify-content-between">
              <div className="row ">
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pr-0 pt-3">
                  <div className="card-content">
                    <h5 className="font-15">Requirements</h5>
                    {dashboardData && (
                        <h2 className="mb-3 font-18">{dashboardData.requirements}</h2>
                    )}
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

    </div>
   
   
  </section>
  
</div>
        </div>
    );
};

export default AdminTemplateDashboard;
