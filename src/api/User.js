const getUserVueTable = (httpClient, filtering, sorting, paging, params) => {
  return httpClient.get(`user`, { params: {
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

const addUser = (httpClient, user) => {
  return httpClient.post(`user`, user)
    .then(res => res.data)
}

const updateUser = (httpClient, user) => {
  return httpClient.patch(`user/${user._id}`, user)
    .then(res => res.data)
}

const deleteUser = (httpClient, id) => {
  return httpClient.delete(`user/${id}`)
    .then(res => res.data)
}

export default {
  getUserVueTable,
  addUser,
  updateUser,
  deleteUser
}
