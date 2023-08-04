import { styled } from "styled-components";

export const Container = styled.div`
    top: 0;
    width: 100vw;
    height: 100vh;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0,0,0, .7);

    > div {
        background-color: var(--color-primary-light);
        padding: 80px;
        width: 100%;
        max-width: 300px;
        border-radius: 20px;
        
    }
`