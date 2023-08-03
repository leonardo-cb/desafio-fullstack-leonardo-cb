import styled from "styled-components";

export const Container = styled.div`

    display: flex;
    flex-direction: column;
    height: 100vh;

    header {
        background: linear-gradient(to right, #2c5364, #203a43);
        color: black;
        padding: 80px;

        ul {
            list-style: none;
            display: flex;
            flex-direction: row;
            gap: 120px;
            justify-content: center;
            height: 250px;

            li {
                background-color: white;
                padding: 3rem 5rem;
                cursor: pointer;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 20px;
                height: 100%;
                
                form {
                    display: flex;
                    flex-direction: column;
                    height: 100%;

                    button {
                        margin-top: 10px;
                    }
                }
            }
        }
    }

    main {
        display: flex;
        align-items: center;

        ul {
            list-style: none;
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            gap: 40px;

        }
    }
`