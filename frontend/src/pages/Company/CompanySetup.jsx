import React, { useEffect,useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  ChakraProvider,
  theme,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select
} from '@chakra-ui/react';
import axios from 'axios';
import { useToast } from '@chakra-ui/react'; // Import useToast from Chakra UI
import { useNavigate } from 'react-router-dom';
import countrydata from '../../CountryState.json';
const CompanySetup = () => {
  const [formData, setFormData] = useState({});
  const [isNameValid, setIsNameValid] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [error, setError] = useState({});

  const nextStep = async (e) => {
    e.preventDefault();    
    // Check if there are any errors displayed on the form
    const hasErrors = Object.values(error).some(errorMessage => errorMessage !== '');
  
    // If there are errors, prevent advancing and display an error message
    if (hasErrors) {
      toast({
        title: 'Error',
        description: 'Please fix the errors on the form before proceeding.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return; // Prevent advancing to the next step
    }
    
    const inputErrors = [
      companyNameError,cinNoError,tanNoError,iecNoError,iecNoError,
      mobNoError,altmobNoError,landlineNoError,altlandlineNoError,
      accNoError,pincodeError,pannoError,gstnoError,ifscError
      // Add other input errors here if needed
    ];
  
    // If there are errors on input fields, prevent advancing and display an error message
    if (inputErrors.some(errorMessage => errorMessage !== '')) {
      toast({
        title: 'Error',
        description: 'Please fix the errors in the input fields before proceeding.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return; // Prevent advancing to the next step
    }

    // Check if all required fields are filled for the current step
    const requiredFields = getRequiredFieldsForStep(step);
    const missingFields = requiredFields.filter(field => !formData[field]);
  
    // If there are missing required fields, prevent advancing and display an error message
    if (missingFields.length > 0) {
      toast({
        title: 'Error',
        description: `Please fill in all required fields: ${missingFields.join(', ')}`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return; // Prevent advancing to the next step
    }
  
    // All required fields are filled and there are no errors, proceed to the next step
    if (step === 3) {
      // If on the third step, move to the fourth step
      setStep(step + 1);
    } else {
      // Otherwise, proceed to the next step
      setStep(step + 1);
    }
  };

  

  const getRequiredFieldsForStep = (step) => {
    switch (step) {
      case 1:
        return ['c_name', 'gst_no', 'pan_no'];
      case 2:
        return ['pincode', 'city', 'state', 'country', 'area', 'locality'];
      case 3:
        return ['acc_no', 'acc_name', 'ifsc', 'branch_name', 'bank_name'];
      case 4:
        return ['website_url']; // No required fields for step 4
      default:
        return [];
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };
 
  
  //const [error, setError] = useState(''); 
  const [companyNameError, setCompanyNameError] = useState('');
  const [cinNoError, setCINNoError] = useState('');
  const [tanNoError,setTANNoError]=useState('');
  const [iecNoError,setIECNoError]=useState('');
  const [mobNoError,setMOBNoError]=useState('');
  const [altmobNoError,setALTMOBNoError]=useState('');
  const [landlineNoError,setLANDLINENoError]=useState('');
  const [altlandlineNoError,setALTLANDLINENoError]=useState('');
  const [accNoError,setACCNoError]=useState('');
  const [pincodeError, setPincodeError] = useState('');
  const[pannoError,setPanNoError]=useState('');
  const[gstnoError,setGstNoError]=useState('');
  const[ifscError,setIFSCError]=useState('');
  const [logoPath, setLogoPath] = useState('');
  
  const checkCName = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
   
    try {
      const userString = sessionStorage.getItem('user');
      const user = JSON.parse(userString);
      const encCompanyId = user.encCompanyId;
      console.log("encCompanyID:",encCompanyId);
      
      const response = await axios.post(`http://127.0.0.1:8000/api/check-company-name/${encCompanyId}`, { c_name: value });
      if (response.status === 200) {
        const exists = response.data; // Define exists here

        if (exists) {
          // If company name exists in the database, show an error message
          setCompanyNameError('This company name is already taken');
        } else {
          // If company name doesn't exist in the database, clear any previous error message
          setCompanyNameError('');
        }
      } else {
        // Handle error responses
        console.companyNameError('Error checking company name:', response.data.companyNameError || 'An error occurred');
      }
    } catch (companyNameError) {
      // Handle network errors
      console.companyNameError('Error checking company name:', companyNameError);
    }
};

const checkCINNo = async (e) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
 
  try {
    const userString = sessionStorage.getItem('user');
    const user = JSON.parse(userString);
    const encCompanyId = user.encCompanyId;
    console.log("encCompanyID:",encCompanyId);
    
    const response = await axios.post(`http://127.0.0.1:8000/api/check-cin-no/${encCompanyId}`, { c_cin_no: value });
    if (response.status === 200) {
      const exists = response.data; // Define exists here

      if (exists) {
        // If company name exists in the database, show an error message
        setCINNoError('This CIN No is already taken');
      } else {
        // If company name doesn't exist in the database, clear any previous error message
        setCINNoError('');
      }
    } else {
      // Handle error responses
      console.cinNoError('Error checking CIN No:', response.data.cinNoError || 'An error occurred');
    }
  } catch (error) {
    // Handle network errors
    console.cinNoError('Error checking CIN No:', cinNoError);
  }
};

const checkTANNo = async (e) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
 
  try {
    const userString = sessionStorage.getItem('user');
    const user = JSON.parse(userString);
    const encCompanyId = user.encCompanyId;
    console.log("encCompanyID:",encCompanyId);
    
    const response = await axios.post(`http://127.0.0.1:8000/api/check-tan-no/${encCompanyId}`, { c_tan_no: value });
    if (response.status === 200) {
      const exists = response.data; // Define exists here

      if (exists) {
        // If company name exists in the database, show an error message
        setTANNoError('This TAN No is already taken');
      } else {
        // If company name doesn't exist in the database, clear any previous error message
        setTANNoError('');
      }
    } else {
      // Handle error responses
      console.tanNoError('Error checking TAN No:', response.data.tanNoError || 'An error occurred');
    }
  } catch (tanNoError) {
    // Handle network errors
    console.tanNoError('Error checking TAN No:', tanNoError);
  }
};

const checkIECNo = async (e) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
 
  try {
    const userString = sessionStorage.getItem('user');
    const user = JSON.parse(userString);
    const encCompanyId = user.encCompanyId;
    console.log("encCompanyID:",encCompanyId);
    
    const response = await axios.post(`http://127.0.0.1:8000/api/check-iec-no/${encCompanyId}`, { c_iec: value });
    if (response.status === 200) {
      const exists = response.data; // Define exists here

      if (exists) {
        // If company name exists in the database, show an error message
        setIECNoError('This IEC No is already taken');
      } else {
        // If company name doesn't exist in the database, clear any previous error message
        setIECNoError('');
      }
    } else {
      // Handle error responses
      console.iecNoError('Error checking IEC No:', response.data.iecNoError || 'An error occurred');
    }
  } catch (iecNoError) {
    // Handle network errors
    console.iecNoError('Error checking IEC No:', iecNoError);
  }
};

const checkMOBNo = async (e) => {
  const { name, value } = e.target; 
  setFormData({ ...formData, [name]: value });
 
  try {
    const userString = sessionStorage.getItem('user');
    const user = JSON.parse(userString);
    const encCompanyId = user.encCompanyId;
    console.log("encCompanyID:",encCompanyId);
    
    const response = await axios.post(`http://127.0.0.1:8000/api/check-mobile-no/${encCompanyId}`, { c_mobile_no: value });
    if (response.status === 200) {
      const exists = response.data; // Define exists here

      if (exists) {
        // If company name exists in the database, show an error message
        setMOBNoError('This Mobile No is already taken');
      } else {
        // If company name doesn't exist in the database, clear any previous error message
        setMOBNoError('');
      }
    } else {
      // Handle error responses
      console.mobNoError('Error checking Mobile No:', response.data.mobNoError || 'An error occurred');
    }
  } catch (mobNoError) {
    // Handle network errors
    console.mobNoError('Error checking Mobile No:', mobNoError);
  }
};

const checkALTMOBNo = async (e) => {
  const { name, value } = e.target; 
  setFormData({ ...formData, [name]: value });
 
  try {
    const userString = sessionStorage.getItem('user');
    const user = JSON.parse(userString);
    const encCompanyId = user.encCompanyId;
    console.log("encCompanyID:",encCompanyId);
    
    const response = await axios.post(`http://127.0.0.1:8000/api/check-alt-mobile-no/${encCompanyId}`, { c_alt_mobile_no: value });
    if (response.status === 200) {
      const exists = response.data; // Define exists here

      if (exists) {
        // If company name exists in the database, show an error message
        setALTMOBNoError('This Alternate Mobile No is already taken');
      } else {
        // If company name doesn't exist in the database, clear any previous error message
        setALTMOBNoError('');
      }
    } else {
      // Handle error responses
      console.altmobNoError('Error checking Alternate Mobile No:', response.data.altmobNoError || 'An error occurred');
    }
  } catch (altmobNoError) {
    // Handle network errors
    console.altmobNoError('Error checking Alternate Mobile No:', altmobNoError);
  }
};

const checkLANDLINENo = async (e) => {
  const { name, value } = e.target; 
  setFormData({ ...formData, [name]: value });
 
  try {
    const userString = sessionStorage.getItem('user');
    const user = JSON.parse(userString);
    const encCompanyId = user.encCompanyId;
    console.log("encCompanyID:",encCompanyId);
    
    const response = await axios.post(`http://127.0.0.1:8000/api/check-landline-no/${encCompanyId}`, { c_landline_no: value });
    if (response.status === 200) {
      const exists = response.data; // Define exists here

      if (exists) {
        // If company name exists in the database, show an error message
        setLANDLINENoError('This Landline No is already taken');
      } else {
        // If company name doesn't exist in the database, clear any previous error message
        setLANDLINENoError('');
      }
    } else {
      // Handle error responses
      console.landlineNoError('Error checking Landline No:', response.data.landlineNoError || 'An error occurred');
    }
  } catch (landlineNoError) {
    // Handle network errors
    console.landlineNoError('Error checking Landline No:', landlineNoError);
  }
};

const checkALTLANDLINENo = async (e) => {
  const { name, value } = e.target; 
  setFormData({ ...formData, [name]: value });
 
  try {
    const userString = sessionStorage.getItem('user');
    const user = JSON.parse(userString);
    const encCompanyId = user.encCompanyId;
    console.log("encCompanyID:",encCompanyId);
    
    const response = await axios.post(`http://127.0.0.1:8000/api/check-alt-landline-no/${encCompanyId}`, { c_alt_landline_no: value });
    if (response.status === 200) {
      const exists = response.data; // Define exists here

      if (exists) {
        // If company name exists in the database, show an error message
        setALTLANDLINENoError('This Alt Landline No is already taken');
      } else {
        // If company name doesn't exist in the database, clear any previous error message
        setALTLANDLINENoError('');
      }
    } else {
      // Handle error responses
      console.altlandlineNoError('Error checking Alt Landline No:', response.data.altlandlineNoError || 'An error occurred');
    }
  } catch (altlandlineNoError) {
    // Handle network errors
    console.altlandlineNoError('Error checking Alt Landline No:', altlandlineNoError);
  }
};

const checkACCNo = async (e) => {
  const { name, value } = e.target; 
  setFormData({ ...formData, [name]: value });
 
  try {
    const userString = sessionStorage.getItem('user');
    const user = JSON.parse(userString);
    const encCompanyId = user.encCompanyId;
    console.log("encCompanyID:",encCompanyId);

    // ACC No validation regex pattern
    const accNoRegex = /^\d{12}$/;

    // Check if the input value matches the ACC No pattern
    if (!accNoRegex.test(value)) {
      // If it doesn't match the pattern, set an error message
      setACCNoError('ACC No must be 12 digits long');
    } else {
    const response = await axios.post(`http://127.0.0.1:8000/api/check-acc-no/${encCompanyId}`, { acc_no: value });
    if (response.status === 200) {
      const exists = response.data; // Define exists here
      
      if (exists) {
        // If company name exists in the database, show an error message
        setACCNoError('This ACC No is already taken');
      } else {
        // If company name doesn't exist in the database, clear any previous error message
        setACCNoError('');
      }
    } else {
      // Handle error responses
      console.accNoError('Error checking ACC No:', response.data.accNoError || 'An error occurred');
    }
  }
  } catch (accNoError) {
    // Handle network errors
    console.accNoError('Error check ACC No:', accNoError);
  }
};

const checkPincode = (e) => {
  const { value } = e.target;
  const pincodeRegex = /^[1-9]\d{5}$/;

  if (!value) {
    // If the input is empty, setPincodeError to indicate that Pincode is required
    setPincodeError('Pincode is required');
  } else if (!pincodeRegex.test(value)) {
    // If the input doesn't match the regex pattern, setPincodeError to indicate invalid format
    setPincodeError('Pincode must be a 6-digit number and should not start with zero');
  } else {
    // If the input is valid, clear the pincode error message
    setPincodeError('');
  }

  // Always update the form data with the new value
  setFormData({ ...formData, pincode: value });
};

const checkPanNo = (e) => {
  const { name, value } = e.target;

  // PAN Number validation regex pattern
  const panRegex = /^[A-Z]{5}\d{4}[A-Z]$/;
  if (!value) {
    // If the input is empty, setPincodeError to indicate that Pincode is required
    setPanNoError('Pan No required');
  } 
  // Check if the input value matches the PAN Number pattern
  else if (name === 'pan_no' && !panRegex.test(value)) {
    // If it doesn't match the pattern, set an error message
    setPanNoError('It should be ten characters long.The first five characters should be any upper case alphabets. The next four-characters should be any number from 0 to 9. The lasttenth character should be any upper case alphabet. It should not contain any white spaces');
  } else {
    // If it matches the pattern or for other fields, clear any previous error message
    setPanNoError('');
  }

  // Update the form data
  setFormData({ ...formData, [name]: value });
};

const checkGSTNo = (e) => {
  const { name, value } = e.target;

  // GST Number validation regex pattern
  const gstRegex = /^\d{2}[A-Z]{5}\d{4}[A-Z]\d{1}[0-9A-Z]\d{1}$/;
  if (!value) {
    // If the input is empty, setPincodeError to indicate that Pincode is required
    setGstNoError('GST No required');
  } else
  // Check if the input value matches the GST Number pattern
  if (name === 'gst_no' && !gstRegex.test(value)) {
    // If it doesn't match the pattern, set an error message
    setGstNoError(" It should be 15 characters long.The first 2 characters should be a number.The next 10 characters should be the PAN number of the taxpayer.The 13th character (entity code) should be a number from 1-9 or an alphabet.The 14th character should be Z.The 15th character should be an alphabet or a number."
    );
  } else {
    // If it matches the pattern or for other fields, clear any previous error message
    setGstNoError('');
  }

  // Update the form data
  setFormData({ ...formData, [name]: value });
};

const checkIFSC = (e) => {
  const { name, value } = e.target;
  
  // IFSC validation regex pattern
  const ifscRegex = /^[A-Z]{4}0[A-Za-z0-9]{6}$/;

  // Check if the input value matches the IFSC pattern
  if (!ifscRegex.test(value)) {
    // If it doesn't match the pattern, show an error message
    setIFSCError('IFSC must be 11 characters long with the first four characters as upper case alphabets and the fifth character as 0.');
  } else {
    // If it matches the pattern, clear any previous error message
    setIFSCError('');
  }

  setFormData({ ...formData, [name]: value });
};

  const annualTurnoverOptions = [
    { label: '0 to 5 lakh', value: '0-5' },
    { label: '5 lakh to 10 lakh', value: '5-10' },
    { label: '10 lakh to 15 lakh', value: '10-15' },
    // Add more options as needed
  ];
  
  const numberOfEmployeesOptions = [
    { label: '0-50', value: '0-50' },
    { label: '51-100', value: '51-100' },
    { label: '101-500', value: '101-500' },
    { label: '501-1000', value: '501-1000' },
    // Add more options as needed
  ];
  
  
  const onSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Get the user object from sessionStorage
      const userString = sessionStorage.getItem('user');
      const user = JSON.parse(userString);
      const encUserId = user.encUserId;

    // Add encUserId to the form data
    const formDataWithEncUserId = { ...formData, encUserId };

    // Log the formData before sending the request
    console.log('formData:', formDataWithEncUserId);

    
  
      // Send the POST request to the backend API
      const response = await axios.post('http://localhost:8000/api/registeryourcompany', formDataWithEncUserId,{
        headers: {'Content-Type': 'multipart/form-data'}
      });
    
      // Log the response data
      console.log('Response:', response.data);
  
      // Display success toast
      toast({
        title: 'Account Created Successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
  
      // Redirect to home page after successful registration
      navigate('/');
    } catch (error) {
      console.error(error);
      // Handle error
      if (error.response) {
        // Server responded with a non-2xx status code
        console.error('Response Data:', error.response.data);
        console.error('Response Status:', error.response.status);
        console.error('Response Headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Request:', error.request);
      } else {
        // Something happened in setting up the request that triggered an error
        console.error('Error:', error.message);
      }
    }
  };

  const fetchCompanyDetails = async () => {
    try {
    // console.log("calling api");
     const userString = sessionStorage.getItem('user');
      const user = JSON.parse(userString);
      const encCompanyId = user.encCompanyId;
       const response = await axios.get(`http://127.0.0.1:8000/api/companydetails/${encCompanyId}`);
       if (response.status === 200) {
         const companyDetails = response.data;
         console.log(response.data);

         // Assuming the received company details match the form field names,
         // set the form data with the fetched company details
         setFormData((prevData) => ({
           ...prevData,
           ...companyDetails,
           file: companyDetails. c_logo_path
           
           
         }));

         console.log(formData);
        //setFormData(companyDetails);
         
       } else {
         console.error('Failed to fetch company details');
       }
     } catch (error) {
       console.error('Error fetching company details:', error);
     }
   };
 
  const CompanyDetails = ({ encCompanyId, setFormData }) => {
    const [ loading,setLoading] = useState(true);
  
   
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

  };

  

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    
    setFormData({ ...formData, file })
    //localStorage.setItem('selectedFile', JSON.stringify(file));
  };

  const [country, setCountry] = useState([]);
  const[countryid, setCountryid]=useState('');
  const[state, setState]=useState([]);
  const[stateid, setStateid]= useState('');

 
   const handlecounty=(e)=>{
     const getcountryId= e.target.value;
     const getStatedata= countrydata.find(country=>country.country_name===getcountryId).states;
     setState(getStatedata);
     setCountryid(getcountryId);
     
     setFormData({ ...formData, country: getcountryId });
   //console.log(getcountryId);
  
   }
   
 
   const handlestate = (e)=>{
     const stateid= e.target.value;
     //console.log(stateid);
     setStateid(stateid);
     setFormData({ ...formData, state: stateid }); 
   }


  useEffect(() => {
    //console.log("in use effect");
      fetchCompanyDetails();
      console.log("Form data updated:", formData);
   }, []);

   

   return (
    // <!-- Main Content -->
    <div class="main-content"  style={{ marginTop: -50}}>
      <section class="section">
        <div class="section-body">
          <div class="row">
            <div class="col-12 col-md-12 col-lg-12">
              <div class="card">
                <div class="card-body">
                    <ChakraProvider theme={theme}>
                      <div style={{ overflow: "hidden" }}>
                      {/* <Flex
                      minHeight="100vh"
                      width="full"
                      align="center"
                      justifyContent="center"
                      bg="gray.100"
                      marginLeft="122px"
                    > */}
                      {/* <Box p={12} maxWidth="1200px" width="80%" borderWidth={1} borderRadius={8} boxShadow="lg"> */}
                  <Box textAlign="center">
                    <Heading fontSize={["xl", "2xl"]} mb={4}>Company Registration Form</Heading>
                  </Box>
                  {/* <Box my={4} textAlign="left"> */}
                    <form onSubmit={onSubmit}>
                      {step === 1 && (
                        <div>
                          <Box bg="teal.200" p={2} borderRadius={8} mb={4}>
                              <Heading as="h2" size="md">
                                Company Basic Details
                              </Heading>
                            </Box>
                          <div style={{ marginBottom: "1rem" }}>
                          <Flex justifyContent={["center", "flex-end"]} flexDirection={["column", "row"]}>
                          <FormControl isRequired width={["100%", "36%"]} marginBottom={["1rem", 0]} marginRight={[0, "20%"]}>
                            <FormLabel>Company Name</FormLabel>
                            <Input
                              type="text"
                              placeholder="Enter company name"
                              name="c_name"
                              value={formData.c_name}
                              onChange={checkCName}
                            />
                            {companyNameError && <p style={{ color: 'red' }}>{companyNameError}</p>}
                          </FormControl>
                            <FormControl  width={["100%", "36%"]} mr={["0", "10%"]}>
                              <FormLabel>CIN Number</FormLabel>
                              <Input
                                type="text"
                                placeholder="Enter CIN number"
                                name="c_cin_no"
                                value={formData.c_cin_no}
                                onChange={checkCINNo}
                              />
                              {cinNoError && <p style={{ color: 'red' }}>{cinNoError}</p>}
                            </FormControl>
                          </Flex>
                          </div>
                          <div style={{ marginBottom: "1rem" }}>
                            <Flex justifyContent={["center", "flex-end"]} flexDirection={["column", "row"]}>
                              <FormControl  width={["100%", "36%"]} marginBottom={["1rem", 0]} marginRight={[0, "20%"]}>
                                <FormLabel>TAN Number</FormLabel>
                                <Input
                                  type="text"
                                  placeholder="Enter TAN number"
                                  name="c_tan_no"
                                  value={formData.c_tan_no}
                                  onChange={checkTANNo}
                                />
                              {tanNoError && <p style={{ color: 'red' }}>{tanNoError}</p>} 
                              </FormControl>
                              <FormControl  width={["100%", "36%"]} mr={["0", "10%"]}>
                                <FormLabel>IEC</FormLabel>
                                <Input
                                  type="text"
                                  placeholder="Enter IEC"
                                  name="c_iec"
                                  value={formData.c_iec}
                                  onChange={checkIECNo}
                                />
                                {iecNoError && <p style={{ color: 'red' }}>{iecNoError}</p>}
                              </FormControl>
                            </Flex>
                          </div>
                          <div style={{ marginBottom: "1rem" }}>
                            <Flex justifyContent={["center", "flex-end"]} flexDirection={["column", "row"]}>
                              <FormControl isRequired width={["100%", "36%"]} marginBottom={["1rem", 0]} marginRight={[0, "20%"]}>
                                <FormLabel>Annual Turnover</FormLabel>
                                <Select type="text" placeholder="Enter annual turnover"
                              name="annualTurnover" // Add name attribute
                              value={formData.c_annual_to} // Bind value to state
                              //onChange={handleChange}
                              >
                                {annualTurnoverOptions.map((option) => (
                                  <option key={option.value} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                              </Select>
                              </FormControl>
                              <FormControl width={["100%", "36%"]} mr={["0", "10%"]}>
                                <FormLabel>Number of Employees</FormLabel>
                                <Select type="text" placeholder="Enter number of employees"
                              name="no_of_emps" // Add name attribute
                              value={formData.no_of_emps} // Bind value to state
                              //onChange={handleChange}
                              >
                                {numberOfEmployeesOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                      {option.label}
                                    </option>
                                  ))}
                                </Select>
                              </FormControl>
                            </Flex>
                          </div>
                          <div style={{ marginBottom: "1rem" }}>
                                            <Flex justifyContent={["center","flex-end"]} flexDirection={["column", "row"]}>
                                            <FormControl isRequired width={["100%", "36%"]} marginBottom={["1rem", 0]} marginRight={[0, "20%"]}>
                                            <FormLabel>PAN Number</FormLabel>
                                                <Input
                                                  type="text"
                                                  placeholder="Enter PAN number"
                                                  name="pan_no"
                                                  value={formData.pan_no}
                                                  onChange={checkPanNo}
                                                  />
                                                  {pannoError && <p style={{ color: 'red' }}>{pannoError}</p>}
                                                  
                                                </FormControl>
                                                <FormControl isRequired  width={["100%", "36%"]} mr={["0", "10%"]}>
                                              <FormLabel>GST Number</FormLabel>
                                                  <Input
                                                    type="text"
                                                    placeholder="Enter GST number"
                                                    name="gst_no"
                                                    value={formData.gst_no}
                                                    onChange={checkGSTNo}
                                                  />
                                                  {gstnoError && <p style={{ color: 'red' }}>{gstnoError}</p>}
                                            </FormControl>
                                              </Flex>
                                            </div>
                          <div style={{ marginBottom: "1rem" }}>
                            <Flex justifyContent={["center","flex-end"]} flexDirection={["column", "row"]}>
                              <FormControl isRequired width={["100%", "36%"]} marginBottom={["1rem", 0]} marginRight={[0, "20%"]}>
                                <FormLabel>Mobile Number</FormLabel>
                                <Input
                                  type="text"
                                  placeholder="Enter mobile number"
                                  name="c_mobile_no"
                                  value={formData.c_mobile_no}
                                  onChange={checkMOBNo}
                                />
                                {mobNoError && <p style={{ color: 'red' }}>{mobNoError}</p>}
                              </FormControl>
                              <FormControl width={["100%", "36%"]} mr={["0", "10%"]}>
                                <FormLabel>Alternate Mobile Number</FormLabel>
                                <Input
                                  type="text"
                                  placeholder="Enter alternate mobile number"
                                  name="c_alt_mobile_no"
                                  value={formData.c_alt_mobile_no}
                                  onChange={checkALTMOBNo}
                                />
                                {altmobNoError && <p style={{ color: 'red' }}>{altmobNoError}</p>}
                              </FormControl>
                            </Flex>
                          </div>
                          <div style={{ marginBottom: "1rem" }}>
                            <Flex justifyContent={["center", "flex-end"]} flexDirection={["column", "row"]}>
                              <FormControl isRequired width={["100%", "36%"]} marginBottom={["1rem", 0]} marginRight={[0, "20%"]}>
                                <FormLabel>Landline Number</FormLabel>
                                <Input
                                  type="text"
                                  placeholder="Enter landline number"
                                  name="c_landline_no"
                                  value={formData.c_landline_no}
                                onChange={checkLANDLINENo}
                                />
                                {landlineNoError && <p style={{ color: 'red' }}>{landlineNoError}</p>}
                              </FormControl>
                              <FormControl width={["100%", "36%"]} mr={["0", "10%"]}>
                                <FormLabel>Alternate Landline Number</FormLabel>
                                <Input
                                  type="text"
                                  placeholder="Enter alternate landline number"
                                  name="c_alt_landline_no"
                                  value={formData.c_alt_landline_no}
                                  onChange={checkALTLANDLINENo}
                                />
                                {altlandlineNoError && <p style={{ color: 'red' }}>{altlandlineNoError}</p>}
                              </FormControl>
                            </Flex>
                            <FormControl width={["100%", "36%"]} mb={[4, 0]} mr={["0", "10%"]}>
                                              <FormLabel>Company Logo</FormLabel>
                                              {/* Check if formData.file exists */}
                                              {formData.file ? (
                                                // If formData.file exists, display the current logo file name
                                                <>
                                                  <p> {formData.c_logo_path }</p>
                                                  {/* Provide an option to change the logo by uploading a new file */}
                                                  <Input
                                                    type="file"
                                                    placeholder="Upload New Company Logo"
                                                    name="company_logo"
                                                    onChange={handleFileChange}
                                                  />
                                                </>
                                              ) : (
                                                // If formData.file does not exist, display the input field for uploading a new logo
                                                <>
                                                <Input
                                                  type="file"
                                                  placeholder="Upload Company Logo"
                                                  name="company_logo"
                                                  onChange={handleFileChange}
                                                />
                                                </>
                                              )
                                              }
                                            </FormControl>
                          </div>
                        </div>
                      )}
                  {step === 2 && (
                          <>
                            <Box bg="teal.200" p={2} borderRadius={8} mb={4}>
                              <Heading as="h2" size="md">
                                Company Address Details
                              </Heading>
                            </Box>
                            <Flex justifyContent={["center", "flex-end"]} flexDirection={["column", "row"]}>
                                              <FormControl isRequired width={["100%", "36%"]} marginBottom={["1rem", 0]} marginRight={[0, "20%"]}>
                                                <FormLabel>Country</FormLabel>
                                                <select name="country" className="form-control p-2"  onChange={(e)=>handlecounty(e)} value={formData.country} >
                                                  <option >--Select Country--</option>
                                                  {countrydata.map((country) => (
                                                    <option key={country.country_name} value={country.country_name}>{country.country_name}</option>
                                                  ))}
                                                </select>
                                                </FormControl>

                                                <FormControl isRequired width={["100%", "36%"]} mr={["0", "10%"]}>
                                                  <FormLabel>State</FormLabel>
                                                  {/* <Input
                                                    type="text"
                                                    placeholder="Enter state"
                                                    name="state"
                                                    value={formData.state}
                                                  onChange={handleChange}
                                                  /> */}
                                                  <select name="state" className="form-control p-2" onChange={(e)=>handlestate(e)} value={formData.state}>
                                                  <option value="">--Select State--</option>
                                                  {
                                                    state.map((state, index)=>(
                                                      <option value={state.state_name} key={state.state_name}>{ state.state_name }</option>
                                                    ))
                                                  }
                                                </select>
                                                </FormControl>
                                                
                                              </Flex>
                                              <Flex justifyContent={["center", "flex-end"]} flexDirection={["column", "row"]}>
                                                <FormControl isRequired width={["100%", "36%"]} marginBottom={["1rem", 0]} marginRight={[0, "20%"]}>
                                                  <FormLabel>City</FormLabel>
                                                  <Input
                                                    type="text"
                                                    placeholder="Enter city"
                                                    name="city"
                                                    value={formData.city}
                                                  onChange={handleChange}
                                                  />
                                                </FormControl>
                                                <FormControl isRequired width={["100%", "36%"]} mr={["0", "10%"]}>
                                                <FormLabel>Pincode</FormLabel>
                                                  <Input
                                                    type="text"
                                                    placeholder="Enter pincode"
                                                    name="pincode"
                                                    value={formData.pincode}
                                                    onChange={checkPincode}
                                                  />
                                                {pincodeError && <p style={{ color: 'red' }}>{pincodeError}</p>}
                                                
                                                </FormControl>
                                              </Flex>
                                              <Flex justifyContent={["center", "flex-end"]} flexDirection={["column", "row"]}>
                                                <FormControl isRequired width={["100%", "36%"]} marginBottom={["1rem", 0]} marginRight={[0, "20%"]}>
                                                  <FormLabel>House No./Block No.</FormLabel>
                                                  <Input
                                                    type="text"
                                                    placeholder="Enter sector number"
                                                    name="house_no"
                                                    value={formData.house_no}
                                                    onChange={handleChange}
                                                  />
                                                </FormControl>
                                                <FormControl isRequired width={["100%", "36%"]}mr={["0", "10%"]}>
                                                  <FormLabel>Area</FormLabel>
                                                  <Input
                                                    type="text"
                                                    placeholder="Enter area"
                                                    name="area"
                                                    value={formData.area}
                                                    onChange={handleChange}
                                                  />
                                                </FormControl>
                                              </Flex>
                                              <Flex justifyContent={["center", "flex-end"]} flexDirection={["column", "row"]}>
                                                <FormControl isRequired width={["100%", "36%"]} marginBottom={["1rem", 0]} marginRight={[0, "20%"]}>
                                                  <FormLabel>Locality</FormLabel>
                                                  <Input
                                                    type="text"
                                                    placeholder="Enter locality"
                                                    name="locality"
                                                    value={formData.locality}
                                                    onChange={handleChange}
                                                  />
                                                </FormControl>
                                                <FormControl isRequired width={["100%", "36%"]} mr={["0", "10%"]}>
                                                  <FormLabel>Landmark</FormLabel>
                                                  <Input
                                                    type="text"
                                                    placeholder="Enter landmark"
                                                    name="landmark"
                                                    value={formData.landmark}
                                                    onChange={handleChange}
                                                  />
                                                </FormControl>
                                              </Flex>
                          </>
                        )}

                        {step === 3 && (
                          <>
                            <Box bg="teal.200" p={2} borderRadius={8} mb={4}>
                              <Heading as="h2" size="md">
                                Financial Details
                              </Heading>
                            </Box>
                            <Flex justifyContent={["center", "flex-end"]} flexDirection={["column", "row"]}>
                              <FormControl isRequired width={["100%", "36%"]} marginBottom={["1rem", 0]} marginRight={[0, "20%"]}>
                                <FormLabel>Account Number</FormLabel>
                                <Input
                                  type="text"
                                  placeholder="Enter account number"
                                  name="acc_no"
                                  value={formData.acc_no}
                                  onChange={checkACCNo}
                                />
                                {accNoError && <p style={{ color: 'red' }}>{accNoError}</p>}
                              </FormControl>
                              <FormControl isRequired width={["100%", "36%"]}  mr={["0", "10%"]}>
                                <FormLabel>Account Name</FormLabel>
                                <Input
                                  type="text"
                                  placeholder="Enter account name"
                                  name="acc_name"
                                  value={formData.acc_name}
                                  onChange={handleChange}
                                />
                              </FormControl>
                            </Flex>

                            <Flex justifyContent={["center", "flex-end"]} flexDirection={["column", "row"]}>
                              <FormControl isRequired width={["100%", "36%"]} marginBottom={["1rem", 0]} marginRight={[0, "20%"]}>
                                <FormLabel>IFSC</FormLabel>
                                <Input
                                  type="text"
                                  placeholder="Enter IFSC"
                                  name="ifsc"
                                  value={formData.ifsc}
                                  onChange={checkIFSC}
                                />
                                {ifscError && <p style={{ color: 'red' }}>{ifscError}</p>}
                              </FormControl>
                              <FormControl isRequired width={["100%", "36%"]}  mr={["0", "10%"]}>
                                <FormLabel>Branch Name</FormLabel>
                                <Input
                                  type="text"
                                  placeholder="Enter branch name"
                                  name="branch_name"
                                  value={formData.branch_name}
                                  onChange={handleChange}
                                />
                              </FormControl>
                            </Flex>

                            <Flex justifyContent={["center", "flex-end"]} flexDirection={["column", "row"]}>
                                              <FormControl isRequired width={["100%", "36%"]} marginBottom={["1rem", 0]} marginRight={[0, "65%"]}>
                                                  <FormLabel>Bank Name</FormLabel>
                                                  <Input
                                                    type="text"
                                                    placeholder="Enter bank name"
                                                    name="bank_name"
                                                    value={formData.bank_name}
                                                    onChange={handleChange}
                                                  />
                                                </FormControl>
                                              
                                              </Flex>
                              {/* <FormControl isRequired width={["100%", "36%"]}  mr={["0", "10%"]}>
                                <FormLabel>GST Number</FormLabel>
                                <Input
                                  type="text"
                                  placeholder="Enter GST number"
                                  name="gst_no"
                                  value={formData.gst_no}
                                  onChange={checkGSTNo}
                                />
                                {gstnoError && <p style={{ color: 'red' }}>{gstnoError}</p>}
                              </FormControl> */}
                            {/* </Flex> */}

                            {/* <Flex justifyContent={["center", "flex-end"]} flexDirection={["column", "row"]} mt={4}>
                          <FormControl isRequired width={["100%", "36%"]} mb={[4, 0]} mr={["0", "65%"]}>
                            <FormLabel>PAN Number</FormLabel>
                            <Input
                              type="text"
                              placeholder="Enter PAN number"
                              name="pan_no"
                              value={formData.pan_no}
                              onChange={checkPanNo}
                            />
                            {pannoError && <p style={{ color: 'red' }}>{pannoError}</p>}
                          </FormControl>
                        </Flex> */}
                          </>
                        )}

                        {step === 4 && (
                          <>
                            <Box bg="teal.200" p={2} borderRadius={8} mb={4}>
                              <Heading as="h2" size="md">
                                Company Social Platforms
                              </Heading>
                            </Box>
                            <Flex justifyContent={["center", "space-between"]} flexDirection={["column", "row"]} mt={4}>
                              <FormControl isRequired width={["100%", "36%"]} mb={[4, 0]}>
                                <FormLabel>Website URL</FormLabel>
                                <Input
                                  type="text"
                                  placeholder="Enter website URL"
                                  name="website_url"
                                  value={formData.website_url}
                                  onChange={handleChange}
                                />
                              </FormControl>
                              <FormControl  width={["100%", "36%"]} mb={[4, 0]}  mr={["0", "10%"]}>
                                <FormLabel>Instagram URL</FormLabel>
                                <Input
                                  type="text"
                                  placeholder="Enter Instagram URL"
                                  name="instagram_url"
                                  value={formData.instagram_url}
                                  onChange={handleChange}
                                />
                              </FormControl>
                            </Flex>
                            <Flex justifyContent={["center", "space-between"]} flexDirection={["column", "row"]} mt={4}>
                              <FormControl  width={["100%", "36%"]} mb={[4, 0]}>
                                <FormLabel>Facebook URL</FormLabel>
                                <Input
                                  type="text"
                                  placeholder="Enter Facebook URL"
                                  name="facebook_url"
                                  value={formData.facebook_url}
                                  onChange={handleChange}
                                />
                              </FormControl>
                            </Flex>
                          </>
                        )}


                      {/* Other steps */}
                      {step > 1 && (
                        <Button
                          mt={4}
                          mr={4}
                          onClick={prevStep}
                          colorScheme="teal"
                          float={['left', 'right']}
                        >
                          Previous
                        </Button>
                      )}
                      {/* {step > 1 && (
                                      <Button
                                        mt={4}
                                        ml={900}
                                        onClick={prevStep}
                                        colorScheme="teal"
                                      >
                                        Previous
                                      </Button>
                                    )} */}
                      {step < 4 ? (
                        <Button
                          mt={4}
                          mr={4}
                          mb={4}
                          onClick={(e) => nextStep(e)}
                          colorScheme="teal"
                          float={['right', 'right']}
                        >
                          Next
                        </Button>
                      ) : (
                        <Button
                          mt={4}
                          mr={4}
                          mb={4}
                          type="submit"
                          colorScheme="teal"
                          float={['right', 'right']}
                        >
                          Register
                        </Button>
                      )}
                    </form>
                  {/* </Box> */}
                {/* </Box> */}
              {/* </Flex> */}
            </div>
            </ChakraProvider>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
  
   );


};

export default CompanySetup;