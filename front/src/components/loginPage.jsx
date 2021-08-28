import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { useState } from 'react'
import login from '../apis/login'

import { useDispatch } from 'react-redux'
import userLogin from '../redux/action'

const LoginCSS = styled.div`
  display: flex;
  align-items: center;
  height: 400px;
  width: 500px;
`

const LoginPage = () => {

  const dispatch = useDispatch();

  const history = useHistory();
  
  const [loginData, setLoginData] = useState({userId: '', userPw: ''});

  const handleChange = (e) => {
    const {name, value} = e.target;
    const newLoginData = {...loginData};
    newLoginData[name] = value;
    setLoginData(newLoginData)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const userId = await login(loginData)
    dispatch(userLogin(userId))
    history.push(`/main?id=${userId}`)
  }

  const handleRegister = () => {
    history.push('/register')
  }

  return (
    <LoginCSS>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="id">아이디</label><br />
          <input value={loginData.userId} onChange={handleChange} id='id' name='userId' required/>
        </div>
        <div>
          <label htmlFor='pw'>비밀번호</label><br />
          <input value={loginData.userPw} onChange={handleChange} type="password" id='pw' name='userPw' required/>
        </div>
        <button type='submit'>로그인</button>
        <button type='button' onClick={handleRegister}>회원가입</button>
      </form>
      <div>
      </div>
    </LoginCSS>
  )
}

export default LoginPage ;