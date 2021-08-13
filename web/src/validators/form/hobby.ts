import { DateCoreValidator, ObjectCoreValidator, StringCoreValidator } from "../core";

export const hobbyValidationSchema = ObjectCoreValidator.OBJECT.shape({
    name: StringCoreValidator.STRING.min(1).required("Enter a valid street"),
    passionLevel: StringCoreValidator.STRING.min(1).required("Select a valid passion level"),
    year: DateCoreValidator.HOBBY_YEAR.required("Enter a valid year"),
});
