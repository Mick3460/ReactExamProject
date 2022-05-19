export class Message {

    constructor(public message: string, public sender: string, public createdAt?:any){
        this.message=message
        this.sender=sender
        this.createdAt=createdAt
    }
}