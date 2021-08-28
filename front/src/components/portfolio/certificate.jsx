import { useState, useEffect } from "react";
import { addCertificates, deleteCertificates, getCertificates, updateCertificates } from "../../apis/certificate";
import styled from 'styled-components'


const StyledCertificate = styled.div`
  border: solid 1px black;
  width: 600px;
`

const StyledCertificatePiece = styled.div`
  border: solid 1px black;
`

const NewCertificate = ({addState, setAddState, userId, setCertificateDatas, certificateDatas}) => {
  
  const [addedCertificateData, setAddedCertificateData] = useState({title:'', organization:'', date:''});

  const handleChange = e => {
    const {name, value} = e.target;
    const newCertificateData = {...addedCertificateData};
    newCertificateData[name] = value;
    setAddedCertificateData(newCertificateData)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addCertificates(userId, addedCertificateData)
    setAddedCertificateData(addedCertificateData)
    const addedCertificateDatas = [...certificateDatas, addedCertificateData]
    setCertificateDatas(addedCertificateDatas)
    setAddedCertificateData({title:'', organization:'', date:''})
    setAddState(!addState)
  }

  return (
    <div>
      {addState ?
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='title'>자격증 명: </label>
            <input value={addedCertificateData.title} onChange={handleChange} name='title'></input><br />
          </div>
          <div>
          <label htmlFor='organization'> 발급 기관: </label>
          <input value={addedCertificateData.organization} onChange={handleChange} name='organization'></input><br />
          </div>
          <div>
          <label htmlFor='date'>취득 날짜: </label>
          <input value={addedCertificateData.date} onChange={handleChange} name='date'></input><br />
          </div>
          <button type='submit'>추가 완료</button>
        </form>
      </div>
      : null }
    </div>
  )
}

const CertificatePiece = ({index, id, title, organization, date, userId, isLoggedUser, certificateDatas, setCertificateDatas}) => { 

  const [editState, setEditState] = useState(false) 
  const [editedCertificateData, setEditedCertificateData] = useState({id, title, organization, date}); // id도 넣어줘야함 !! 지못미 내로직..

  const handleEdit = () => {
    setEditState(!editState)
  }

  const handleChange = e => {
    const {name, value} = e.target;
    const newCertificateData = {...editedCertificateData};
    newCertificateData[name] = value;
    setEditedCertificateData(newCertificateData)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    updateCertificates(id, editedCertificateData)
    // setEditedCertificateData(editedCertificateData)  // set을해도, 부모가 넘겨주는 데이터가 동일하기때문에 안바뀌는듯. 
    //아. 화면상에서만 바꿀게 아니라,,, 부모컴포넌트에서 넘겨주는 데이터에서 그 인덱스에 맞는 컴포넌트를 수정하도록 해야되네. 
    //근데 그럴려면.. 부모컴포넌트에서 넘겨주는 데이터의 인덱스에 대한 자료가 바뀌려면,, 
    //실제 데이터가 달라야함.. 아. 부모의 state인 certificateDatas를 바꾸면 되려나? 
    const editCompleteData = [...certificateDatas] // 여기서는 또 없는 id인것을 받아와버리니까..!
    editCompleteData.splice(index, 1, editedCertificateData)
    setCertificateDatas(editCompleteData)
    setEditState(!editState);
  }

  const handleDeleteBtn = () => {
    deleteCertificates(id)
    window.location.reload()
  }

  return (
  <StyledCertificatePiece>
    {!editState ?
    <div>
      <p>자격증 명: {title}</p>
      <p>발급 기관 :{organization}</p>
      <p>취득 날짜: {date}</p>
      {userId === isLoggedUser && <button onClick={handleEdit}>편집하기</button> }
    </div>
    :
    <form onSubmit={handleSubmit}>
      <label htmlFor='title'>자격증 명: </label>
      <input value={editedCertificateData.title} onChange={handleChange} name='title'></input><br />
      <label htmlFor='organization'> 발급 기관: </label>
      <input value={editedCertificateData.organization} onChange={handleChange} name='organization'></input><br />
      <label htmlFor='date'>취득 날짜: </label>
      <input value={editedCertificateData.date} onChange={handleChange} name='date'></input><br />
      <button type='submit'>수정완료</button>
      <button type='button' onClick={handleDeleteBtn}>삭제하기</button>
    </form>
    }
  </StyledCertificatePiece>
  )
}

const Certificate = ({userId, isLoggedUser}) => {
  
  const [addState, setAddState] = useState(false)

  const [certificateDatas, setCertificateDatas] = useState([]);

  useEffect(() => {  // 이걸 다른 포트폴리오 정보들과 묶어서 한 번에 했어야 했음. 메인페이지 같은 데서. 
    fetchCertificateDatas()
}, [])

  useEffect(() => {  // 추가했을 때 재렌더링되도록.. 근데 왜 true일때 정상작동하는것처럼 보이지? false를 유도해야하는데. 그래서.. 새로 추가한건 id가 없음.. 해결못함.. 
    if (addState === true) {
    fetchCertificateDatas()}
  }, [addState])

  const fetchCertificateDatas = async () => {
    const gotCertificateDatas = await getCertificates(userId)
    setCertificateDatas(gotCertificateDatas)
  }

  const handleAddBtn = () => {
    setAddState(!addState)
  }
  
  const certificateDataslist = certificateDatas.map((certificateData, i) => 
      <div key={i}>    
        <CertificatePiece index={i} id={certificateData.id} title={certificateData.title} organization={certificateData.organization} date={certificateData.date} userId={userId} isLoggedUser={isLoggedUser} certificateDatas={certificateDatas} setCertificateDatas={setCertificateDatas}/>
      </div>
    );

  return (
    <StyledCertificate>
      <h3>자격증</h3>
      {certificateDatas && certificateDataslist}
      {(userId === isLoggedUser) && !addState ? <button onClick={handleAddBtn}>자격증 추가하기</button> : null}
      <NewCertificate addState={addState} setAddState={setAddState} userId={userId} setCertificateDatas={setCertificateDatas} certificateDatas={certificateDatas} />
    </StyledCertificate>
  )
}



export default Certificate;