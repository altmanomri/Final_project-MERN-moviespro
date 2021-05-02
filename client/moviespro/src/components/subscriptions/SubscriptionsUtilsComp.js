import axios from 'axios'

const url = "http://localhost:8000/api/subscriptions";

const getSubscriptions = () =>
{
  return axios.get(url);
}

const getSubscription = (id) =>
{
  return axios.get(url + `/${id}`)
}

const addSubscription = (obj) =>
{
  return axios.post(url,obj)
}

const editSubscription = (id, obj) =>
{
  let address = url + `/${id}`
  return axios.put(address, obj)
}

export default {getSubscriptions,getSubscription,addSubscription,editSubscription};
