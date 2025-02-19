import {Link} from "react-router-dom";

const Header = () => {

    return (
        <div className="bg-white flex flex-row justify-between px-60 items-center">
            <Link to={'/'}>
                <div className="text-xl">Vendure Store</div>
            </Link>
            <button className="p-1 bg-gray-500 rounded m-1 cursor-pointer text-white">Sign in</button>
        </div>
    );
};

export default Header;
