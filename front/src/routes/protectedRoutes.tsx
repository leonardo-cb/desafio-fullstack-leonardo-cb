import { useContext } from "react"
import { AuthContext } from "../context/authProvider"
import { Outlet } from "react-router-dom"

export const ProtectedRoutes = () => {
    
    const { loading } = useContext(AuthContext)

    if(loading){
        return <div>Carregando...</div>
    }

    return <Outlet />
}