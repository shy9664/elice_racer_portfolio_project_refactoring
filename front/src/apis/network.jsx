import axios from "axios";

export const getNetwork = async (searchValue) => {

  const url = 'http://127.0.0.1:5000/network';

  if (searchValue === '') {searchValue = 'all'}
  const res = await axios.get(url, {params: {search:searchValue}});
  return res.data.data
}

export default getNetwork;