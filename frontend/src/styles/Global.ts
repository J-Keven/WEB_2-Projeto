import { createGlobalStyle } from "styled-components"

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    background: #E5E5E5;
    /* font: rgba(0, 0, 0, 0.6); */
    --webkit-font-smoothing: antialiased;
  } 
  body, input, button, textarea {
    border-style: none;
    font-family: Gotham Pro, 'Roboto', sans-serif;
  }
  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
    font-family: Gotham Pro,'Roboto', sans-serif;
  }
  button {
    cursor: pointer;
  }
  input:focus, button:focus, input:focus, textarea:focus {
    box-shadow: 0 0 0 0;
    border: 0 none;
    outline: 0;
  } 
  p {
    line-height: 20px;
    font-family: Gotham Pro, 'Roboto', sans-serif;
  }
`;