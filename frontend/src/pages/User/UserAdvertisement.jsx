
import React, { useEffect, useState, useRef } from "react";
import feather from "feather-icons";
import axios from "axios";
import { FcUpload } from "react-icons/fc";
import { MdDelete } from "react-icons/md";
import { RiAdvertisementLine } from "react-icons/ri";
import { baseURL } from "../../utils/variables";


const UserAd = () => {

  const [file, setFile] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);

  const [photoPreview, setPhotoPreview] = useState(null);
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedImageIds, setSelectedImageIds] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showCannotDeleteConfirmation, setShowCannotDeleteConfirmation] = useState(false);
  const [imgToDelete, setImgToDelete] = useState(null);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [isSubscribed,setIsSubscribed] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);


  const handleFileChange = async (event) => {
    const newFiles = Array.from(event.target.files);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);

    const userString = sessionStorage.getItem('user');
    const user = JSON.parse(userString);
    const encCompanyId = user.encCompanyId;

    // Create a copy of the updateCategoryDetails and add encUserId to it


    // const fetchUploadedImages = async (encCompanyId) => {
    //   console.log(encCompanyId);
    //   // try {
    //   //   const response = await axios.get('${baseURL}api/get-adv-img');
    //   //   if (response.status === 200) {
    //   //     setUploadedImages(response.data.images); // Assuming your API returns images in this format
    //   //   } else {
    //   //     console.error('Failed to fetch images:', response.statusText);
    //   //   }
    //   // } catch (error) {
    //   //   console.error('An error occurred while fetching the images:', error);
    //   // }
    // };


    const file = event.target.files[0];
    if (file && encCompanyId) {
      try {
        const formData = new FormData();
        formData.append('image', file);
        formData.append('encCompanyId', encCompanyId);

        const response = await axios.post(`${baseURL}api/add-adv-img`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status === 200) {
          console.log('Image uploaded successfully:', response.data);
          fetchUploadedImages();
        } else {
          console.error('Image upload failed:', response.statusText);
        }
      } catch (error) {
        console.error('An error occurred while uploading the image:', error);
      }
    } else {
      console.error('No file selected or encCompanyId not found in session storage');
    }

  };



  const handleChargesPerDayChange = (e) => {
    setChargesPerDay(e.target.value);
  };

  const calculateTotalAmount = (selectedImgs) => {
    return duration * chargesPerDay * selectedImgs;
  };

  useEffect(() => {
    feather.replace();
    getSubscriptionStatus();

    fetchUploadedImages();
  }, []);

  const getSubscriptionStatus = async () => {
    const userString = sessionStorage.getItem('user');
    let isSubscribed = false;

    if (userString) {
      const user = JSON.parse(userString);
      isSubscribed = user.isSubscribed;
    }

    if (isSubscribed === null || isSubscribed === false) {

      setShowSubscriptionModal(true);
      setIsSubscribed(false);
      console.log("hi");
    }
    else{
      setIsSubscribed(true);
    }
  };

  const handleCloseSubscriptionModal = () => {
    setShowSubscriptionModal(false);
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    console.log(plan);
  };

  const handleSubscribe = async() => {
     
    console.log("in subscribe",selectedPlan);
    try {
      const userString = sessionStorage.getItem('user');
      const user = JSON.parse(userString);
      const encUserId = user.encUserId;

      const requestBody = {
        encUserId: encUserId,
        selectedPlan: selectedPlan
      };

      const response = await axios.post(`${baseURL}api/update-subs-status`, requestBody);

      if (response.status === 200) {
       // Update user.isSubscribed in sessionStorage
        user.isSubscribed = true;
        sessionStorage.setItem('user', JSON.stringify(user));
        console.log(response.data)
  
        // Handle success response
        console.log('Subscription successful!');
        setIsSubscribed(true);
        setShowSubscriptionModal(false);
      } else {
        // Handle error response
        console.error('Failed to subscribe:', response.status);
      }
     
    } catch (error) {
      console.error('An error occurred while fetching the images:', error);
    }
  };


  const fetchUploadedImages = async () => {
    try {
      const userString = sessionStorage.getItem('user');
      const user = JSON.parse(userString);
      const encCompanyId = user.encCompanyId;

      const response = await axios.get(`${baseURL}api/get-adv-img?encCompanyId=${encCompanyId}`);

      if (response.status === 200) {
        setUploadedImages(response.data.images);
        console.log(response.data);
        console.log(uploadedImages);
      } else {
        console.error('Failed to fetch images:', response.statusText);
      }
    } catch (error) {
      console.error('An error occurred while fetching the images:', error);
    }
  };


  const handleSubmit = async (e) => {
    console.log(selectedImageIds);
    e.preventDefault();
    try {
      const response = await axios.post(`${baseURL}api/selected-u-images-adv`, {
        selectedImageIds
      });
      if (response.status === 200) {
        console.log('Data submitted successfully:', response.data);
        fetchUploadedImages();
        $('#exampleModal').modal('hide');


      } else {
        console.error('Failed to submit data:', response.statusText);
      }
    } catch (error) {
      console.error('An error occurred while submitting data:', error);
    }
  };

  const handleUploadImageClick = () => {
    console.log("hi");
    fileInputRef.current.click();
  };



  const handleDeleteImage = (image) => {
    // console.log("in delete",image);
    // console.log(uploadedImages);
    if (image.display === 'yes') {
      console.log("cannot delete");
      setShowCannotDeleteConfirmation(true);
      setImgToDelete(image);
    }
    else {
      setShowDeleteConfirmation(true);
      setImgToDelete(image);
    }

    // const updatedFiles = [...files];
    // updatedFiles.splice(index, 1);
    // setFiles(updatedFiles);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  const handleConfirmDelete = async () => {
    console.log("deleted");
    const image = imgToDelete;
    console.log(image);
    try {


      const response = await axios.delete(`${baseURL}api/adv-imgs/delete/${image.encAdvImgId}`,);
      console.log("response", response)
      setShowDeleteConfirmation(false);
      setShowCannotDeleteConfirmation(false);
      fetchUploadedImages();
    } catch (error) {
      console.error("Error deleting keyword:", error);
    }
    setShowDeleteConfirmation(false);
  };

  const handleOK = () => {
    setShowCannotDeleteConfirmation(false);
  };

  const handleContinueClick = () => {
    console.log("Selected Image IDs:", selectedImageIds);
    if (selectedImageIds.length > 0) {
      setTotalAmount(calculateTotalAmount(selectedImageIds.length));
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  // for advertisement details:

  const [duration, setDuration] = useState(15); // Default duration is 15 days
  const [chargesPerDay, setChargesPerDay] = useState('500');
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

  // Function to toggle selection of an image
  const toggleSelectImage = (index) => {
    const isSelected = selectedImageIds.includes(index);
    if (isSelected) {
      setSelectedImageIds(selectedImageIds.filter(id => id !== index));
    } else {
      setSelectedImageIds([...selectedImageIds, index]);
    }
  };

  // Function to handle "continue" button click
  // const handleContinueClick = () => {
  //   // Log the IDs of the selected images
  //   console.log("Selected Image IDs:", selectedImageIds);
  //   // Additional logic here...
  // };

  // const handleSubmit = async () => {
  //   try {
  //     const response = await axios.post('${baseURL}api/your-endpoint', {
  //       selectedImageIds
  //     });
  //     if (response.status === 200) {
  //       console.log('Data submitted successfully:', response.data);
  //     } else {
  //       console.error('Failed to submit data:', response.statusText);
  //     }
  //   } catch (error) {
  //     console.error('An error occurred while submitting data:', error);
  //   }
  // };

  return (
    <div>




      <div className="main-content" style={{ marginTop: '-30px' }}>

      {!isSubscribed && (
  <section
    className="section"
    style={{
      marginTop: "20px",
      background: "#fff",
      borderRadius: "10px",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      border: "1px solid #ddd",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
  >
    <h2>Please Subscribe</h2>
    <p>To post your advertisement, please subscribe.</p>
    <button 
      className="btn btn-primary"
      onClick={() => setShowSubscriptionModal(true)}
    >
      Subscribe
    </button>
  </section>
)}

{isSubscribed ? (
  <div>
  <section
          className="section"
          style={{
            marginTop: "20px",
            background: "#fff",
            borderRadius: "10px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            border: "1px solid #ddd",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <header style={{
            marginBottom: "0px",
            color: "#333",
            padding: "10px",
            textAlign: "center",
            width: "100%",
          }}>
            <h4 style={{
              fontWeight: "bold",
              fontSize: "24px",
              textTransform: "uppercase",
              letterSpacing: "1px",
              color: "#A569BD",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
            }}>
              Advertise with us
            </h4>
          </header>

          <div className="card" style={{ width: "100%", maxWidth: "1000px" }}>
            <div className="card-header" style={{ backgroundColor: "#48C9B0", color: "#fff", fontWeight: "bold" }}>
              Unlock your business's potential! Advertise today to boost visibility, attract customers, and skyrocket sales. Don't miss out on growth opportunities—start your advertising journey now!
            </div>
            <div className="card-body">
              <h6 style={{ textAlign: "left" }}>Steps for Advertising</h6>
              <ol style={{ padding: 0, textAlign: "left" }}>
                <li>Upload Your Images: Add your images to showcase your products or services.</li>
                <li>Note Image Size: Ensure your images are sized appropriately, with a width of 400 pixels and a height of 300 pixels.</li>
                <li>Note: You can only add one image at a time.</li>
                <li>You can check the image status below the image.</li>
                <li>Image uploaded will be approved by admin and approved image will be displayed in advertisment cards.</li>
                <li>If admin rejects a image delete the image and upload a new image.</li>
              </ol>
            </div>


          </div>


          <div className="row" style={{ display: "flex", justifyContent: "center", width: "100%", marginBottom: 0 }}>
            <div className="col-lg-12 col-md-12"> {/* Adjust column width */}
              {!showPopup && (
                <div className="card">
                  <div className="card-body" style={{ paddingBottom: "0" }}>
                    <div className="form-group">
                      <div className="row">
                        <div className="col-md-12">
                          <button
                            type="button"
                            className="btn btn-primary float-right mb-2"
                            style={{ marginLeft: "auto" }}
                            onClick={handleUploadImageClick}
                            disabled={uploadedImages.length >= 1}
                          >
                            Upload Image
                          </button>
                        </div>
                      </div>

                      <div className="row gutters-sm">
                        {uploadedImages.map((image, index) => (
                          <div key={index} className="col-12 mb-4 position-relative"> {/* Adjust column width */}
                            <label
                              className="imagecheck mb-4"
                              style={{
                                width: "100%",
                                height: "auto", // Adjust height to fit the image
                                display: "block",
                              }}
                            >
                              <input
                                name="imagecheck"
                                type="checkbox"
                                value={image.encAdvImgId}
                                checked={image.display === 'yes' || selectedImageIds.includes(image.encAdvImgId)}
                                onChange={() => toggleSelectImage(image.encAdvImgId)}
                                className="imagecheck-input"
                                style={{ display: "none" }}
                                disabled={image.adv_status === 'pending'}
                              />
                              <span
                                className="imagecheck-figure"
                                style={{
                                  display: "block",
                                  width: "100%",
                                  height: "auto", // Adjust height to fit the image
                                  position: "relative",
                                }}
                              >
                                <img
                                  src={`${baseURL}storage/app/${image.adv_img_path}`}
                                  alt={`Uploaded ${index + 1}`}
                                  className="imagecheck-image"
                                  style={{
                                    width: "100%",
                                    height: "auto", // Adjust height to fit the image
                                    objectFit: "cover",
                                  }}
                                />
                                {/* Messages */}
                                {image.adv_status === 'rejected' && (
                                  <div className="rejected-message" style={{ position: 'absolute', bottom: '-30px', left: '50%', transform: 'translateX(-50%)', color: 'red' }}>
                                    This image is rejected. Please delete and upload a new one.
                                  </div>
                                )}
                                {image.adv_status === 'approved' && (
                                  <div className="approved-message" style={{ position: 'absolute', bottom: '-30px', left: '50%', transform: 'translateX(-50%)', color: 'green' }}>
                                    Image shown in advertisement card.
                                  </div>
                                )}
                                {image.adv_status === 'pending' && (
                                  <div className="approved-message" style={{ position: 'absolute', bottom: '-30px', left: '50%', transform: 'translateX(-50%)', color: 'orange' }}>
                                    This image is pending approval.
                                  </div>
                                )}
                                {/* Delete button */}
                                <button className="btn btn-danger btn-sm delete-icon" onClick={() => handleDeleteImage(image)} style={{ position: "absolute", top: "5px", right: "5px", zIndex: "1" }}>
                                  <MdDelete />
                                </button>
                              </span>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                  </div>
                </div>
              )}
              <input ref={fileInputRef} type="file" style={{ display: "none" }} accept="image/*" onChange={handleFileChange} multiple />
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
                    <h4>Selected Images</h4>
                    <p>Number of selected images: {selectedImageIds.length}</p>
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
                  <button type="button" className="btn btn-primary m-t-15 waves-effect" onClick={handleSubmit}>Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
        </div>

) : (

<div>
  
  <section
  className="section"
  style={{
    marginTop: "20px",
    
    background: "#eee", // Change background color to visually indicate it's disabled
    borderRadius: "10px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    border: "1px solid #ddd",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    pointerEvents: "none", // Disable pointer events
        opacity: 0.5, // Reduce opacity to visually indicate it's disabled
  }}
>
  <header style={{
    marginBottom: "0px",
    color: "#333",
    padding: "10px",
    textAlign: "center",
    width: "100%",
  }}>
    <h4 style={{
      fontWeight: "bold",
      fontSize: "24px",
      textTransform: "uppercase",
      letterSpacing: "1px",
      color: "#A569BD",
      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
    }}>
      Advertise with us
    </h4>
  </header>

  <div className="card" style={{ width: "100%", maxWidth: "1000px" }}>
    <div className="card-header" style={{ backgroundColor: "#48C9B0", color: "#fff", fontWeight: "bold" }}>
      Unlock your business's potential! Advertise today to boost visibility, attract customers, and skyrocket sales. Don't miss out on growth opportunities—start your advertising journey now!
    </div>
    <div className="card-body">
      <h6 style={{ textAlign: "left" }}>Steps for Advertising</h6>
      <ol style={{ padding: 0, textAlign: "left" }}>
        <li>Upload Your Images: Add your images to showcase your products or services.</li>
        <li>Note Image Size: Ensure your images are sized appropriately, with a width of 400 pixels and a height of 300 pixels.</li>
        <li>Select Display Images: Choose the images you want to display in your advertisement.</li>
        <li>Click "Add Advertisement": After selecting your images, click the "Add Advertisement" button to proceed.</li>
        <li>Complete Payment: Complete the payment process to finalize your advertisement.</li>
        <li>Done: Congratulations! Your advertisement is now live and ready to attract customers.</li>
      </ol>
    </div>


  </div>


  <div className="row" style={{ display: "flex", justifyContent: "center", width: "100%", marginBottom: 0 }}>
    <div className="col-lg-12 col-md-12"> {/* Adjust column width */}
      {!showPopup && (
        <div className="card">
          <div className="card-body" style={{ paddingBottom: "0" }}>
            <div className="form-group">
              <div className="row">
                <div className="col-md-12">
                  <button
                    type="button"
                    className="btn btn-primary float-right mb-2"
                    style={{ marginLeft: "auto" }}
                    onClick={handleUploadImageClick}
                    disabled={uploadedImages.length >= 1}
                  >
                    Upload Image
                  </button>
                </div>
              </div>

              <div className="row gutters-sm">
                {uploadedImages.map((image, index) => (
                  <div key={index} className="col-12 mb-4 position-relative"> {/* Adjust column width */}
                    <label
                      className="imagecheck mb-4"
                      style={{
                        width: "100%",
                        height: "auto", // Adjust height to fit the image
                        display: "block",
                      }}
                    >
                      <input
                        name="imagecheck"
                        type="checkbox"
                        value={image.encAdvImgId}
                        checked={image.display === 'yes' || selectedImageIds.includes(image.encAdvImgId)}
                        onChange={() => toggleSelectImage(image.encAdvImgId)}
                        className="imagecheck-input"
                        style={{ display: "none" }}
                        disabled={image.adv_status === 'pending'}
                      />
                      <span
                        className="imagecheck-figure"
                        style={{
                          display: "block",
                          width: "100%",
                          height: "auto", // Adjust height to fit the image
                          position: "relative",
                        }}
                      >
                        <img
                          src={`${baseURL}storage/app/${image.adv_img_path}`}
                          alt={`Uploaded ${index + 1}`}
                          className="imagecheck-image"
                          style={{
                            width: "100%",
                            height: "auto", // Adjust height to fit the image
                            objectFit: "cover",
                          }}
                        />
                        {/* Messages */}
                        {image.adv_status === 'rejected' && (
                          <div className="rejected-message" style={{ position: 'absolute', bottom: '-30px', left: '50%', transform: 'translateX(-50%)', color: 'red' }}>
                            This image is rejected. Please delete and upload a new one.
                          </div>
                        )}
                        {image.adv_status === 'approved' && (
                          <div className="approved-message" style={{ position: 'absolute', bottom: '-30px', left: '50%', transform: 'translateX(-50%)', color: 'green' }}>
                            Image shown in advertisement card.
                          </div>
                        )}
                        {image.adv_status === 'pending' && (
                          <div className="approved-message" style={{ position: 'absolute', bottom: '-30px', left: '50%', transform: 'translateX(-50%)', color: 'orange' }}>
                            This image is pending approval.
                          </div>
                        )}
                        {/* Delete button */}
                        <button className="btn btn-danger btn-sm delete-icon" onClick={() => handleDeleteImage(image)} style={{ position: "absolute", top: "5px", right: "5px", zIndex: "1" }}>
                          <MdDelete />
                        </button>
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="card-footer" style={{ display: "flex", justifyContent: "space-between", paddingTop: "0" }}>
              <button type="button" className="btn btn-primary" onClick={handleContinueClick} style={{ marginLeft: "auto" }} data-toggle="modal" data-target="#exampleModal">
                Add Advertisement
              </button>
            </div>
          </div>
        </div>
      )}
      <input ref={fileInputRef} type="file" style={{ display: "none" }} accept="image/*" onChange={handleFileChange} multiple />
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
            <h4>Selected Images</h4>
            <p>Number of selected images: {selectedImageIds.length}</p>
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
          <button type="button" className="btn btn-primary m-t-15 waves-effect" onClick={handleSubmit}>Submit</button>
        </form>
      </div>
    </div>
  </div>
</div>
</div>
)}

        

        <div
          className={`modal fade ${showDeleteConfirmation ? "show" : ""}`}
          id="deleteConfirmationModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="deleteConfirmationModalLabel"
          aria-hidden={!showDeleteConfirmation}
          style={{ display: showDeleteConfirmation ? "block" : "none" }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-backdrop" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backdropFilter: 'blur(2px)', backgroundColor: 'rgba(0, 0, 0, 0.3)', zIndex: 0 }}></div>

            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="deleteConfirmationModalLabel">Confirm Deletion</h5>
                <button type="button" className="close" onClick={handleCancelDelete} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
                mbb
              </div>
              <div className="modal-body">
                Are you sure you want to delete the image?
              </div>
              <div className="modal-footer">
                {/* <button type="button" className="btn btn-secondary" onClick={handleCancelDelete}>
                    Cancel
                </button> */}
                <button type="button" className="btn btn-danger" onClick={handleConfirmDelete}
                  style={{ marginRight: "8px", color: 'black', backgroundColor: 'transparent', borderColor: 'transparent' }}                                                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`modal fade ${showCannotDeleteConfirmation ? "show" : ""}`}
          id="cannotDeleteConfirmationModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="cannotDeleteConfirmationModalLabel"
          aria-hidden={!showCannotDeleteConfirmation}
          style={{ display: showCannotDeleteConfirmation ? "block" : "none" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="cannotDeleteConfirmationModalLabel">
                  Cannot Delete
                </h5>
                <button
                  type="button"
                  className="close"
                  onClick={handleOK}
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>This image is currently being displayed on the advertisement page.</p>
                <p>If you delete it, it will no longer be shown.</p>
                <p>Please note that the you have paid charges for it. Charges cannot be reverted</p>
                <p>Are you sure you want to proceed with the deletion?</p>

              </div>
              <div className="modal-footer">



                <button type="button" className="btn btn-danger" onClick={handleConfirmDelete}
                  style={{ marginRight: "8px", color: 'black', backgroundColor: 'transparent', borderColor: 'transparent' }}                                                >
                  Delete
                </button>

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleOK}
                >
                  Cancel
                </button>


              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal with form */}
      {showSubscriptionModal && (
        <div className="modal fade show" tabIndex={-1} role="dialog" aria-labelledby="formModal" aria-hidden="true" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="header" style={{ textAlign: 'center', padding: '10px', backgroundColor: '#FCF3CF', color: 'black', position: 'relative' }}>
                <button type="button" className="close" data-dismiss="modal" onClick={handleCloseSubscriptionModal} aria-label="Close" style={{ position: 'absolute', top: '5px', right: '10px', color: 'white', border: 'none', background: 'transparent', fontSize: '20px' }}>
                  <span aria-hidden="true" style={{ color: 'black' }}>×</span>

                </button>
                <h5 className="modal-title" id="formModal" style={{ marginBottom: '15px', transition: 'color 0.3s', fontSize: '24px', fontWeight: 'bold' }}>Unlock Your Business Potential!</h5>
                <div className="card-header" style={{ backgroundColor: "#F5F5DC", color: "#343a40", fontWeight: "bold", padding: "20px" }}>
  Unlock your business's potential! Advertise today to boost visibility, attract customers, and skyrocket sales. Don't miss out on growth opportunities—start your advertising journey now!
</div>
          
              </div>

              <div className="modal-body" style={{ paddingTop: '6px' }}>
                <form>
                  <div style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif', padding: '10px' }}>
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '20px',
                        justifyContent: 'center'
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: '#f9f9f9',
                          border: '1px solid #ddd',
                          borderRadius: '10px',
                          width: '100%',
                          maxWidth: '180px',
                          maxHeight: '300px',
                          padding: '20px',
                          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                          textAlign: 'center',
                          transition: 'transform 0.3s ease',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        onClick={() => handlePlanSelect('Monthly')}
                      >
                       
                        <div>
                          <img
                            src="images/monthly.png"
                            alt="Car Icon"
                            style={{
                              width: '30px',
                              height: '30px',
                              display: 'inline-block',
                              verticalAlign: 'middle',
                              marginTop: '0px',
                            }}
                          />
                          <h6
                            style={{
                              display: 'inline-block',
                              verticalAlign: 'middle',
                              margin: '0 0 0 5px'
                            }}
                          >
                            Monthly
                          </h6>
                        </div>
                        <img src="images/month.png" alt="Company Image" style={{ width: '200px', height: '100px', marginTop: '10px' }} />

                        <p style={{ fontSize: '14px', margin: '2px 0 0 0' }}>Free</p>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                          <li style={{ fontSize: '12px', margin: '-5px 0' }}>Unlimited Downloads</li>
                          <li style={{ fontSize: '12px', margin: '-5px 0' }}>Email Support</li>
                          <li style={{ fontSize: '12px', margin: '-5px 0' }}>Limited Access</li>
                        </ul>
                        
                         {selectedPlan === 'Monthly' && <span style={{ color: 'green', fontSize: '24px' }}>✓ </span>} {/* Render green tick if Monthly plan is selected */}

                        

                      </div>


                      <div
                        style={{
                          backgroundColor: '#f9f9f9',
                          border: '1px solid #ddd',
                          borderRadius: '10px',
                          width: '100%',
                          maxWidth: '180px',
                          maxHeight: '300px',
                          padding: '20px',
                          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                          textAlign: 'center',
                          transition: 'transform 0.3s ease',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        onClick={() => handlePlanSelect('Quarterly')}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <img
                            src="images/quarterly.png"
                            alt="Car Icon"
                            style={{ width: '30px', height: '30px' }}
                          />
                          <h6 style={{ margin: '0 0 0 5px' }}>Quarterly</h6>
                        </div>
                        <img src="images/quarter.png" alt="Company Image" style={{ width: '180px', height: '100px', marginTop: '10px' }} />

                        <p style={{ fontSize: '14px', margin: '1px 0' }}>$49/Year</p>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                          <li style={{ fontSize: '12px', margin: '-5px 0' }}>Up to 10 Users</li>
                          <li style={{ fontSize: '12px', margin: '-5px 0' }}>Email/Call Support</li>
                          <li style={{ fontSize: '12px', margin: '-5px 0' }}>1 Year Access</li>
                        </ul>
                        {selectedPlan === 'Quarterly' && <span style={{ color: 'green', fontSize: '24px' }}>✓ </span>} {/* Render green tick if Monthly plan is selected */}

                      </div>


                      <div
                        style={{
                          backgroundColor: '#f9f9f9',
                          border: '1px solid #ddd',
                          borderRadius: '10px',
                          width: '100%',
                          maxWidth: '180px',
                          maxHeight: '300px',
                          padding: '20px',
                          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                          textAlign: 'center',
                          transition: 'transform 0.3s ease',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        onClick={() => handlePlanSelect('Annually')}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <img
                            src="images/annually.png"
                            alt="Plane Icon"
                            style={{ width: '30px', height: '30px' }}
                          />
                          <h6 style={{ margin: '0 0 0 5px' }}>Annually</h6>
                        </div>
                        <img
                          src="images/year.png"
                          alt="Company Image"
                          style={{ width: '140px', height: '100px', marginTop: '10px' }}
                        />
                        <p style={{ fontSize: '14px', margin: '1px 0' }}>$99</p>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                          <li style={{ fontSize: '12px', margin: '-5px 0' }}>Unlimited Access</li>
                          <li style={{ fontSize: '12px', margin: '-5px 0' }}>On Demand Request</li>
                          <li style={{ fontSize: '12px', margin: '-5px 0' }}>Lifetime Access</li>
                        </ul>



                        {selectedPlan === 'Annually' && <span style={{ color: 'green', fontSize: '24px' }}>✓ </span>} {/* Render green tick if Monthly plan is selected */}


                      </div>

                    </div>
                  </div>
                  <button type="button" className="btn btn-primary m-t-15 waves-effect" onClick={() => handleSubscribe()}
                    style={{ marginBottom: '0px', backgroundColor: '#3498DB', color: 'black' }}>
                    Subscribe
                  </button>

                </form>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>

  );
};

export default UserAd;
