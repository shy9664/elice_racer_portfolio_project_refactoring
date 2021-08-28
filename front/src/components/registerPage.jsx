import styled from 'styled-components'
import { useState } from 'react'
import register from '../apis/register';
import { useHistory } from 'react-router-dom';

const RegisterContainer = styled.div`
  display: flex;
  align-items: center;
  height: 400px;
  width: 1200px;
`

const RegisterPage = () => {

  const history = useHistory();

  const [registerData, setRegisterData] = useState({userId: '', userPw: '', userPw2: '', userName: ''});

  const handleChange = (e) => {
    const {name, value} = e.target;
    const newRegisterForm = {...registerData};
    newRegisterForm[name] = value;
    setRegisterData(newRegisterForm)
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    register(registerData)
    history.push('/')
  }
  
  return (
    <RegisterContainer>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='id'>아이디</label><br/>
          <input value={registerData.userId} onChange={handleChange} id='userId' name='userId' required/>
          </div>
        <div>
          <label htmlFor='pw'>비밀번호</label><br/>
          <input value={registerData.userPw} onChange={handleChange} type="password" id='userPw' name='userPw' required/>
          </div>
        <div>
          <label htmlFor='pw2'>비밀번호 확인</label><br/>
          <input value={registerData.userPw2} onChange={handleChange} type="password" id='userPw2' name='userPw2' required/>
          </div>
        <div>
          <label htmlFor='name'>이름</label><br/>
          <input value={registerData.userName} onChange={handleChange} id='userName' name='userName' required/>
        </div>
        <div>
          <button type='submit'>회원가입</button>
        </div>
      </form>
    </RegisterContainer>
  )
}

export default RegisterPage;