const getLicenseList = (httpClient) => {
  return httpClient.get(`license`)
    .then(res => res.data.data)
}

const addLicense = (httpClient, license) => {
  return httpClient.post(`license`, license)
    .then(res => res.data)
}

const updateLicense = (httpClient, license) => {
  return httpClient.patch(`license/${license._id}`, license)
    .then(res => res.data)
}

const deleteLicense = (httpClient, id) => {
  return httpClient.delete(`license/${id}`)
    .then(res => res.data)
}

export default {
  getLicenseList,
  addLicense,
  updateLicense,
  deleteLicense
}
