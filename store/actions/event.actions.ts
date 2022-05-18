import {EventBlogItem} from "../../entities/EventBlogItem"
import { collection, query, where, getDocs  } from "firebase/firestore";
import { db } from "../../App";

export const FETCHEVENT = 'FETCHEVENT'

export const queryEvent = async () => {
    
        let eventArray: EventBlogItem[] = []
        const eventsRef = collection(db, "events");
        const q = query(eventsRef);
        const querySnapshot = await getDocs(q);
    
    querySnapshot.forEach((doc) => {
        const id = doc.id
        const title = doc.data().title
        const startDate = doc.data().startDate.seconds
        const endDate = doc.data().endDate.seconds
        const location = doc.data().location
        const detail = doc.data().detail
        const img = doc.data().img

        eventArray.push(new EventBlogItem(id, title, startDate, endDate, location, detail, img)) 
    });
    return {type: FETCHEVENT, payload: eventArray }
}

// export const createEventFirebase = async (event: EventBlogItem) => {
    
//     const event = new EventBlogItem(user.email, user.displayName as string ,user.photoURL as string, user.stsTokenManager.accessToken as string, user.uid)
//         console.log("userr:",event);
//         addANewUserToFireStore(event)
//         return {type: NEWEVENT}
// }
