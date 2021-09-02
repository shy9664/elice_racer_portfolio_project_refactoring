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

  const handleChange = e => {   // 입력할 때마다 변경되게. 
    const {name, value} = e.target;
    const newCertificateData = {...addedCertificateData};
    newCertificateData[name] = value;
    setAddedCertificateData(newCertificateData)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await addCertificates(userId, addedCertificateData)  // POST로 자격증 추가함
    // setAddedCertificateData(addedCertificateData)  // ?
    const addedCertificateDatas = [...certificateDatas, addedCertificateData]
    setCertificateDatas(addedCertificateDatas)  // 부모컴포넌트 재렌더링. 그렇다고 fetch하지는 않음 그럼.. 쓸모없지않나 
    setAddedCertificateData({title:'', organization:'', date:''})  // 다시 공란으로 초기화
    setAddState(addState => {return !addState})
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

const CertificatePiece = ({index, id, title, organization, date, userId, isLoggedUser, certificateDatas, setCertificateDatas, editState, setEditState}) => { 

  const [editedCertificateData, setEditedCertificateData] = useState({id, title, organization, date}); // id도 넣어줘야함 !! 지못미 내로직..
  const [oneEditedState, setOneEditedState] = useState(true);

  const handleEditBtn = () => {
    setOneEditedState(oneEditedState => !oneEditedState)
  }

  const handleChange = e => {
    const {name, value} = e.target;
    const newCertificateData = {...editedCertificateData};
    newCertificateData[name] = value;
    setEditedCertificateData(newCertificateData)
  }

  const handleSubmit = async (e) => {  // 이것들도 await 하위에 다 then으로 해줘야하나? add도글코..
    e.preventDefault()
    console.log(id)
    await updateCertificates(id, editedCertificateData)
    const editCompleteData = [...certificateDatas]   // 이것도 결국 의미 없는거아닌간 ..? 그냥 fetch시키니까
    editCompleteData.splice(index, 1, editedCertificateData)
    setCertificateDatas(editCompleteData)
    setEditState(editState => !editState)
    setOneEditedState(oneEditedState => !oneEditedState)
  }

  const handleDeleteBtn = async () => {
    await deleteCertificates(id)
    const editCompleteData = [...certificateDatas] 
    editCompleteData.splice(index, 1)
    setCertificateDatas(editCompleteData)
    setEditState(editState => !editState)
    setOneEditedState(oneEditedState => !oneEditedState)
  }

  return (
  <StyledCertificatePiece>
    {oneEditedState ?
    <div>
      <p>자격증 명: {title}</p>
      <p>발급 기관 :{organization}</p>
      <p>취득 날짜: {date}</p>
      {userId === isLoggedUser && <button onClick={handleEditBtn}>편집하기</button> }
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
  const [editState, setEditState] = useState(false)   // editState라고 명명할 필요는 없을듯. 그냥 토글

  const [certificateDatas, setCertificateDatas] = useState([]);  // 이게 필요가없는거같은데? 

//   useEffect(() => {
//     fetchCertificateDatas()
// }, [])

  useEffect(() => {  
    if (addState === false || editState === false) {  // 추가한 녀석도 id를 부여하기 위해 다시 fetch하고, update도 마찬가지.
    fetchCertificateDatas()
    }
  }, [addState, editState])

  // const fetchCertificateDatas = async () => {
  //   const gotCertificateDatas = await getCertificates(userId)
  //   setCertificateDatas(gotCertificateDatas)
  // }
  const fetchCertificateDatas = async () => {
    await getCertificates(userId)
    .then(gotCertificateDatas => setCertificateDatas(gotCertificateDatas))   // 위에것을 일케 바꿈
  }                                // 이건 함수니까 .then붙여서 이렇게 사용할 수 있는거.

  // const handleAddBtn = () => {
  //   setAddState(!addState) // 여기서 금방 안바뀌네? 
  // }
  const handleAddBtn = () => {
    setAddState((addState) => {return !addState})      // 바로 변경이 안되네.. 계속.. 
  }

  const certificateDataslist = certificateDatas.map((certificateData, i) => 
      <div key={i}>    
        <CertificatePiece 
        index={i} 
        id={certificateData.id} 
        title={certificateData.title} 
        organization={certificateData.organization} 
        date={certificateData.date} 
        userId={userId} 
        isLoggedUser={isLoggedUser} 
        certificateDatas={certificateDatas} 
        setCertificateDatas={setCertificateDatas}
        editState={editState}
        setEditState={setEditState}/>
      </div>
    );

  return (
    <StyledCertificate>
      <h3>자격증</h3>
      {certificateDatas && certificateDataslist}
      {(userId === isLoggedUser) && !addState ? <button onClick={handleAddBtn}>자격증 추가하기</button> : null}
      <NewCertificate 
      addState={addState} 
      setAddState={setAddState} 
      userId={userId} 
      setCertificateDatas={setCertificateDatas} 
      certificateDatas={certificateDatas} />
    </StyledCertificate>
  )
}



export default Certificate;