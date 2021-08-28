import axios from "axios";

export const getCertificates = async (userId) => {

  const url = 'kdt-1st-project-74.koreacentral.cloudapp.azure.com/api/portfolio/certificate'

  const res = await axios.get(url, {params: {id:userId}})
  
  return res.data.data
}


export const updateCertificates = async (certId, editedCertificateData) => {
  const url = 'kdt-1st-project-74.koreacentral.cloudapp.azure.com/api/portfolio/certificate'

  let form = new FormData()

  form.append('title', editedCertificateData.title)
  form.append('organization', editedCertificateData.organization)
  form.append('date', editedCertificateData.date)
  form.append('id', certId)

  await axios.patch(url, form)
  return
}


export const addCertificates = async (userId, newCertificateData) => {  

  const url = 'kdt-1st-project-74.koreacentral.cloudapp.azure.com/api/portfolio/certificate'

  let form = new FormData()
  form.append('title', newCertificateData.title)
  form.append('organization', newCertificateData.organization)
  form.append('date', newCertificateData.date)
  form.append('user_id', userId)

  await axios.post(url, form)

  return 
}

export const deleteCertificates = async (certId) => {

  const url = 'kdt-1st-project-74.koreacentral.cloudapp.azure.com/api/portfolio/certificate'

  await axios.delete(url, {params: {cert_id: certId}})
  
  return
}
