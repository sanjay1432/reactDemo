import { w3cwebsocket as W3CWebSocket } from "websocket";

export default class Ws {
    client = new W3CWebSocket('ws://127.0.0.1:8000');


    sendMsg(msg) {
        const payload = {
            code: 1,
            data: msg
        }
        this.client.send(payload)
    }

    login(user) {
          const payload = {
              code: 0,
              data: user
          }
        this.client.send(payload)
    }
}