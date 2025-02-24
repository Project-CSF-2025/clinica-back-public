const Joi = require('joi');

const userSchema = Joi.object({
    email: Joi.string().email().required(),
    role: Joi.string().valid('admin', 'staff').required(),
});

class CreateUserDTO {
    constructor(data) {
        const { error, value } = userSchema.validate(data, { abortEarly: false });
        if (error) throw new Error(`Validation error: ${error.details.map(e => e.message).join(', ')}`);

        Object.assign(this, value);
    }
}

module.exports = CreateUserDTO;
