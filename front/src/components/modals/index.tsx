import { useEffect, useRef } from "react"
import { Container } from "./styles"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { api } from "../../services/api"
import { iUpdateContact, updateContactSchema } from "../modalContact/validator"
import { Contact } from "../../pages/dashboard"

interface ModalProps {
    toggleModal: () => void
    blockClosing?: boolean
    contactId: number | null
    onUpdateContact: (updatedContact: Contact) => void
}

export const Modal = ({ toggleModal, blockClosing, contactId, onUpdateContact }: ModalProps) => {

    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if(!ref.current){
                return
            }
            if(!event.target){
                return
            }
            if(!ref.current.contains(event.target as HTMLElement)){
                toggleModal()
            }
        }

        window.addEventListener("mousedown", handleClick)

        return () => {
            window.removeEventListener("mousedown", handleClick)
        }
    }, [])

    const { register, handleSubmit } = useForm<iUpdateContact>({
        resolver: zodResolver(updateContactSchema)
    })


    const updateContact = async (data: iUpdateContact) => {

        try {

            const id = contactId
            const response = await api.patch(`/contacts/${id}`, data)
            onUpdateContact(response.data)
            toggleModal()
            
        } catch (error) {
            console.log(error)
        }
    }

    const deleteContact = async (contactId: number | null) => {

        try {

            await api.delete(`/contacts/${contactId}`)
            toggleModal()

            } catch (error) {
            console.log(error);
            }
    }

    return (
        <Container>
            <div ref={blockClosing ? null : ref}>
                <form onSubmit={handleSubmit(updateContact)}>
                    <label htmlFor="fullName">Nome Completo</label>
                    <input type="text" id="fullName" {...register("fullName")} />
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" {...register("email")} />
                    <label htmlFor="telephone">Telefone</label>
                    <input type="telephone" id="telephone" {...register("telephone")} />
                    <button type="submit">Atualizar</button>
                    <button type="button" onClick={() => deleteContact(contactId)}>Deletar</button>
                </form>
            </div>
        </Container>
    )
}