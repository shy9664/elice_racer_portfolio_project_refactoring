import axios from "axios"

const logout = async () => {
    
    const url = 'http://127.0.0.1:5000/logout';
    
    await axios.get(url);
}

export default logout;