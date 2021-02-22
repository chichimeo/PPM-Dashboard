const getScheduleVueTable = (httpClient, filtering, sorting, paging, params) => {
  return httpClient.get(`schedule`, { params: {
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

const addSchedule = (httpClient, schedule) => {
  return httpClient.post(`schedule`, schedule)
    .then(res => res.data)
}

const updateSchedule = (httpClient, schedule) => {
  return httpClient.patch(`schedule/${schedule._id}`, schedule)
    .then(res => res.data)
}

const deleteSchedule = (httpClient, id) => {
  return httpClient.delete(`schedule/${id}`)
    .then(res => res.data)
}

export default {
  getScheduleVueTable,
  addSchedule,
  updateSchedule,
  deleteSchedule
}
