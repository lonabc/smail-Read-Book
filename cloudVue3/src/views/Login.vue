<script setup>
import { ref } from 'vue'
import { Lock, User, Message } from '@element-plus/icons-vue';
import { ElMessage, imageEmits } from 'element-plus';
import request from '@/utils/request'
import { sendLogin, sendEmail } from '@/utils/login'
import { sendRegister } from '@/utils/login';
import { useRouter } from 'vue-router';
import { userInformation } from '@/stores/counter';

const router = useRouter()
const userStore = userInformation()
const rules = {
    rulename: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 8, message: '用户名必须是5-10位的字符', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        {
            pattern: /^\S{6,15}$/,
            message: '密码必须是6-15位的非空字符',
            trigger: 'blur'
        }
    ],
    checkPass: [
        { required: true, message: '请再次输入密码', trigger: 'blur' },
        {
            pattern: /^\S{6,15}$/,
            message: '密码必须是6-15位的非空字符',
            trigger: 'blur'
        },
        {
            validator: (rule, value, callback) => {
                if (value !== dataReject.value.password) {
                    callback(new Error('两次输入密码不一致'))
                } else {
                    callback()
                }
                trigger: 'blur'
            }
        }
    ]
}

//登入相关信息
const ruleForm = ref({
    rulename: '',
    password: '',
});

//注册相关信息
const dataReject = ref({
    name: '',
    password: '',
    checkPass: '',
    code: '',
    email: ''
});


//注册邮箱
const emailData = ref('');
const showEmail = ref(false);
const testEmail = ref("发送验证码")
const timeEmail = ref(10);
const sendCode = (element) => {
    timeEmail.value = 10;
    dataReject.value.email = emailData
    sendEmail(emailData.value).then(
        (success) => {
            console.log("发送成功" + emailData.value)
        }
    )
    const interval = setInterval(() => {
        if (timeEmail.value >= 0) {
            testEmail.value = timeEmail.value + " seconds";
            timeEmail.value--;
        } else {
            testEmail.value = "重新发送"
            clearInterval(interval);
        }
    }, 1000);

}

const showEmailThing = () => {
    showEmail.value = true;
}
const isReject = ref(true);
const date = new Date();
date.setTime(date.getTime() + 20 * 60 * 60 * 1000); // 计算有效期

// 登入请求相关方法
const testLoginPost = () => {
    sendLogin(ruleForm.value.rulename, ruleForm.value.password).then(
        success => {
            ElMessage({
                message: '登入成功',
                type: 'success',
            }),
                //       document.cookie = 'JSESS1=' + success.data.sessionId + ';expires=' + date.toUTCString(); // 设置 Cookie
                userStore.info.name = success.data.name;
            userStore.info.password = success.data.password;
            userStore.info.email = success.data.email;
            userStore.info.id = success.data.id;
            userStore.info.sex = success.data.sex;
            userStore.info.phone = success.data.phone;
            router.push({
                path: '/userCenter',
            });
        },
        (error) => { //登入失败
            ElMessage.error('Oops, this is a error message.')
        }
    )
}
// 发送注册请求
const registerUser = () => {
    console.log(dataReject.value)
    sendRegister(dataReject.value, emailData.value).then(
        success => {
            ElMessage({
                message: '注册成功，请重新登入.',
                type: 'success',
            })
        },
        error => {
            ElMessage.error('注册失败, 请检查验证码是否填写正确.')
        }
    )
}

</script>

<template>
    <el-row style="height: 100vh;">
        <el-col :span="12" class="imageBackground">

        </el-col>
        <el-col :span="12" class="from" v-if="isReject">
            <el-form ref="ruleFormRef" style="min-width: 50vh; max-width: 100vh;" :model="ruleForm" status-icon
                label-width="auto" :rules="rules">

                <el-form-item>
                    <h1> 登录</h1>
                </el-form-item>

                <el-form-item prop="rulename">
                    <el-input :prefix-icon="User" v-model="ruleForm.rulename" autocomplete="off"
                        placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input :prefix-icon="Lock" v-model="ruleForm.password" type="password" autocomplete="off"
                        placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <div class="button1">
                        <el-button type="primary" @click="testLoginPost" style="width: 100%;">
                            登录
                        </el-button>

                    </div>
                </el-form-item>
                <el-form-item>
                    <div style="display: flex; justify-content: right; ">
                        <el-link @click="isReject = false" type="info" :underline="false">
                            注册 ->
                        </el-link>
                    </div>
                </el-form-item>
            </el-form>
        </el-col>
        <el-col :span="12" class="from" v-if="!isReject">
            <el-form ref="dataRejectForm" style="min-width: 50vh;max-width: 100vh;" :model="dataReject"
                label-width="auto" :rules="rules">
                <el-form-item>
                    <h1>注册</h1>
                </el-form-item>
                <el-form-item prop="name">
                    <el-input :prefix-Icon="User" v-model="dataReject.name" placeholder="请输入用户名" clearable></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input :prefix-Icon="Lock" v-model="dataReject.password" autocomplete="off" type="password"
                        placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item prop="checkPass">
                    <el-input :prefix-Icon="Lock" v-model="dataReject.checkPass" type="password"
                        placeholder="请再次输入密码"></el-input>
                </el-form-item>
                <el-form-item prop="code">
                    <el-row :gutter="20" style="width: 100%;">
                        <el-col :span="18">
                            <el-input :prefix-Icon="Message" v-model="dataReject.code" placeholder="请输入验证码"></el-input>
                        </el-col>
                        <el-col :span="6">
                            <el-button type="primary" @click="showEmailThing()">获取验证码</el-button>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item>
                    <div class="button1">
                        <el-button @click="registerUser()" type="primary" style="width: 100%;" plain>注册</el-button>
                    </div>
                </el-form-item>

                <el-form-item>
                    <el-link @click="isReject = true" :underline="false">登入-></el-link>
                </el-form-item>
            </el-form>
        </el-col>

    </el-row>

    <el-dialog v-model="showEmail" title="用户注册" style="width:60vh ;height:auto;">
        <el-row :gutter="20">
            <el-col :span=18>
                <el-input v-model="emailData" placeholder="请输入邮箱" clearable />
            </el-col>
            <el-col :span="6">
                <el-button type="primary" @click="sendCode(this)">{{ testEmail }}</el-button>
            </el-col>
        </el-row>

    </el-dialog>

</template>



<style>
.from {
    display: flex;

    justify-content: center;
    align-items: center;
}

.imageBackground {
    background-image: url("@/assets/chaohu.png");
    background-repeat: no-repeat;

    border-radius: 0 20px 20px 0;
    background-size: 100vh 100vh;
}

.button1 {
    display: flex;
    flex-direction: row;
    justify-content: center;
    /* 改为 flex-start，确保按钮靠左 */
    width: 100%;
    /* 确保父容器占满可用宽度 */
    gap: 10px;
    /* 增加按钮之间的间距 */
}
</style>