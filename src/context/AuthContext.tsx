import {AuthProviderProps, UserProps} from "../libraries/utilities/types.ts";
import {ACTIVE_CUSTOMER_QUERY} from "../api/schemas/queries.ts";
import {LOGOUT_MUTATION} from "../api/schemas/mutations.ts";
import {useMutation, useQuery} from "@apollo/client";
import {FC, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "./useAuth.ts";


const AuthProvider: FC<AuthProviderProps> = ({children}) => {
    const {data, loading, refetch} = useQuery(ACTIVE_CUSTOMER_QUERY);
    const [user, setUser] = useState<UserProps | null>(null);
    const navigate = useNavigate();
    const [logoutMutation] = useMutation(LOGOUT_MUTATION);

    useEffect(() => {
        if (data?.activeCustomer) {
            setUser(data.activeCustomer);
        }
    }, [data]);

    const refetchUser = async () => {
        const {data} = await refetch();
        console.log(data);
        if (data?.activeCustomer) {
            setUser(data.activeCustomer);
        } else {
            setUser(null);
        }
    }

    const logout = async () => {
        try {
            await logoutMutation();
            document.cookie = "session=; expires=Thu, 01 Jan 1970 00 00; path=/;";
            setUser(null);
            navigate('/login');
        } catch (err) {
            console.error("Logout failed", err);
        }
    };

    return (
        <AuthContext.Provider value={{user, logout, refetchUser, loading}}>
            {children}
        </AuthContext.Provider>
    );
};

export {AuthProvider};