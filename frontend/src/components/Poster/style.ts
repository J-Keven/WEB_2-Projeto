import { shade } from "polished";
import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  background-color: #FFFFFF;
  height: 100%;
  max-width: 800px;
  /* max-height: 700px; */
  overflow: hidden;
  border-radius: 12px;
  margin-bottom: 50px;
  font-family: Gotham Pro, sans-serif;

  .header {
    padding: 20px 40px 0 40px;
    /* border-bottom: 2px solid #CECECE; */
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .profile {
    display: flex;
    align-items: center;
    text-decoration: none;
      img {
        width: 92px;
        height: 92px;
        border-radius: 50%;
        margin-right: 5%;
      }
      p {
        color: #181818;
        font-weight: bold;
        font-size: 20px;
        font-family: Gotham Pro, sans-serif;
        & + p {
          font-weight: 400;
          font-size: 16px;
          max-width: 30ch;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
  }

  .posterContent {
    img {
      width: 100%;
      /* max-height: 400px; */
    }
    padding-bottom: 20px;
  }

  .readMore {
    padding: 20px;
    span {
      font-family: Gotham Pro;
      font-size: 22px;
      line-height: 120%;
      color: #181818;
    }
  }

  .read-more-button {
    margin-top: 12px;
    font-family: Gotham Pro, sans-serif;
    font-size: 16px;
    line-height: 11px;
    text-transform: uppercase;
    color: #0275B1;
    cursor: pointer;
    transition: color 0.2s;

    &:hover {
      /* font-weight: 500; */
      color: ${shade(0.3, "#0275B1")}
    }
  }

  .buttons {
    border-top: 2px solid #CECECE;
    font-family: Gotham Pro, sans-serif;
    height: 70px;
    display: flex;
    justify-content: flex-end;

    button {
      display: flex;
      align-items: center;
      height: 100%;
      width: 160px;
      background-color: #FFF;
      font-family: Gotham Pro;
      font-size: 20px;
      /* border: 1px solid black; */
      line-height: 11px;
      /* text-transform: uppercase; */
      color: #181818;
      transition: color 0.2s;

      svg {
        color: #0275B1;
        margin-right: 10px;
        transition: color 0.2s;
      }
      & + button {
        margin-left: 20px;
      }
      &:hover {
        color: ${shade(0.2, "#000")};
        font-weight: 500;
        svg {
          color: ${shade(0.3, "#0275B1")}
        }
      }
    }
  }

  #createdDate {
    padding-right: 20px;
    display: flex;
    justify-content: flex-end;
    font-family: Gotham Pro;
    color: #636262;
    font-size: 18px;
    margin-bottom: 8px;
  }
`