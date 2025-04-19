import axios from 'axios'
axios.defaults.baseURL = ''
export const prediction = (obj) => {
  return axios.post('/api/prediction/prediction', obj)
}
