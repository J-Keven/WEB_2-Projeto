import React, { useState } from "react"

import { Link } from "react-router-dom"
import { Container, Form, Hastag } from "./style"
import ReadMore from '@gluedigital/read-more'
import {FiSend, FiShare2, FiXCircle} from "react-icons/fi"
import {useHistory} from "react-router-dom"
import IPoster from "../Poster/IPoster"
import Modal from "react-modal"
import { freemem } from "os"
import { useAuthContext } from "../../Hooks/AuthContext"
import clientApi from "src/service/clientApi"
import { toast } from "react-toastify"


const Project: React.FC<{poster: IPoster}> = ({
 poster
}) => {

   const { user, token } = useAuthContext()
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      width: '100%',
      // height: '100%',
      height: '200px',
      maxWidth: "700px",
      // marginRight: '-50%',
      display: "flex",
      // justifyContent: "center",
      // alignItems: "center",
      transform: 'translate(-50%, -50%)',
    },
  };

  const [showModal, setShowModal] = useState(false)

  const openModal = () => {
    setShowModal(true)
  }
  const closeModal = () => {
    setShowModal(false)
  }

  const hadleUpdateFreela = async (status: string) => {
      try {

        const data = {
          status
        }
        const response = await clientApi.patch<IPoster[]>(`/freela/${poster.id}`,data, 
        {
          headers: {
            authorization: `Bearer ${token}`
          }
        }
        )
        toast.dark("Freela atualizado!")
        closeModal()
      } catch (error) {
        toast.dark("Erro ao atualizar o Freela") 
      }

  }
  return (
    <Container>
     {
       user.id === poster.userId ? (
        <>  
           <a onClick={openModal}> 
        <img src={`https://hub-api.s3.amazonaws.com/${poster.imageUrl}`} alt="" />
        <p>{poster.title}</p>
        {
          poster.categories.map(hasteg => (
            <Hastag>
              {hasteg.name}
            </Hastag>
          ))
        }
      </a>
      <Modal
        isOpen={showModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <Form>
          <div className="header">
            <h2>Em qual momento seu Freela está?</h2>
            <FiXCircle size={30} onClick={closeModal}/>
          </div>
          <div className="buttons">
            {
              // open' | '' | 'concluded'
              poster.status === "open" && (
                <>
                  <button onClick={() => hadleUpdateFreela("in-progress")}>Em Andamento</button>
                  <button onClick={() => hadleUpdateFreela("concluded")}>Finalizado</button>
                </>
              ) 
            }
            {

              poster.status === "in-progress" && (
                <>
                  <button onClick={() => hadleUpdateFreela("open")}>Aceitando Oportunidades</button>
                  <button onClick={() => hadleUpdateFreela("concluded")}>Finalizado</button>
                </>
              ) 
            }
            {
               poster.status === "concluded" && (
                <>
                  <button onClick={() => hadleUpdateFreela("open")}>Aceitando Oportunidades</button>
                  <button onClick={() => hadleUpdateFreela("in-progress")}>Em Andamento</button>
                </>
              ) 
            }
          </div>
        </Form>
      </Modal>
        </>
       ) : (
        <a> 
          <img src={`https://hub-api.s3.amazonaws.com/${poster.imageUrl}`} alt="" />
          <p>{poster.title}</p>
          {
          poster.categories.map(hasteg => (
            <Hastag>
              {hasteg.name}
            </Hastag>
          ))
        }
      </a>
       )
     }

    </Container>
  )
}
export default Project