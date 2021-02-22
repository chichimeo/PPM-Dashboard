const getGroupList = (httpClient) => {
  return httpClient.get(`group/list`)
    .then(res => res.data.data)
}

const getGroupVueTable = (httpClient, filtering, sorting, paging, params) => {
  return httpClient.get(`group`, { params: {
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

const addGroup = (httpClient, group) => {
  return httpClient.post(`group`, group)
    .then(res => res.data)
}

const updateGroup = (httpClient, group) => {
  return httpClient.patch(`group/${group._id}`, group)
    .then(res => res.data)
}

const deleteGroup = (httpClient, id) => {
  return httpClient.delete(`group/${id}`)
    .then(res => res.data)
}

export default {
  getGroupList,
  getGroupVueTable,
  addGroup,
  updateGroup,
  deleteGroup
}
