import axios from "axios";

export const getCertificates = async (userId) => {

  const url = 'http://127.0.0.1:5000/portfolio/certificate';

  const res = await axios.get(url, {params: {id:userId}})
  
  return res.data.data
}


export const updateCertificates = async (certId, editedCertificateData) => {
  const url = 'http://127.0.0.1:5000/portfolio/certificate'

  let form = new FormData()

  form.append('title', editedCertificateData.title)
  form.append('organization', editedCertificateData.organization)
  form.append('date', editedCertificateData.date)
  form.append('id', certId)

  await axios.patch(url, form)
  return
}


export const addCertificates = async (userId, newCertificateData) => {  

  const url = 'http://127.0.0.1:5000/portfolio/certificate'

  let form = new FormData()
  form.append('title', newCertificateData.title)
  form.append('organization', newCertificateData.organization)
  form.append('date', newCertificateData.date)
  form.append('user_id', userId)

  await axios.post(url, form)

  return 
}

export const deleteCertificates = async (certId) => {

  const url = 'http://127.0.0.1:5000/portfolio/certificate'

  await axios.delete(url, {params: {cert_id: certId}})
  
  return
}
