const getPolicyVueTable = (httpClient, filtering, sorting, paging, params) => {
  return httpClient.get(`policy`, { params: {
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

const addPolicy = (httpClient, policy) => {
  return httpClient.post(`policy`, policy)
    .then(res => res.data)
}

const updatePolicy = (httpClient, policy) => {
  return httpClient.patch(`policy/${policy._id}`, policy)
    .then(res => res.data)
}

const deletePolicy = (httpClient, id) => {
  return httpClient.delete(`policy/${id}`)
    .then(res => res.data)
}

export default {
  getPolicyVueTable,
  addPolicy,
  updatePolicy,
  deletePolicy
}
