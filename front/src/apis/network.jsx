import axios from "axios";
import BACKEND_URL from "../env";

export const getNetwork = async (searchValue) => {

  const url = `${BACKEND_URL}/network`;

  if (searchValue === '') {searchValue = 'all'}
  const res = await axios.get(url, {params: {search:searchValue}});
  return res.data.data
}

export default getNetwork;