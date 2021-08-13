import moment from "moment";

export const DateUtil = {
    formatHobbyYear: (val: string) => {
        return moment(val).format("YYYY-01-01");
    },
    parseHobbyYear: (val: string) => {
        return moment(val).format("YYYY");
    },
};
