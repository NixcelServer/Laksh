import { Alert, Heading } from "@chakra-ui/react";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";






import ProtectedRoutes from "./ProtectedRoutes";

import Home from "../pages/Home";

import Login from "../pages/Login";

import AdminTemplateDashboard from "../pages/AdminTemplate/AdminTemplateDashboard";

import AdminLogin from "../pages/AdminLogin";


import Sign from "../pages/Sign";

import Sell from '../pages/sell';
import AdminTemplateMaincontent from "../pages/AdminTemplate/AdminTemplateMainContent";
import AdminAlertPage from "../pages/AdminTemplate/AdminAlertPage";
import AdminMainTemplate from "../pages/AdminTemplate/AdminMainTemplate";
import AdminTemplateCategories from "../pages/AdminTemplate/AdminTemplateCategories";
import AdminTemplateNavbar from "../pages/AdminTemplate/AdminTemplateNavbar";
import AdminTemplateKeywords from "../pages/AdminTemplate/AdminTemplateKeywords";
import AdminTemplateUOM from "../pages/AdminTemplate/AdminTemplateUOM";
import AddProduct from "../pages/Products/AddProduct";
import SellerLeftMenu from "../pages/Seller/SellerLeftMenu";
import Buyleads from "../pages/Seller/BuyLeads";
import CompanySetup from "../pages/Company/CompanySetup";
import UserDashboard from "../pages/User/UserDashboard";
import UserNavbar from "../pages/User/UserNavbar";
import AdminTemplateSubcategories from "../pages/AdminTemplate/AdminTemplateSubcategories";
import Example from "../pages/Products/Example";

export default function AllRoutes() {
  const isAuthenticated = useSelector(state => state.authReducer.isLogin);
  const userString = sessionStorage.getItem('user');
  console.log("landing page",userString);
  let userRole = null;

  if (userString) {
    const user = JSON.parse(userString);
    userRole = user.u_designation;
    console.log("in user role",userRole);
  }

  return (
    <>

      <Routes>
        <Route path={"/"} element={<Home />} />
        
        
        <Route path={"/AdminAlertPage"} element={<AdminAlertPage />} />
        <Route path={"/AdminMainTemplate"} element={<AdminMainTemplate/>} />

        <Route path={"/login"} element={<Login />} />
        <Route path={"/alogin"} element={<AdminLogin />} />

        <Route path={"/sign"} element={<Sign />} />
        <Route path="*" element={<Heading h="55vh">Page not found</Heading>} />
        


    
<Route
          path="/example"
          element={
            <>
            <UserNavbar/>
              <Example/>
            </>
          }
        />

      


<Route
          path="/admintemplatedashboard"
          element={
            <>
              <AdminTemplateNavbar/>
              <AdminTemplateDashboard/>
              
            </>
          }
        />

<Route
          path="/admintemplatemaincontent"
          element={
            <>
              <UserNavbar/>
              <AdminTemplateMaincontent/>
              
            </>
          }
        />

<Route
          path="/admintemplatecategories"
          element={
            <>
            <AdminTemplateNavbar/>
              <AdminTemplateCategories/>
            </>
          }
        />


<Route
          path="/subcategories"
          element={
            <>
            <AdminTemplateNavbar/>
              <AdminTemplateSubcategories/>
            </>
          }
        />

<Route
          path="/admintemplatekeywords"
          element={
            <>
            <AdminTemplateNavbar/>
              <AdminTemplateKeywords/>
            </>
          }
        />

<Route
          path="/admintemplateuom"
          element={
            <>
            <AdminTemplateNavbar/>
              <AdminTemplateUOM/>
            </>
          }
        />

<Route
          path="/admintemplatenavbar"
          element={
            <>
              <AdminTemplateNavbar/>
            </>
          }
        />

<Route
          path="/userdashboard"
          element={
            <>
            <UserNavbar/>
              <UserDashboard/>
            </>
          }
        />

<Route
          path="/usernavbar"
          element={
            <>
            
              <UserNavbar/>
            </>
          }
        />

<Route
          path="/addproduct"
          element={
            <>
            <UserNavbar/>
              <AddProduct/>
            </>
          }
        />

<Route
          path="/buyleads"
          element={
            <>
            <UserNavbar/>
              <Buyleads/>
            </>
          }
        />

<Route
          path="/companysetup"
          element={
            <>
            <UserNavbar/>
              <CompanySetup/>
            </>
          }
        />



       
       
       

        <Route />


       
           

            
           

            <Route element={<ProtectedRoutes isAuthenticated={isAuthenticated} />}>
            <Route path="/sell" element={
            <>
             <Sell/>
            </>
          }/>
            </Route>

      </Routes>
    </>
  );
}
