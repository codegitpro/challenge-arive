import Joi from "joi";

export const UserValidation = {
    createUser: {
        body: Joi.object({
            name: Joi.string().max(128).required(),
        }).options({ allowUnknown: true }),
    },
    updateUser: {
        body: Joi.object({
            name: Joi.string().max(128).required(),
        }).options({ allowUnknown: true }),
    },
};
