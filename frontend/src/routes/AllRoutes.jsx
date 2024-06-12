import { Alert, Heading } from "@chakra-ui/react";
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
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
import Product from "../pages/Products/Product";
import AddProduct from "../pages/Products/AddProduct";
import AdminProducts from "../pages/AdminTemplate/AdminProduct";

import SellerLeftMenu from "../pages/Seller/SellerLeftMenu";
import CompanySetup from "../pages/Company/CompanySetup";
import UserDashboard from "../pages/User/UserDashboard";
import UserNavbar from "../pages/User/UserNavbar";
import AdminTemplateSubcategories from "../pages/AdminTemplate/AdminTemplateSubcategories";
import Example from "../pages/Products/Example";
import BuyLead from "../pages/BuyLead";
import MyOrder from "../pages/User/MyOrders";
import Eg from "../pages/Products/Eg";
import UpdateProduct from "../pages/Products/UpdateProduct";
import AdvertisementForm from "../pages/User/UserAdvertisement";
import Buyleads from "../pages/BuyLead";
import UserAd from "../pages/User/UserAdvertisement";
import AdminAd from "../pages/AdminTemplate/AdminAdvertisement";
import RequireAuth from "../utils/RequireAuth";
import UserAdApproval from "../pages/AdminTemplate/UserAdApproval";
import SignUp from "../Components/home/SignUp";
import SignUpPage from "../pages/User/signup";
import CategoryPage from "../Components/home/HomeCategories";
import Allcategories from "../Components/home/AllCategories";
import ProductDetailsPage from "../pages/Products/ProductDetailsPage";


// import AdvertisementSlider from "../Components/home/Advertisement";

export default function AllRoutes() {
  const isAuthenticated = useSelector(state => state.authReducer.isLogin);
  const userString = sessionStorage.getItem('user');
  const user = JSON.parse(userString);


  return (
    <>

      <Routes>

        {isAuthenticated && user?.u_designation === 'admin' && (
          <Route path="/" element={<Navigate to="/admintemplatedashboard" />} />
        )}


        <Route element={<RequireAuth allowedRoles={["admin"]} />}>
          <Route
            path="/admintemplatedashboard"
            element={
              <>

                <AdminTemplateNavbar />
                <AdminTemplateDashboard />

              </>
            }
          />



          <Route
            path="/admintemplatemaincontent"
            element={
              <>
                <UserNavbar />
                <AdminTemplateMaincontent />

              </>
            }
          />

          <Route
            path="/admintemplatecategories"
            element={
              <>
                <AdminTemplateNavbar />
                <AdminTemplateCategories />
              </>
            }
          />


          <Route

            path="/subcategories/:encCatId"
            element={
              <>
                <AdminTemplateNavbar />
                <AdminTemplateSubcategories />
              </>
            }
          />
          <Route
            path="/admintemplatekeywords"
            element={
              <>
                <AdminTemplateNavbar />
                <AdminTemplateKeywords />
              </>
            }
          />


          <Route
            path="/adv-images-update"
            element={
              <>
                <AdminTemplateNavbar />
                <UserAdApproval />
              </>
            }
          />

          <Route
            path="/admintemplateuom"
            element={
              <>
                <AdminTemplateNavbar />
                <AdminTemplateUOM />
              </>
            }
          />

          <Route
            path="/admintemplatenavbar"
            element={
              <>
                <AdminTemplateNavbar />
              </>
            }
          />

        </Route>
        <Route path={"/"} element={<Home />} />

        <Route element={<RequireAuth allowedRoles={["buyer"]} />}>

          <Route
            path="/userdashboard"
            element={
              <>
                <UserNavbar />
                <UserDashboard />
              </>
            }
          />

          <Route
            path="/products"
            element={
              <>
                <UserNavbar />
                <Product />

              </>
            }
          />

          <Route
            path="/product/add-product"
            element={
              <>
                <UserNavbar />
                <AddProduct />

              </>
            }
          />

          <Route path="/product/update-product"
            element={
              <>
                <UpdateProduct />
                <UserNavbar />
              </>
            }
          />

          <Route
            path="/buylead"
            element={
              <>
                <UserNavbar />
                <BuyLead />
              </>
            }
          />


          <Route
            path="/companysetup"
            element={
              <>
                <UserNavbar />
                <CompanySetup />
              </>
            }
          />

          <Route
            path="/myorders"
            element={
              <>
                <UserNavbar />
                <MyOrder />
              </>
            }
          />

          <Route
            path="/userad"
            element={
              <>
                <UserNavbar />
                <UserAd />
              </>
            }
          />

        </Route>


        <Route path={"/AdminAlertPage"} element={<AdminAlertPage />} />
        <Route path={"/AdminMainTemplate"} element={<AdminMainTemplate />} />

        <Route path={"/login"} element={<Login />} />
        <Route path={"/alogin"} element={<AdminLogin />} />

        <Route path={"/sign"} element={<Sign />} />
        <Route path="*" element={<Heading h="55vh">Page not found</Heading>} />


        <Route
          path="/signup"
          element={
            <>
              <SignUpPage />
            </>
          }
        />

        <Route
          path="/example"
          element={
            <>
              
              <Example />
            </>
          }
        />










        <Route
          path="/usernavbar"
          element={
            <>

              <UserNavbar />
            </>
          }
        />





        <Route
          path="/adminad"
          element={
            <>
              <AdminTemplateNavbar />
              <AdminAd />
            </>
          }
        />

<Route
          path="/adminpro"
          element={
            <>
              <AdminTemplateNavbar />
              <AdminProducts />
            </>
          }
        />

        <Route
          path="/datatables"
          element={
            <>
              <Eg />

            </>
          }
        />








        <Route />

        <Route element={<ProtectedRoutes isAuthenticated={isAuthenticated} />}>
          <Route path="/sell" element={
            <>
              <Sell />
            </>
          } />
        </Route>

        <Route
          path="/categoriess/:encCatId"
          element={
            <>

              <CategoryPage />
            </>
          }
        />

        <Route
          path="/allcategories"
          element={
            <>
              <Allcategories />


            </>
          }
        />

        <Route
          path="/product-details/:encSubCatId/:encProdId"
          element={
            <>
              <ProductDetailsPage />


            </>
          }
        />

      </Routes>
    </>
  );
}
