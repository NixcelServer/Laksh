import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react"; // Import useEffect and useState hooks
import { useSelector } from "react-redux";

const RequireAuth = ({ allowedRoles }) => {
    const [authenticated, setAuthenticated] = useState(false); // State to track authentication status
    const [loading, setLoading] = useState(true); // State to track loading status
   // const user = useSelector(state => state.authReducer.user);

    useEffect(() => {
        console.log("Effect is running");
        // Check if user is authenticated upon component mount
        const userString = sessionStorage.getItem('user');
        const user = JSON.parse(userString);
        console.log("User from session storage:", user);
    
        if (user) {
            setAuthenticated(true); // Set authenticated state to true if user is found
        } else {
            setAuthenticated(false); // Set authenticated state to false if user is not found
        }
        setLoading(false); // Set loading state to false once authentication status is determined
    }, []);
     // Empty dependency array ensures the effect runs only once on component mount

    const location = useLocation();

    const userString = sessionStorage.getItem('user');
        const user = JSON.parse(userString);

        const hasUser = user && user.u_designation;

        // If user data is not available or does not have the necessary properties, render unauthorized
        if (!hasUser ) {
            if (allowedRoles.includes("admin")) {
                return <Navigate to="/alogin" state={{ from: location }} replace />;
            } else {
                return <Navigate to="/login" state={{ from: location }} replace />;
            }
           
        }

        

    // Retrieve user roles
    const userRoles = user?.u_designation?.toLowerCase(); // Assuming user designation holds the role information
    const normalizedUserRoles = Array.isArray(userRoles) ? userRoles.map(role => role.toLowerCase()) : [userRoles?.toLowerCase()];
    console.log(allowedRoles);
    console.log(user.u_designation);
    // Normalize allowed roles
    const normalizedAllowedRoles = allowedRoles?.map(role => role.toLowerCase());
    
    // Check if the user has any of the required roles
    const hasRequiredRoles = normalizedUserRoles?.some(role => normalizedAllowedRoles?.includes(role));
    console.log(hasRequiredRoles);
    // Render based on authentication and role
    if (loading) {
        return <div>Loading...</div>; // Render loading state while authentication status is being determined
    } else if (authenticated && hasRequiredRoles) {
        // If authenticated and has required roles, render outlet
        return <Outlet />;
    } else {
        // If authenticated but doesn't have required roles, navigate to unauthorized
        return <Navigate to="/unauthorized" state={{ from: location }} replace />;
    }
}

export default RequireAuth;
