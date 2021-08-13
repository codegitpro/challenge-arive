import moment from "moment";

export const DateConstants = {
    min: moment("01/01/1900").toISOString(),
    max: moment().toISOString(),
};
