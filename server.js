let express = require('express');
const axios = require('axios')
let app = express();
let port = 3000;

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');


const { body, validationResult } = require('express-validator');




app.use(express.json())

const options = {
    swaggerDefinition: {
        info: {
            title: 'swagger demo',
            version: '1.0.0',
            description: 'Swagger demo',
        },
        host: '137.184.133.59:3000',
        basepath: '/'
    },
    apis:['./server.js'],
};

const specs = swaggerJsdoc(options);

app.use('/docs',swaggerUi.serve, swaggerUi.setup(specs));
app.use(cors());

const mariadb = require('mariadb');
const pool = mariadb.createPool({
        host : 'localhost',
        user : 'root',
        password: 'root',
        database: 'sample',
        port: 3306,
        connectionLimit:5
});


app.get('/say', (req,res) => {
    axios.get(`https://q7l9sc1wg3.execute-api.us-east-2.amazonaws.com/prod/myfunction/?keyword=${req.query.keyword}`)
    .then(result => {
        res.status(200)
        res.send(result.data)
    })
    .catch(err => {
        res.status(400)
        res.send(err)
    })
})

app.listen(port, () => {
    console.log('Example app listening at port',port);
});
