import react,{Component} from 'react';
// import { Link } from 'react-router-dom';
// import 'feather-icons/dist/feather.css';

import feather from 'feather-icons';


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// const Header = () => {
    class AdminTemplateNavbar extends Component{
      componentDidMount() {
        feather.replace();
    }
    
        render(){
            return(


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
                    <h5 className="font-15">New Booking</h5>
                    <h2 className="mb-3 font-18">258</h2>
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
                    <h5 className="font-15"> Customers</h5>
                    <h2 className="mb-3 font-18">1,287</h2>
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
      </div>
    </div>
   
   
  </section>
  
</div>
</div>

                
                   
            )
        }
        
    }
    export default AdminTemplateNavbar;
    