import {Link} from "react-router-dom"
import {FiEyeOff, FiCheck, FiX } from "react-icons/fi"
import { Container, FeedContent } from "./style"
import { useEffect, useMemo, useState } from "react"
import NavBar from "../../components/NavBar"
import Poster from "../../components/Poster"
import IPoster from "../../components/Poster/IPoster"
import clientApi from "../../service/clientApi"
import { useAuthContext} from "../../Hooks/AuthContext"
import { toast } from "react-toastify"

const Feed = () => {

  const [posters, setPosters] = useState<IPoster[]>([])
  const [filter, setFilter] = useState("")

  const { token} = useAuthContext()

  useEffect(() => {
    const findFreelas = async() =>  {
      try {
        const response = await clientApi.get<IPoster[]>("/freela?status=open", {
          headers: {
            authorization: `Bearer ${token}`
          }
        })
        setPosters(response.data)
      } catch (error) {
        console.log(error)
        toast.dark("Ocorreu um erro ao buscar os Freelas")
      } 
    }
    findFreelas()
  }, [])

  const filterPosts = useMemo(() => {
    if(filter && filter.length > 2) {
      return posters.filter(post => post.title.includes(filter))
    } 
    return posters
  }, [filter, posters])

  return (
    <Container>
      <NavBar pageName="FEED" searchOnChange={setFilter}/>
      <FeedContent>
        {
          filterPosts.map((item, index) => {
            return (
              <Poster
                poster={item} 
                key={index}
              />
            )
          })
        }
      </FeedContent>
    </Container>
  )
}

export default Feed