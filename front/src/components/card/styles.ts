import styled from "styled-components";

export const StyledCard = styled.li`
    width: 350px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    color: white;
    padding: 20px;
    border: 1px solid var(--color-primary-light);
    gap: 10px;
    border-radius: 20px;

    div {
        display: flex;
        gap: 10px;

        button {
            padding: 5px 10px;
            max-width: 60px;
            border: none;
            border-radius: 8px;
            font-size: 12px;
            font-weight: bold;
            color: var(--color-primary-light);
            transition: background-color 0.3s ease;

        }
    }
`