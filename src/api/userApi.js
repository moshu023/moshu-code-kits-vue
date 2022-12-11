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
/**
 * 获取所有用户列表信息
 * @param params
 * @returns {Promise<unknown>}
 */
export const getUserList=(params)=>{
  return axios.post({
    url: '/user/search',
    data: params
  }).then((res) => {
    return res
  })
}

/**
 * 删除用户
 * @param params
 * @returns {Promise<unknown>}
 */
export const deleteUser=(params)=>{
  return axios.post({
    url: '/user/delete',
    data: params
  }).then((res) => {
    return res
  })
}

/**
 * 超级管理员插入用户
 * @param params
 * @returns {Promise<unknown>}
 */
export const insertUser=(params)=>{
  return axios.post({
    url: '/user/insert',
    data: params
  }).then((res) => {
    return res
  })
}

/**
 * 根据id获取用户信息
 * @param params
 * @returns {Promise<unknown>}
 */
export const getUserInfo=(params)=>{
  return axios.post({
    url: '/user/info',
    data: params
  }).then((res) => {
    return res
  })
}

/**
 * 超级管理员更新用户信息
 * @param params
 * @returns {Promise<unknown>}
 */
export const adminUpdateUser=(params)=>{
  return axios.post({
    url: '/user/admin/update',
    data: params
  }).then((res) => {
    return res
  })
}

// 用户个人中心 API

/**
 * 获取用户信息
 * @param params
 * @returns {Promise<unknown>}
 */
export const getCurrentUserInfo=()=>{
  return axios.get({
    url: '/user/current'
  }).then((res) => {
    return res
  })
}

/**
 * 获取用户信息
 * @param params
 * @returns {Promise<unknown>}
 */
export const updateCurrentUserInfo=(params)=>{
  return axios.post({
    url: '/user/current/update',
    data: params
  }).then((res) => {
    return res
  })
}

/**
 * 用户上传头像
 * @param params
 * @returns {Promise<unknown>}
 */
export const uploadAvatar=(params)=>{
  return axios.post({
    url: '/oss/upload',
    data: params
  }).then((res) => {
    return res
  })
}
