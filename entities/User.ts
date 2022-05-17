export class User {
    email: string | null | undefined;
    displayname: string | null | undefined; // ? definerer, at den er optional.
    photoUrl?: string| null | undefined;
    idToken?: string| null | undefined;
    uid: string | null | undefined;
    connectedChatroomIds: Array<number> | null | undefined;
    first: string | null | undefined;
    last: string | null | undefined;
    description: string | null | undefined;

    constructor(email: string, displayname?: string, photoUrl?: string, idToken?: string, uid?: string, connectedChatroomIds?:Array<number>, first?: string, last?: string, description?: string) {
        this.email = email;
        this.displayname = displayname;
        this.photoUrl = photoUrl;
        this.idToken = idToken;
        this.uid = uid;
        this.connectedChatroomIds = connectedChatroomIds;
        this.first = first;
        this.last = last;
        this.description = description;
    }
}