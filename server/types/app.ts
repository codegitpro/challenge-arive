export interface User {
    _id: string;
    name: string;
}

export interface Hobby {
    _id: string;
    name: string;
    passionLevel: "Low" | "Medium" | "High" | "Very-High";
}
