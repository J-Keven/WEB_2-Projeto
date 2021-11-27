import styled from "styled-components";
import { shade} from "polished"
import BackgroudImage from '../../assets/illustration.png';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const Content = styled.div`
  width: 100%;
  height: 100%;
  min-width: 30vw;
  max-width: 430px;
  padding-top: 2%;
  padding: 2%;
  background-color: #FFFFFF;
`
export const Header = styled.div`
  margin-bottom: 50px;

  h1 {
    color: #3751FE;
    font-style: normal;
    font-weight: bold;
    font-size: 3rem;
    line-height: 50px;
    margin-bottom: 2%;
  }

  h2 {
    color: #3751FE;
    font-family: Open Sans;
    font-style: normal;
    font-weight: bold;
    font-size: 1.5rem;
    line-height: 30px;
    max-width: 438px;
    margin-bottom: 20px;
  }

  p {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 1.125rem;
    line-height: 21px;
    color: rgba(0, 0, 0, 0.6);
  }
`
export const Form = styled.div`
  width: 100%;
  max-width: 430px;
  .inputs {
    padding-right: 10px;
    display: flex;
    align-items: center;
    height: 60px;
    width: 100%;
    border: 1px solid rgba(0, 0, 0, 0.4);
    max-width: 438px;
  }

  .selected {
    margin-right: 20px;
    height: 100%;
    width: 2px;
    background: #3751FE;
  }

  .inputs-password {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    svg {
      justify-content: flex-end;
    }
  }

  .inputs + .inputs {
    margin-top: 10px;
  }

  .label {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 21px;
    color: rgba(0, 0, 0, 0.61);
    margin-bottom: 2px;
  }

  .fields {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;
    height: 30px;
    color: #3751FE;
    width: 120%;

  }

  

  .buttons {
    margin-top: 10%;

    button {
      width: 129px;
      height: 54px;
      background: #3751FE;
      box-shadow: 0px 4px 3px rgba(0, 0, 0, 0.25);
      color: #ffff;
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

  .passValidatorResult {
    margin-top: 12px;
    p {
      margin-top: 5px;
      display: flex;
      align-items: center;
      color: rgba(0, 0, 0, 0.61);
      font-size: 18px;
      font-style: normal;
      font-weight: 500;
      svg {
        size: 20px;
        margin-right: 10px;
      }
    }
  }
`

export const Background = styled.div`
  flex: 1;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  img {

    width: 100%;
    height: 100%;
    max-width: 500px;
    height: auto;
  }
  width: 100%;
  height: 100%;
  /* 
  background: url(${BackgroudImage}) no-repeat center;
  */
  background-size: cover;
`;