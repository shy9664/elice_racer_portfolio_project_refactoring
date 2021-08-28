import axios from "axios"

const login = async (loginForm) => {

    const url = 'http://127.0.0.1:5000'; // 모든 api에 대해서 통일하기 위해 따로 파일에다가 변수에 저장하는 방식으로 하기도..
    let form = new FormData()
    form.append('user_id', loginForm.userId)
    form.append('user_pw', loginForm.userPw)
    
    const res = await axios.post(url, form);

    return res.data.data.user_id
}

export default login;