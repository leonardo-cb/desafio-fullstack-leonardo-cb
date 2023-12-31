import React, { useContext, useEffect, useState } from "react"
import { api } from "../../services/api"
import { CardBox, Container } from "./styles"
import { Card } from "../../components/card"
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createContactSchema, iCreateContact, iUpdateProfile, updateProfileSchema } from "./validator";
import { AuthContext } from "../../context/authProvider";
import { Modal } from "../../components/modals";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

    const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

    const toggleModal = () => {
        setIsOpenModal(!isOpenModal)
    }

    const [contacts, setContacts] = useState<Contact[]>([])
    const [user, setUser] = useState<User | null>(null)

    const updateUser = async (data: iUpdateProfile) => {
        try {
            const userId = localStorage.getItem("fullstack:userId")

            await api.patch(`/users/${userId}`, data)
            const responseUser = await api.get(`/users/${userId}`)
            toast.success('Usuário atualizado!')
            setUser(responseUser.data)
            setIsOpenUpdate(false)

        } catch (err) {
            toast.error('Algo deu errado!')
            console.log(err)
        }
    };

    
    useEffect(() =>{
        (async () => {
            const responseContacts = await api.get<Contact[]>("/contacts")
            
            setContacts(responseContacts.data)

        })()

        
    }, [])

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userId = localStorage.getItem("fullstack:userId");
                const responseUser = await api.get(`/users/${userId}`);
                setUser(responseUser.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchUser();
    }, []);

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

    const { deleteUser } = useContext(AuthContext)

    const [selectedContactId, setSelectedContactId] = useState<number | null>(null);

    const handleEditContact = (contactId: number) => {
        setSelectedContactId(contactId)
        setIsOpenModal(true)
    }

    const contactsRender = () => {
        return contacts.map((contact) => {
          return (
            <Card
              key={contact.id}
              contact={contact}
              toggleModal={toggleModal}
              onEditContact={() => handleEditContact(contact.id)}
            />
          );
        });
      };

    const createContact = async (data: iCreateContact) => {

        try {
            const response = await api.post("/contacts", data)
            toast.success('Contato criado!')
            setIsOpenCreate(false);
            setContacts((previousContacts) => [...previousContacts, response.data])
        } catch (err) {
            toast.error('Algo deu errado!')
            console.log(err)
        }

    }

    const updateContactInList = (updatedContact: Contact | null) => {
        setContacts((previousContacts) =>
            previousContacts.map((contact) =>
                contact.id === updatedContact?.id ? updatedContact : contact
            )
        );
    };

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
                                    <button type="submit">Atualizar</button>
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
                                <button onClick={deleteUser}>Sim</button>
                                <button onClick={handleLiClickDeleteButton}>Não</button>
                            </motion.div>
                            )}
                            </motion.li>
                    </ul>
                </header>
                { user && (
                            <>
                                <h2>Bem vindo! {user.fullName}</h2>
                                <p>Seu telefone: {user.telephone}</p>                  
                            </>
                )
                }
                {
                    isOpenModal && (<Modal 
                                        contactId={selectedContactId} 
                                        toggleModal={toggleModal}
                                        onUpdateContact={updateContactInList}
                                    />
                    )}
                <main>
                    <CardBox>
                        {contactsRender()}
                    </CardBox>
                </main>
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
            </Container>
        </>
    )
}