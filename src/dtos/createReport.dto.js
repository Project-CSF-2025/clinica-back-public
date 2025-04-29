const Joi = require('joi');

const reportSchema = Joi.object({
  id_user: Joi.number().required(),
  department: Joi.string().required(),
  profession: Joi.string().required(),
  location: Joi.string().required(),
  subject: Joi.string().min(5).required(),
  description: Joi.string().optional(),

  // Accept Spanish-style yes/no
  isConsequent: Joi.string().valid('si', 'no').default('no'),
  avoidable: Joi.string().valid('si', 'no').default('no'),

  consequenceType: Joi.string().allow(null, ''),
  suggestions: Joi.string().allow(null, ''),
  status: Joi.string().default('NO LEIDO'),
});

class CreateReportDTO {
  constructor(data) {
    const { error, value } = reportSchema.validate(data, { abortEarly: false });
    if (error) {
      throw new Error(
        `Validation error: ${error.details.map(e => e.message).join(', ')}`
      );
    }

    // ✅ Assign all base values
    Object.assign(this, value);

    // ✅ Convert 'si' to true and 'no' to false
    this.isConsequent = value.isConsequent === 'si';
    this.avoidable = value.avoidable === 'si';
  }
}

module.exports = CreateReportDTO;
