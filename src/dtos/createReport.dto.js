const Joi = require('joi');

const reportSchema = Joi.object({
    id_user: Joi.number().required(),
    department: Joi.string().required(),
    profession: Joi.string().required(),
    location: Joi.string().required(),
    subject: Joi.string().min(5).required(),
    description: Joi.string().optional(),
    isConsequent: Joi.string().valid('yes', 'no').default('no'),
    avoidable: Joi.string().valid('yes', 'no').default('no'), 
    consequenceType: Joi.string().allow(null, ''), 
    suggestions: Joi.string().allow(null, ''),
    status: Joi.string().default('NO LEIDO'),
});

class CreateReportDTO {
    constructor(data) {
        const { error, value } = reportSchema.validate(data, { abortEarly: false });
        if (error) throw new Error(`Validation error: ${error.details.map(e => e.message).join(', ')}`);

        Object.assign(this, value);
    }
}

module.exports = CreateReportDTO;
