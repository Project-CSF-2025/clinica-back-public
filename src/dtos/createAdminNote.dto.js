const Joi = require('joi');

const adminNoteSchema = Joi.object({
    id_report: Joi.number().required(),
    admin_message: Joi.string().min(1).required(),
});

class CreateAdminNoteDTO {
    constructor(data) {
        const { error, value } = adminNoteSchema.validate(data, { abortEarly: false });
        if (error) throw new Error(`Validation error: ${error.details.map(e => e.message).join(', ')}`);

        Object.assign(this, value);
    }
}

module.exports = CreateAdminNoteDTO;
