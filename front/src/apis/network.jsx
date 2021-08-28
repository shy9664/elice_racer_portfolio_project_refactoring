import axios from "axios";

export const getNetwork = async (searchValue) => {

  const url = 'kdt-1st-project-74.koreacentral.cloudapp.azure.com/api/network';

  if (searchValue === '') {searchValue = 'all'}
  const res = await axios.get(url, {params: {search:searchValue}});
  return res.data.data
}

export default getNetwork;