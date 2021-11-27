import { Container } from "./style"
import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import {FiRss, FiMessageSquare, FiBell, FiSearch, FiLogOut } from "react-icons/fi"
import { useAuthContext} from "../../Hooks/AuthContext"
interface IProps {
  pageName?: "FEED" | "CHAT" | "NOTICES"
  searchOnChange?: any
}

const NavBar: React.FC<IProps> = ({ pageName, searchOnChange }) => {

  const [searchFocus, setSearchFocus] = useState(false)
  const {user, logout} = useAuthContext()
  const history = useHistory()
  console.log(user)
  return (
    <Container>
      <Link to="/feed" className="logo">
        <img src="https://github.com/FreelasApp/web/blob/main/assets/Logo.png?raw=true" alt="FreelasApp" />
      </Link>

      <div className="pagesIcons">
        <div style={{color: pageName === "FEED" ? "#0275B1" : "#636262"}} onClick={() => history.push(`/feed`)}>
          <FiRss size={26}/>
          <p>FEED</p>
        </div>
        <div style={{color: pageName === "CHAT" ? "#0275B1" : "#636262"}} onClick={() => history.push(`/chat`)}>
          <FiMessageSquare size={26}/>
          <p>CHAT</p>
        </div>
        {/* <div style={{color: pageName === "NOTICES" ? "#0275B1" : "#636262"}} onClick={() => history.push(`/chat/`)}>
          <FiBell size={26}/>
          <p>NOTIFICAÇÕES</p>
        </div> */}
      </div>

      <div 
        className="search"
        onFocus={() => setSearchFocus(!searchFocus)} 
        onBlur={() => setSearchFocus(!searchFocus)}
      >
        <FiSearch size={26} color={searchFocus ? "#0275B1" : "#636262"}/> 
        <input type="text" placeholder="Buscar" onChange={e => searchOnChange && searchOnChange(e.target.value)}/>
      </div>

      <Link to={`/profile/${user.id}`} className="profile">
        <img src={user.avatar} alt={"Avatar" }/>
        <div>
        <p id="profile-name">{user.firstName}</p>
          <p>{user.title}
          </p>
        </div>
      </Link>

      <Link to="/" className="logOut" onClick={logout}>
        <FiLogOut size={26}/> 
        <p>SAIR</p>
      </Link>

    </Container>
  )
}


export default NavBar