const getEventVueTable = (httpClient, filtering, sorting, paging, params) => {
  return httpClient.get(`event`, { params: {
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

const getEventFrequency = (httpClient, params) => {
  return httpClient.get(`event/frequency`, { params: params })
    .then(res => res.data)
}

const getEventDateFrequency = (httpClient, params) => {
  return httpClient.get(`event/frequency/date`, { params: params })
    .then(res => res.data)
}

const getEventCount = (httpClient, params) => {
  return httpClient.get(`event/count`, { params: params })
    .then(res => res.data)
}

const getEventSample = (httpClient, filename) => {
  return httpClient.get(`event/sample/${filename}`, { responseType: 'arraybuffer' })
}

export default {
  getEventVueTable,
  getEventFrequency,
  getEventDateFrequency,
  getEventCount,
  getEventSample
}
