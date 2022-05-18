import { Message } from "./Message"

export class ChatroomObj {

    constructor(public id: string, public messages?: Message[]){
        this.id = id
        this.messages = messages
    }
}