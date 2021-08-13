import { ObjectCoreValidator, StringCoreValidator } from "../core";

export const userValidationSchema = ObjectCoreValidator.OBJECT.shape({
    name: StringCoreValidator.STRING.min(1).required("Enter a valid street"),
});
