import axios from 'axios'

const url = "http://localhost:8000/api/movies";

const getMovies = () =>
{
  return axios.get(url);
}

const getMovie = (id) =>
{
  return axios.get(url + `/${id}`)
}

const addMovie = ( obj) =>
{
  return axios.post(url,obj)
}

const editMovie = (id, obj) =>
{
  let address = url + `/${id}`
  return axios.put(address, obj)
}

const deleteMovie = (id) =>
{
  axios.delete(url + `/${id}`)
   .then(resp => alert(resp.data))
}


export default {getMovies,getMovie,addMovie,editMovie,deleteMovie};
