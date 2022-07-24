const Joi = require('joi');

const validationSchema = Joi.object({
    rating: Joi.number().integer().required().min(1).max(5),
    comment: Joi.string().optional(),
})

exports.validateReview = (req, res, next) => {
    const id = req.params.id;
    const { error } = Joi.number().validate(id);
    if (error) {
        res.status(400).send('id is required in path and must be a number');
        return;
    }
    const { error: bodyError } = validationSchema.validate(req.body);
    if (bodyError) {
        res.status(400).send(bodyError);
        return;
    }
    next();
}