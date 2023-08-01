import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

    :root{

        --color-bg: #02010A;
        --color-primary-dark: #04052E;
        --color-primary-light: #22007C;
        --color-light: #F8F7FC;

        font-size: 60%;
    }

    * {
        margin:0;
        padding: 0;
        outline:0;
        box-sizing: border-box;
    }

    body,html{
        width: 100vw;
        height: 100vh;
    }

    body {
        background: var(--color-bg);
        color: var(--color-light);
        -webkit-font-smoothing: antialiased;

        overflow-x: hidden;
    }

    body, input, button, textarea {
        font-family: 'Inter';
        font-size: 1.6rem;
    }

    h1, h2, h3, h4, h5, h6, strong{
        font-weight: 500;
    }

    button {
        cursor: pointer;
    }
`