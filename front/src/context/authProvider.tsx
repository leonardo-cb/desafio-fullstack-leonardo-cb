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

    const signIn = async (data: iLogin) => {

        try {

            const response = await api.post("/login", data)
            const { token } = response.data
    
            api.defaults.headers.common.Authorization = `Bearer ${token}`

            localStorage.setItem("fullstack:token", token)
            setLoading(false)
    
            navigate("dashboard")

        } catch(err){
            console.log(err)
        }
    }

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

            await api.patch("/users", data)


        } catch (err) {
            console.log(err)
        }
    }

    return(
        <AuthContext.Provider value={{signIn, registerNewUser, loading, updateUser}}>
            {children}
        </AuthContext.Provider>
    )
}