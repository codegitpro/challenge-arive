import Joi from "joi";

interface HobbyValidationSchema {}

export const HobbyValidation = {
    createHobby: {
        body: Joi.object({
            name: Joi.string().required(),
            passionLevel: Joi.string().valid("Low", "Medium", "High", "Very-High").required(),
            year: Joi.date().min("1900").max("now").required(),
        }).options({ allowUnknown: true, abortEarly: false }),
    },
    updateHobby: {
        body: Joi.object({
            name: Joi.string(),
            passionLevel: Joi.string().valid("Low", "Medium", "High", "Very-High"),
            year: Joi.date().min("1900").max("now"),
        }).options({ allowUnknown: true, abortEarly: false }),
    },
};
