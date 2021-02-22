const getConfig = (httpClient, params) => {
  return httpClient.get(`config`, { params: params })
    .then(res => res.data)
}

const updateConfig = (httpClient, config) => {
  return httpClient.put(`config`, config)
    .then(res => res.data)
}

export default {
  getConfig,
  updateConfig
}
