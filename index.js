/* Loading the environment variables from the .env file. */
const dotenv = require('dotenv')
const cors = require('cors')
const express = require('express')
const fileUpload = require('express-fileupload');
dotenv.config()
require('express-async-errors');
const notFoundMiddleware = require('./src/middleware/not-found');
const errorHandlerMiddleware = require('./src/middleware/error-handler');

const app = express()
// Use the express-fileupload middleware
app.use(fileUpload());
app.use(express.static('public'));

app.use(express.json())

// app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));


/** Routing Starts Here */
const election = require('./src/routes/election')

app.use('/api', election)


/** Routing Ends Here */

/** Middleware Starts Here */

// Error handling 
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
/** Middleware Ends here */

const PORT = process.env.SERVER_PORT || 5000
const HOST = process.env.SERVER_HOST || '127.0.0.1'

const start = () => {
    try {
        app.listen(PORT, HOST, () => console.log(`server started on http://${HOST}:${PORT}`))
    } catch (error) {
        console.log(error)
    }
}

start()