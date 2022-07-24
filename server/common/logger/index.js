const expressWinston = require('express-winston');
const winston = require('winston');

const infoOptions = {
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.cli()
    ),
    expressFormat: false,
    colorize: false,
    meta: false,

}

const errorOptions = {
    transports: [
        new winston.transports.File({
            filename: __dirname + '/../../Logs/logger.log', format: winston.format.combine(
                winston.format.logstash(),
            )
        }),
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.cli()
            )
        })
    ],
    expressFormat: false,
    colorize: false,
}

exports.expressInfoLogger = expressWinston.logger(infoOptions);

exports.expressErrorLogger = expressWinston.errorLogger(errorOptions);

exports.infoLogger = winston.createLogger(infoOptions).info;
exports.errorLogger = winston.createLogger(errorOptions).error;

