import styled from "styled-components";
import { shade} from "polished"

interface IBanner {
  imgUrl: string
}
export const Container = styled.div`
  height: 100%;
  display: flex;
  /* justify-content: center; */
  h1 {
    font-family: Gotham Pro, sans-serif;
    font-size: 22px;
    line-height: 17px;
    font-weight: bold;
    color: #181818;

    margin-bottom: 22px;
  }
  /* align-items: center; */

  .cardAlignItems {
    display: block;
  }

  .userProfileContent {
    height: 100%;
    width: 100%;
    max-width: 950px;
    
  }

  .dashboads {
    margin-left: 100px;
    width: 100%;
    max-width: 400px;


  }

  .results {
    width: 100%;
    background-color: #FFF;
    margin-bottom: 40px;
    padding: 20px;
    border-radius: 12px;
    min-height: 300px;

    p {
      font-family: Gotham Pro, sans-serif;
      font-size: 60px;
      line-height: 50px;
      color: #0275B1;
      margin-bottom: 10px;
      & + p {
        font-size: 22px;
        line-height: 17px;
        font-weight: 500;
        color: #181818;
        margin-bottom: 30px;
      }
    }
  }

  .hastags {
    width: 100%; button {
      background: #fff;
      color: #181818;
      display: flex;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.4s;

      &:hover {
        background: ${shade(0.5, "#FFF")}
      }
    }
  }
`

export const Content = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 150px;
  /* align-items: center; */
`;


export const Card = styled.div`
  width: 100%;
  background-color: #FFF;
  margin-bottom: 40px;
  padding: 30px;
  border-radius: 12px;
  min-height: 150px;
  display: flex;
  align-items: center;
`
// export const Banner = styled.div`
  
// `
export const ProfileContent = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 170px;
    height: 170px;
    border-radius: 50%;
  }

  label {
    cursor: pointer;
    /* position: absolute; */
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: ${shade(0.2, '#fff')};
    transition: 0.2s;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 120px;
    margin-top: -50px;
    position: absolute;
    svg {
      width: 20px;
      height: 20px;
      background: transparent;
    }
    &:hover {
      background: ${shade(0.5, '#fff')};
    }
  }
  input {
    display: none;
  }
  .userInfos {
    margin-left: 30px;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    div {
      font-family: Gotham Pro, sans-serif;

      p {
        font-size: 22px;
        font-weight: bold;
        color: #181818;

        & + p {
          font-family: Gotham Pro, sans-serif;
          margin-top: 10px;
          font-size: 18px;
          max-width: 500px;
          font-weight: 400;
          color: #181818;

        }
      }

    }

    button {
      background: #fff;
      color: #181818;
      display: flex;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.4s;

      &:hover {
        background: ${shade(0.5, "#FFF")}
      }
    }
  }
`

export const UserDescription = styled.div`
  width: 100%;

  .readMore {
    /* padding: 20px; */
    span {
      font-family: Gotham Pro, sans-serif;
      font-size: 20px;
      /* line-height: 120%; */
      color: #181818;
    }
  }

  .read-more-button {
    margin-top: 12px;
    font-family: Gotham Pro, sans-serif;
    font-size: 16px;
    line-height: 11px;
    color: #0275B1;
    cursor: pointer;
    transition: color 0.2s;

    &:hover {
      /* font-weight: 500; */
      color: ${shade(0.3, "#0275B1")}
    }
  }

` 

export const Projects = styled.div`
  width: 100%;
  
  div {
    display: grid;
    grid-template-columns: 276px 276px 276px;
    grid-gap: 30px;
  }
  p {
    margin-top: 12px;
    font-family: Gotham Pro, sans-serif;
    font-size: 16px;
    line-height: 11px;
    color: #0275B1;
    cursor: pointer;
    transition: color 0.2s;

    &:hover {
      /* font-weight: 500; */
      color: ${shade(0.3, "#0275B1")}
    }
  }

  .projectHeader {
    display: flex;
    align-items: center;
    justify-content: space-between;

    button {
      background: #fff;
      color: #181818;
      display: flex;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.4s;

      &:hover {
        background: ${shade(0.5, "#FFF")}
      }
    }
  }
`

export const Form = styled.div`
  width: 100%;
  max-width: 430px;
  /* margin: auto auto; */
  h2 {
    margin: 0 0 20px 0;
    
  }
  .inputs {
    padding-right: 10px;
    display: flex;
    align-items: center;
    height: 74px;

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
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    svg {
      justify-content: flex-end;
    }
  }

  .inputs + .inputs {
    margin-top: 20px;
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
    width: 100%;
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;
    height: 30px;
    /* color: #3751FE; */
    width: 120%;

  }

  .forgotPassword {
    display: flex;
    justify-content: flex-end;
    margin: 3% 0;
    a {
      font-family: Roboto;
      font-style: normal;
      font-weight: normal;
      font-size: 18px;
      line-height: 21px;
      text-decoration: none;
      transition: color 0.3s;
      color: rgba(0, 0, 0, 0.61);
    }

    a:hover {
      color: rgba(0, 0, 0, 0.90);
    }
  }

  .buttons {
    margin-top: 10%;

    button {
      width: 129px;
      height: 54px;
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

  .passValidatorResult {
    p {
      display: flex;
      align-items: center;
      color: rgba(0, 0, 0, 0.61);
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      svg {
        size: 20px;
        margin-right: 10px;
      }
    }

  }

  .uploadFreelaImage {
    cursor: pointer;
    margin-top: 20px;
    /* position: absolute; */
    /* width: 100%; */
    /* height: 60px; */
    max-width: 50px;

    /* border-radius: 10px; */
    background: transparent;
    /* background: ${shade(0.2, '#fff')}; */
    display: flex;
    justify-content: center;
    align-items: center;
    /* margin-left: 120px; */
    /* margin-top: -50px; */
    /* position: absolute; */
    svg {
      /* size: 22px; */
      /* height: 20px; */
      width: 100%;
      background: transparent;
    }

    color: #3751FE;
    transition: background 0.3s;

    &:hover {
      /* border: 1px solid ${shade(0.3,"#3751FE")}; */
      color: ${shade(0.3,"#3751FE")};
      /* background: ${shade(0.1,"#FFFFFF")}; */
    }
    input  {
      display: none;
    }
  }
  
`