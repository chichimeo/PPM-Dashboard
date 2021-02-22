
const updateAgent = (httpClient, form) => {
  return httpClient.post(`update/agent`, form, { headers: { 'Content-Type': 'multipart/form-data' }, timeout: 600000 })
    .then(res => res.data)
}

const updateDb = (httpClient, form) => {
  return httpClient.post(`update/db`, form, { headers: { 'Content-Type': 'multipart/form-data' }, timeout: 600000 })
    .then(res => res.data)
}

export default {
  updateAgent,
  updateDb
}
