const express = require('express');
const bodyParser = require('body-parser');
const { expressInfoLogger, expressErrorLogger, infoLogger, errorLogger } = require('./common/logger');
const { swaggerOptions } = require('./api-docs/swagger');
const beerRouter = require('./routes/beer.routes');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors')

const app = express();

const PORT = process.env.PORT || 4000;

// express middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());
app.use(bodyParser.json())
app.use(expressInfoLogger);
app.use(beerRouter);
// Error logger middleware needs to go after routes
app.use(expressErrorLogger);


//Api docs setup
const swaggerSpec = swaggerJSDoc(swaggerOptions);
serveDocs = swaggerUi.serve;
setUpDocs = swaggerUi.setup(swaggerSpec);
app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.listen(PORT, () => {
    infoLogger("Server started at port: " + PORT);
})
