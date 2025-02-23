import {Route, Routes, Navigate} from "react-router-dom";
import VerifyAccount from "../pages/VerifyAccount.tsx";
import Collections from "../pages/Collections.tsx";
import {useAuth} from "../context/useAuth.ts";
import Homepage from "../pages/Homepage.tsx";
import NoRoute from "../pages/NoRoute.tsx";
import Product from "../pages/Product.tsx";
import Login from "../pages/Login.tsx";
import {JSX} from "react";


const PageRouter = () => {
    const {user, loading} = useAuth();
    const ProtectedRoute = ({element}: { element: JSX.Element }) => {
        if (loading) return <p>Loading...</p>;
        return user ? element : <Navigate to="/login"/>;
    };

    return (
        <Routes>
            <Route path="/" element={<ProtectedRoute element={<Homepage/>}/>}/>
            <Route path="/login" element={user ? <Homepage/> : <Login/>}/>
            <Route path="/collections/:slug" element={<ProtectedRoute element={<Collections/>}/>}/>
            <Route path="/products/:slug" element={<ProtectedRoute element={<Product/>}/>}/>
            <Route path="/verify" element={<VerifyAccount/>}/>
            <Route path="/*" element={<ProtectedRoute element={<NoRoute/>}/>}/>
        </Routes>
    );
};

export default PageRouter;
