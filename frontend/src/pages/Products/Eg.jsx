import React, { useEffect, useState, useRef } from "react";
import feather from "feather-icons";
import axios from "axios";
import { FcUpload } from "react-icons/fc";

const Example = () => {
  const [file, setFile] = useState(null);
  const [duration, setDuration] = useState(15);
  const [chargesPerDay, setChargesPerDay] = useState(10);
  const [photoPreview, setPhotoPreview] = useState(null);
  const fileInputRef = useRef(null);

  const [files, setFiles] = useState([]);



  const handleFileChange = (event) => {
      const newFiles = Array.from(event.target.files);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

 

 

  const handleDurationChange = (e) => {
    setDuration(e.target.value);
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
    // Trigger click event on the file input
    fileInputRef.current.click();
  };

  return (
    <div>
      <div className="main-content">
        <section
          className="section"
          style={{
            marginTop: "20px",
            background: "#fff",
            borderRadius: "10px",
            boxShadow: "none",
            border: "none",
            padding: "20px",
            display: "flex", // Ensure flex layout
            flexDirection: "column", // Column layout
            alignItems: "center" // Center content horizontally
          }}
        >
          <header
            style={{
              marginBottom: "20px",
              color: "black", // Change the color to blue
              backgroundColor: "#DFAAF4",
              padding: "10px",
              textAlign: "center",
              width: "100%" // Ensure header takes full width
            }}
          >
            <h4
              style={{
                fontWeight: "bold",
                fontSize: "24px", // Increase the font size
                textTransform: "uppercase", // Convert to uppercase
                letterSpacing: "1px" // Add some letter spacing
              }}
            >
              ...
            </h4>
          </header>
          <div
            className="row"
            style={{
              display: "flex", // Ensure flex layout
              justifyContent: "center", // Center content horizontally
              width: "100%" // Ensure row takes full width
            }}
          >
            <div
              className="col-lg-6 col-md-12"
              style={{ flex: "0 0 auto" }} // Allow column to shrink
            >
              {/* This column will take up half the width */}
            </div>
            <div
              className="col-lg-6 col-md-12"
              style={{
                flex: "0 0 auto", // Allow column to shrink
                maxWidth: "1200px" // Limit the width of the column
              }}
            >
              {/* Move the card to this column */}
              <div
                className="card"
                style={{
                  width: "100%", // Ensure card takes full width
                  height: "200px" // Set height of card
                }}
              >
                <div className="card-body">
                  <div className="form-group">
                    <label className="form-label">
                      Advertisement carousel
                    </label>
                    <div className="row gutters-sm">
                      <div className="col-6 col-sm-4"></div>
                      <div className="col-6 col-sm-4"></div>
                    </div>
                  </div>
                </div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                style={{ display: "none" }} // Hide the input visually
                onChange={handleFileChange}
              />

            

             
            </div>

        
             

            <div className="col-lg-6 col-md-12" style={{ flex: "0 0 auto", maxWidth: "1200px" }}>
            {/* Move the card to this column */}
            <div className="card" style={{ width: "100%", marginBottom: "20px" }}>
                <div className="card-header">
                    <h4>Image Check</h4>
                </div>
                <div className="card-body">
                    <div className="form-group">
                        <label className="form-label">Uploaded Images</label>
                        <div className="row gutters-sm">
                            {/* Display uploaded images here */}
                            {files.map((file, index) => (
                                <div key={index} className="col-6 col-sm-4 mb-2" style={{ marginBottom: "0.5rem" }}>
                                    <label className="imagecheck">
                                        <img 
                                            src={URL.createObjectURL(file)} 
                                            alt={`Uploaded ${index + 1}`} 
                                            className="imagecheck-image" 
                                            style={{
                                                width: "200px",
                                                height: "200px",
                                                objectFit: "cover",
                                                
                                              }}
                
                                        />
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <input
                ref={fileInputRef}
                type="file"
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleFileChange}
                multiple
            />

            <button
                type="button"
                className="btn btn-primary"
                onClick={handleUploadImageClick}
                title="Upload Image"
            >
                Upload Image
            </button>
        </div>

        <div className="card">
  <div className="card-header">
    <h4>Image Check</h4>
  </div>
  <div className="card-body">
    <div className="form-group">
      <label className="form-label">Image Check</label>
      <div className="row gutters-sm">
        <div className="col-6 col-sm-4">
          <label className="imagecheck mb-4">
            <input name="imagecheck" type="checkbox" defaultValue={1} className="imagecheck-input" />
            <span className="imagecheck-figure">
              <img src="assets/img/blog/img01.png" alt="}" className="imagecheck-image" />
            </span>
          </label>
        </div>
        <div className="col-6 col-sm-4">
          <label className="imagecheck mb-4">
            <input name="imagecheck" type="checkbox" defaultValue={2} className="imagecheck-input" defaultChecked />
            <span className="imagecheck-figure">
              <img src="assets/img/blog/img02.png" alt="}" className="imagecheck-image" />
            </span>
          </label>
        </div>
        <div className="col-6 col-sm-4">
          <label className="imagecheck mb-4">
            <input name="imagecheck" type="checkbox" defaultValue={3} className="imagecheck-input" />
            <span className="imagecheck-figure">
              <img src="assets/img/blog/img03.png" alt="}" className="imagecheck-image" />
            </span>
          </label>
        </div>
        <div className="col-6 col-sm-4">
          <label className="imagecheck mb-4">
            <input name="imagecheck" type="checkbox" defaultValue={4} className="imagecheck-input" defaultChecked />
            <span className="imagecheck-figure">
              <img src="assets/img/blog/img04.png" alt="}" className="imagecheck-image" />
            </span>
          </label>
        </div>
        <div className="col-6 col-sm-4">
          <label className="imagecheck mb-4">
            <input name="imagecheck" type="checkbox" defaultValue={5} className="imagecheck-input" />
            <span className="imagecheck-figure">
              <img src="assets/img/blog/img05.png" alt="}" className="imagecheck-image" />
            </span>
          </label>
        </div>
        <div className="col-6 col-sm-4">
          <label className="imagecheck mb-4">
            <input name="imagecheck" type="checkbox" defaultValue={6} className="imagecheck-input" />
            <span className="imagecheck-figure">
              <img src="assets/img/blog/img06.png" alt="}" className="imagecheck-image" />
            </span>
          </label>
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

export default Example;
