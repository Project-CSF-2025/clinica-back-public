const Joi = require('joi');

const attachmentSchema = Joi.object({
    id_report: Joi.number().required(),
    attachment_type: Joi.string().valid('IMAGE', 'DOCUMENT').required(),
    file_path: Joi.string().required(), // removed .uri() to allow relative paths like /uploads/file.png
});

class CreateAttachmentDTO {
    constructor(data) {
        const { error, value } = attachmentSchema.validate(data, { abortEarly: false });
        if (error) {
            throw new Error(`Validation error: ${error.details.map(e => e.message).join(', ')}`);
        }

        Object.assign(this, value);
    }
}

module.exports = CreateAttachmentDTO;
