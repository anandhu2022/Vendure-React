import {LOGIN_MUTATION, REGISTER_CUSTOMER_ACCOUNT} from "../api/schemas/mutations.ts";
import {useAuth} from "../context/useAuth.ts";
import {Link, useNavigate} from "react-router-dom";
import {useMutation} from "@apollo/client";
import {FormEvent, useState} from "react";
import {SignInOrSignUpProps} from "../libraries/utilities/types.ts";

const Login = () => {
    const [isLogin, setIsLogin] = useState<boolean>(true);
    return (
        isLogin ? <LoginSection setIsLogin={setIsLogin}/> : <RegisterSection setIsLogin={setIsLogin}/>
    );
};

export default Login;

const LoginSection = ({setIsLogin}: SignInOrSignUpProps) => {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [login] = useMutation(LOGIN_MUTATION);
    const {refetchUser} = useAuth();
    const navigate = useNavigate();

    const handleSubmit =
        async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            try {
                const response = await login({variables: {email, password}})
                if (response.data?.login.__typename === "CurrentUser") {
                    console.log(response);
                    await refetchUser();
                    navigate("/");
                } else {
                    console.error("Failed to log in");
                    console.log(response.data?.login);
                }
            } catch (e) {
                console.log(e);
            }
        };

    return (
        <div className="flex justify-center items-center h-6/7 text-gray-100">
            <form onSubmit={handleSubmit} className="bg-gray-900 flex flex-col p-9 gap-4 w-2/7 rounded-xl">
                <h2 className="text-3xl flex items-center justify-center my-5">Sign In</h2>

                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    className="bg-gray-100 text-black p-2 rounded-xl "
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="bg-gray-100 text-black p-2 rounded-xl border-red-50"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />

                <button
                    type="submit"
                    className="bg-gray-100 p-2 rounded-xl text-black cursor-pointer my-4 hover:bg-gray-400">
                    Login
                </button>

                <div className="text-center">Or&nbsp;
                    <span onClick={() => setIsLogin(false)} className="text-blue-600 cursor-pointer hover:underline">
                        register a new account
                    </span>
                </div>
            </form>
        </div>
    )
}

const RegisterSection = ({setIsLogin}: SignInOrSignUpProps) => {

    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [register, {data, loading, error}] = useMutation(REGISTER_CUSTOMER_ACCOUNT);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await register({
                variables: {
                    input: {
                        emailAddress: email,
                        password,
                        firstName,
                        lastName,
                    }
                }
            });
            if (response.data?.registerCustomerAccount.__typename === "Success") {
                console.log("Registration successful", response.data.registerCustomerAccount);
            } else if (response.data?.registerCustomerAccount.__typename === "ErrorResult") {
                console.error("Failed to register", response.data.registerCustomerAccount.message);
            }
        } catch (err) {
            console.error("Failed to register user", err);
        }
    }

    return (
        <div className="flex justify-center items-center h-6/7 text-gray-100">
            <form onSubmit={handleSubmit} className="bg-gray-900 flex flex-col p-9 gap-4 w-2/7 rounded-xl">
                <h2 className="text-3xl flex items-center justify-center my-5">Sign Up</h2>
                {data?.registerCustomerAccount?.__typename === "Success" ? (
                    <p className="text-green-500 text-center">Account Created!<br />You can now&nbsp;
                        <Link to={'/verify'} className="text-blue-500 hover:underline">
                            Verify here
                        </Link>
                    </p>
                ) : (
                    <>
                        <input
                            type="text"
                            placeholder="First Name"
                            name="first-name"
                            className="bg-gray-100 text-black p-2 rounded-xl"
                            value={firstName}
                            onChange={(event) => setFirstName(event.target.value)}
                        />

                        <input
                            type="text"
                            placeholder="Last Name"
                            name="last-name"
                            className="bg-gray-100 text-black p-2 rounded-xl"
                            value={lastName}
                            onChange={(event) => setLastName(event.target.value)}
                        />

                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            className="bg-gray-100 text-black p-2 rounded-xl"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            className="bg-gray-100 text-black p-2 rounded-xl border-red-50"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />

                        <button
                            type="submit"
                            className="bg-gray-100 p-2 rounded-xl text-black cursor-pointer my-4 hover:bg-gray-400">
                            Sign Up
                        </button>
                        <div className="text-center">Already have an account!&nbsp;
                            <span onClick={() => setIsLogin(true)}
                                  className="text-blue-600 cursor-pointer hover:underline">Sign in here </span>
                        </div>
                    </>
                )}
                {loading && <p>Registering...</p>}
                {error && <p className="text-red-500">{error.message}</p>}

            </form>
        </div>
    )
}