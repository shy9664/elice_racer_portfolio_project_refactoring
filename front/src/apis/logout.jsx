import axios from "axios"

const logout = async () => {
    
    const url = 'kdt-1st-project-74.koreacentral.cloudapp.azure.com/api/logout';
    
    await axios.get(url);
}

export default logout;