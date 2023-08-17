import { ReactNode } from "react"
import { SFormBox } from "./styles"

type Props = {
    children: ReactNode
}

export const FormBox = ({ children }: Props) => {

    return(
        <SFormBox>
            {children}
        </SFormBox>
    )
}