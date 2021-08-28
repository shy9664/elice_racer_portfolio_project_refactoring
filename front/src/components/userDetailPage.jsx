import Certificate from "./portfolio/certificate";

import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UserDetailPage = () => {

  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)

  const userId = searchParams.get('id')

  const isLoggedUser = useSelector((state) => state.isLoggedUser)

  return (
    <div>
      <Certificate userId={userId} isLoggedUser={isLoggedUser}/>
    </div>
  )
}

export default UserDetailPage; 
