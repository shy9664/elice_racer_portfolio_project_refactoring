import axios from "axios";
import BACKEND_URL from "../env";

export const getCertificates = async (userId) => {

  const url = `${BACKEND_URL}/portfolio/certificate`

  const res = await axios.get(url, {params: {id:userId}})
  console.log('get', res.status)
  console.log('getData', res.data.data)
  return res.data.data

}


export const updateCertificates = async (certId, editedCertificateData) => {
  const url = `${BACKEND_URL}/portfolio/certificate`
  let form = new FormData()

  form.append('title', editedCertificateData.title)
  form.append('organization', editedCertificateData.organization)
  form.append('date', editedCertificateData.date)
  form.append('id', certId)

  const res = await axios.patch(url, form)
  console.log('update', res.status)
  return
}


export const addCertificates = async (userId, newCertificateData) => {  

  const url = `${BACKEND_URL}/portfolio/certificate`

  let form = new FormData()
  form.append('title', newCertificateData.title)
  form.append('organization', newCertificateData.organization)
  form.append('date', newCertificateData.date)
  form.append('user_id', userId)

  const res = await axios.post(url, form)
  console.log('post', res.status)
  return 
}

export const deleteCertificates = async (certId) => {

  const url = `${BACKEND_URL}/portfolio/certificate`

  await axios.delete(url, {params: {cert_id: certId}})
  
  return
}
