import React, { useEffect, useState } from "react";
import feather from "feather-icons";

const Addnewproduct = () => {
  useEffect(() => {
    feather.replace();
  }, []);

  const [showForm, setShowForm] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [productDetails, setProductDetails] = useState({
    productName: "",
    category: "",
    subcategory: "",
    unit: "",
    description: "",
    price: "",
    keywords: ""
  });

  const handleSaveAndContinue = () => {
    console.log("Changes saved and continue to next step!");
    setShowForm(false);
  };

  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };

  const handleFieldChange = (fieldName, value) => {
    setProductDetails({
      ...productDetails,
      [fieldName]: value
    });
   
  };

  const handleFileChange = (event, setPreview) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setPreview(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  return (
    <div >
    <div className="container" style={{marginTop:'-50px', backgroundColor:'white'}}>
      <div className="main-content" >
        <div className="text-right mb-3" >
          <button
            type="button"
            className="btn btn-success"
            onClick={toggleFormVisibility}
          >
            
            <span className="mr-1 font-weight-bold">+</span> Add Product
          </button>
        </div>

<div>


{showForm && (
  
  <section className="section" style={{display:'flex', marginLeft:'-10%', marginRight:'flexend',padding: "6%", backgroundColor:'white',marginBottom:'20%' }}>
    <div className="row">
      <div className="col-lg-6">
        <div className="card" style={{maxWidth: "70%", height: "auto",}}>
          <div className="card-header">
            <h4>Add Image</h4>
          </div>
          {photoPreview && (
            <div className="file-preview">
              <img
                src={photoPreview}
                alt="Photo Preview"
              />
            </div>
          )}
          <div className="card-body">
            <div className="fallback">
              <input
                type="file"
                id="photo"
                name="photo"
                accept="image/*"
                onChange={(e) =>
                  handleFileChange(
                    e,
                    setPhotoPreview
                  )
                }
              />
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-6" style={{maxWidth:'40%' }}>
        <div className="d-flex" style={{marginLeft:'-10%'}}>
          <div className="flex-grow-1"  style={{marginRight: "40px" }}>
            <div className="form-group" style={{ marginBottom: "40px" }}>
              <label>Product Name:</label>
              <input
                type="text"
                className="form-control"
                value={productDetails.productName}
                onChange={(e) =>
                  handleFieldChange("productName", e.target.value)
                }
                style={{ float: 'left', height:'25px',padding:'0',width:'160px' }}
              />
            </div>
            <div className="form-group" style={{ marginBottom: "40px" }}>
              <label>Category:</label>
              <select
                className="form-control"
                value={productDetails.category}
                onChange={(e) =>
                  handleFieldChange("category", e.target.value)
                }
                style={{ float: 'left', height:'25px',padding:'0',width:'160px',fontSize:'11px' }}
              >
                {/* <option value="">Select Category</option> */}
              </select>
            </div>
            <div className="form-group"style={{ marginBottom: "40px" }}>
              <label>Subcategory:</label>
              <select
                className="form-control"
                value={productDetails.subcategory}
                onChange={(e) =>
                  handleFieldChange("subcategory", e.target.value)
                }
                style={{ float: 'left', height:'25px',padding:'0',width:'160px',fontSize:'11px' }}
              >
                {/* <option value="">Select Subcategory</option> */}
              </select>
            </div>
            <div className="form-group"style={{ marginBottom: "40px" }}>
              <label>Price:</label>
              <input
                type="number"
                className="form-control"
                value={productDetails.price}
                onChange={(e) =>
                  handleFieldChange("price", e.target.value)
                }
                style={{ float: 'left', height:'25px',padding:'0',width:'160px',fontSize:'11px' }}

              />
              <select className="form-control" style={{ float: 'left', height:'25px',padding:'0',width:'160px',fontSize:'11px' }}
>
                <option value="">per/-</option>
                <option value="kg">Kilogram</option>
                <option value="gm">Gram</option>
                <option value="ltr">Liter</option>
              </select>
            </div>
            
          </div>
          <div className="flex-grow-1">
            <div className="form-group"style={{ marginBottom: "110px" }}>
              <label>Product Description:</label>
              <textarea
                className="form-control"
              
                value={productDetails.description}
                onChange={(e) =>
                  handleFieldChange("description", e.target.value)
                }
                style={{ float: 'left', height:'25px',padding:'0',width:'160px',fontSize:'11px' }}
            
                 ></textarea>
            </div>      

            <div className="form-group" style={{ marginBottom: "40px" }}>
              <label>Unit of Measurement:</label>
              <select
                className="form-control"
                value={productDetails.unit}
                onChange={(e) =>
                  handleFieldChange("unit", e.target.value)
                }
                style={{ float: 'left', height:'25px',padding:'0',width:'160px',fontSize:'11px' }}
              >
                <option value="">Select Unit</option>
                
              </select>
            </div>
         
            <div className="form-group" style={{ marginBottom: "40px" }}>
              <label>Keyword:</label>
              <select
                className="form-control"
                value={productDetails.category}
                onChange={(e) =>
                  handleFieldChange("category", e.target.value)
                }
                style={{ float: 'left', height:'25px',padding:'0',width:'160px',fontSize:'11px' }}
              >
                {/* <option value="">Select Category</option> */}

                
              </select>
              
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </section>
)}
 

        </div>

        
      </div>
    </div>
    </div>
  );
};

export default Addnewproduct;
