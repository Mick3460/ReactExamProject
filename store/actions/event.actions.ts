import {EventBlogItem} from "../../entities/EventBlogItem"
import { collection, query, where, getDocs, doc, setDoc  } from "firebase/firestore";
import { db } from "../../App";

export const FETCHEVENT = 'FETCHEVENT'
export const NEWEVENT = 'NEWEVENT'

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

export const createEventFirebase = async (event: EventBlogItem) => {
    
        console.log("eventrrrr:",event);
        addANewEventToFireStore(event)
        return {type: NEWEVENT}
}

async function addANewEventToFireStore(event: EventBlogItem) {
    try {
        const docRef = doc(db,"events")
        await setDoc(docRef, { 
        title: event.title,
        startDate: {
            nanoseconds: 0,
            seconds: event.startEpoch
        },
        endDate: {
            nanoseconds: 0,
            seconds: event.endEpoch
        },
        location: event.location,
        img: ""
      })
    } catch (e){
      console.log(e)
    }
  }