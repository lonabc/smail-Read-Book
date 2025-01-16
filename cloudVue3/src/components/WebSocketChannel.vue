<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import WebSocketService from '../stores/websocket'
import { userInformation } from '../stores/counter'
import { ChatLineSquare } from '@element-plus/icons-vue'
import { parse } from 'vue/compiler-sfc';

const toName = ref("")
// var clientId = Math.random().toString(12).substring(2); //生成用户聊天会话的id
const store = userInformation();
var clientId = store.info.id;
const toClientId = ref(4);
const sendMessage = ref("");
const sendMessageList = ref([

]); //发送消息列表
const ws = new WebSocketService(`ws://localhost:8087/chat/${clientId}`);
const message = ref({ //临时存放接收到的消息
    messageData: '测试者的相关资料',
    toName: store.info.name,
    userId: 1,
    fromId: "3"
});




onMounted(() => {
    if ('WebSocket' in window) {
        ws.connect();
        ws.onError((err) => {
            console.error("websocket 错误", err)
        })

        ws.onMessage((message) => { //接受到消息时调用
            const dataM = JSON.parse(message)

            sendMessageList.value.push(dataM)
        })


    } else {
        alert("Not support webSocket");
    }
})


const test = () => {
    // message：向服务器发送问题
    console.log("即将向用户" + toClientId.value + "发送消息");
    message.value.userId = toClientId.value; //标注发送对象
    message.value.fromId = clientId;
    ws.sendMessage(JSON.stringify(message.value));
    sendMessageList.value.push({ ...message.value });
}
</script>

<template>
    <el-row style="margin: 0%; padding: 0%; height: 90vh;">
        <el-col :span="6">
            <el-card style="max-width: 100%">
                <template #header>
                    <div class="card-header">
                        <span>用户消息</span>
                    </div>
                </template>

                <div v-for="i in 4" :key="i">
                    <div class="cardMain">
                        <div style="display: flex;">
                            <el-avatar shape="square" :size="50" :src="squareUrl" />
                            <div class="block">
                                <strong style="margin-top: 0%; padding: 0%;">QQ运动</strong>
                                <p style="font-size: small; margin:0%; color: rgb(177.3, 179.4, 183.6)">项目点击测试</p>
                            </div>
                        </div>
                        <div>
                            <p style="font-size: 15px; color: rgb(177.3, 179.4, 183.6)">
                                18:53
                            </p>
                        </div>
                    </div>
                    <el-divider />
                </div>

                <!-- <el-button @click="test">Default</el-button>
                <div style="display: flex;justify-content: left;">
                    <el-input v-model="toName" style="width: 120px; padding-right: 20px;"
                        placeholder="Please input toName" />
                    <el-input v-model="message.messageData" style="width: 240px"
                        placeholder="Please input messageData" />
                </div> -->
            </el-card>
        </el-col>


        <el-col :span="18" class="parentTest">
            <div v-for="messagei in sendMessageList" :key="messagei"
                :class="['dlog_content', messagei.fromId === clientId ? 'self' : 'other']">

                <el-avatar shape="square" style="margin-right: 5px;" :size="50" :src="squareUrl" />
                <div>
                    <span style="font-weight: bold;padding: 0%; margin: 0%;display: block;">
                        {{ messagei.toName }}
                    </span>
                    <p style="margin: 0%;">
                        {{ messagei.messageData }}
                    </p>
                </div>

            </div>
            <el-input v-model="toClientId" placeholder="Please input messageData" />
            <div class="sonTest">
                <el-input :prefix-Icon="ChatLineSquare" v-model="message.messageData" placeholder="Please input">
                    <template #suffix>
                        <el-button type="primary" @click="test">Primary</el-button>
                    </template>
                </el-input>
            </div>
        </el-col>
    </el-row>



</template>

<style scoped>
.message-content {
    max-width: 60%;
    background: #f1f1f1;
    padding: 0px;
    border-radius: 5px;
}

.dlog_content {
    display: flex;
    margin: 10px;
    overflow-y: auto;
    overflow-x: hidden;
}

/* 其他用户消息渲染时使用 */
.dlog_content.other {
    flex-direction: row
}

/* 渲染自己发送的消息时引用 */
.dlog_content.self {
    flex-direction: row-reverse;
    text-align: right;
}

.message-item {
    display: flex;

    justify-content: flex-end;
    align-items: flex-start;
    margin-bottom: 10px;
}

.parentTest {
    position: relative;
    background-color: rgb(243.9, 244.2, 244.8);
    height: 100%;
}

.sonTest {
    position: absolute;
    bottom: 0px;
    width: 100%;
    padding-left: 10px;
    height: 4vh;

}

.channlContent {
    overflow-y: auto;
    overflow-x: hidden;
}

.cardMain {
    display: flex;
    justify-content: space-between;
    padding: 5px;
}

.block {
    display: flex;
    padding: 6px;
    flex-direction: column;
    justify-content: space-around;
}
</style>