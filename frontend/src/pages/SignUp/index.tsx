import {Link, useHistory} from "react-router-dom"
import {FiEyeOff, FiCheck, FiX } from "react-icons/fi"
import { Container, Content, Header, Form, Background} from "./style"
import { useState } from "react"
import Logo from "../../assets/illustration.png"
import { toast } from "react-toastify"
import clientApi from "src/service/clientApi"
const SignUp = () => {
  const [emailSelect, serEmailSelect] = useState(false)
  const [passwordSelect, setPasswordSelect] = useState(false)
  const [passwordConfSelect, setPasswordConfSelect] = useState(false)
  const [lastNameSelect, setLastNameSelect] = useState(false)
  const [firstNameSelect, setFirstNameSelect] = useState(false)

  const [emailIsValid, setEmailIsValid] = useState(true)
  const [passwordIsValid, setPasswordIsValid] = useState(true)
  const [passwordConfIsValid, setPasswordConfIsValid] = useState(false)
  const [lastNameIsValid, setLastNameIsValid] = useState(true)
  const [firstNameIsValid, setFirstNameIsValid] = useState(true)

  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")

  const [passMinLength, setPassMinLength] = useState(false)
  const [passWithLettersNumbers, setpassWithLettersNumbers] = useState(false)
  
  const history = useHistory()
  const handleFocus = (fieldId: "email" | "password" | "firstName" | "lastName" | "description" | "passConfir") => {
    if(fieldId === "email") {
      document.getElementById('email')?.focus();
      serEmailSelect(true)
    } else if(fieldId === "password") {
      document.getElementById('password')?.focus();
      setPasswordSelect(true)
    } else if(fieldId === "firstName") {
      document.getElementById('firstName')?.focus();
      setFirstNameSelect(true) 
    } else if(fieldId === "lastName") {
      document.getElementById('lastName')?.focus();
      setLastNameSelect(true)
    } else if(fieldId === "passConfir") {
      document.getElementById('passConfir')?.focus();
      setPasswordConfSelect(true)
    }
  }

  const handleSetPassword = (e: any) => {
    const value = e.target.value
    setPassMinLength(password.length > 5)
    const numbers = /[0-9]/;
    const letters = /[a-z]/
    setpassWithLettersNumbers(numbers.test(value) && letters.test(value))
    setPassword(value)
  }

  const handleValidate = (fieldId: "email" | "password" | "passConfir") => {
    if(fieldId === "email") {
      var re = /\S+@\S+\.\S+/;
      setEmailIsValid(re.test(email))
    } else if(fieldId === "password") {
      setPasswordIsValid(password.length > 5)
    } else if(fieldId === "passConfir") {
      setPasswordConfIsValid(passwordConfirm.length > 0 && password === passwordConfirm)
    } 
  }   

  const handleCreateUser = async (e: any) => {
    
    if(!lastNameIsValid) {
      toast.dark("Digite seu primeriro nome")
      return

    }  else  if(!lastNameIsValid) {
      toast.dark("Digite seu sobrenome")
      return

    }else if(!emailIsValid) {
      toast.dark("Informa um email válido")
      return
    } else if(!passwordIsValid) {
      toast.dark("Informa uma senha válido")
      return

    } else if(!passwordConfIsValid) {
      toast.dark("A sanha de confirmalção não bate com a senha digitada.")
      return
    } 


    try {
      const data = {
        firstName: firstName,
	      email: email,
	      lastName: lastName,
	      password: password
      }

      await clientApi.post('/users', data)
      history.push('/');

      toast.dark("Conta criada com sucesso, você já pode fazer login")

    } catch (error: any) {
     if(error.response.status == 409) {
        toast.dark('Já existe uma conta cadastrada com esse email.')
      } else {
        toast.dark('Ocorreu um erro ao criar conta.')

      }
    }
  }
  return (
    <Container>
      <Background>
        <img src={Logo} alt=""/>
      </Background>
      <Content>
        <Header>
          <h1>FreelasApp</h1>
          <p>Faça parte de uma cominidade que tem como objetivo impusionar seus ganhos.</p>
        </Header>
        <Form >
          <div className="inputs" onClick={() => handleFocus("firstName")} onBlur={() => setFirstNameIsValid(!!firstName)}>
            <p className="selected" style={{opacity: firstNameSelect ? 1: 0, background: firstNameIsValid ? "#3751FE" : "#FE3737"}}></p>
           <div>
              <p className="label">Nome</p>
              <input 
                id="firstName" 
                className="fields" 
                value={firstName}
                type="text" 
                placeholder="José" 
                onChange={e => setFirstName(e.target.value)}
              />
           </div>
          </div>
          <div className="inputs" onClick={() => handleFocus("lastName")} onBlur={() => setLastNameIsValid(!!lastName)}>
            <p className="selected" style={{opacity: lastNameSelect ? 1: 0, background: lastNameIsValid ? "#3751FE" : "#FE3737"}}></p>
           <div>
              <p className="label">Sobrenome</p>
              <input 
                id="lastName" 
                value={lastName}
                className="fields" 
                type="text" 
                placeholder="Silva" 
                onChange={e => setLastName(e.target.value)}
              />
           </div>
          </div>
          <div className="inputs" onClick={() => handleFocus("email")} onBlur={() => handleValidate("email")}>
            <p className="selected" style={{opacity: emailSelect ? 1: 0, background: emailIsValid ? "#3751FE" : "#FE3737"}}></p>
           <div>
              <p className="label">Email</p>
              <input 
                id="email" 
                value={email}
                className="fields" 
                type="email" 
                placeholder="freelasapp@freelasapp.com" 
                onChange={e => setEmail(e.target.value)}
              />
           </div>
          </div>
          <div className="inputs" onClick={() => handleFocus("password")} onBlur={() => handleValidate("password")}>
            <p className="selected" style={{opacity: passwordSelect ? 1: 0, background: passwordIsValid ? "#3751FE" : "#FE3737" }}></p> 
            <div className="inputs-password">
              <div>
                <p className="label">Senha (6 ou mais caracteres)</p>
                <input value={password} id="password" className="fields" type="password" placeholder="******" min={6} onChange={handleSetPassword}/>
              </div>
              <FiEyeOff />
            </div>
          </div>
          <div className="inputs" onClick={() => handleFocus("passConfir")} onBlur={() => handleValidate("passConfir")}>
            <p className="selected" style={{opacity: passwordConfSelect ? 1: 0, background: passwordConfIsValid ? "#3751FE" : "#FE3737" }}></p> 
            <div className="inputs-password">
              <div>
                <p className="label">Confirmar senha</p>
                <input 
                  id="passConfir" 
                  value={passwordConfirm}
                  className="fields" 
                  type="password" 
                  placeholder="******" 
                  min={6} 
                  onChange={e => {
                      setPasswordConfirm(e.target.value)
                      setPasswordConfIsValid(e.target.value === password )
                  }}/>
              </div>
              <FiEyeOff />
            </div>
          </div>
          {
            passwordSelect && (
              <div className="passValidatorResult">
                <p>
                  {
                    passMinLength  ? (
                      <FiCheck color="#3751FE"/>
                    ) : (
                      <FiX color="#FE3737"/>
                    )             
                  }
                  Mínimo de 6 caracteres
                </p>
                <p>
                  {
                    passWithLettersNumbers  ? (
                      <FiCheck color="#3751FE"/>
                    ) : (
                      <FiX color="#FE3737"/>
                    )             
                  }
                  Letras e números
                </p>
                <p>
                  {
                    passwordConfIsValid  ? (
                      <FiCheck color="#3751FE"/>
                    ) : (
                      <FiX color="#FE3737"/>
                    )             
                  }
                  Senha e Confirmação são iguais
                </p>
          </div>
            )
          }
        
          <div className="buttons">
            <button onClick={handleCreateUser}>Cadastrar</button>
            <button onClick={() => history.push("/")}>Voltar</button>
          </div>
        </Form>
      </Content>
    </Container>
  )
}

export default SignUp