import React, { useEffect, useState } from "react"

import { Link } from "react-router-dom"
import IPoster from "./IPoster"
import { Container } from "./style"
import ReadMore from '@gluedigital/read-more'
import {FiSend, FiShare2} from "react-icons/fi"
import {useHistory} from "react-router-dom"
import clientApi from "src/service/clientApi"
import { useAuthContext } from "src/Hooks/AuthContext"
import { toast } from "react-toastify"
interface IProps {
  poster: IPoster
}

interface IUser {
  firstName: string,
  lastName: string,
  avatar: string;
  title: string;
}
const Poster: React.FC<IProps> = ({poster}) => {
  const history = useHistory()  

  const [user, setUser] = useState({} as IUser)
  const { token } = useAuthContext()

  useEffect(() => {
    const findFreelas = async() =>  {
      try {
        const response = await clientApi.get<IUser>(`/users/${poster.userId}`, {
          headers: {
            authorization: `Bearer ${token}`
          }
        })
        setUser(response.data)
      } catch (error) {
        console.log(error)
        toast.dark("Ocorreu um erro ao buscar os Freelas")
      } 
    }
    findFreelas()
  }, [])
  return (
    <Container>
      <div className="header">
        <Link to={`/profile/${poster.userId}`} className="profile">
          <img src={ user.avatar ? `https://hub-api.s3.amazonaws.com/${user.avatar}`: "https://avatars.githubusercontent.com/u/94611797?v=4"} alt={user.avatar} />
          <div>
            <p id="profile-name">{user?.firstName}</p>
            <p>{user?.title}</p>
          </div>
        </Link>
      </div>

      <div className="posterContent">
        <ReadMore
          id="description"
          value={poster.description}
          delimiter={'\n\n'}
          maxExcerptLength='250'
          messageReadMore={"LER MAIS"}
          messageReadLess={"LER MENOS"}
        />
        <p id="createdDate">Postado em 25 de novembro de 2021</p>
        {
          poster.imageUrl && (
            <img src={`https://hub-api.s3.amazonaws.com/${poster.imageUrl}`} alt="poster-banner" />
          )
        }
        
      </div>

      <div className="buttons">
        <button onClick={() => history.push(`/chat/${poster.userId}`)}>
          <FiSend size={22} />
          Fazer Proposta
        </button>
        <button>
          <FiShare2 size={22} />
          Compartilhar
        </button>
      </div>
    </Container>
  )
}

export default Poster