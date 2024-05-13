import React, { useEffect,useState } from 'react';
//import feather from 'feather-icons';
import axios from 'axios';
import { SET_PRODUCT_DETAILS } from '../../redux/Product/product.action.type';
import { useSelector, useDispatch } from 'react-redux';

const MyOrder = () => {
    //const [productDetails, setProductDetails] = useState(null);
    
    const [productDetails, setProductDetails] = useState({
        encCompanyId: '',
        prodName: '',
        prodDescription: '',
        prodCat: '',
        prodSubCat: '',
        prodPrice: '',
        prodUOM: '',
      });
    
      const dispatch = useDispatch();
      const productDetail = useSelector(state => state.productReducer.productDetails);
    
      const fetchProducts = async () => {
        try {
          const userString = sessionStorage.getItem('user');
          const user = JSON.parse(userString);
          const encCompanyId = user.encCompanyId;
    
          const response = await axios.get(`http://127.0.0.1:8000/api/products/get/${encCompanyId}`);
          
          console.log('API Response:', response.data); // Log API response
      
          dispatch(setProductDetails(response.data)); // Dispatch action to update product details in Redux store
        } catch (error) {
          console.error('Error fetching product details:', error);
        }
      };

    return (
        /* Main Content */
        <div className="main-content" style={{ marginTop: '-40px' }}>
    <section className="section">
        <div className="section-body">
            <div className="row">
                <div className="col-12">
                    
                    <div className="card card-primary w-100">
                    <div className="card-header">
                       
                            <h4>Mobile Accessories</h4>
                            <div className="card-header-action">
                           
                            <div className="btn-group">
                                    <a href="#" className="btn btn-primary" style={{ fontSize: '12px', padding: '3px 10px' ,backgroundColor:'#9B59B6 '}}>Share Feedback</a>
                                    <a href="#" className="btn btn-primary" style={{ fontSize: '12px', padding: '3px 10px',backgroundColor:'#9B59B6 ' }}>Repost Requrirement</a>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
    {/* <div className="row gx-1">
        <div className="col-lg-6" style={{  paddingRight: '0%'  }}>
            <div style={{ textAlign: 'left', color: 'black', marginBottom: '10px' }}>
                <p style={{ fontSize: '14px', lineHeight: '1.4', marginBottom: '5px' , marginTop:'-2%'}}> Posted On: </p>
                <p style={{ fontSize: '14px', lineHeight: '1.4', marginBottom: '5px' }}> Suppliers Connected: </p>
                <p style={{ fontSize: '14px', lineHeight: '1.4', marginBottom: '5px', fontFamily:'serif' }}> I want to buy Dell laptop. Kindly sent me price and other details. </p>

            </div>
        </div> */}
        {/* <div className="col-lg-6" style={{paddingLeft: '0%' }}>
            <div style={{ textAlign: 'left', color: 'black', marginBottom: '10px' }}>
                <p style={{ fontSize: '14px', lineHeight: '1.4', marginBottom: '5px' }}> Posted On: </p>
                <p style={{ fontSize: '14px', lineHeight: '1.4', marginBottom: '5px' }}> Suppliers Connected: </p>
            </div>
        </div> */}
    {/* </div> */}
                    </div>

                   
                </div>
            </div>
        </div>
        </div>
    </section>

    <section className="section">
        <div className="section-body">
            <div className="row">
                <div className="col-12">
                    
                    <div className="card card-primary w-100">
                    <div className="card-header">
                       
                            <h4>Medical Test services</h4>
                            <div className="card-header-action">
                           
                            <div className="btn-group">
                                    <a href="#" className="btn btn-primary" style={{ fontSize: '12px', padding: '3px 10px' ,backgroundColor:'#9B59B6 '}}>Share Feedback</a>
                                    <a href="#" className="btn btn-primary" style={{ fontSize: '12px', padding: '3px 10px',backgroundColor:'#9B59B6 ' }}>Repost Requrirement</a>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
    <div className="row gx-1">
        <div className="col-lg-6" style={{  paddingRight: '0%'  }}>
            <div style={{ textAlign: 'left', color: 'black', marginBottom: '10px' }}>
                <p style={{ fontSize: '14px', lineHeight: '1.4', marginBottom: '5px' , marginTop:'-2%'}}> Posted On: </p>
                <p style={{ fontSize: '14px', lineHeight: '1.4', marginBottom: '5px' }}> Suppliers Connected: </p>
                <p style={{ fontSize: '14px', lineHeight: '1.4', marginBottom: '5px', fontFamily:'serif' }}> I want to buy Dell laptop. Kindly sent me price and other details. </p>

            </div>
        </div>
        {/* <div className="col-lg-6" style={{paddingLeft: '0%' }}>
            <div style={{ textAlign: 'left', color: 'black', marginBottom: '10px' }}>
                <p style={{ fontSize: '14px', lineHeight: '1.4', marginBottom: '5px' }}> Posted On: </p>
                <p style={{ fontSize: '14px', lineHeight: '1.4', marginBottom: '5px' }}> Suppliers Connected: </p>
            </div>
        </div> */}
    </div>
                    </div>

                   
                </div>
            </div>
        </div>
        </div>
    </section>

    <section className="section">
        <div className="section-body">
            <div className="row">
                <div className="col-12">
                    
                    <div className="card card-primary w-100">
                    <div className="card-header">
                       
                            <h4>Roofing Sheets</h4>
                            <div className="card-header-action">
                           
                            <div className="btn-group">
                                    <a href="#" className="btn btn-primary" style={{ fontSize: '12px', padding: '3px 10px' ,backgroundColor:'#9B59B6 '}}>Share Feedback</a>
                                    <a href="#" className="btn btn-primary" style={{ fontSize: '12px', padding: '3px 10px',backgroundColor:'#9B59B6 ' }}>Repost Requrirement</a>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
    <div className="row gx-1">
        <div className="col-lg-6" style={{  paddingRight: '0%'  }}>
            <div style={{ textAlign: 'left', color: 'black', marginBottom: '10px' }}>
                <p style={{ fontSize: '14px', lineHeight: '1.4', marginBottom: '5px' , marginTop:'-2%'}}> Posted On: </p>
                <p style={{ fontSize: '14px', lineHeight: '1.4', marginBottom: '5px' }}> Suppliers Connected: </p>
                <p style={{ fontSize: '14px', lineHeight: '1.4', marginBottom: '5px', fontFamily:'serif' }}> I want to buy Dell laptop. Kindly sent me price and other details. </p>

            </div>
        </div>
        {/* <div className="col-lg-6" style={{paddingLeft: '0%' }}>
            <div style={{ textAlign: 'left', color: 'black', marginBottom: '10px' }}>
                <p style={{ fontSize: '14px', lineHeight: '1.4', marginBottom: '5px' }}> Posted On: </p>
                <p style={{ fontSize: '14px', lineHeight: '1.4', marginBottom: '5px' }}> Suppliers Connected: </p>
            </div>
        </div> */}
    </div>
                    </div>

                   
                </div>
            </div>
        </div>
        </div>
    </section>

    <section className="section">
        <div className="section-body">
            <div className="row">
                <div className="col-12">
                    
                    <div className="card card-primary w-100">
                    <div className="card-header">
                       
                            <h4>Flowers</h4>
                            <div className="card-header-action">
                           
                            <div className="btn-group">
                                    <a href="#" className="btn btn-primary" style={{ fontSize: '12px', padding: '3px 10px' ,backgroundColor:'#9B59B6 '}}>Share Feedback</a>
                                    <a href="#" className="btn btn-primary" style={{ fontSize: '12px', padding: '3px 10px',backgroundColor:'#9B59B6 ' }}>Repost Requrirement</a>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
    <div className="row gx-1">
        <div className="col-lg-6" style={{  paddingRight: '0%'  }}>
            <div style={{ textAlign: 'left', color: 'black', marginBottom: '10px' }}>
                <p style={{ fontSize: '14px', lineHeight: '1.4', marginBottom: '5px' , marginTop:'-2%'}}> Posted On: </p>
                <p style={{ fontSize: '14px', lineHeight: '1.4', marginBottom: '5px' }}> Suppliers Connected: </p>
                <p style={{ fontSize: '14px', lineHeight: '1.4', marginBottom: '5px', fontFamily:'serif' }}> I want to buy Dell laptop. Kindly sent me price and other details. </p>

            </div>
        </div>
        {/* <div className="col-lg-6" style={{paddingLeft: '0%' }}>
            <div style={{ textAlign: 'left', color: 'black', marginBottom: '10px' }}>
                <p style={{ fontSize: '14px', lineHeight: '1.4', marginBottom: '5px' }}> Posted On: </p>
                <p style={{ fontSize: '14px', lineHeight: '1.4', marginBottom: '5px' }}> Suppliers Connected: </p>
            </div>
        </div> */}
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

export default MyOrder ;
