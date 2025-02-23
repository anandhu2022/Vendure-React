import {VERIFY_CUSTOMER_ACCOUNT} from "../api/schemas/mutations.ts";
import {useAuth} from "../context/useAuth.ts";
import {useMutation} from "@apollo/client";
import {FormEvent, useState} from "react";
import {Link} from "react-router-dom";

const VerifyAccount = () => {
    const [token, setToken] = useState<string>("");
    const { refetchUser } = useAuth();
    const [verifyAccount, { data, loading, error }] = useMutation(VERIFY_CUSTOMER_ACCOUNT);
    const [verificationFailed, setVerificationFailed] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setVerificationFailed(false); // Reset failure state on new attempt

        try {
            const response = await verifyAccount({ variables: { token } });
            if (response.data?.verifyCustomerAccount?.id) {
                await refetchUser();
                console.log("Verification successful!");
            } else {
                setVerificationFailed(true); // Set failure flag if no ID is returned
            }
        } catch (e) {
            console.error("Verification failed", e);
        }
    };

    return (
        <div className="flex justify-center items-center h-6/7 text-gray-100">
            <form onSubmit={handleSubmit} className="bg-gray-900 flex flex-col p-9 gap-4 w-2/7 rounded-xl">
                <h2 className="text-3xl flex items-center justify-center my-5">Verify Your Account</h2>

                {data?.verifyCustomerAccount?.id ? (
                    <div className="text-center">
                        <p className="text-green-500">
                            Account Verified! You can now&nbsp;
                            <Link to={'/'} className="text-blue-400 hover:underline">
                                Continue Browsing
                            </Link>
                        </p>
                    </div>
                ) : (
                    <>
                        <input
                            type="text"
                            placeholder="Enter your token here"
                            className="bg-gray-100 text-black p-2 rounded-xl"
                            value={token}
                            onChange={(event) => setToken(event.target.value)}
                        />
                        <button
                            type="submit"
                            className="bg-gray-100 p-2 rounded-xl text-black cursor-pointer my-4 hover:bg-gray-400"
                        >
                            Verify Your Account
                        </button>

                        {loading && <p className="text-center">Verifying...</p>}
                        {error && <p className="text-red-500">{error.message}</p>}
                        {verificationFailed && <p className="text-red-500 text-center">Invalid token. Please try again.</p>}
                    </>
                )}
            </form>
        </div>
    );
};


export default VerifyAccount;
