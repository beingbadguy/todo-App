import mongoose from 'mongoose';
import { configDotenv } from 'dotenv';
configDotenv();

const dbConnect = () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
      console.log('database has been connected');
    })
    .catch((error) => {
      console.log(error);
      console.log('not able to connect to the database');
      process.exit(1);
    });
};
export default dbConnect;
