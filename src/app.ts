import express from "express";
import cors from 'cors';
const app = express();


//Configure Global Middlware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));



// Example of route organizaiton for endpoints
// app.use('api/v1/example', exampleController)

export default app