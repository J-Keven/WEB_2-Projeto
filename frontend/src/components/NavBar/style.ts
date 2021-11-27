import styled from "styled-components";
import { shade } from "polished"

export const Container = styled.div`
  position: fixed;
  background-color: #FFFFFF;
  padding: 0 40px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;

  .logo {
    display: flex;
    align-items: center;
    border-right: 2px solid #CECECE;
    padding-right: 40px;
    margin-right: 40px;
    /* width: 100%; */
    /* max-width: 130px; */
    font-family: Gotham Pro, sans-serif;
    height: 100%;
    img {  
      width: 120px;
      height: 120px;
    }
  }

  .pagesIcons {
    height: 100%;
    display: flex;
    align-items: center;
    
    div {
      cursor: pointer;
      width: 90px;
      display: flex;
      flex-direction: column;
      align-items: center;
      p {
        margin-top: 15px;
        font-size: 18px;
        font-weight: 500;
        font-family: Gotham Pro, sans-serif;
      }
      & + div {
        margin-left: 20%;
      }
    }
  }

  .search {
    display: flex;
    align-items: center;
    height: 100%;
    margin-left: 10%;
    padding: 30px;
    border-left: 2px solid #CECECE; 
    border-right: 2px solid #CECECE; 

    input {
      margin-left: 10px;
      font-size: 20px;
      line-height: 15px;
      /* color: #CECECE; */
      height: 100%;
      font-family: Gotham Pro, sans-serif;
    }
  }

  .profile {
    border-right: 2px solid #CECECE; 
    margin: 0 3%;
    text-decoration: none;
    max-width: 300px;
    height: 100%;

    width: 100%;
    display: flex;
    align-items: center;
    img {
      margin-right: 10%;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      
    }
    p {
      font-size: 18px;
      text-transform: uppercase;
      color: #636262;
      margin-bottom: 5px;
      font-family: Gotham Pro, sans-serif;
      & + p {
        text-transform: none;
        font-size: 18px;
        color: #636262;
        font-family: Gotham Pro, sans-serif;
      } 

    }

  }

  .profile:hover {
    color: ${shade(0.9, "#636262")};
  }

  #profile-name {
    &:hover {
      color: ${shade(0.9, "#636262")};
    }
  }

  .logOut {
    text-decoration: none;
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
    margin-left: 10px;
    transition: color 0.2s;
    color: #636262;
    font-family: Gotham Pro, sans-serif;
    svg {
      margin-right: 10px;
    }
    &:hover {
      color: ${shade(0.9, "#636262")};
    }
  }
`
