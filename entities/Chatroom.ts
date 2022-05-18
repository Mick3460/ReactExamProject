import { Message } from "./Message"

export class Chatroom {

    constructor(public id: string, public messages?: Message[]){
        this.id = id
        this.messages = messages
    }
}