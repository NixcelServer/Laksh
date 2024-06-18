
import React, { useEffect, useState, useRef } from "react";
import feather from "feather-icons";
import axios from "axios";
import { FcUpload } from "react-icons/fc";
import { MdDelete } from "react-icons/md";
import { RiAdvertisementLine } from "react-icons/ri";
import { baseURL } from "../../utils/variables";

const AdminAd = () => {

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


  const handleFileChange = async (event) => {
    const newFiles = Array.from(event.target.files);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);

    const userString = sessionStorage.getItem('user');
    const user = JSON.parse(userString);
    const encUserId = user.encUserId;

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
    if (file && encUserId) {
      try {
        const formData = new FormData();
        formData.append('image', file);
        formData.append('encUserId', encUserId);

        const response = await axios.post(`${baseURL}api/add-landing-pg-img`, formData, {
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


    fetchUploadedImages();
  }, []);

  const fetchUploadedImages = async () => {
    try {
      const userString = sessionStorage.getItem('user');
      const user = JSON.parse(userString);
      const encUserId = user.encUserId;

      const response = await axios.get(`${baseURL}api/get-lp-imgs?encUserId=${encUserId}`);

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
    console.log("hey there",selectedImageIds);
   
    e.preventDefault();
    try {
      const response = await axios.post(`${baseURL}api/selected-lp-images`, {
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

    const userString = sessionStorage.getItem('user');
      const user = JSON.parse(userString);
      const encUserId = user.encUserId;

    console.log("deleted");
    const image = imgToDelete;
    console.log(image);
    try {


      const response = await axios.delete(`${baseURL}api/landing-pg-imgs/delete/${image.encLpImgId}/${encUserId}`);
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
              <h6 style={{  textAlign: "left" }}>Steps for Advertising</h6>
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


          <div
            className="row"
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              marginBottom: 0
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
                  <div className="card-body" style={{ paddingBottom: "0" }}>
                    <div className="form-group">
                      <div className="row">
                        <div className="col-md-12">
                          <button
                            type="button"
                            className="btn btn-primary float-right mb-2" // Adding 'float-right' and 'mb-2' classes
                            style={{ marginLeft: "auto" }}
                            onClick={handleUploadImageClick}
                          >
                            Upload Image
                          </button>
                        </div>
                      </div>
                     
                      <div className="row gutters-sm">
                        {uploadedImages.map((image, index) => (
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
                                value={image.encLpImgId}
                                checked={image.display === 'yes' || selectedImageIds.includes(image.encLpImgId)} // Check if image is selected
                                onChange={() => toggleSelectImage(image.encLpImgId)} // Toggle image selection // Toggle image selection
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
                                  src={`${baseURL}storage/app/${image.lp_img_path}`}
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
                                  onClick={() => handleDeleteImage(image)}
                                  style={{
                                    position: "absolute",
                                    top: "5px",
                                    right: "5px",
                                    zIndex: "1",
                                  }}
                                >
                                  <MdDelete />
                                </button>
                              </span>
                            </label>
                          </div>
                        ))}

                      </div>
                    </div>
                    <div className="card-footer" style={{ display: "flex", justifyContent: "space-between" , paddingTop: "0"}}>

                      <button type="button"
                        className="btn btn-primary"
                        onClick={handleContinueClick}
                        style={{ marginLeft: "auto" }}
                        data-toggle="modal"
                        data-target="#exampleModal">
                        Display </button>
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
                {/* <h5 className="modal-title text-center" id="formModal"> Landing Page Images</h5> */}
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">

                <form className>
                  <div className="form-group">
                    <h4>Selected Images will be displayed on landing page</h4>
                    <p>Number of selected images: {selectedImageIds.length}</p>
                   
                   
                  </div>

               


                 
                  <button type="button" className="btn btn-primary m-t-15 waves-effect" onClick={handleSubmit}>Ok</button>
                </form>
              </div>
            </div>
          </div>
        </div>

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
                <p>This image is currently being displayed on the Landing page.</p>
                <p>If you delete it, it will no longer be shown.</p>
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

    </div>

  );
};

export default AdminAd;
