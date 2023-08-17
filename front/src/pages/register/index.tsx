import { useNavigate } from "react-router-dom"
import { SectionForm } from "../../components/sectionForm"
import { SectionImg } from "../../components/sectionImg"
import { iRegister, registerSchema } from "./validator"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useContext } from "react"
import { AuthContext } from "../../context/authProvider"
import { FormBox } from "../../components/formBox"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const RegisterPage = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<iRegister>({
        mode: "onBlur",
        resolver: zodResolver(registerSchema)
    })

    const { registerNewUser } = useContext(AuthContext)

    const navigate = useNavigate()

    const handleNavigate = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault()
        navigate("/")
    }

    return(
        <FormBox>
        <SectionForm>
            <h2>Cadastro</h2>
                <form onSubmit={handleSubmit(registerNewUser)}>
                    <div>
                        <label htmlFor="fullName">Nome completo</label>
                        <input type="text" id="fullName" {...register("fullName")} />
                        {errors.fullName?.message && <span>{errors.fullName.message}</span>}
                    </div>
                    <div>
                        <label htmlFor="password">Senha</label>
                        <input type="password" id="password" {...register("password")}/>
                        {errors.password?.message && <span>{errors.password.message}</span>}
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" {...register("email")} />
                        {errors.email?.message && <span>{errors.email.message}</span>}
                    </div>
                    <div>
                        <label htmlFor="telephone">Número do telefone</label>
                        <input type="tel" id="telephone" {...register("telephone")}/>
                        {errors.telephone?.message && <span>{errors.telephone.message}</span>}
                    </div>
                    <button type="submit">Cadastre-se</button>
                </form>
                <small>Já possuí uma conta?</small>
                <button onClick={handleNavigate}>Entrar</button>
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