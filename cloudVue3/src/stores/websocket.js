export default class WebSocketService {
    constructor(url) {
        this.url = url; // WebSocket 服务地址
        this.socket = null; // WebSocket 实例
        this.messageCallback = null; // 消息回调
        this.errorCallback = null; // 错误回调
        this.closeCallback = null; // 连接关闭回调
    }

    // 初始化 WebSocket 连接
    connect() {
        if (this.socket) {
            console.warn("WebSocket 已连接");
            return;
        }

        this.socket = new WebSocket(this.url);

        this.socket.onopen = () => { //连接成功时的回调
            console.log("WebSocket 连接成功");
        };

        this.socket.onmessage = (event) => { //接受到消息时调用，
            if (this.messageCallback) {
                this.messageCallback(event.data);
            }
        };

        this.socket.onerror = (error) => { //当 WebSocket 出现错误时触发。
            console.error("WebSocket 错误:", error);
            if (this.errorCallback) {
                this.errorCallback(error);
            }
        };

        this.socket.onclose = () => { //当 WebSocket 连接关闭时触发。
            console.log("WebSocket 连接关闭");
            if (this.closeCallback) {
                this.closeCallback();
            }
            this.socket = null; // 清除实例
        };
    }

    // 发送消息
    sendMessage(message, retryCount = 5) {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(message); // 连接成功，发送消息
        } else {
            if (retryCount > 0) {
                console.warn(`WebSocket 未连接，剩余重试次数：${retryCount}`);

                // 如果 WebSocket 已关闭，尝试重新连接
                if (!this.socket || this.socket.readyState === WebSocket.CLOSED) {
                    this.connect(); // 调用连接方法
                }

                // 延迟 2 秒再次尝试
                setTimeout(() => {
                    this.sendMessage(message, retryCount - 1); // 重试次数减一
                }, 3000);
            } else {
                console.error("WebSocket 重试次数已用完，消息未能发送");
            }
        }
    }


    // 设置消息回调
    onMessage(callback) {
        this.messageCallback = callback;
    }

    // 设置错误回调
    onError(callback) {
        this.errorCallback = callback;
    }

    // 设置关闭回调
    onClose(callback) {
        this.closeCallback = callback;
    }


    // 关闭连接
    close() {
        if (this.socket) {
            this.socket.close();
        }
    }
    beforeUnmount() {
        this.close(); // 组件卸载时关闭 WebSocket
    }
}
