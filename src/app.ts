import express from "express";
import cors from 'cors';
import { shelterController } from './controllers/shelters_controller'
import { reviewController } from './controllers/reviews_controller'

const app = express();

//Configure Global Middlware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));



// Example of route organizaiton for endpoints
// app.use('api/v1/example', exampleController)

// shelter endpoint
app.use('/api/v1/shelters', shelterController);

//review endpoint
app.use('/api/v1/reviews', reviewController);

export default app