import React, { useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select
} from '@chakra-ui/react';
import axios from 'axios';
import { useToast } from '@chakra-ui/react'; 
import { useNavigate } from 'react-router-dom';

const CompanyRegistrationForm = () => {
  const [formData, setFormData] = useState({});
  const toast = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const nextStep = () => {
    const requiredFields = getRequiredFieldsForStep(step); 
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      toast({
        title: 'Error',
        description: `Please fill in all required fields: ${missingFields.join(', ')}`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } else {
      setStep(step + 1);
    }
  };

  const getRequiredFieldsForStep = (step) => {
    switch (step) {
      case 1:
        return ['name', 'cinNo', 'tanNo', 'iec'];
      case 2:
        return ['pincode', 'city', 'state', 'country', 'area', 'locality'];
      case 3:
        return ['accountNo', 'accountName', 'ifsc', 'branchName', 'bankName', 'gstNo', 'panNo'];
      case 4:
        return ['websiteUrl'];
      default:
        return [];
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const userString = sessionStorage.getItem('user');
      const user = JSON.parse(userString);
      const encUserId = user.encUserId;
      const formDataWithEncUserId = { ...formData, encUserId };
      console.log('formData:', formDataWithEncUserId);
      const response = await axios.post('http://localhost:8000/api/registeryourcompany', formDataWithEncUserId);
      console.log('Response:', response.data);
      toast({
        title: 'Account Created Successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/');
    } catch (error) {
      console.error(error);
      if (error.response) {
        console.error('Response Data:', error.response.data);
        console.error('Response Status:', error.response.status);
        console.error('Response Headers:', error.response.headers);
      } else if (error.request) {
        console.error('Request:', error.request);
      } else {
        console.error('Error:', error.message);
      }
    }
  };

  return (
    <div>
      <Flex
        minHeight="100vh"
        width="full"
        align="center"
        justifyContent="center"
        bg="gray.100"
        marginLeft="122px"
      >
        <Box p={12} maxWidth="1200px" width="80%" borderWidth={1} borderRadius={8} boxShadow="lg">
          <Box textAlign="center">
            <Heading fontSize={["xl", "2xl"]} mb={4}>Company Registration Form</Heading>
          </Box>
          <Box my={4} textAlign="left">
            <form onSubmit={onSubmit}>
              {step === 1 && (
                <div>
                  <Flex justifyContent="space-between" mb={4} mt={4}>
                  <FormControl isRequired width="48%">
                    <FormLabel>Company Name</FormLabel>
                    <Input type="text"
                        placeholder="Enter company name"
                        name="name" // Add name attribute
                        value={formData.name} // Bind value to state
                        onChange={handleChange} />
                  </FormControl>
                    <FormControl isRequired width="48%">
                      <FormLabel>CIN Number</FormLabel>
                      <Input type="text" placeholder="Enter CIN number"
                      name="cinNo" // Add name attribute
                      value={formData.cinNo} // Bind value to state
                      onChange={handleChange} /> 
                    </FormControl>
                </Flex>
                <Flex justifyContent="space-between" mb={4}>
                    <FormControl isRequired width="48%">
                      <FormLabel>TAN Number</FormLabel>
                      <Input type="text" placeholder="Enter TAN number"
                      name="tanNo" // Add name attribute
                      value={formData.tanNo} // Bind value to state
                      onChange={handleChange} />
                    </FormControl>
                    <FormControl isRequired width="48%">
                      <FormLabel>IEC</FormLabel>
                      <Input type="text" placeholder="Enter IEC" 
                       name="iec" // Add name attribute
                       value={formData.iec} // Bind value to state
                       onChange={handleChange}/>
                    </FormControl>
                </Flex>  
                <Flex justifyContent="space-between" mb={4}>
                    <FormControl isRequired width="48%">
                      <FormLabel>Annual Turnover</FormLabel>
                      <Select type="text" placeholder="Enter annual turnover"
                       name="annualTurnover" // Add name attribute
                       value={formData.annualTurnover} // Bind value to state
                       onChange={handleChange} />
                    </FormControl>
                    <FormControl  width="48%">
                      <FormLabel>Number of Employees</FormLabel>
                      <Select type="text" placeholder="Enter number of employees"
                      name="noOfEmps" // Add name attribute
                      value={formData.noOfEmps} // Bind value to state
                      onChange={handleChange} />
                    </FormControl>
                  </Flex>
                  <Flex justifyContent="space-between" mb={4}>
                    <FormControl isRequired width="48%">
                      <FormLabel>Mobile Number</FormLabel>
                      <Input type="text" placeholder="Enter mobile number"
                       name="mobileNo" // Add name attribute
                       value={formData.mobileNo} // Bind value to state
                       onChange={handleChange} />
                    </FormControl>
                   <FormControl  width="48%">
                    <FormLabel>Alternate Mobile Number</FormLabel>
                    <Input type="text" placeholder="Enter alternate mobile number"
                    name="altMobileNo" // Add name attribute
                    value={formData.altMobileNo} // Bind value to state
                    onChange={handleChange}  />
                  </FormControl>
                </Flex>
                <Flex justifyContent="space-between" mb={4}>
                    <FormControl width="48%">
                      <FormLabel>Landline Number</FormLabel>
                      <Input type="text" placeholder="Enter landline number"
                      name="landlineNo" // Add name attribute
                      value={formData.landlineNo} 
                      onChange={handleChange}/>
                    </FormControl>
                    <FormControl width="48%">
                      <FormLabel>Alternate Landline Number</FormLabel>
                      <Input type="text" placeholder="Enter alternate landline number"
                      name="altLandlineNumber" // Add name attribute
                      value={formData.altLandlineNumber}  // Bind value to state 
                      onChange={handleChange}/> 
                    </FormControl>
                  </Flex>
                </div>
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
              {step < 4 ? (
                <Button
                  mt={4}
                  mr={4}
                  onClick={nextStep}
                  colorScheme="teal"
                  float={['right', 'right']}
                >
                  Next
                </Button>
              ) : (
                <Button
                  mt={4}
                  mr={4}
                  type="submit"
                  colorScheme="teal"
                  float={['right', 'right']}
                >
                  Register
                </Button>
              )}
            </form>
          </Box>
        </Box>
      </Flex>
    </div>
  );
};

export default CompanyRegistrationForm;
