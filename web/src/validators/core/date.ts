import { DateConstants } from "@this/constants";
import * as yup from "yup";

const iso = yup.date();

export const DateCoreValidator = {
    HOBBY_YEAR: iso.min(DateConstants.min).max(DateConstants.max),
    ISO: iso,
};
