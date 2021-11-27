import React from "react"
import {Link} from "react-router-dom"
import {FiUpload, FiEdit2,FiCamera, FiPlus, FiImage} from "react-icons/fi"
import { useParams } from "react-router-dom"
import { Container, Content, Card, ProfileContent, UserDescription, Projects, Form } from "./style"
import ReadMore from '@gluedigital/read-more'
import { UserProps, useAuthContext} from "../../Hooks/AuthContext"

import { useEffect, useState } from "react"

import NavBar from "../../components/NavBar"
import Project from "../../components/Project"
import { Hastag } from "../../components/Project/style"
import clientApi from "src/service/clientApi"
import { toast } from "react-toastify"
import IPoster from "../../components/Poster/IPoster"
import Modal from "react-modal"

const Profile = () => {
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      width: '100%',
      // height: '100%',
      // maxHeight: '500px',
      maxWidth: "500px",
      marginRight: '-50%',
      display: "flex",
      ustifyContent: "center",
      alignItems: "center",
      transform: 'translate(-50%, -50%)',
    },
  };

  const [showAllProjects, setShowAllProjects] = useState(false)
  const {id} = useParams<{id: string}>()

  const [userProfile, setUserProfile] = useState<UserProps>({} as UserProps)
  const [myProjects, setMyProjects] = useState<IPoster[]>([])
  const [hastegs, setHastegs] = useState<string[]>([])

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const [firstNameSelected, setFirstNameSelected] = useState(false)
  const [lastNameSelected, setLastNameSelected] = useState(false)
  const [titleSelected, setTitleSelected] = useState(false)
  const [descriptionSelected, setDescriptionSelected] = useState(false)
  const [hashtagsSelected, setHashtagsSelected] = useState(false)

  const [lastNameError, setLastNameError] = useState(false)
  const [firstNameError, setFirstNameError] = useState(false)

  const { token, user, updateUser } = useAuthContext()


  const [modalProfileIsOpen, setIsOpenProfileModal] = React.useState(false);
  const [modalNewFreelaIsOpen, setIsOpenNewFreelaModal] = React.useState(false);


  const [freelaCategories, setFreelaCategories] = useState<string>()
  const [freelaImage, setFreelaImage] = useState<any>()
  const [freelaTitle, setFreelaTitle] = useState<string>()
  const [freelaDescription, setFreelaDescription] = useState<string>()


  const [freelaCategoriesError, setFreelaCategoriesErro] = useState(false)
  const [freelaImageError, setFreelaImageErro] = useState(false)
  const [freelaTitleError, setFreelaTitleErro] = useState(false)
  const [freelaDescriptionError, setFreelaDescriptionErro] = useState(false)


  function openModalUpdateProfile() {
    setIsOpenProfileModal(true);
  }


  function closeModalUpdateProfile() {
    setIsOpenProfileModal(false);
    setFirstNameSelected(false)
    setLastNameSelected(false)
    setTitleSelected(false)
    setDescriptionSelected(false)
    setLastNameError(false)
    setFirstNameError(false)
    setHashtagsSelected(false)
  }


  function openModalAddFreela() {
    setIsOpenNewFreelaModal(true);
  }


  function closeModalAddFreela() {
    setIsOpenNewFreelaModal(false);
    closeModalUpdateProfile()
  }

  const handleFocus = (fieldId: "firstName" | "lastName" | "description" | "title" | "Hashtags") => {
    if(fieldId === "firstName") {
      document.getElementById('email')?.focus();
      setFirstNameSelected(true)
    } else if(fieldId === "lastName"){
      document.getElementById('lastName')?.focus();
      setLastNameSelected(true)
    } else if(fieldId === "title"){
      document.getElementById('title')?.focus();
      setTitleSelected(true)
    } else if(fieldId === "description"){
      document.getElementById('description')?.focus();
      setDescriptionSelected(true)
    } else if(fieldId === "Hashtags"){
      document.getElementById('hashtags')?.focus();
      setHashtagsSelected(true)
    }
  }

  const handleUpdateProfile = async (e: any) => {
    e.preventDefault()
      const data = {
        firstName,
        lastName,
        title,
        description,
      }
      
      if(!firstName) {
        setFirstNameError(true)
        toast.dark("Nome é um campo obrogatório")
        return
      } else if(!lastName) {
        setLastNameError(true)
        toast.dark("Sobrenome é um campo obrogatório")
        return
      }

      try {
        const response = await clientApi.put(`/users`, data, {
          headers: {
            authorization: `Bearer ${token}`
          }
        })

        setUserProfile({
          ...userProfile,
          description: description,
          firstName: firstName,
          lastName: lastName,
          title: title
        })

      } catch (error) {
        console.log(error)
        toast.dark("Ocorreu um erro ao atualizar o perfil.")
      }
      console.log(data)
      closeModalUpdateProfile()
  }

  const hadleCReateFreela = async (e:any) => {
    e.preventDefault()
      

      if(!freelaTitle) {
        setFreelaTitleErro(true)
        toast.dark("Digite o título do Freela")
        return
      } else if(!freelaImage) {
        setFreelaImageErro(true)
        toast.dark("Selecione um banner para seu Freela")
        return
      } else if(!freelaDescription) {
        setFreelaDescriptionErro(true)
        toast.dark("Descreva o seu Freela.")
        return
      } else if(!freelaCategories) {
        setFreelaCategoriesErro(true)
        toast.dark("Adiciona alguma Hashtag ao seu Freela ")
        return
      }

      const data = new FormData()

      data.append("title", freelaTitle)
      if(freelaDescription) {
        data.append("description", freelaDescription)
      }
      data.append("price", '0')
      if(freelaCategories) {
        data.append("categories", freelaCategories?.split(" ").join(", "))
      }
      data.append("image", freelaImage)

      try {
        const response = await clientApi.post(`/freela`, data, {
          headers: {
            authorization: `Bearer ${token}`
          }
        })

        setMyProjects([...myProjects, response.data])
        toast.dark("Freela criado com sucesso") 

      } catch (error) {
        console.log(error)
        toast.dark("Ocorreu um erro ao adicionar o Freela.")
      }
      closeModalAddFreela()
  }
  useEffect(() => {
    const findFreelas = async() =>  {
      try {
        const response = await clientApi.get<UserProps>(`/users/${id}`, {
          headers: {
            authorization: `Bearer ${token}`
          }
        })
        setUserProfile(response.data)
      } catch (error) {
        console.log(error)
        toast.dark("Ocorreu um erro ao buscar o usuário.")
      } 
    }

    const findMyProjects = async() =>  {
      try {
        const response = await clientApi.get<IPoster[]>(`/users/freelas/${id}`, {
          headers: {
            authorization: `Bearer ${token}`
          }
        })
        setMyProjects(response.data)
        const tags: string[] = []
        response.data.map(item => {
          item.categories.forEach(tag => {
            if(!tags.includes(tag.name)) {
              tags.push(tag.name)
            }
          })
        })
        setHastegs(tags)
      } catch (error) {
        console.log(error)
        toast.dark("Ocorreu um erro ao buscar os projetos desse usuário")
      } 
    }
    findFreelas()

    findMyProjects()

  }, [])

  const handleUpdadetAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();

    if (!e.target.files) {
      toast.dark("Erro ao atualizar o avatar");
    } else {
      formData.append('avatar', e.target.files[0]);
      try {
        
        const response = await clientApi.patch('/users/avatar', formData, {headers: {
          authorization: `Bearer ${token}`
        }});
        updateUser(response.data);
        setUserProfile({
          ...userProfile,
          avatar: response.data.avatar
        })
        toast.dark("Avatar atualizado");

      } catch (error) {
        toast.dark("Erro ao atualizar o avatar");
       
      }
    }
  }

  const handleSetFreelaImage = (e: any) => {
    console.log(e.target.files[0])
    setFreelaImage(e.target.files[0] || null)
  }

  useEffect(() => {
    setFirstName(userProfile.firstName)
    setLastName(userProfile.lastName)
    setTitle(userProfile.title)
    setDescription(userProfile.description || "")
  }, [userProfile, modalProfileIsOpen])  

  return (
    <Container>
      <NavBar />
      <Content> 
        <div className="userProfileContent">
          <Card className="cardAlignItems"> 
            <ProfileContent>
              <div>
                <img src={ userProfile.avatar ? `https://hub-api.s3.amazonaws.com/${userProfile.avatar}`: "https://avatars.githubusercontent.com/u/94611797?v=4"} alt="profile" />
                {userProfile.id === user.id &&(<label htmlFor="avatar">
                  <FiCamera />

                  <input type="file" id="avatar" onChange={handleUpdadetAvatar}/>
                </label>)}
              </div>
              <div className="userInfos">
                
                <div>
                  <p id="profile-name">{userProfile.firstName}</p>
                  <p>{userProfile.title}</p>
                </div>
                { userProfile.id === user.id && (
                    <button onClick={() => openModalUpdateProfile()}>
                    <FiEdit2 size={22}/>
                    </button>
                )}
              </div>
            </ProfileContent>
          </Card>
          <Card>
            <UserDescription>
              <h1>Mais sobre {userProfile.firstName}</h1>
              <ReadMore
                id="descripmodalIsOpention"
                value={userProfile.description || ""}
                delimiter={'\n\n'}
                maxExcerptLength='250'
                messageReadMore={"LER MAIS"}
                messageReadLess={"LER MENOS"}
                />
            </UserDescription>
            
          </Card>
          <Card>
            <Projects>
              <div className="projectHeader">
                <h1>Projetos Publicados</h1>
                { userProfile.id === user.id && (
                    <button onClick={() => openModalAddFreela()}>
                    <FiPlus size={22}/>
                    </button>
                )}
              </div>
              <div>
                {
                  myProjects.map((item, index) => {
                    if(index > 2 && !showAllProjects) {
                      return (<></>)
                    }
                    return (<Project poster={item}/>)
                  })
                }
              </div>
              <p 
                onClick={() => setShowAllProjects(!showAllProjects)}
              >
                {
                  !showAllProjects ? `MOSTRAR TODOS (${myProjects.length})`: "MOSTRAR MENOS" 
                }
              </p>
            </Projects>
          </Card>
        </div>
        <div className="dashboads">
          <div className="results">
            <h1>Seus Resultados</h1>
            <div>
              <p>{myProjects.length}</p>
              <p>Projetos Publicados</p>
            </div>
            <div>
              <p>{myProjects.filter(item => item.status === "in-progress").length}</p>
              <p>Projetos em Andamento</p>
            </div>
            <div>
              <p>{myProjects.filter(item => item.status === "concluded").length}</p>
              <p>Projetos Concluídos</p>
            </div>
          </div>
          <div className="hastags">
            <h1>Hashtags</h1>
            {/* {
          hastegs.map(hasteg => (
            <Hastag>
              {hasteg}
            </Hastag>
          ))
        } */}
        </div>
        </div>
            <Modal
              isOpen={modalProfileIsOpen}
              onRequestClose={closeModalUpdateProfile}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <Form>
                <h2>Atualize seu dados:</h2>
                <div className="inputs" onClick={() => handleFocus("firstName")}>
                  <p className="selected" style={{opacity: firstNameSelected ? 1: 0, background: !firstNameError ? "#3751FE" : "#FE3737"}}></p> 
                  {/* <div > */}
                    <div>
                      <p className="label">Name</p>
                      <input 
                        value={firstName}
                        id="firstName" 
                        className="fields" 
                        type="text"
                        placeholder="Nome" 
                        onChange={e => setFirstName(e.target.value)}
                      />
                    {/* </div> */}
                  </div>
                </div>
                

                <div className="inputs" onClick={() => handleFocus("lastName")}>
                  <p className="selected" style={{opacity: lastNameSelected ? 1: 0, background: !lastNameError ? "#3751FE" : "#FE3737"}}></p> 
                  {/* <div > */}
                    <div>
                      <p className="label">Sobrenome</p>
                      <input 
                        value={lastName} 
                        id="lastName" 
                        className="fields"
                        placeholder="Sobrenome"
                        onChange={e => setLastName(e.target.value)}
                      />
                  </div>
                </div>
                

                <div className="inputs" onClick={() => handleFocus("title")}>
                  <p className="selected" style={{opacity: titleSelected ? 1: 0 }}></p> 
                  {/* <div > */}
                    <div>
                      <p className="label">Title</p>
                      <input 
                        className="fields" 
                        
                        value={title}
                        id="title"
                        placeholder="Titulo" 
                        onChange={e => setTitle(e.target.value)}
                      />
                  </div>
                </div>

                <div className="inputs" onClick={() => handleFocus("description")}>
                  <p className="selected" style={{opacity: descriptionSelected ? 1: 0 }}></p> 
                  {/* <div > */}
                  <div >
                    <p className="label">Descrição</p>
                      <input 
                        id="description"
                        value={description}
                        className="fields"
                        placeholder="Descrição" 
                        onChange={e => setDescription(e.target.value)}
                      />
                  </div>
                </div>

                <div className="buttons">
                  <button onClick={handleUpdateProfile}>Savar</button>
                  <button onClick={() => closeModalUpdateProfile()}>Cancelar</button>
                </div>
              </Form>
            </Modal>
            <Modal
              isOpen={modalNewFreelaIsOpen}
              onRequestClose={closeModalAddFreela}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <Form>
                <h2>Publicar um novo projeto:</h2>
                <div className="inputs" onClick={() => handleFocus("title")}>
                    <p className="selected" style={{opacity: titleSelected ? 1: 0, background: !freelaTitleError ? "#3751FE" : "#FE3737"}}></p> 
                    {/* <div > */}
                      <div>
                        <p className="label">Title</p>
                        <input 
                          className="fields" 
                          name="title"
                          value={freelaTitle}
                          id="title"
                          placeholder="Titulo" 
                          onChange={e => setFreelaTitle(e.target.value)}
                        />
                    </div>
                  </div>

                  <div className="inputs" onClick={() => handleFocus("description")}>
                    <p className="selected" style={{opacity: descriptionSelected ? 1: 0, background: !freelaDescriptionError ? "#3751FE" : "#FE3737"}}></p> 
                    {/* <div > */}
                    <div >
                      <p className="label">Descrição</p>
                        <input 
                          id="description"
                          value={freelaDescription}
                          className="fields"
                          name="descrição"
                          placeholder="Descrição" 
                          onChange={e => setFreelaDescription(e.target.value)}
                        />
                    </div>
                  </div>

                  <div className="inputs" onClick={() => handleFocus("Hashtags")}>
                    <p className="selected" style={{opacity: hashtagsSelected ? 1: 0, background: !freelaCategoriesError ? "#3751FE" : "#FE3737" }}></p> 
                    {/* <div > */}
                    <div >
                      <p className="label">Hashtags</p>
                        <input 
                          id="hashtags"
                          name="hashtags"
                          value={freelaCategories}
                          className="fields"
                          placeholder="#UI/UX #API"
                          onChange={e => setFreelaCategories(e.target.value)}
                        />
                    </div>
                  </div>

                  <label  className="uploadFreelaImage" >
                    <FiImage size={32} color={!freelaTitleError ? "#3751FE" : "#FE3737"}/>
                    <input type="file" id="freelaImage" onChange={handleSetFreelaImage}/>
                  </label>

                  <div className="buttons">
                    <button onClick={hadleCReateFreela}>Criar</button>
                    <button onClick={() => closeModalAddFreela()}>Cancelar</button>
                  </div>
              </ Form>
            </Modal>

      </Content>
    </Container>
  )
}

export default Profile