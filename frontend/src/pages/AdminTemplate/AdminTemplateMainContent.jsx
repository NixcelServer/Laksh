import React, { useEffect } from 'react';
import feather from 'feather-icons';

const AdminTemplateDashboard = () => {
    useEffect(() => {
        feather.replace();
    }, []); // Empty dependency array means this effect runs only once after the component mounts

    return (
        <div>
            {/* // <!-- Main Content --> */}
      <div className="main-content">
  <section className="section">
    <div className="row ">
    <div className="col-xl-9 col-lg-6 col-md-6 col-sm-6 col-xs-12">
    <div className="card" style={{ height: '80vh', width: '90%' }}>
          <div className="card-statistic-4">
            <div className="align-items-center justify-content-between">
              <div className="row ">
                <div className="col-lg- col-md-6 col-sm-6 col-xs-6 pr-0 pt-3">
                  <div className="card-content">

                    

                  </div>
                </div>

                <section class="section">
  <div class="section-body">
    <div class="row">
      <div class="col-8">
        <div class="card">
          <div class="card-header">
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Select Option
              </button>
             
            </div>
            <h4>Multiple Upload</h4>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col">
                <button class="btn btn-primary" id="uploadBtn">Upload Image</button>
              </div>
            </div>
            <form action="#" class="dropzone" id="mydropzone">
              <div class="fallback">
                <input name="file" type="file" multiple />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

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
