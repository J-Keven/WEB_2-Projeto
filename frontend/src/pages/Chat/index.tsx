import {Link} from "react-router-dom"
import {FiEyeOff, FiCheck, FiX, FiSend } from "react-icons/fi"
import { MdSend } from "react-icons/md"
import { Container, Content, Talks, Talk, Message, ChatContainer } from "./style"
import { useEffect, useState } from "react"
import NavBar from "../../components/NavBar"
const Chat = () => {
  return (
    <Container>
      <NavBar pageName="CHAT"/>
      <Content>
        <Talks>
          <div className="header">
            <h1>CHAT</h1>
          </div>
          <div className="listTalks">
            <ul >
              <Talk>
                <img src="https://avatars.githubusercontent.com/u/94611797?v=4" alt="" />
                <div>
                  <h2>Jheysim</h2>
                  <p>Aguardo o seu retorno:)</p>
                </div>
              </Talk>

            </ul>
          </div>
          
        </Talks>
        <ChatContainer >
          <div className="chatHeader">
            <img src="https://avatars.githubusercontent.com/u/94611797?v=4" alt="" />
            <h2>Jheysim</h2>
          </div>
          <div className="chat-history">
            <ul>
              <li style={{ justifyContent: "left"}}>
                <div>
                 <p>la jhonnas, tudo bem?              </p>
                </div>
              </li>
              <li style={{ justifyContent: "left"}}>
                <div>
                 <p>Estou iniciando um projeto para Patshop, gostaria de fazer parte?</p>
                </div>
              </li>
              <li style={{ justifyContent: "left"}}>
                <div>
                 <p>Aguardo o seu retorno:)</p>
                </div>
              </li>
              
            </ul>
          </div>
          <div className="sendMessage">
          <input type="text" placeholder="Digite sua mensagem"/>    
            <MdSend size={22}/>      
          </div>
        </ChatContainer >


      </Content>
    </Container>
  )
}

export default Chat