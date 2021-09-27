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
    await addCertificates(userId, addedCertificateData)  // POST로 자격증 추가함 axios쓰는건 await해줘야하는듯 이런데서도
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


  // useEffect(() => {
  //   return null; // 이 단계에서 자기자신이 삭제되도록. 자기자신이 삭제(unmount) 되었을 때 아무것도 나타내지 않도록.
  // })
  // unmount 문제라면 useEffect로 해결을...?? 아니 애초에.. 조각들은 useEffect로 했어야..했나? 독립적으로..? 
  // 아냐.. 윗 단계인 부모컴포넌트에서 useEffect를 해줘야하나? 
  // 아냐 음 .. editedCertificateData useState에 index도 넣어주면 되려나?
  // 애초에 여기에 editedCertificateData를 넣으면 안되는 거였나? 
  // 그니까 음 .. 편집 상태인 form같은 별도의 컴포넌트로 분리시키는거지. 
  // 근데 이 컴포넌트를 삭제(unmount)했을 때 살아있다? 는 게 문제인 것 같은데 .. 
  
  const [editedCertificateData, setEditedCertificateData] = useState({id, title, organization, date}); // id도 넣어줘야함 !! 지못미 내로직..
  const [oneEditedState, setOneEditedState] = useState(true);
  const [alive, setAlive] = useState(true);

  console.log(editedCertificateData)    // 아 찾았다. 이게 문제다. 이거때문에 계속 그.. 이전것으로 편집데이터가 유지된다. 그리고.. 그 상태도. 
                                        // unmounted component 문제인가? 근데 애초에.. 음.. unmount되는거같지가않은데.. 음..? 아닌가?.,.
                                        // 근데 애초에 음 .. 재렌더링이 제대로 작동한다면.. 관계없어야할 문제아닌가?
                                        // 근데 사실 재렌더링은 제대로 되거든.. 
                                        // 그럼.. 재렌더링되더라도 그 편집 데이터는 남아있기때문인데.. 
                                        // 그 편집 데이터가 왜 남아있냐면 각 자격증(컴포넌트)이 독립적이지 않아서 .. ?
                                        // 편집하기 버튼을 눌렀을 때, editedCertificateData가 되어버리고, 
                                        // 그걸 삭제하고 난 뒤, 그 다음의 것을 눌렀을 때 이전의 editedCertificateData가 되버린다?
                                        // 혹은, 그 자리에 원래 컴포넌트의 데이터가 남게된다? 
                                        // 아 아냐아냐 모두 다 취소하고, 
                                        // 처음에 렌더링될 때 각 컴포넌트의 editedCertificateData가 결정되어버림 ㅇㅇ 
                                        // 그래서, 어떤 것을 삭제하고 눌렀을 때, 이미 결정된 editedCertificateData가 보여지는것!!
                                        // 그럼 음 .. useEffect로 하고, unmount를 해야하나?
                                        // 컴포넌트 삭제는.. props로부터물려받지 못햇을때 자연스럽게 삭제되는 것..?
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
    await updateCertificates(id, editedCertificateData)
    const editCompleteData = [...certificateDatas]   // 이것도 결국 의미 없는거아닌간 ..? 그냥 fetch시키니까
    editCompleteData.splice(index, 1, editedCertificateData)
    setCertificateDatas(editCompleteData)
    setEditState(editState => !editState)
    setOneEditedState(oneEditedState => !oneEditedState)
  }

  const handleDeleteBtn = async () => {
    await deleteCertificates(id)
    // const editCompleteData = [...certificateDatas] 
    // editCompleteData.splice(index, 1)
    // setCertificateDatas(editCompleteData)
    // setEditState(editState => !editState)
    // setOneEditedState(oneEditedState => !oneEditedState)
    setAlive(alive => !alive)  // 아 .. 그냥 이렇게 삭제시킴..  위에거 주석처리한건, 한번에 두개가 삭제되게 되어버리기 때문.. 
                              // 애초에 내 로직은 삭제시킬 필요가 있는게 아니라.. 그냥 state에 따라 렌더링 되는.. 야매로 해버린건가.. 
  }

  return alive ? (
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
  ) : null 
}

const Certificate = ({userId, isLoggedUser}) => {
  

  const [addState, setAddState] = useState(false)
  const [editState, setEditState] = useState(false)   // editState라고 명명할 필요는 없을듯. 그냥 토글

  const [certificateDatas, setCertificateDatas] = useState([]);  // 이게 필요가없는거같은데? 

//   useEffect(() => {
//     fetchCertificateDatas()
// }, [])



  const fetchCertificateDatas = async () => {
    const gotCertificateDatas = await getCertificates(userId)
    setCertificateDatas(gotCertificateDatas)
  }
  // const fetchCertificateDatas = async () => {
  //   await getCertificates(userId)
  //   .then(gotCertificateDatas => setCertificateDatas(gotCertificateDatas))   // 위에것을 일케 바꿈
  // }                                // 이건 함수니까 .then붙여서 이렇게 사용할 수 있는거. 근데.. 위에께 더 맞는 ..? 듯? 

  useEffect(() => {  
    if (addState === false || editState === false) {  // 추가한 녀석도 id를 부여하기 위해 다시 fetch하고, update도 마찬가지.
    fetchCertificateDatas()
    }
  }, [addState, editState])

  // const handleAddBtn = () => {
  //   setAddState(!addState) // 여기서 금방 안바뀌네? 
  // }
  const handleAddBtn = () => {
    setAddState((addState) => {return !addState})      // 바로 변경이 안되네.. 계속.. 
  }
  // 여기에 문제가 있는거같은데. 이거 그대로 써서. ,,, 삭제하고 남는거..  아닌가.. 삭제했을때의 데이터가 남는이유가 뭘까 대체.. 
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