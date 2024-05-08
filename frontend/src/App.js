import "./App.css";


import Footer from "./Components/home/Footer";
import Navbar from "./Components/home/Nav";


import AllRoutes from "./routes/AllRoutes";
import { useLocation } from "react-router-dom";
function App() {
  const location = useLocation();
  return (
    <div className="App">
      {location.pathname === "/adminDashboard" ||
  
     
      location.pathname === "/sell" ||
  location.pathname === "/admintemplatenavbar" ||
  location.pathname === "/admintemplatedashboard" ||
  location.pathname === "/admintemplatekeywords" ||
  location.pathname === "/admintemplatecategories" ||
  location.pathname === "/subcategories" ||
  location.pathname === "/admintemplateuom" ||


  

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
      location.pathname === "/subcategories" ||
      location.pathname === "/admintemplatekeywords" ||
      location.pathname === "/admintemplateuom" ||
      location.pathname === "/admintemplatemaincontent" ||
      location.pathname === "/usernavbar" ||
      location.pathname === "/userdashboard" ||
      location.pathname === "/buylead" ||

    

     
      location.pathname === "/addproduct" ||

     
      location.pathname === "/sell"? (
       
        false
      ) : (
        <Footer />
      )}

    </div>
  );
}

export default App;
