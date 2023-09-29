import { Context } from "telegraf";

export interface SessionData {
    courseLike: boolean; 
    chooseTour: string;
    infoAboutClient: (string | number | number)
}
export interface IBotContext extends Context {
    session: SessionData;
}


