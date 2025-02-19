import {Route, Routes} from "react-router-dom";
import Homepage from "../pages/Homepage.tsx";
import TopLevelCollections from "../pages/TopLevelCollections.tsx";

const PageRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Homepage/>}/>
            <Route path="/collections/:slug" element={<TopLevelCollections/>}/>
        </Routes>
    );
};

export default PageRoutes;