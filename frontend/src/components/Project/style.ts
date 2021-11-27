import { shade } from "polished";
import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  background: #FFF;
  max-width: 300px;
  margin-bottom: 20px;
  a {
    text-decoration: none;
    p {
      font-family: Gotham Pro, sans-serif;
      font-size: 18px;
      color: #181818;
      font-weight: bold;
      margin-bottom: 10px;
      cursor: text;
      &:hover {
        color: #181818;
      }
    }
    img {
      width: 100%;
    } 
  }

  .updateFreela {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 00px;

    h2 {
      color: green;
      font-family: Gotham Pro, sans-serif;
      font-size: 22px;
    }
    .buttons {
      margin-top: 30px;
      display: flex;
    }
  }
`
export const Hastag = styled.span`
  border-radius: 2px;
  border: 2px solid #0275B1;
  color: #181818;
  & + span {
    margin-left: 10px;
  }
`


export const Form = styled.div`
  width: 100%;
  /* max-width: 430px; */
  /* margin: auto auto; */

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 0 20px 0;
    
    svg {
      color: #3751FE;
      transition: color 0.3s;
      cursor: pointer;
      &:hover {
        color: ${shade(0.2,"#3751FE")};
      }
    }
  }
  

  .buttons {
    margin-top: 10%;
    display: flex;
    align-items: center;
    button {
      width: 160px;
      height: 60px;
      background: #3751FE;
      box-shadow: 0px 4px 3px rgba(0, 0, 0, 0.25);
      color: #FFFFFF;
      font-family: Gotham Pro, sans-serif;
      font-style: normal;
      font-weight: normal;
      font-size: 18px;
      line-height: 21px;
      transition: background 0.3s;

      &:hover {
        background: ${shade(0.2,"#3751FE")};
      }
    }

    button + button {
      margin-left: 33px;
      background: #FFFFFF;
      border: 1px solid #3751FE;
      box-sizing: border-box;
      color: #3751FE;
      transition: background 0.3s;

      &:hover {
        border: 1px solid ${shade(0.3,"#3751FE")};
        color: ${shade(0.3,"#3751FE")};
        background: ${shade(0.1,"#FFFFFF")};
      }
    }
  }
  
`