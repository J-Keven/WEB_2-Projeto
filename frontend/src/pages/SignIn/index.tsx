import {Link, useHistory } from "react-router-dom"
import {FiEyeOff, FiCheck, FiX } from "react-icons/fi"
import { Container, Content, Header, Form, Background} from "./style"
import * as yup from "yup"
import { useState } from "react"
import Logo from "../../assets/illustration.png"

import getValidatorErrors from '../../utils/getValidatorErros';
import { useAuthContext } from '../../Hooks/AuthContext';
import { toast } from "react-toastify"
const SignIn = () => {
  const [emailSelect, serEmailSelect] = useState(false)
  const [passwordSelect, setPasswordSelect] = useState(false)
  const [emailIsValid, setEmailIsValid] = useState(true)
  const [passwordIsValid, setPasswordIsValid] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passMinLength, setPassMinLength] = useState(false)
  const [passWithLettersNumbers, setpassWithLettersNumbers] = useState(false)

  const { login } = useAuthContext();
  const history = useHistory();

  const handleFocus = (fieldId: "email" | "password") => {
    if(fieldId === "email") {
      document.getElementById('email')?.focus();
      serEmailSelect(true)
    } else {
      document.getElementById('password')?.focus();
      setPasswordSelect(true)
    }
  }

  const handleLoggingUser = async () => {
    try {
      if(!emailIsValid) {
        toast.dark(`O valor prenechido no campo de Email é inválido.`);
        return;
      } else if(!passMinLength || !passWithLettersNumbers) {
        // falta dar olhada aqui
        toast.dark(`A senha deve ser composta por letra e numeor e deve ter no mínimo 6 caracteres`);
        return;
      } 
      

      await login({
        email,
        password
      })
      history.push('/feed');

    } catch (error: any) {
      if (error instanceof yup.ValidationError) {
        const errosFormated = getValidatorErrors(error);
        error.inner.forEach(err => {
          toast.dark(`O valor prenechido no campo de ${err.path} é inválido.`);
        })

      } else if(error.response.status == 401) {
        toast.dark('Email ou senha incorreta')
      }
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

  const handleValidate = (fieldId: "email" | "password") => {
    if(fieldId === "email") {
      var re = /\S+@\S+\.\S+/;
      setEmailIsValid(re.test(email))
    } else {
      setPasswordIsValid(password.length > 5)
      
    }
  }

  return (
    <Container>
      <Content>
        <Header>
          <h1>FreelasApp</h1>
          <h2>Bem vindo(a) a sua comunidade de Freelances</h2>
          <p>Bem vindo de volta! Por favor faça login na sua conta.</p>
        </Header>
        <Form >
          <div className="inputs" onClick={() => handleFocus("email")} onBlur={() => handleValidate("email")}>
            <p className="selected" style={{opacity: emailSelect ? 1: 0, background: emailIsValid ? "#3751FE" : "#FE3737"}}></p>
            <div>
              <p className="label">Email</p>
              <input 
                id="email" 
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
                <input id="password" className="fields" type="password" placeholder="******" min={6} onChange={handleSetPassword}/>
              </div>
              <FiEyeOff />
            </div>
          </div>
          <div className="forgotPassword">
            {/* // <Link to="#">Esqueceu sua senha?</Link> */}
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
          </div>
            )
          }
          <div className="buttons">
            <button onClick={handleLoggingUser}>Login</button>
            <button onClick={() => history.push("/sign-up")}>Sign Up</button>
          </div>
        </Form>
      </Content>

      <Background>
        <img src={Logo} alt=""/>
      </Background>
    </Container>
  )
}

export default SignIn