<script setup>
import { Search } from '@element-plus/icons-vue';
import { ref, onMounted } from 'vue'
import { addFriendsImp, selectOthers } from '@/utils/userController';
import { userInformation, } from '../stores/counter';

const store = userInformation();
const inputName = ref("");
const FriendesArr = ref([
]);

onMounted(() => {
    selectOthers().then(
        (success) => {
            FriendesArr.value = success.data;

        }
    )
    // console.log("我执行了吗" + JSON.stringify())
    // FriendesArr.value = selectOthers();
})

const addFridends = (receiverIdM) => {
    addFriendsImp(store.info.id, receiverIdM, 'gugu');
    alert("添加成功");
}

</script>
<template>
    <div class="cell">
        <el-input :prefix-icon="Search" v-model="inputName" style="width: 240px" placeholder="Please input" />
        <br>
        <strong>为您推荐</strong>
        <div v-for="friend in FriendesArr" :key="friend"
            style="display: flex;justify-content: space-between;padding: 5px;">
            <div class="itemStyle">
                <div> <el-avatar style=" position: relative;top: 10%;" :size="50" :src="circleUrl" /></div>

                <div style="padding-left:10px;display: flex;flex-direction: column; justify-content: space-around;">
                    <strong style="margin: 0%; padding: 0%; font-size: large;">{{ friend.name }}</strong>
                    <p style="margin:0%;">
                        {{ friend.message }}
                    </p>
                </div>
            </div>
            <div style="position: relative;top:1vh">
                <el-button type="primary" plain @click="addFridends(friend.id)">添加好友</el-button>
            </div>
        </div>
    </div>

</template>

<style scoped>
.cell {
    display: flex;
    flex-direction: column;

}

.itemStyle {
    display: flex;

}
</style>