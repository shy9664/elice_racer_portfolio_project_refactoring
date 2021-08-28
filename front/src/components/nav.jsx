import { useHistory } from "react-router-dom";
// import logout from "../apis/logout";
import {Navbar, Nav} from "react-bootstrap";

import { useSelector } from "react-redux";
// import userLogin from '../redux/action'

const Navibar = () => {

  const history = useHistory();

  const isLoggedUser = useSelector((state) => state.isLoggedUser)
  // const dispatch = useDispatch()

  // const handleLogout = (e) => {  // 로그아웃은 새로고침되도록. 
  //   e.preventDefault()
  //   dispatch(userLogin(''))
  //   logout()
  //   history.push('/')
  // }

  const handleMain = (e) => {
    e.preventDefault()
    history.push(`/main?id=${isLoggedUser}`)
  }

  const handleNetwork = (e) => {
    e.preventDefault()
    history.push(`/network`)
  }

  return(
    <div>
      <Navbar>
        <Nav.Link href='/main' onClick={handleMain}>메인</Nav.Link>
        <Nav.Link href='/network' onClick={handleNetwork}>네트워크</Nav.Link>
        <Nav.Link href='/'>로그아웃</Nav.Link>
      </Navbar>
    </div>
  )
}

export default Navibar;