import {useParams} from "react-router-dom";

const NoRoute = () => {
    console.log(useParams());
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-6xl font-bold text-gray-800">404</h1>
            <p className="text-xl text-gray-600 mt-2">Oops! Page not found.</p>
            <a href="/" className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">
                Go Home
            </a>
        </div>
    );
};

export default NoRoute;
