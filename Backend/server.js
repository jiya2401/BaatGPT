// import OpenAI from 'openai';
// import 'dotenv/config';

// const client = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const response = await client.responses.create({
//   model: 'gpt-4o-mini',
//   input: 'joke related to computer science',
// });

// console.log(response.output_text);
import express from "express";
import 'dotenv/config';
import cors from "cors";
import mongoose, { connect } from "mongoose";
import chatRoutes from "./routes/chat.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

app.use("/api", chatRoutes)

app.listen(PORT, ()=> {
  console.log(`server running on ${PORT}`);
  connectDB();
});

const connectDB = async() => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected with Database!");

  }catch(err) {
    console.log("Failed to connect with Db", err);
  }
}

// app.post("/test", async(req, res) => {
//   const options = {
//        method: "POST",
//        headers: {
//          "Content-Type": "application/json",
//           "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
//        },
//        body: JSON.stringify({
//         model:"gpt-4o-mini",
//         messages: [{
//           role: "user",
//           content: req.body.message
//         }]

//        })
//   };

//   try {
//    const response = await fetch("https://api.openai.com/v1/chat/completions", options);
//    const data = await response.json();
//   //  console.log(data.choices[0].message.content);
//    res.send(data.choices[0].message.content);
//   } catch(err) {
//     console.log(err);
//   }
// });