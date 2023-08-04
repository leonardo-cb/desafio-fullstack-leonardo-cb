import { Contact } from "../../pages/dashboard"
import { StyledCard } from "./styles"

interface CardProps {
    contact: Contact
    onEditContact: () => void
    toggleModal: () => void
  }

export const Card = ({ contact, onEditContact }: CardProps) => {

    return(
        <>
            <StyledCard>
                <h4>{contact.fullName}</h4>
                <div>
                    <p>Telephone: {contact.telephone}</p>
                    <p>Email: {contact.email}</p>
                    <button onClick={onEditContact}>Editar contato</button>
                </div>
            </StyledCard>
        </>
    )
}