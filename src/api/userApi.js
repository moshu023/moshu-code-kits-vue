import axios from '@/utils/request';

export function userLogin(params) {
  return axios.post({
    url: '/user/login',
    data: params
  }).then((res) => {
    return res
  })
}
export const userRegister=(params)=>{
  return axios.post({
    url: '/user/register',
    data: params
  }).then((res) => {
    return res
  })
}
export const userLogout=()=>{
  return axios.post({
    url: '/user/logout'
  }).then((res) => {
    return res
  })
}
