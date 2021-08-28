import styled from "styled-components"
import { useHistory, Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";

const StyledNetworkDataPiece = styled.div`
  border: solid 1px black;
`

const NetworkDataListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 398px);
  grid-column-gap: 19px;
  grid-row-gap: 32px;
`

const NetworkDataPiece = ({userData}) => { 
  
  const history = useHistory();

  const handleClick = (user_id) => {
    history.push(`/userDetail?id=${user_id}`)
  }

  return (
    <StyledNetworkDataPiece>
      <div>
        <p>{userData.user_name}</p>
        <button onClick={e=>handleClick(userData.user_id)}>유저정보보기</button>
      </div>
    </StyledNetworkDataPiece>
  )
}

const Network = ({networkData}) => {

  const isLoggedUser = useSelector((state) => state.isLoggedUser)

  if (isLoggedUser === '') {
    return <Redirect to='/' />
  }

  const networkDataList = networkData.map((userData, i) => 
    <div key={i}>
      <NetworkDataPiece userData={userData}/>
    </div>
    );
  
  return (
    <NetworkDataListWrapper>
      {networkData &&
      networkDataList}
    </NetworkDataListWrapper>
  )
}

export default Network;