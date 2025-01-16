<template>
    <el-upload class="avatar-uploader" :show-file-list="false" :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload" :http-request="customUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon">
            <Plus />
        </el-icon>
    </el-upload>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import request from '@/utils/request'
import type { UploadProps } from 'element-plus'
import { uploadFile } from '@/utils/login'
import { userInformation } from '@/stores/counter'

const imageUrl = ref('');

const store = userInformation();
const dateFile = new Date();
dateFile.setTime(dateFile.getTime() + 10 * 20 * 60 * 60 * 1000)

const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
    imageUrl.value = URL.createObjectURL(uploadFile.raw!)
}

const customUpload = ({ file, onSuccess, onError }) => { //上传文件
    uploadFile(file)
        .then((response) => {
            localStorage.setItem('information', '')
            store.version++;
            document.cookie = "usefile=" + response.data + ";expires=" + dateFile.toUTCString();
            store.file = response.data;
            setTimeout(() => {
                location.reload()
            }, 100);
        })
        .then((data) => onSuccess(data))
        .catch((err) => onError(err));
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.type !== 'image/png') {
        ElMessage.error('Avatar picture must be JPG format!')
        return false
    } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('Avatar picture size can not exceed 2MB!')
        return false
    }
    return true
}
</script>

<style scoped>
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}

.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>