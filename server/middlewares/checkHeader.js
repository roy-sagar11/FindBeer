const Joi = require('joi');
const { DbService } = require('../database/db.service');

exports.checkXuserHeader = (req, res, next) => {
    const xUser = req.headers['x-user'];
    const { error, value } = Joi.string().required().email().validate(xUser);
    if(error){
        res.status(403).send('Unauthorised user, x-user header must be an email');
        return;
    }
    DbService.addRequestLog(req);
    next();
}