import axios from 'axios'

const base = '/api/persons'

const getAll = () => {
  return axios.get(base)
}

const create = (personObj) => {
  return axios.post(base, personObj)
}

const update = (id, newObject) => {
  return axios.put(`${base}/${id}`, newObject)
}

const deletePerson = (id) => {
  return axios.delete(`${base}/${id}`)
}

export default {
  getAll: getAll,
  create: create,
  update: update,
  deletePerson: deletePerson 
}