import * as dotenv from 'dotenv';
import app from './app'
dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT, 10)

//Start Server
app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`)
})