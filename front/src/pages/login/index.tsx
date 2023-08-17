import { useForm } from "react-hook-form"
import { iLogin, loginSchema } from "./validator"
import { zodResolver } from "@hookform/resolvers/zod"
import { useContext } from "react"
import { AuthContext } from "../../context/authProvider"
import { SectionForm } from "../../components/sectionForm"
import { SectionImg } from "../../components/sectionImg"
import { useNavigate } from "react-router-dom"
import { FormBox } from "../../components/formBox"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const LoginPage = () => {

    const { register, handleSubmit } = useForm<iLogin>({
        resolver: zodResolver(loginSchema)
    })

    const { signIn } = useContext(AuthContext)

    const navigate = useNavigate()

    const handleNavigate = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault()
        navigate("/register")
    }

    return(
        <FormBox>
            <SectionForm>
                <h2>Login</h2>
                    <form onSubmit={handleSubmit(signIn)}>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" {...register("email")} />
                        </div>
                        <div>
                            <label htmlFor="password">Senha</label>
                            <input type="password" id="password" {...register("password")}/>
                        </div>
                        <button type="submit">Login</button>
                    </form>
                    <small>Ainda não possuí uma conta?</small>
                    <button onClick={handleNavigate}>Cadastre-se</button>
            </SectionForm>
            <SectionImg />
            <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            />
        </FormBox>
    )
}