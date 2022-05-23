import { Message } from "./Message"
import { User} from "./User"

export class Chatroom {

    constructor(public id: string, public messages?: Message[], public users?: User[]){
        this.id = id
        this.messages = messages
        this.users = users
    }
}