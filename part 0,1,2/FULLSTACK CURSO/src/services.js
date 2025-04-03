import axios from 'axios'




const getAll = (baseUrl) => {
  return axios.get(baseUrl)
}

const create = (newObject, baseUrl) => {

  return axios.post(baseUrl, newObject)
}

const update = (id, newObject, baseUrl) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

const remove = (id, baseUrl) => {
    return axios.delete(`${baseUrl}/${id}`)
}


export default { getAll, create, update, remove}