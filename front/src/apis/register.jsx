import axios from "axios"
import BACKEND_URL from "../env";

const register = async (registerForm) => {
    
    const url = `${BACKEND_URL}/register`;
    let form = new FormData()
    form.append('user_id', registerForm.userId)
    form.append('user_pw', registerForm.userPw)
    form.append('user_pw2', registerForm.userPw2)
    form.append('user_name', registerForm.userName)
    
    await axios.post(url, form);

}

export default register;