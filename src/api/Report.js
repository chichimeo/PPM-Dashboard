const getPDFReport = (httpClient, filter) => {
  return httpClient.post(`report/pdf`, filter, { responseType: 'arraybuffer' })
    .then(res => res.data)
}

const getXMLReport = (httpClient, filter) => {
  return httpClient.post(`report/xml`, filter)
    .then(res => res.data)
}

const submitXMLReport = (httpClient, filter) => {
  return httpClient.post(`report/xml/submit`, filter)
    .then(res => res.data)
}

export default {
  getPDFReport,
  getXMLReport,
  submitXMLReport
}
