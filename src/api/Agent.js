const getAgentVueTable = (httpClient, filtering, sorting, paging, params) => {
  return httpClient.get(`agent`, { params: {
    search: filtering ? filtering.query : null,
    fields: filtering ? filtering.fields.join() : null,
    sort: sorting ? sorting.by : null,
    order: sorting ? sorting.order : null,
    page: paging ? paging.page : null,
    limit: paging ? paging.perPage : null,
    ...params
  } })
    .then(res => res.data)
}

const getCommandsVueTable = (httpClient, filtering, sorting, paging, params) => {
  return httpClient.get(`command`, { params: {
    search: filtering ? filtering.query : null,
    fields: (filtering && filtering.fields) ? filtering.fields.join() : null,
    sort: sorting ? sorting.by : null,
    order: sorting ? sorting.order : null,
    page: paging ? paging.page : null,
    limit: paging ? paging.perPage : null,
    ...params
  } })
    .then(res => res.data)
}

const sendCommand = (httpClient, payload) => {
  return httpClient.post(`command`, payload)
    .then(res => res.data)
}

const getAgentFrequency = (httpClient, params) => {
  return httpClient.get(`agent/frequency`, { params: params })
    .then(res => res.data)
}

const updateAgent = (httpClient, payload) => {
  return httpClient.patch(`agent`, payload)
    .then(res => res.data)
}

const getAgentCount = (httpClient, params) => {
  return httpClient.get(`agent/count`, { params: params })
    .then(res => res.data)
}

const getListVersion = (httpClient) => {
  return httpClient.get(`agent/update`)
    .then(res => res.data)
}

const getLatestVersion = (httpClient) => {
  return httpClient.get(`agent/update/latest`)
    .then(res => res.data)
}

export default {
  updateAgent,
  getAgentVueTable,
  getCommandsVueTable,
  sendCommand,
  getAgentFrequency,
  getAgentCount,
  getListVersion,
  getLatestVersion
}
