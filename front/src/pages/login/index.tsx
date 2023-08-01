import { useForm } from "react-hook-form"
import { iLogin, loginSchema } from "./validator"
import { zodResolver } from "@hookform/resolvers/zod"
import { useContext } from "react"
import { AuthContext } from "../../context/authProvider"

export const LoginPage = () => {

    const { register, handleSubmit } = useForm<iLogin>({
        resolver: zodResolver(loginSchema)
    })

    const { signIn } = useContext(AuthContext)

    return(
        <main>
            <section>
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
            </section>
        </main>
    )
}