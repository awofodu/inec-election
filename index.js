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

// Handle production
if(process.env.NODE_ENV === 'production'){
    // Static folder
    app.use(express.static(__dirname + '/public/'));

    // Handle SPA
    app.get(/.*/, (req, res) => {
        res.sendFile(__dirname + '/public/index.html')
    }); // It refers to any route at all
}

const PORT = process.env.SERVER_PORT || 5000

const start = () => {
    try {
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}

start()