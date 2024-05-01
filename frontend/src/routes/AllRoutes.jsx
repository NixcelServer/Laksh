import { Alert, Heading } from "@chakra-ui/react";
import React from "react";
import { Route, Routes } from "react-router-dom";


import AddProduct from "../pages/Admin/AddProduct";

import AdminsPage from "../pages/Admin/AdminsPage";
import Dashboard from "../pages/Admin/Dashboard";

import AdminNavbar from '../Components/AdminNavbar';
import AddAdmin from '../pages/Admin/AddAdmin';
import AddNewMachines from "../pages/Admin/AddNewMachines";
import AddNewProduct from '../pages/Admin/AddNewProduct';



import Home from "../pages/Home";

import Login from "../pages/Login";
import AdminTemplateDashboard from "../pages/AdminTemplate/AdminTemplateDashboard";

import Sign from "../pages/Sign";

import Sell from '../pages/sell';
import PlywoodProductPage from "../pages/Products/PlywoodProductPage";
import AdminTemplateMaincontent from "../pages/AdminTemplate/AdminTemplateMainContent";
import AdminAlertPage from "../pages/AdminTemplate/AdminAlertPage";
import AdminMainTemplate from "../pages/AdminTemplate/AdminMainTemplate";
import AdminTemplateCategories from "../pages/AdminTemplate/AdminTemplateCategories";
import AdminTemplateNavbar from "../pages/AdminTemplate/AdminTemplateNavbar";

export default function AllRoutes() {
  return (
    <>

      <Routes>
        <Route path={"/"} element={<Home />} />
        
        <Route path={"/AdminTemplateMainContent"} element={<AdminTemplateMaincontent />} />
        
        <Route path={"/AdminAlertPage"} element={<AdminAlertPage />} />
        <Route path={"/AdminMainTemplate"} element={<AdminMainTemplate/>} />

        <Route path={"/login"} element={<Login />} />
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
            <Route path='/sell' element={<Sell/>} />

      </Routes>
    </>
  );
}
