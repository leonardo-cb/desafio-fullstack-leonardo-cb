import { ReactNode } from "react"
import { SSectionForm } from "./styles"

type SectionFormProps = {
    children: ReactNode
}

export const SectionForm = ({ children }: SectionFormProps) => {
    return(
        <SSectionForm>
            {children}
        </SSectionForm>
    )
}