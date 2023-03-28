import express from "express";
import * as dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
const app = express();


if (!process.env.PORT) {
   process.exit(1);
}

const PORT: number = parseInt(process.env.PORT, 10)

//Configure Global Middlware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

//Start Server
app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`)
})

// Example of route organizaiton for endpoints
// app.use('api/v1/example', exampleController)
