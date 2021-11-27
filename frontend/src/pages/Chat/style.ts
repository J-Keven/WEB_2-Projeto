import styled from "styled-components";
import { shade} from "polished"

export const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  /* align-items: center; */
`
export const Content = styled.div`
  margin-top: 170px;
  width: 100%;
  display: flex;
  justify-content: center;

`

export const Talks = styled.div`
  background: #fff;
  width: 390px;
  height: 660px;
  border-radius: 12px;
  /* overflow: hidden; */
  
  .header {
    /* height: 20px; */
    padding: 20px;
    display: flex;
    align-items: center;
    border-bottom: 2px solid #F4F4F4;
    h1 {
      font-family: Gotham Pro, sans-serif;
      font-size: 22px;
      line-height: 11px;
      text-transform: uppercase;
      color: #181818;
      /* margin-bottom: 10px; */
    }
  }

  .listTalks {
    height: 600px;
    overflow-x: hidden;
    overflow-y: scroll;
    
    ::-webkit-scrollbar {
      width: 8px;             
    }

    ::-webkit-scrollbar-track {
      background: #fff;       
    }

    ::-webkit-scrollbar-thumb {
      background-color: ${shade(0.1,"#F4F4F4")};   
      border-radius: 20px;     
    }
  }
`

export const Talk = styled.li`
  display: flex;
  align-items: center;
  padding: 12px;
  /* li { */
    border-bottom: 2px solid #F4F4F4;
  /* } */
  div {
    h2 {
      font-size: 20px;
      font-weight: 500;
    }
    p {
      margin-top: 10px;
      font-size: 16px;
      font-weight: 400;
    }
  }
  img {
    width: 62px;
    height: 62px;
    border-radius: 50%;
    margin-right: 20px;
  }

`

export const ChatContainer  = styled.div`
  width: 100%;
  max-width: 900px;
  height: 100%;
  max-height: 665px;
  background: #fff;
  margin-left: 100px;
  padding: 20px;
  border-radius: 12px;
  /* overflow: hidden; */
  .chatHeader {
    padding-bottom: 20px;
    display: flex;
    align-items: center;
    border-bottom: 2px solid #F4F4F4;

    img {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    margin-right: 20px;
    }

  } 

  .chat-history {
    display: flex;
    height: 490px;

    /* height: 600px; */
    

    ul {
      width: 100%;
      display: flex;
      flex-direction: column;
      height: 470px;
      overflow-x: hidden;
    overflow-y: scroll;
    
    ::-webkit-scrollbar {
      width: 8px;             
    }

    ::-webkit-scrollbar-track {
      background: #fff;       
    }

    ::-webkit-scrollbar-thumb {
      background-color: ${shade(0.1,"#F4F4F4")};   
      border-radius: 20px;     
    }

      li {

        display: flex;
        align-items: center;
        & + li {
          margin-top: 20px;
        }
        margin-right: auto;
        font-family: Gotham Pro, sans-serif;
        font-size: 18px;
        line-height: 150%;
        color: #181818;
       
        padding: 10px;
        /* width: 100%; */
        /* height: 100%; */
        min-height: 46px;

        max-width: 476px;
        max-height: 100px;

        background: #E9F0F8;
        border-radius: 4px;
        list-style: none;
      }
    }

  }

  .sendMessage {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    border-radius: 20px;
    padding: 0 20px;

    border: 2px solid ${shade(0.2,"#F4F4F4")};
    /* height: 100px; */
    /* bottom: 0; */
    input {
      flex: 1;
      /* height: 100%; */
      font-size: 18px;
    }
  }
  
`

export const Message = styled.li``