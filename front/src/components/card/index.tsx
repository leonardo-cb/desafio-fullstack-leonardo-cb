import { Contact } from "../../pages/dashboard"
import { StyledCard } from "./styles"

interface iContact {
    contact: Contact
}

export const Card = ({ contact }: iContact) => {

    return(
        <>
            <StyledCard>
                <h4>{contact.fullName}</h4>
                <div>
                    <p>Telephone: {contact.telephone}</p>
                    <p>Email: {contact.email}</p>
                </div>
            </StyledCard>
        </>
    )
}