import axios from 'axios'

const url = "http://localhost:8000/api/members";

const getMembers = () =>
{
  return axios.get(url);
}

const getMember = (id) =>
{
  return axios.get(url + `/${id}`)
}

const addMember = ( obj) =>
{
  axios.post(url,obj)
   .then(resp => alert(resp.data))
}

const editMember = (id, obj) =>
{
  let address = url + `/${id}`
  return axios.put(address, obj)
}

const deleteMember = ( id) =>
{
  axios.delete(url + '/' + id)
   .then(resp => alert(resp.data))
}

export default {getMembers,getMember,addMember,editMember,deleteMember};
