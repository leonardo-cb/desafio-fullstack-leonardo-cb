import { ReactNode, createContext, useEffect, useState } from "react";
import { iLogin } from "../pages/login/validator";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";
import { iRegister } from "../pages/register/validator";
import { iUpdateProfile } from "../pages/dashboard/validator";

interface AuthProviderProps {
    children: ReactNode
}

interface AuthContextValues {
    signIn: (data: iLogin) => void
    registerNewUser: (data: iRegister) => void
    updateUser: (data: iUpdateProfile) => void
    loading: boolean
    deleteUser: () => void
}

export const AuthContext = createContext({} as AuthContextValues)

export const AuthProvider = ({ children }: AuthProviderProps) => {


    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const token = localStorage.getItem("fullstack:token")

        if(!token){
            setLoading(false)
            return
        }

        api.defaults.headers.common.Authorization = `Bearer ${token}`
        setLoading(false)

    }, [])

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function decodeToken(token: string): { [key: string]: any } | null {
        try {
          const tokenPayload = token.split(".")[1];
          const decodedData = atob(tokenPayload);
          return JSON.parse(decodedData);
        } catch (error) {
          console.log("Error decoding token:", error);
          return null;
        }
      }

    const signIn = async (data: iLogin) => {
        try {
          const response = await api.post("/login", data);
          const { token } = response.data;
      
          // Decodificar o token para obter o userId
          const decodedToken = decodeToken(token);
          if (decodedToken !== null) {
            const userId: number | undefined = decodedToken.sub ? +decodedToken.sub : undefined;
      
            api.defaults.headers.common.Authorization = `Bearer ${token}`;
      
            localStorage.setItem("fullstack:token", token);
            if (userId !== undefined) {
              localStorage.setItem("fullstack:userId", String(userId));
            }
            setLoading(false);
            navigate("dashboard");
          } else {
            console.log("Invalid token");
          }
        } catch (err) {
          console.log(err);
        }
    };

    const registerNewUser = async (data: iRegister) => {

        try {
            
            await api.post("/users", data)

            navigate("")

        } catch (err) {
            console.log(err)
        }
    }

    const updateUser = async (data: iUpdateProfile) => {

        try {

            const userId = localStorage.getItem("fullstack:userId")
            await api.patch(`/users/${userId}`, data)

        } catch (err){
            console.log(err)
        }
    }

    const deleteUser = async () => {

        try {

            const userId = localStorage.getItem("fullstack:userId")
            await api.delete(`/users/${userId}`)
            navigate("/")
        } catch (err) {
            console.log(err)
        }
    }

    return(
        <AuthContext.Provider value={{signIn, registerNewUser, loading, updateUser, deleteUser}}>
            {children}
        </AuthContext.Provider>
    )
}