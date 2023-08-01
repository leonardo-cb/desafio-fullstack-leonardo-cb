import { ReactNode, createContext, useEffect, useState } from "react";
import { iLogin } from "../pages/login/validator";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

interface AuthProviderProps {
    children: ReactNode
}

interface AuthContextValues {
    signIn: (data: iLogin) => void
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

    return(
        <AuthContext.Provider value={{signIn, loading}}>
            {children}
        </AuthContext.Provider>
    )
}