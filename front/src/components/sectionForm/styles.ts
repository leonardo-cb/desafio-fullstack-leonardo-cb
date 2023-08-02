import styled from "styled-components";

export const SSectionForm = styled.section`

    color: var(--color-light);
    margin-left: 50px;
    display: flex;
    flex-direction: column;
    
    h2 {
        margin-bottom: 20px;
    }
    
    button {
        margin-top: 20px;
        font-size: 16px;
        font-weight: 600;
        color: #ffffff;
        background-color: var(--color-primary-light);
        padding: 12px 24px;
        border: none;
        border-radius: 8px;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
        transition: background-color 0.3s ease;
    }

    button:hover {
        opacity: 0.9;
    }

    small {
        margin-top: 20px;
    }

    form {
        color: var(--color-light);
        display: flex;
        flex-direction: column;
        gap: 10px;

    }
`