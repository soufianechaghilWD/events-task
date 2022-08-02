import express, {Express} from "express"
import dotenv from "dotenv"
import connectToDB from "./connectToDB";
import apiRouter from "./routes";

dotenv.config();

const app:Express = express();
const port = process.env.PORT || 8080;

app.use(express.json())
app.use('/api', apiRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
  connectToDB()
});