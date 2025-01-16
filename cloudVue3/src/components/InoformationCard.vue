<script setup>
import { onMounted, ref } from 'vue'
import { getNode } from '@/utils/userController';

const dialogVisible = ref(false)

const test = "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
const handleClick = () => {
    dialogVisible.value = true;
    console.log("项目点击测试")
}
</script>

<template>
    <el-card @click="handleClick" style="margin: 10px;">
        <el-row shadow="hover" style="width: 100vw;">
            <el-col :span="3" class="notes">
                <slot name="imageNote">
                    <!-- <img :src="imageSrc" style="width: 15vh; min-height: auto;  object-fit: cover; border-radius: 8px;"> -->
                </slot>
            </el-col>
            <el-col :span="21" style="width: 100%;">
                <div style="position:relative; height: 100%;">
                    <!-- 标题 -->
                    <h1 style="margin-top: 0%;padding: 0%; margin-left: 10px;">
                        <slot name="noteTitle">
                            项目个帖子内容测试
                        </slot>
                    </h1>
                    <!-- 帖子内容 -->
                    <p class="note-content">
                        <slot name="noteContent">

                            每一天，都因你而更加绚烂辉煌。
                        </slot>
                    </p>
                    <div class="noteSum">
                        发布帖子 2024.09.16
                        730阅读
                        11点赞
                        0评论
                        24收藏
                    </div>
                </div>
            </el-col>
        </el-row>
    </el-card>

    <el-dialog v-model="dialogVisible" style="height: 80vh; width: 60vw;">
        <el-row>
            <el-col :span="12" style="height: 75vh;">
                <img :src="test" style="width: 100%; height: 100%;  object-fit: cover; border-radius: 8px;">
            </el-col>
            <el-col :span="12" style="height: 75vh;">
                <el-carousel height="150px" :autoplay="false">
                    <el-carousel-item v-for="item in 4" :key="item">
                        <h3 class="small justify-center" text="2xl">{{ item }}</h3>
                    </el-carousel-item>
                </el-carousel>
            </el-col>
        </el-row>
    </el-dialog>

</template>

<style scoped>
.notes {
    display: flex;
    justify-content: left;
}

.noteSum {
    display: flex;
    justify-content: left;
    position: absolute;
    bottom: 0;
    margin: 0%;
    padding: 0%;
}

.note-content {
    width: 80%;
    /* 设置宽度 */
    word-wrap: break-word;
    /* 超出容器宽度时自动换行 */
    overflow-wrap: break-word;
    /* 保证长单词也能换行 */
    line-height: 1.5;
    /* 行高 */
    padding: 10px;
}


/* 走马灯效果演示，用后就删 */
.demonstration {
    color: var(--el-text-color-secondary);
}

.el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
</style>