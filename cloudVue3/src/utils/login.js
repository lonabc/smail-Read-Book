import request from '@/utils/request.js'
import { dateEquals } from 'element-plus'

export const BaseUrl = 'localhost:8080'
export const DemoUrl = 'localhost:8087'
export function sendLogin(name2, password2) {
  return request.post(`http://${BaseUrl}/User/login`, {
    name: name2,
    password: password2
  })
}

export function sendEmail(email) {
  return request.post(`http://${BaseUrl}/User/emailCode/${email}`)
}

export function sendRegister(formData) {

  return request.post(`http://${BaseUrl}/User/register`, formData)
}


//用户服务区方法
export function uploadFile(file) {
  const formData = new FormData();
  formData.append('image', file); // 后端接收的参数名必须是 `image`

  return request.post(`http://${DemoUrl}/Demo/uploadFile`, formData);
}