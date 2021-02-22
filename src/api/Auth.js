const authentication = (ui) => {
  return {
    basic ({ username, password }) {
      return ui.http.post(`auth/login`, { username, password })
        .then(body => {
          if (!body) {
            return
          }

          return body.data
        })
        .catch(body => body.response.data)
    }
  }
}

export default { authentication }
