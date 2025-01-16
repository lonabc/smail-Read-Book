import { ref, computed } from 'vue'
import { defineStore } from 'pinia'


export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})

export const toolMethod = defineStore('tools', () => {

  //工具类，获取cookie
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

  return { getCookie }
})

export const userInformation = defineStore('information', () => { //存储时机登入时存储
  const file = ref('');
  const version = ref(1);
  const info = ref({ //存储用户信息
    role: '',
    name: '',
    permission: '',
    password: '',
    id: '',
    email: '',
    phone: '',
    sex: 1,
  });
  return { file, version, info };
}, {
  persist: true //开启浏览器缓存
})


