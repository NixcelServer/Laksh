import "./App.css";


import Footer from "./Components/home/Footer";
import Navbar from "./Components/home/Nav";


import AllRoutes from "./routes/AllRoutes";
import { useLocation } from "react-router-dom";
function App() {
  const location = useLocation();
  return (
    <div className="App">
      {
      location.pathname === "/adminDashboard" ||
  
     
      location.pathname === "/sell" ||
  location.pathname === "/admintemplatenavbar" ||
  location.pathname === "/admintemplatedashboard" ||
  location.pathname === "/admintemplatekeywords" ||
  location.pathname === "/admintemplatecategories" ||
  location.pathname === "/adv-images-update" ||
  location.pathname === "/example" ||
  
  location.pathname.startsWith("/subcategories/") ||
  location.pathname === "/admintemplateuom" ||
  location.pathname === "/adminad" ||
  location.pathname === "/admin" ? (

        false
      ) : (
        <Navbar />
      )} 

      <AllRoutes />

      {location.pathname === "/adminDashboard" ||
     
      location.pathname === "/addNewProduct" ||
      location.pathname === "/admin" ||
      location.pathname === "/admintemplatedashboard" ||
      location.pathname === "/admintemplatenavbar" ||
      location.pathname === "/admintemplatecategories" ||
      location.pathname.startsWith("/subcategories/") ||
      location.pathname === "/admintemplatekeywords" ||
      location.pathname === "/admintemplateuom" ||
      location.pathname === "/admintemplatemaincontent" ||
      location.pathname === "/adv-images-update" ||
      location.pathname === "/usernavbar" ||
      location.pathname === "/userdashboard" ||

      location.pathname === "/companysetup" ||

      location.pathname === "/buylead" ||
      location.pathname === "/myorders" ||
      location.pathname === "/userad" ||
      location.pathname === "/example" ||
      location.pathname === "/adminad" ||

    

     
      location.pathname === "/products" ||
      location.pathname === "/product/add-product" ||
      location.pathname === "/product/update-product" ||
     
      

     
      location.pathname === "/sell"? (
       
        false
      ) : (
        <Footer />
      )}

    </div>
  );
}

export default App;
