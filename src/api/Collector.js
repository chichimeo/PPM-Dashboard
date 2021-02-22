const getCollectorTable = (httpClient, filtering, sorting, paging, params) => {
  return httpClient.get(`collector`, { params: {
    _search: filtering ? filtering.query : null,
    _fields: filtering ? filtering.fields.join() : null,
    _sort: sorting ? sorting.by : null,
    _order: sorting ? sorting.order : null,
    _page: paging ? paging.page : null,
    _limit: paging ? paging.perPage : null,
    ...params
  } })
    .then(res => res.data)
}

const addCollector = (httpClient, collector) => {
  return httpClient.post(`collector`, collector)
    .then(res => res.data)
}

const updateCollector = (httpClient, collector) => {
  return httpClient.patch(`collector/${collector._id}`, collector)
    .then(res => res.data)
}

const deleteCollector = (httpClient, id) => {
  return httpClient.delete(`collector/${id}`)
    .then(res => res.data)
}

const sendEvent = (httpClient, idCollector, payload) => {
  return httpClient.post(`collector/${idCollector}/send`, payload)
    .then(res => res.data)
}

export default {
  getCollectorTable,
  addCollector,
  updateCollector,
  deleteCollector,
  sendEvent
}
