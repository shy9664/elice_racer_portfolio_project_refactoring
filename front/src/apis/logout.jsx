import axios from "axios"
import BACKEND_URL from "../env";

const logout = async () => {
    
    const url = `${BACKEND_URL}/logout`;
    
    const res = await axios.get(url);
    console.log(res.data)
}

export default logout;