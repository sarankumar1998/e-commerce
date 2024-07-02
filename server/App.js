const express = require('express');
const bodyParser = require('body-parser');
const users = require('./routess/users');
const routeProducts = require('./products/routes/route');
const cors = require('cors');
const imageUploadRouter = require('./routess/files');
const swaggerUi = require('./config/swagger'); 

const app = express();
app.use(express.json());

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1', users);
app.use('/api/v2', imageUploadRouter);
app.use('/api/v3', routeProducts);
app.use('/api-docs', swaggerUi); 

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server started on port ${port}`));
