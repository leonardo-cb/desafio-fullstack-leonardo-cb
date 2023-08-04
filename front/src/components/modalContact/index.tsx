import { zodResolver } from "@hookform/resolvers/zod"
import { Modal } from "../modals"
import { iUpdateContact, updateContactSchema } from "./validator"
import { useForm } from "react-hook-form"
import { api } from "../../services/api"

export const ModalContact = () => {

    const { register, handleSubmit } = useForm<iUpdateContact>({
        resolver: zodResolver(updateContactSchema)
    })

    const updateContact = async (data: iUpdateContact) => {

        try {

            const id = 1
            api.patch(`/contacts/${id}`, data)
            
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Modal>
            <form onSubmit={handleSubmit(updateContact)}>
                <label htmlFor="fullName">Nome Completo</label>
                <input type="text" id="fullName" {...register("fullName")} />
                <label htmlFor="email">Email</label>
                <input type="email" id="email" {...register("email")} />
                <label htmlFor="telephone">Telefone</label>
                <input type="telephone" id="telephone" {...register("telephone")} />
                <button type="submit">Atualizar</button>
            </form>
        </ Modal>
    )
}