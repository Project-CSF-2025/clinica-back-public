const Joi = require('joi');

const statusChangeSchema = Joi.object({
    id_report: Joi.number().required(),
    old_status: Joi.string().required(),
    new_status: Joi.string().required(),
});

class CreateStatusChangeDTO {
    constructor(data) {
        const { error, value } = statusChangeSchema.validate(data, { abortEarly: false });
        if (error) throw new Error(`Validation error: ${error.details.map(e => e.message).join(', ')}`);

        Object.assign(this, value);
    }
}

module.exports = CreateStatusChangeDTO;
