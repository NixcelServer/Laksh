
import React, { useEffect, useState, useRef } from "react";
import feather from "feather-icons";
import axios from "axios";
import { FcUpload } from "react-icons/fc";
import { MdDelete } from "react-icons/md";
import { RiAdvertisementLine } from "react-icons/ri";


const UserAd = () => {

  const [file, setFile] = useState(null);
 
 
  const [photoPreview, setPhotoPreview] = useState(null);
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  

  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };



  const handleChargesPerDayChange = (e) => {
    setChargesPerDay(e.target.value);
  };

  const calculateTotalAmount = () => {
    return duration * chargesPerDay;
  };

  useEffect(() => {
    feather.replace();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("duration", duration);
    formData.append("chargesPerDay", chargesPerDay);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/advertisements",
        formData
      );
      console.log("Advertisement submitted:", response.data);
      // Handle successful submission
    } catch (error) {
      console.error("Error submitting advertisement:", error);
    }
  };

  const handleUploadImageClick = () => {
    fileInputRef.current.click();
  };

  const handleDeleteImage = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  const handleContinueClick = () => {
    if (files.length > 0) {
      setShowPopup(true);
      setTotalAmount(calculateTotalAmount());
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  // for advertisement details:

  const [duration, setDuration] = useState(15); // Default duration is 15 days
  const [chargesPerDay, setChargesPerDay] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const handleDurationChange = (e) => {
    const newDuration = parseInt(e.target.value);
    setDuration(newDuration);
    setTotalAmount(newDuration * chargesPerDay);
  };

  const handleChargesChange = (e) => {
    const newCharges = parseFloat(e.target.value);
    setChargesPerDay(newCharges);
    setTotalAmount(duration * newCharges);
  };
    return (
      <div>

      <div className="main-content" style={{marginTop:'-30px'}}>
        <section
          className="section"
          style={{
            marginTop: "20px",
            background: "#fff",
            borderRadius: "10px",
            boxShadow: "none",
            border: "none",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <header
            style={{
              marginBottom: "20px",
              color: "black",
              backgroundColor: "",
              padding: "10px",
              textAlign: "center",
              width: "100%",
            }}
          >
           <h4
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: "24px",
    textTransform: "uppercase",
    letterSpacing: "1px",
    color: "#A569BD",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
  }}
>
  {/* <RiAdvertisementLine style={{ marginRight: "8px", color:"#A569BD" }} /> */}
  Welcome to Chemi-Fact Industry
  

</h4>
          </header>

          <div className="col-12 col-md-6 col-lg-6" style={{ maxHeight:"200px",maxWidth: "100%", marginBottom:"10%" }}>
            <div className="card">
              <div className="card-header">
              <h4
  style={{
    fontWeight: "bold",
    color: "#48C9B0",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
  }}
>
  Creating values that brightens lives through chem-facts
</h4>
              </div>
              <div className="card-body">
                <div
                  id="carouselExampleIndicators3"
                  className="carousel slide"
                  data-ride="carousel"
                  style={{ maxWidth: "800px", margin: "0 auto" }} // Adjust maxWidth as needed
                >
                  <ol className="carousel-indicators">
                    <li
                      data-target="#carouselExampleIndicators3"
                      data-slide-to={0}
                      className="active"
                    />
                    <li data-target="#carouselExampleIndicators3" data-slide-to={1} />
                    <li data-target="#carouselExampleIndicators3" data-slide-to={2} />
                  </ol>
                  <div className="carousel-inner" style={{ maxHeight: "200px" }}> {/* Adjust maxHeight as needed */}
                    <div className="carousel-item active">  
                      <img
                        className="d-block w-100"
                        src="images/slide4.png"
                        alt="First slide"
                        style={{ maxHeight: "200px", objectFit: "cover" }} // Adjust maxHeight and objectFit as needed
                      />
                    </div>
                    <div className="carousel-item">
                      <img
                        className="d-block w-100"
                        src="images/slide2.png"       
                        alt="Second slide"
                        style={{ maxHeight: "200px", objectFit: "cover" }} // Adjust maxHeight and objectFit as needed
                      />
                    </div>
                    <div className     ="carousel-item">
                      <img
                        className="d-block w-100"
                        src="images/slide3.png"
                        alt="Third slide"
                        style={{ maxHeight: "200px", objectFit: "cover" }} // Adjust maxHeight and objectFit as needed
                      />
                    </div>
                  </div>
                  <a
                    className="carousel-control-prev"
                    href="#carouselExampleIndicators3"
                    role="button"
                    data-slide="prev"
                  >
                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                    <span className="sr-only">Previous</span>
                  </a>
                  <a
                    className="carousel-control-next"
                    href="#carouselExampleIndicators3"
                    role="button"
                    data-slide="next"
                  >
                    <span className="carousel-control-next-icon" aria-hidden="true" />
                    <span className="sr-only">Next</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div
            className="row"
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
                       <div
              className="col-lg-6 col-md-12"
              style={{
                flex: "0 0 auto",
                maxWidth: "1200px",
              }}
            >
              {!showPopup && (
                <div className="card">
                  <div className="card-body">
                    <div className="form-group">
                      <label className="form-label">Image Check</label>
                      <div className="row gutters-sm">
                        {files.map((file, index) => (
                          <div key={index} className="col-6 col-sm-4 mb-4 position-relative">
                            <label
                              className="imagecheck mb-4"
                              style={{
                                width: "100%",
                                height: "200px",
                                display: "block",
                              }}
                            >
                              <input
                                name="imagecheck"
                                type="checkbox"
                                value={index}
                                className="imagecheck-input"
                                style={{ display: "none" }}
                              />
                              <span
                                className="imagecheck-figure"
                                style={{
                                  display: "block",
                                  width: "100%",
                                  height: "100%",
                                  position: "relative",
                                }}
                              >
                                <img
                                  src={URL.createObjectURL(file)}
                                  alt={`Uploaded ${index + 1}`}
                                  className="imagecheck-image"
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                  }}
                                />
                                <button
                                  className="btn btn-danger btn-sm delete-icon"
                                  onClick={() => handleDeleteImage(index)}
                                  style={{
                                    position: "absolute",
                                    top: "5px",
                                    right: "5px",
                                    zIndex: "1",
                                  }}
                                >
                                    <MdDelete />
                                  {/* <i className="fe fe-x"></i> */}
                                </button>
                              </span>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="card-footer" style={{ display: "flex", justifyContent: "space-between" }}>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleUploadImageClick}
                        style={{color:'white'}}
                      >
                        {/* <FcUpload style={{ color: "red", marginRight: "5px", fontSize: "24px" }} />                      */}
                        Upload Image
                      </button>
                      

                      <button type="button" 
                      className="btn btn-primary" 
                      onClick={handleContinueClick}
                      data-toggle="modal" 
                      data-target="#exampleModal">
                        Modal Continue </button>
                    </div>
                  </div>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleFileChange}
                multiple
              />
              
              </div>
            </div>
          
        </section>

        {/* Modal with form */}
  <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="formModal" aria-hidden="true">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title text-center" id="formModal"> Advertisement Details</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="modal-body">

          <form className>
         <div className="form-group">
        <label>Duration (days)</label>
        <div className="input-group">
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="fas fa-calendar-alt" />
            </div>
          </div>
          <input
            type="number"
            className="form-control"
            placeholder="Duration"
            name="duration"
            value={duration}
            onChange={handleDurationChange}
          />
        </div>
      </div>

      <div className="form-group">
        <label>Charges per Day</label>
        <div className="input-group">
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="fas fa-dollar-sign" />
            </div>
          </div>
          <input
            type="number"
            className="form-control"
            placeholder="Charges per Day"
            name="charges"
            value={chargesPerDay}
            onChange={handleChargesChange}
          />
        </div>
      </div>

      <div className="form-group">
        <label>Total Amount</label>
        <div className="input-group">
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="fas fa-money-bill-wave" />
            </div>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="Total Amount"
            value={totalAmount.toFixed(2)}
            readOnly
          />
        </div>
      </div>

            <div className="form-group mb-0">
              <div className="custom-control custom-checkbox">
                <input type="checkbox" name="remember" className="custom-control-input" id="remember-me" />
                <label className="custom-control-label" htmlFor="remember-me">Remember Me</label>
              </div>
            </div>
            <button type="button" className="btn btn-primary m-t-15 waves-effect">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
      </div>
    </div>
    );
};

export default UserAd;
