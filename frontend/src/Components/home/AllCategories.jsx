import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom'; // Import Link from react-router-dom



const Allcategories = () => {
    const categories = useSelector(state => state.masterData.categories);



  return (
    <div className="main-content" style={{ position:'absolute',margin: '100px auto', maxWidth: '1300px', padding: '0 15px', backgroundColor: 'white' }}>
      <section className="section">
        <div className="section-body">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h4
                    style={{
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '24px',
                      color: '#3366ff',
                      textAlign: 'center',
                      marginBottom: '20px',
                      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
                      transition: 'color 0.5s ease-in-out',
                    }}
                    onMouseOver={(e) => e.target.style.color = '#3366ff'}
                    onMouseOut={(e) => e.target.style.color = '#3498DB'}
                  >
                    Explore our Vibrant Categories!
                  </h4>
                </div>
                <div className="card-body">
                 
                <div className="card-header d-flex justify-content-between align-items-center" style={{ padding: '10px 5px', marginTop: '-5px', marginBottom: '-5px', marginLeft:'80px' }}>
    <div style={{ display: 'flex', gap: '10px' }}>
    {categories && categories.map((category, index) => (
                        <Link key={index} to={`/categoriess/${category.encCatId}`} className="btn btn-primary" style={{ backgroundColor: '#A569BD' }}>
                          {category.cat_name}
                        </Link>
                      ))}
    </div>
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

export default Allcategories;