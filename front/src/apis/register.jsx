import axios from "axios"

const register = async (registerForm) => {
    
    const url = 'kdt-1st-project-74.koreacentral.cloudapp.azure.com/api/register'; 
    let form = new FormData()
    form.append('user_id', registerForm.userId)
    form.append('user_pw', registerForm.userPw)
    form.append('user_pw2', registerForm.userPw2)
    form.append('user_name', registerForm.userName)
    
    await axios.post(url, form);

}

export default register;