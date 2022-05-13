import { ImageSourcePropType } from "react-native";

export class EventBlogItem{
    constructor(public id: string, public title: string, public date: string, public location: string, public detail: string, public img?: string,) {
    }
}