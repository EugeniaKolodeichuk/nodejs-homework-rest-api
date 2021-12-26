import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const { connect, connection } = mongoose;

const uri = process.env.MONGO_URL;

const db = connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection.on("connected", () => {
  console.log("Database connection successful");
});
connection.on("err", (err) => {
  console.log(`Database connection error: ${err.message}`);
});
connection.on("disconnected", (err) => {
  console.log("Database disconnected");
});

process.on("SIGINT", async () => {
  connection.close();
  console.log("Connection DB closed");
  process.exit(1);
});

export default db;
