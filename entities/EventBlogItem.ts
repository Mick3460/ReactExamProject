export class EventBlogItem{
    public startDate: ReactDate
    public startEpoch: number
    public endEpoch: number
    public endDate: ReactDate
    constructor(public id: string, public title: string, startDate: number, endDate: number, public location: string, public detail: string, public img?: string,) {
        this.startDate = new ReactDate(startDate) // converting
        this.endDate = new ReactDate(endDate) // converting
        this.startEpoch = startDate
        this.endEpoch = endDate
    }

    // Date string for event feed
    formatDateToFeedString() {
        if(this.startDate.date === this.endDate.date && this.startDate.month == this.endDate.month) {
            return this.startDate.day + ", " + this.startDate.month + " " + this.startDate.date + " at " + this.startDate.time + " - " + this.endDate.time
        } else if (this.startDate.month === this.endDate.month) {
            return this.startDate.day + ", " + this.startDate.month + " " + this.startDate.date + " - " + this.endDate.date
        } else {
            return this.startDate.day + ", " + this.startDate.month + " " + this.startDate.date + " - " + this.endDate.month + " " + this.endDate.date
        }
    }

    // Date string for event details
    // Finish later
    formatDateToDetailString() {
        if(this.startDate.date === this.endDate.date && this.startDate.month == this.endDate.month) {
            return this.startDate.day + ", " + this.startDate.month + " " + this.startDate.date + " at " + this.startDate.time + " - " + this.endDate.time
        } else  {
            return this.startDate.day + ", " + this.startDate.month + " " + this.startDate.date + " " + this.startDate.time + " - " 
            + this.endDate.day + ", " + this.endDate.month + " " + this.endDate.date + " " + this.endDate.time
        } 
    }
}


class ReactDate{
    public day: string
    public month: string
    public date: string
    public time: string
    constructor(public epoch: number) {
        const date = new Date(0)
        date.setUTCSeconds(epoch)
        const dateSplitArray = date.toString().split(" ")
        this.day = dateSplitArray[0]
        this.month = dateSplitArray[1]
        this.date = dateSplitArray[2]
        this.time = dateSplitArray[4].substring(0,5) // Makes it HH:MM format from HH:MM:SS
    }
}