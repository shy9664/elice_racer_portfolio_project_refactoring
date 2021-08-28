import Certificate from './portfolio/certificate';
import { useLocation, Redirect,  } from 'react-router-dom';

import { useSelector } from 'react-redux';

const MainPage = () => {

  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)

  const userId = searchParams.get('id')

  const isLoggedUser = useSelector((state) => state.isLoggedUser)

  if (isLoggedUser==='' || userId !== isLoggedUser) {
    return <Redirect to='/' />
  }

  return (
    <div>
      <Certificate userId={userId} isLoggedUser={isLoggedUser}/>
    </div>
  )
}

export default MainPage; 
