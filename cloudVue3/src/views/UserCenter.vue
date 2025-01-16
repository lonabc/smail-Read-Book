<script setup>
import { ArrowLeft } from '@element-plus/icons-vue'
import { Menu } from '@element-plus/icons-vue';
import { Calendar, Operation } from '@element-plus/icons-vue'
import { ref, nextTick, computed, onMounted } from 'vue'
import { UserFilled } from '@element-plus/icons-vue'
import { userInformation } from '@/stores/counter'
import UserCard from '../components/UserCard.vue'
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus'
import Note from '../components/Note.vue'
import InformationCard from '../components/InoformationCard.vue';
import WebSocketChannel from '@/components/WebSocketChannel.vue';
import Friends from '@/components/Friendes.vue';
import { getNode } from '@/utils/userController';




const router = useRouter()

const store = userInformation();

const showResult = ref(false);
const showText = ref(true)
const showForever = ref(true)
const pageInformation = ref('个人信息')
const cardShow = ref(true);
const cardNote = ref(false);
const cardInformation = ref(false);
const channel = ref(false); //控制聊天页面显示

const version = store.version;
const userFile = getCookie("usefile") //获取cookie保存的信息
function getCookie(name) {
    const nameEq = name + "=";
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
        if (cookies[i].startsWith(nameEq)) {
            return cookies[i].substring(nameEq.length);
        }
    }
    return null; // 如果没有找到对应的 Cookie，返回 null
}


const image = ref(`http://localhost:8000/${store.file}?v=${version}`) //给缓存的图片加上版本，避免缓存重复出现同一张图片
const pageKey = ref(0);
const backPage = () => {
    setTimeout(() => {
        showResult.value = false
        router.push('login')
    }, 1000);
}

const changeShowText = computed(() => pageInformation.value);
const changeI = () => {
    showText.value = false;
    cardNote.value = false;
    cardInformation.value = false;
    channel.value = false;
    pageInformation.value = '个人信息'
    pageKey.value++;
    nextTick(() => {
        setTimeout(() => {
            showText.value = true
            showForever.value = true
        }, 20);
        setTimeout(() => {
            cardShow.value = true
        }, 500);
    })

}

const changeII = () => {
    showText.value = false
    cardShow.value = false
    cardInformation.value = false
    channel.value = false
    pageInformation.value = '发贴'
    pageKey.value++;
    nextTick(() => {
        setTimeout(() => {
            showText.value = true
            showForever.value = true
        }, 20);
        setTimeout(() => {
            cardNote.value = true
        }, 500)

    })
}

const changeIII = () => {
    showText.value = false
    cardShow.value = false
    cardNote.value = false;
    channel.value = false;
    pageInformation.value = '我的帖子'
    pageKey.value++;
    nextTick(() => {
        setTimeout(() => {
            showText.value = true
            showForever.value = true
        }, 20);
        setTimeout(() => {
            cardInformation.value = true;
        }, 500)
    })
}

const changeIV = () => {
    showText.value = false
    cardShow.value = false
    cardNote.value = false
    cardInformation.value = false
    showForever.value = false
    pageKey.value++;
    nextTick(() => {
        setTimeout(() => {
            channel.value = true
        }, 50);
    })

}


//InformationCard 组件内容获取
const userInformation2 = ref([]);
const imageSrc = ref("");
const OrginSrc = "http://localhost:8001/"

const getFileName = (path) => {
    const parts = path.split('/');
    return parts[parts.length - 2] + "/" + parts[parts.length - 1]
}
onMounted(() => {
    console.log("生命周期函数调用成功");
    getNode().then(
        success => {
            console.log(success.data)
            for (let note of success.data) {

                imageSrc.value = OrginSrc + getFileName(note.imageList[0].url)

                note.imageList[0].url = imageSrc.value;
                userInformation2.value.push(note);
            }
        }
    );

});
const showFriends = ref(false);

</script>

<template>

    <el-dialog v-model="showResult" style="display: flex; justify-content: center;">
        <el-result icon="success" title="Success Tip" sub-title="Please follow the instructions">
            <template #extra>
                <el-button @click="backPage" type="primary">Back</el-button>
            </template>
        </el-result>
    </el-dialog>


    <div class="common-layout" style="border-radius: 4px; ">
        <el-container>
            <el-header class="iconImage" style=" margin:0;padding:0;">
                <div style="width: 11%; background-color: rgb(159.5, 206.5, 255);" class="iconImage">
                    <img src="../assets/LogoB.png" style="width: 6vh; height:6vh; ">
                    <h1 class="iconImage">
                        巢湖科技
                        <el-icon style="font-size: 3.5vh; left: 5px; ">
                            <Operation />
                        </el-icon>
                    </h1>
                </div>
                <div style="width: 89%;  background-color: rgb(197.7, 225.9, 255); " class="heardBack">
                    <el-menu style="background-color: rgb(197.7, 225.9, 255); z-index: 100;" class="heardBack">
                        <el-sub-menu>
                            <template #title>常用功能</template>
                            <el-menu-item style="padding-left: 20px;">
                                <p style="text-align: left;" @click="showFriends = !showFriends">我的好友</p>
                            </el-menu-item>

                        </el-sub-menu>

                        <el-menu-item>
                            <span @click="showResult = true">退出</span>
                        </el-menu-item>
                    </el-menu>
                </div>
            </el-header>

            <el-container>
                <el-aside width="11%" style="background-color: rgb(235.9, 245.3, 255); height: 92vh;">
                    <div class="iconImage">
                        <div class="demo-type">
                            <div>
                                <el-avatar :size="60" :icon="UserFilled" :src="image" />
                            </div>
                        </div>
                        <div style="position:relative; top: 20px;">
                            <h1 style="margin: 0;">殷传国</h1>
                            <h style="margin: 0; font-size: small;">超级管理员</h>
                        </div>
                    </div>
                    <br>
                    <el-menu style="background-color:rgb(235.9, 245.3, 255);" :default-active="1">
                        <el-menu-item style="border-radius: 20px; " :index="1" @click="changeI()">
                            <span>个人信息</span>
                        </el-menu-item>

                        <el-menu-item style="border-radius: 20px" :index="2" @click="changeII()">
                            <span>发贴</span>
                        </el-menu-item>
                        <el-menu-item style="border-radius: 20px" :index="3">
                            <el-badge is-dot class="item" :offset="[10, 5]" @click="changeIII()">
                                <span>我的帖子</span>
                            </el-badge>
                        </el-menu-item>
                        <el-menu-item style="border-radius: 20px" :index="4">
                            <el-badge is-dot :offset="[10, 5]" @click="changeIV()">
                                <span>消息通知</span>
                            </el-badge>
                        </el-menu-item>
                    </el-menu>

                    <!-- 菜单栏 -->
                    <div>

                    </div>
                </el-aside>
                <el-main style="background-color: white;">
                    <div style="display: flex; justify-content: left;" v-if="showForever">
                        <div style="width: 2px; height: 25px; background-color:rgb(159.5, 206.5, 255);"></div>
                        <h1 style="margin: 0%;padding-left: 4px;" :key="pageKey" v-if="showText">{{ changeShowText }}
                        </h1>
                    </div>
                    <transition name="el-zoom-in-center">
                        <div style="display: flex;justify-content: center;" v-if="cardShow">
                            <UserCard></UserCard>
                        </div>
                    </transition>
                    <transition name="el-zoom-in-center">
                        <div style="display: flex;justify-content: center;" v-if="cardNote">
                            <Note></Note>
                        </div>
                    </transition>
                    <transition name="el-zoom-in-center">
                        <div v-if="cardInformation">
                            <InformationCard v-for="(note, index) in userInformation2" :key="index">
                                <template #imageNote>
                                    <img :src="note.imageList[0].url"
                                        style="width: 15vh; min-height: auto;  object-fit: cover; border-radius: 8px;">
                                </template>
                                <template #noteTitle>
                                    <!-- 使用 v-html 指令渲染 HTML -->
                                    <div v-html="note.noteTitle"></div>
                                    <!-- {{ note.noteTitle }} -->
                                </template>
                                <template #noteContent>
                                    <div v-html="note.noteContent"></div>
                                    <!-- {{ note.noteContent }} -->
                                </template>
                            </InformationCard>
                        </div>
                    </transition>
                    <transition name="el-zoom-in-center">
                        <!-- -->
                        <div v-if="channel">
                            <WebSocketChannel></WebSocketChannel>
                        </div>
                    </transition>
                    <el-dialog v-model="showFriends">
                        <Friends></Friends>
                    </el-dialog>

                </el-main>
            </el-container>
        </el-container>
    </div>


</template>

<style scoped>
.common-layout {
    height: 100vh;
    overflow-x: hidden;
    overflow-y: scroll;
}

.iconImage {
    display: flex;
    justify-content: left;
}

.demo-type {
    display: flex;
    margin: 10px;
}

.demo-type>div {
    flex: 1;
    text-align: left;
}

.demo-type>div:not(:last-child) {
    border-right: 1px solid var(--el-border-color);
}

.el-menu-item.is-active {
    background-color: rgb(96, 101, 115) !important;
}


.heardBack {
    display: flex;
    justify-content: right;
    margin: 2px;
    /* 设置box-sizing: border-box;后不会因为border和padding而改变实际大小。 */
    box-sizing: border-box;
}
</style>