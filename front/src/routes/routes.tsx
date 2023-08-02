import { Routes, Route } from "react-router-dom"
import { LoginPage } from "../pages/login"
import { Dashboard } from "../pages/dashboard"
import { ProtectedRoutes } from "./protectedRoutes"
import { RegisterPage } from "../pages/register"

export const RoutesMain = () => {
    return(
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage/>} />
            <Route element={<ProtectedRoutes />}>
                <Route path="/dashboard" element={<Dashboard />}/>
            </Route>
        </Routes>
    )
}