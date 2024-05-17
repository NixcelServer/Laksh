import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBuyleads } from '../redux/Order/order.action';
import { getCategories, getSubCategories, getUOM } from '../redux/Admin/admin.action';

const Buyleads = (buyLead) => {
  const [showPopup, setShowPopup] = useState(false);
  const dispatch = useDispatch();
  const [popupData, setPopupData] = useState(
    {
      buyerName: '',
      buyerEmail: '',
      buyerContactNo: '',
    }
  );

  const togglePopup = (buylead) => {
    console.log("in toggle",buylead);
    setPopupData(prevState => ({
      ...prevState,
      buyerName: buylead.buyerName,
      buyerEmail: buylead.buyerEmail,
      buyerContactNo: buylead.buyerContactNo,
    }));
    setShowPopup(!showPopup);
  };
  
  useEffect(() => {
    console.log(popupData); // This will log the updated state
  }, [popupData]);
  
  const buyleads = useSelector(state => state.orderReducer.buyleads)
  const categories = useSelector(state => state.masterData.categories);
  const subCategories = useSelector(state => state.masterData.subCategories);
  const uoms = useSelector(state => state.masterData.uom);
  console.log("buyleads",buyleads);

  useEffect(() => {
    const userString = sessionStorage.getItem('user');
    const user = JSON.parse(userString);
    const encCompanyId = user.encCompanyId;
    dispatch(getBuyleads(encCompanyId));
    dispatch(getCategories());
    dispatch(getSubCategories());
    dispatch(getUOM());
  },[])

  const categoryNameFromId = (encCatId) => {
    const category = categories.find(cat => cat.encCatId === encCatId);
    return category ? category.cat_name : 'Category not found';
  };

  const subCategoryNameFromId = (encSubCatId) => {
    const subCategory = subCategories.find(subCat =>subCat.encSubCatId === encSubCatId);
    return subCategory ? subCategory.sub_cat_name : 'Sub-Category not found';
  }

  const uomNameFromId = (encUomId) => {
    const uom = uoms.find(uom =>uom.encUomId === encUomId);
    return uom ? uom.unit_name : 'Uom not found';
  }

  return (
    <div style={{ background: "#f2f2f2", padding: "0px", marginTop: "-90px" }}>
      <div className="main-content" style={{ maxWidth: "1600px", maxHeight: "1400px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "right", marginBottom: "20px" }}>

        </div>

     

        {buyleads && buyleads.map((buylead,index)=>( 
          <section className="section" style={{ marginTop:"20px",background: "#fff", borderRadius: "10px", boxShadow: "none", border: "none" }}>
          <div className="row">
            <div className="col-lg-12">
              <div className="card" style={{ position: 'relative', width: "100%", marginBottom: "20px", background: "#fff", borderRadius: "10px", boxShadow: "none", border: "none" }}>
                <div className="card-statistic-4">
                  <div className="align-items-center justify-content-between">
                    <div className="row">
                      <div className="col-lg-4">
                        <div className="card-content">
                          <section className="section">
                            <div className="section-body">
                              <div className="left-side" style={{ textAlign: 'left', padding: "10px", background: "#fff", borderRadius: "10px" }}>
                                <h5 className="card-title" style={{ color: '#2AA699', fontSize: '15px', marginTop: '20px', fontFamily: 'sans-serif' }}>{buylead.prod_name} </h5>
                                <label style={{ fontStyle: 'italic', fontSize: '12px' }}>{buylead.prod_des}</label>

                                <p style={{ color: '#666', fontSize: '12px', marginBottom: '-8px' }}>Quantity: {buylead.qty} </p>
                                <p style={{ color: '#666', fontSize: '12px', marginBottom: '-8px' }}>Category: {categoryNameFromId(buylead.encCatId)}</p>
                                <p style={{ color: '#666', fontSize: '12px', marginBottom: '1px' }}>Subcategory: {subCategoryNameFromId(buylead.encSubCatId)}</p>
                                <p style={{ color: '#666', fontSize: '12px', marginBottom: '-9px' }}>Unit of Measurement: {uomNameFromId(buylead.encUomId)}</p>
                                {/* <p style={{ color: '#666', fontSize: '12px', marginBottom: '0px' }}>Order Placed: {buyLead.date} 24/3/2020 </p> */}
                                {/* <p style={{ color: '#666', fontSize: '12px', marginBottom: '-8px' }}>Description: {buylead.prod_des}</p> */}
                              </div>
                            </div>
                          </section>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="card-content">
                          <section className="section">
                            <div className="section-body">
                              <div className="right-side" style={{ textAlign: 'left', padding: "10px", background: "#fff", borderRadius: "10px" }}>
                                <h5 className="card-title" style={{ color: '#2AA699', fontSize: '15px', marginTop: '20px', fontFamily: 'sans-serif' }}>Buyer Details</h5>
                                <p style={{ color: '#666', fontSize: '12px', marginBottom: '-8px' }}>Member: {buyLead.member ? 'Yes' : 'No'} member since 2 years</p>
                                <p style={{ color: '#666', fontSize: '12px', marginBottom: '10px' }}>Available: {buyLead.available ? 'Yes' : 'No'} Email/Mobile</p>
                                <button className="btn btn-primary" onClick={() => togglePopup(buylead)} style={{ backgroundColor: '#9B59B6', padding: '2px', fontSize: '11px' }}>View Buyer Details</button>                              </div>
                            </div>
                          </section>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        ))}
        

        {showPopup && (
          <div className="popup" style={{ position: 'fixed', zIndex: 9999, top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.3)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="popup-inner" style={{ backgroundColor: 'white', top: 0, left: 20, height: '200px', width: '500px', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
              <h4 style={{ backgroundColor: '#D1F2EB', textAlign: 'center', color: '#333', marginBottom: '10px', fontFamily: 'sedan' }}>Buyer Details</h4>
              <p style={{ textAlign: 'left', marginBottom: '6px', fontFamily: 'sedan' }}>Name: {popupData.buyerName}</p>
              <p style={{ textAlign: 'left', marginBottom: '6px', fontFamily: 'sedan' }}>Email: {popupData.buyerEmail}</p>
              <p style={{ textAlign: 'left', marginBottom: '6px', fontFamily: 'sedan' }}>Conctact: {popupData.buyerContactNo}</p>

              <button className="btn btn-secondary" onClick={togglePopup} style={{ marginBottom: '60px', backgroundColor: '#D1F2EB', color: '#333' }}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Buyleads;
