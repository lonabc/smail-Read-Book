<script lang="ts">
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import { onBeforeUnmount, ref, shallowRef, onMounted, computed, reactive } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import type { UploadProps, UploadUserFile } from 'element-plus'
import { postNode } from '../utils/userController'
import { ElMessage } from 'element-plus';
import { userInformation } from '../stores/counter'


export default {
    components: { Editor, Toolbar },
    setup() {
        // 必须用 shallowRef,该实例预留一个容器。
        const editorRef = shallowRef();

        //获取user的信息仓库
        const store = userInformation();

        const noteContent = ref({
            title: '',//帖子标题设置
            valueHtml: '<p>hello</p>', // 内容 HTML
            imagesArry: new Array()
        })
        //用于测试的方法
        const uploadNote = () => {
            const editor = editorRef.value
            noteContent.value.valueHtml = editor.getHtml();//获取帖子内容
            postNode(noteContent.value, store.info.id, fileImage.value)
        }

        // 模拟 ajax 异步获取内容
        onMounted(() => {
            setTimeout(() => {
                noteContent.value.valueHtml = '<p>模拟 Ajax 异步设置内容</p>'
            }, 1500)
        })

        const toolbarConfig = {}
        const editorConfig = { placeholder: '请输入内容...' }

        // 组件销毁时，也及时销毁编辑器
        onBeforeUnmount(() => {
            const editor = editorRef.value;
            if (editor == null) return
            editor.destroy()
        })

        const handleCreated = (editor) => {
            editorRef.value = editor // 记录 editor 实例，重要！
        }

        const fileList = ref<UploadUserFile[]>([
            {
                name: 'food.jpeg',
                url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
            },
            {
                name: 'food.jpeg',
                url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
            },
        ])
        const dialogImageUrl = ref('')
        const dialogVisible = ref(false)
        //图片数量
        const imagesSum = ref(fileList.value.length);
        //上传图片，文件集合
        const fileImage = ref([])
        //帖子图片数量统计，计算属性
        const imageCount = computed(() => {
            if (imagesSum.value > 10) {
                imagesSum.value = 10;
                ElMessage('最多上传10张图片')
            } else {
                imagesSum.value = fileList.value.length;
            }
            return fileList.value.length
        })
        // 
        const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {

            fileImage.value.pop();

            console.log(uploadFile, uploadFiles, "test")
        }

        const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
            dialogImageUrl.value = uploadFile.url!
            dialogVisible.value = true
        }

        const changeImage: UploadProps['onChange'] = (uploadFile) => {
            fileImage.value.push(uploadFile);
            console.log(fileImage.value)
        }


        return {
            editorRef,
            mode: 'default', // 或 'simple'
            toolbarConfig,
            editorConfig,
            handleCreated,
            noteContent,
            fileList,
            handleRemove,
            handlePictureCardPreview,
            dialogVisible,
            dialogImageUrl,
            imagesSum, uploadNote,
            changeImage
        };
    }
}
</script>

<template>
    <div>
        <div>
            <div style="display: flex;justify-content: left;">
                <p style="font-size: large;">
                    <strong>图片编辑</strong>
                </p>
                <p style="color: #ccc; font-size:small;position: relative;top:0.5rem;margin-left:0.6rem;">({{
                    imagesSum
                    }}/10)</p>
            </div>
            <div>
                <el-upload v-model:file-list="fileList" list-type="picture-card" :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove" :on-change="changeImage" :auto-upload="false">
                    <el-icon>
                        <Plus />
                    </el-icon>
                </el-upload>

                <el-dialog v-model="dialogVisible">
                    <img w-full :src="dialogImageUrl" alt="Preview Image" />
                </el-dialog>
            </div>
        </div>
        <div style="margin-bottom: 5px;">
            <p style="font-size: large;">
                <strong>帖子内容</strong>
            </p>
            <el-input maxlength="25" show-word-limit v-model="noteContent.title" style="width: 33vw;"
                placeholder="添加标题后，会有更多人看到哦" />
        </div>
        <div style="border: 1px solid #ccc">
            <!-- 设置菜单栏 -->
            <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig"
                :mode="mode" />
            <!-- 设置编辑器 -->
            <Editor style="height: 500px; overflow-y: hidden;" v-model="noteContent.valueHtml"
                :defaultConfig="editorConfig" :mode="mode" @onCreated="handleCreated" />
        </div>
        <div style="display: flex; justify-content: left;">
            <el-button type="danger" style="margin-top: 10px; width: 5vw;" size="large"
                @click="uploadNote">发布</el-button>
            <el-button style="margin: 10px; width: 5vw;" size="large">暂时离开</el-button>
        </div>
    </div>
</template>

<style scoped></style>