const Joi = require('joi');

const messageSchema = Joi.object({
    id_report: Joi.number().required(),
    sender_type: Joi.string().valid('user', 'admin').required(),
    message_content: Joi.string().min(1).required(),
    is_read: Joi.boolean().default(false),
});

class CreateMessageDTO {
    constructor(data) {
        const { error, value } = messageSchema.validate(data, { abortEarly: false });
        if (error) throw new Error(`Validation error: ${error.details.map(e => e.message).join(', ')}`);

        Object.assign(this, value);
    }
}

module.exports = CreateMessageDTO;
