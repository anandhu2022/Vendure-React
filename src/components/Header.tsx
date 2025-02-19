import {Link} from "react-router-dom";

const Header = () => {
    return (
        <div className="bg-white px-40 flex justify-between items-center p-1.5">
            <Link to={'/'} className="cursor-pointer">
                Vendure Store
            </Link>
            <button className="bg-blue-600 p-1 rounded text-white cursor-pointer">
                Sign in
            </button>
        </div>
    );
};

export default Header;