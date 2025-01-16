import request from '@/utils/request.js'
import { ref, reactive, toRaw } from 'vue'
import { userInformation } from '@/stores/counter'


export const DemoUrl = 'localhost:8087'  //localhost:8087
const testUrl = 'localhost:8080'// localhost:8080
const store = userInformation();


export function changePhone(phoneNumber) {
    const formData = new FormData();
    formData.append('phoneNumber', phoneNumber); // 后端接收的参数名必须是 `image`
    request.post(`http://${testUrl}/Demo/phoneNumberChange`, formData)
}

//发布帖子功能
export function postNode(Note, noteUserid, files) {

    const formData = new FormData();
    const notes = {
        'noteTitle': Note.title,
        'noteContent': Note.valueHtml,
        noteUserid
    }
    formData.append('notes', JSON.stringify(notes));
    files.forEach((file) => {
        if (file.raw) {
            formData.append("files", file.raw);
        } else {
            console.error("无效文件对象: ", file);
        }
    });
    request.post(`http://${testUrl}/Demo/postNote`, formData)
}

// 获取用户帖子相关信息
export function getNode() {
    return request.get(`http://${DemoUrl}/Demo/getNote?userId=${store.info.id}`);
}

//添加朋友
export function addFriendsImp(senderId, receiverId, message) {
    return request.post(`http://${testUrl}/Demo/addFriends`, {
        senderId: senderId,
        receiverId: receiverId,
        message: message,
        status: 'pending'
    });
}

//获取除用户外的用户
export function selectOthers() {
    return request.get(`http://${testUrl}/Demo/allUser?id=${store.info.id}`)
}