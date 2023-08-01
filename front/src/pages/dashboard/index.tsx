import { useEffect, useState } from "react"
import { api } from "../../services/api"

interface Contact {
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
            const response = await api.get("/contacts")

            setContacts(response.data)
        })()
    }, [])

    return(
        <>
            <h1>dashboard</h1>
            <ul>
                {
                    contacts.map((contact) => <li key={contact.id}>´
                    {contact.fullName}
                    {contact.telephone}
                    </li>)
                }
            </ul>
        </>
    )
}