declare type PassionLevel = "Low" | "Medium" | "High" | "Very-High" | undefined;

declare interface User {
    _id: string;
    name: string;
    hobbies: Array<Hobby>;
}

declare interface Hobby {
    _id: string;
    name: string;
    passionLevel: PassionLevel;
    year: string;
    userId: string;
}
