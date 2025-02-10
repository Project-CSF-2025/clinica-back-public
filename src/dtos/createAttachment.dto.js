const Joi = require('joi');

const attachmentSchema = Joi.object({
    id_report: Joi.number().required(),
    attachment_type: Joi.string().valid('image', 'pdf', 'text', 'video').required(),
    file_path: Joi.string().uri().required(),
});

class CreateAttachmentDTO {
    constructor(data) {
        const { error, value } = attachmentSchema.validate(data, { abortEarly: false });
        if (error) throw new Error(`Validation error: ${error.details.map(e => e.message).join(', ')}`);

        Object.assign(this, value);
    }
}

module.exports = CreateAttachmentDTO;
