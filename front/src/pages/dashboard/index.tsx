import React, { useContext, useEffect, useState } from "react"
import { api } from "../../services/api"
import { Container } from "./styles"
import { Card } from "../../components/card"
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createContactSchema, iCreateContact, iUpdateProfile, updateProfileSchema } from "./validator";
import { AuthContext } from "../../context/authProvider";

export interface Contact {
    id: number
    fullName: string
    email: string
    telephone: string
    createdAt: string | Date
}

export interface User {
    id: number
    fullName: string
    email: string
    telephone: string
    createdAt: string | Date
}

export const Dashboard = () => {

    const [contacts, setContacts] = useState<Contact[]>([])

    
    useEffect(() =>{
        (async () => {
            const response = await api.get<Contact[]>("/contacts")
            console.log(response.data)
            setContacts(response.data)
        })()
    }, [])

    const contactsRender = () => {
        return contacts.map((contact) => {
            return <Card key={contact.id} contact={contact} ></Card>
        })
    }

    const [isOpenUpdate, setIsOpenUpdate] = useState<boolean>(false)

    const handleLiClickUpdate = (event: React.MouseEvent<HTMLHeadingElement, MouseEvent>) => {
        event.preventDefault()
        setIsOpenUpdate(!isOpenUpdate)
    }

    const [isOpenCreate, setIsOpenCreate] = useState<boolean>(false)

    const handleLiClickCreate = (event: React.MouseEvent<HTMLHeadingElement, MouseEvent>) => {
        event.preventDefault()
        setIsOpenCreate(!isOpenCreate)
    }

    const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false)

    const handleLiClickDelete = (event: React.MouseEvent<HTMLHeadingElement, MouseEvent>) => {
        event.preventDefault()
        setIsOpenDelete(!isOpenDelete)
    }

    const handleLiClickDeleteButton = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault()
        setIsOpenDelete(!isOpenDelete)
    }

    const { register: registerUpdate, handleSubmit: handleSubmitUpdate } = useForm<iUpdateProfile>({
        resolver: zodResolver(updateProfileSchema)
    })

    const { register: registerCreate, handleSubmit: handleSubmitCreate } = useForm<iCreateContact>({
        resolver: zodResolver(createContactSchema)
    })

    const { updateUser } = useContext(AuthContext)

    const createContact = async (data: iCreateContact) => {

        try {
            const response = await api.post("/contacts", data)
            console.log("oi", response.data)
            setContacts((previousContacts) => [...previousContacts, response.data])
        } catch (err) {
            console.log(err)
        }

    }

    return(
        <>
            <Container>
                <header>
                    <ul>
                            <motion.li
                            layout
                            transition={{ duration: 1.5, type: 'spring', stiffness: 50, damping: 10 }}
                            style={{
                                        borderRadius: '20px',
                                        padding: '10px',
                                        marginBottom: '10px',
                                        backgroundColor: isOpenUpdate ? 'lightblue' : 'transparent',
                                    }}
                            >
                            <h2 onClick={handleLiClickUpdate}> Atualizar perfil</h2>
                            {isOpenUpdate && (
                            <motion.div layout>
                                <motion.form layout action="submit" onSubmit={handleSubmitUpdate(updateUser)}>
                                    <label htmlFor="fullName">Nome Completo</label>
                                    <input type="text" id="fullName" {...registerUpdate("fullName")} />
                                    <label htmlFor="password">Senha</label>
                                    <input type="password" id="password" {...registerUpdate("password")} />
                                    <label htmlFor="telephone">Telefone</label>
                                    <input type="telephone" id="telephone" {...registerUpdate("telephone")} />
                                    <button>Atualizar</button>
                                </motion.form>
                            </motion.div>
                            )}
                            </motion.li>
                        <motion.li
                            layout
                            transition={{ duration: 1.5, type: 'spring', stiffness: 50, damping: 10 }}
                            style={{
                                        borderRadius: '20px',
                                        padding: '10px',
                                        marginBottom: '10px',
                                        backgroundColor: isOpenCreate ? 'lightblue' : 'transparent',
                                    }}
                            >
                            <h2 onClick={handleLiClickCreate}> Adicionar contato</h2>
                            {isOpenCreate && (
                            <motion.div layout>
                                    <motion.form layout action="submit" onSubmit={handleSubmitCreate(createContact)}>
                                        <label htmlFor="fullName">Nome Completo</label>
                                        <input type="text" id="fullName" {...registerCreate("fullName")} />
                                        <label htmlFor="email">Email</label>
                                        <input type="email" id="email" {...registerCreate("email")} />
                                        <label htmlFor="telephone">Telefone</label>
                                        <input type="telephone" id="telephone" {...registerCreate("telephone")} />
                                    <button>Adicionar</button>
                                </motion.form>
                            </motion.div>
                            )}
                            </motion.li>
                        <motion.li
                            layout
                            transition={{ duration: 0.5, type: 'spring', stiffness: 300, damping: 30 }}
                            style={{
                                        borderRadius: '20px',
                                        cursor: 'pointer',
                                        padding: '10px',
                                        marginBottom: '10px',
                                        backgroundColor: isOpenDelete ? 'lightblue' : 'transparent',
                                    }}
                            >
                            <h2 onClick={handleLiClickDelete}> Deletar conta</h2>
                            {isOpenDelete && (
                            <motion.div layout>
                                <p>Tem certeza que gostaria de apagar sua conta?</p>
                                <button>Sim</button>
                                <button onClick={handleLiClickDeleteButton}>Não</button>
                            </motion.div>
                            )}
                            </motion.li>
                    </ul>
                </header>
                <main>
                    <ul>
                        {contactsRender()}
                    </ul>
                </main>
            </Container>
        </>
    )
}