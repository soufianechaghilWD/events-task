import mongoose from "mongoose";

const connectToDB = () => {
  mongoose
    .connect(process.env.DATABASE_URL_DEPLOYMENT as string)
    .then(() => {
      console.log("connected to the database");
    })
    .catch((error) => {
      console.log("Could not connect to the database: ", error);
    });
};

export default connectToDB;
