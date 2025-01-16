<script setup>

import { ref } from 'vue'
import UploadFile from './UploadFile.vue';
import { userInformation } from '@/stores/counter'
import { changePhone } from '@/utils/userController';


const store = userInformation(); // 保持有用户数据的pinina仓库
const testFunction = () => {
    imageShow.value = true
    console.log("测试方法" + store.file)
}
const radio1 = ref(`${store.info.sex}`)
const textarea2 = ref('')
const emailInput = ref('')
const imageShow = ref(false)
const phone = ref('15178198027')
const version = store.version;
const image = ref(`http://localhost:8000/${store.file}?v=${version}`)
const userForm = ref({
    "name": store.info.name,
    "password": store.info.password,
    "email": store.info.email,
    "id": store.info.id,
    "sex": store.info.sex,
    "phone": store.info.phone
})

const changePhoneMy = () => {
    changePhone(phone.value)
    console.log(store.info.password)
}

</script>

<template>

    <el-dialog v-model="imageShow" style="display: flex; justify-content: center;">
        <UploadFile></UploadFile>
    </el-dialog>

    <el-card class="myCard" shadow="always">
        <template #header>
            <el-row>
                <el-col :span="12">
                    <div style="display: flex; justify-content: right;">
                        <el-avatar :size="70" :src="image" />
                    </div>
                </el-col>
                <el-col :span="12">
                    <el-link @click="testFunction()"
                        style="font-size: small; margin-top: 3.5%; margin-left: 5px; font-weight: bold;"
                        :underline="false">
                        点击修改</el-link>
                    <p style="font-size: 8px; margin-left: 5px; color: rgb(199.5, 201, 204);">
                        支持修改jpg,jpeg,png类型文件
                    </p>
                </el-col>
            </el-row>

        </template>
        <el-row>
            <el-col :span="12">
                <div style="display: flex; justify-content: left;">
                    <p style="color: #D4D7DE;">姓名:</p>
                    <p style="margin-left: 20px;">{{ userForm.name }}</p>
                </div>
                <div style="display: flex; justify-content: left;">
                    <p style="color: #D4D7DE;">权限:</p>
                    <p style="margin-left: 20px;">管理员</p>
                </div>
                <div style="display: flex; justify-content: left;">
                    <p style="color: #D4D7DE;">部门:</p>
                    <p style="margin-left: 20px;">创新协同中心后端开发部</p>
                </div>
                <div style="display: flex; justify-content: left;">
                    <p style="color: #D4D7DE;">职位:</p>
                    <p style="margin-left: 20px;">开发工程师</p>
                </div>
            </el-col>
            <el-col :span="12">
                <div style="display: flex; justify-content: left;">
                    <p style="color: #D4D7DE; margin-right: 20px;">性别:</p>
                    <el-radio-group v-model="radio1">
                        <el-radio value="1" size="large">男</el-radio>
                        <el-radio value="2" size="large">女</el-radio>
                    </el-radio-group>
                </div>
                <div style="display: flex; justify-content: left;">
                    <p style="color: #D4D7DE;">手机:</p>
                    <p style="margin-left: 20px;">{{ userForm.phone }}</p>
                    <el-link type="primary" style="margin-left: 20px;" :underline="false"
                        @click="changePhoneMy()">修改</el-link>
                </div>
                <div style="display: flex; justify-content: left;">
                    <p style="color: #D4D7DE;">密码:</p>
                    <p style="margin-left: 20px;"> ********</p>
                    <el-link type="primary" style="margin-left: 20px;" :underline="false">修改</el-link>
                </div>
                <div style="display: flex; justify-content: left;">
                    <p style="color: #D4D7DE;">邮箱:</p>
                    <el-input v-model="emailInput"
                        style="width: 240px;height: 30px; margin-top: 12px; margin-left: 15px;"
                        placeholder="Please input" clearable />
                </div>
            </el-col>
        </el-row>
        <template #footer>
            <div style="display: flex;justify-content: left;">
                <h style="">备注：</h>
                <el-input v-model="textarea2" style="width: 80%; height:20vh ;" :autosize="{ minRows: 8, maxRows: 16 }"
                    type="textarea" placeholder="Please input" />
            </div>
        </template>
    </el-card>
</template>

<style scoped>
.myCard {
    min-width: 50%;
    max-width: 60%;
    max-height: 70%;
    margin-top: 5%;
}
</style>