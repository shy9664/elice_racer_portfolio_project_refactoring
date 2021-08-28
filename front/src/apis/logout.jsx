import axios from "axios"
import BACKEND_URL from "../env";

const logout = async () => {
    
    const url = `${BACKEND_URL}/logout`;
    
    await axios.get(url);
}

export default logout;