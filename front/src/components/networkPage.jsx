import getNetwork from '../apis/network'
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Network from './network';

const NetworkPageWrapper = styled.div`

`

const NetworkPage = () => {

  const [networkData, setNetworkData] = useState([]);

  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    fetchNetworkDatas(searchValue)
  }, [searchValue])

  const fetchNetworkDatas = async (searchValue) => {
    const gotNetworkDatas = await getNetwork(searchValue)
    setNetworkData(gotNetworkDatas)
  }

  const handleChange = async (e) => {
    setSearchValue(e.target.value)
  }

  return (
    <div>
      <input onChange={handleChange} value={searchValue} placeholder='검색을 해보세요'></input>
      <NetworkPageWrapper>
        {(networkData.length === 0) ? <h3>유저가 없습니다</h3> :
        <Network networkData={networkData}/>
        }
      </NetworkPageWrapper>
    </div>
    
  )
}

export default NetworkPage; 
