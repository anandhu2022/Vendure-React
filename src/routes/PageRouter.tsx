import Collections from "../pages/Collections.tsx";
import {Route, Routes} from "react-router-dom";
import Homepage from "../pages/Homepage.tsx";
import NoRoute from "../pages/NoRoute.tsx";
import Product from "../pages/Product.tsx";

const PageRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Homepage/>}/>
            <Route path="/collections/:slug" element={<Collections />}/>
            <Route path="/products/:slug" element={<Product />}/>
            <Route path="/*" element={<NoRoute />}/>
        </Routes>
    );
};

export default PageRouter;
