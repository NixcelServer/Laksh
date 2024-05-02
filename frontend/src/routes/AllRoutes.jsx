import { Alert, Heading } from "@chakra-ui/react";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";



import AddProduct from "../pages/Admin/AddProduct";

import AdminsPage from "../pages/Admin/AdminsPage";
import Dashboard from "../pages/Admin/Dashboard";

import AdminNavbar from '../Components/AdminNavbar';
import AddAdmin from '../pages/Admin/AddAdmin';
import AddNewMachines from "../pages/Admin/AddNewMachines";
import AddNewProduct from '../pages/Admin/AddNewProduct';

import ProtectedRoutes from "./ProtectedRoutes";

import Home from "../pages/Home";

import Login from "../pages/Login";

import AdminTemplateDashboard from "../pages/AdminTemplate/AdminTemplateDashboard";

import AdminLogin from "../pages/AdminLogin";


import Sign from "../pages/Sign";

import Sell from '../pages/sell';
import PlywoodProductPage from "../pages/Products/PlywoodProductPage";
import AdminTemplateMaincontent from "../pages/AdminTemplate/AdminTemplateMainContent";
import AdminAlertPage from "../pages/AdminTemplate/AdminAlertPage";
import AdminMainTemplate from "../pages/AdminTemplate/AdminMainTemplate";
import AdminTemplateCategories from "../pages/AdminTemplate/AdminTemplateCategories";
import AdminTemplateNavbar from "../pages/AdminTemplate/AdminTemplateNavbar";
import AdminTemplateKeywords from "../pages/AdminTemplate/AdminTemplateKeywords";
import AdminTemplateUOM from "../pages/AdminTemplate/AdminTemplateUOM";
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
        
        <Route path={"/AdminTemplateMainContent"} element={<AdminTemplateMaincontent />} />
        
        <Route path={"/AdminAlertPage"} element={<AdminAlertPage />} />
        <Route path={"/AdminMainTemplate"} element={<AdminMainTemplate/>} />

        <Route path={"/login"} element={<Login />} />
        <Route path={"/alogin"} element={<AdminLogin />} />

        <Route path={"/sign"} element={<Sign />} />
        <Route path={"/plywood"} element={<PlywoodProductPage/>} />
        <Route path="*" element={<Heading h="55vh">Page not found</Heading>} />
        <Route
          path="/adminDashboard"
          element={
            <>
              <AdminNavbar />
              <Dashboard />
            </>
          }
        />




        <Route
          path="/addProduct"
          element={
            <>
              <AdminNavbar />
              <AddProduct />
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
          path="/admintemplatecategories"
          element={
            <>
            <AdminTemplateNavbar/>
              <AdminTemplateCategories/>
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
          path="/admin"
          element={
            <>
              <AdminNavbar />
              <AdminsPage />
            </>
          }
        />


        <Route

        
          path="/addAdmin"
          element={
            <>
              <AdminNavbar />
              <AddAdmin />
            </>
          }
        />
        <Route
          path="/addNewProduct"
          element={
            <>
              <AdminNavbar />
              <AddNewProduct />
            </>
          }
        />

        <Route />


       
           
            <Route path='/addNewMachines' element={<><AdminNavbar/><AddNewMachines/></>}/><Route />

            
           

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
