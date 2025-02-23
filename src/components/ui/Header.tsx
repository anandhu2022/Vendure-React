import {buttonTypeProps} from "../../libraries/utilities/types.ts";
import {useAuth} from "../../context/useAuth.ts";
import {Link} from "react-router-dom";

const Header = () => {
    const {user, logout} = useAuth();
    return (
        <div className="bg-gray-900 flex flex-row justify-between px-60 py-2 items-center text-gray-200">
                <div className="text-xl">Welcome {user? user.emailAddress : "Guest"}</div>
            <Link to={'./login'}>
                {user ? <Button buttonName={"Sign Out"} logOut={logout}/> : <Button buttonName={"Sign In"}/>}
            </Link>
        </div>
    );
};

export default Header;


const Button = ({buttonName, logOut}: buttonTypeProps) => {
    return (
        <button
            className="p-1 bg-gray-200 rounded m-1 cursor-pointer text-gray-900 hover:bg-gray-500 hover:text-white min-w-20"
            onClick={logOut}>
            {buttonName}
        </button>
    );
};

