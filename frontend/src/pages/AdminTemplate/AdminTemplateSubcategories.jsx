import React, { useEffect } from 'react';
import feather from 'feather-icons';

const AdminTemplateSubcategories = () => {
    useEffect(() => {
        feather.replace();
    }, []); // Empty dependency array means this effect runs only once after the component mounts

    return (
        
<div className="main-content">
                <section className="section">
                    <div className="section-body" style={{marginTop:'-7%'}}>
                       
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                <div className="row" style={{ paddingRight: '0', paddingTop: '3%', width: '100%',marginLeft:'3px' , marginTop:'-5%'}}>
            <div className="col-xl-4 col-lg-8 col-md-8 col-sm-8 col-xs-12" style={{ paddingRight: '0', paddingTop: '3%', width: '150%',marginLeft:'3px' }}>
        <div className="card-content" style={{marginBottom: '6%'}}>
            <h5 className="font-15"style={{marginBottom: '6%', marginTop:'1%'}}>Assign Subcategory</h5>
            {/* Start of Assign Subcategory Form */}
            <form>
                
                <div className="form-group">
                <label htmlFor="category" style={{ textAlign: 'left', display: 'block' }}>Category</label>                    <select className="form-control" id="category">
                        <option>Select Category...</option>
                        {/* Add options for categories dynamically here */}
                    </select>

                    <div className="form-group">
                    <label htmlFor="subcategory"style={{ textAlign: 'left', display: 'block',marginTop:'4%' }}>Subcategory Name</label>
                    <input type="text" className="form-control" id="subcategory" placeholder="Enter subcategory name" />
                </div>

                </div>
                {/* Additional form fields can be added here as needed */}
                <button type="submit" className="btn btn-primary">Assign Subcategory</button>
            </form>
            {/* End of Assign Subcategory Form */}
        </div>
    </div>
    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pl-0">
        <div className="banner-img">
            {/* <img src="assets/img/banner/1.png" alt="" /> */}
        </div>
    </div>
</div>
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <table className="table table-striped table-hover" id="save-stage" style={{width: '100%'}}>
                                                <thead>
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Position</th>
                                                        <th>Office</th>
                                                        <th>Age</th>
                                                        <th>Start date</th>
                                                        <th>Salary</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Tiger Nixon</td>
                                                        <td>System Architect</td>
                                                        <td>Edinburgh</td>
                                                        <td>61</td>
                                                        <td>2011/04/25</td>
                                                        <td>$320,800</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Garrett Winters</td>
                                                        <td>Accountant</td>
                                                        <td>Tokyo</td>
                                                        <td>63</td>
                                                        <td>2011/07/25</td>
                                                        <td>$170,750</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Donna Snider</td>
                                                        <td>Customer Support</td>
                                                        <td>New York</td>
                                                        <td>27</td>
                                                        <td>2011/01/25</td>
                                                        <td>$112,000</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

               
            </div>
        
    );
};

export default AdminTemplateSubcategories;


