import express from "express";
import { Port } from "./config.js";
import bodyParser from "body-parser";
import cors from 'cors';
import mongoose from "mongoose";
import CreateUser from "./routes/CreateUser.js";
import StockRoutes from "./routes/StockRoutes.js";
import NewsRoutes from "./routes/NewsRoutes.js";
import ReportRoutes from "./routes/ReportRoutes.js";
import dotenv from 'dotenv';
// import nodemailer from "nodemailer";
// import { CronJob} from 'cron';
// import {Trackers} from './models/Trackers.js'; 


 dotenv.config();





// require('dotenv').config({path:__dirname+'/./../../.env'})


const app = express();
app.use(bodyParser.urlencoded({extended:true}));


const mongoDBURL = "mongodb+srv://NandiniAggarwal:nandiinii@cluster0.kexzdrd.mongodb.net/Stocks?retryWrites=true&w=majority";

app.use(cors());

app.use(express.json());

app.use('/api',CreateUser);

app.use("/stocks" , StockRoutes);

app.use('/' , NewsRoutes);

app.use('/analysereport' , ReportRoutes);





  

  mongoose
  .connect(mongoDBURL)
  .then(async () => {
    console.log("connected to database successfully");

    app.listen(Port, (request, response) => {
      console.log(`app is listening on port ${Port}`); 
    })
  })
    .catch((error) => {
      console.log(error);
    });

 
  
   
// const transporter = nodemailer.createTransport({
//     service:"gmail",
//     host: "smtp.gmail.com",
//     port: 587,
//     secure: false, // Use `true` for port 465, `false` for all other ports
//     auth: {
//       user: 'nandini.07032005@gmail.com', // sender gmail address
//       pass:'gevm clyf iahv ojbf', // app password from gmail account 
//     },
//   });


  


//   const getAllEmails = async () => {
//     try {
//         const trackers = await Trackers.find();
//         return trackers.map(tracker => tracker.email);
//     } catch (error) {
//         console.error("Error fetching email IDs:", error);
//         return [];
//     }
// };


// const cronJobOne = new CronJob('*/1 * * * *', async () => {
//   const emails = await getAllEmails();
//   console.log(emails);
// });


// // cronJobOne.start();
// // process.stdin.resume();






  




// const emails = await getAllEmails();
// console.log(emails);
// const mailOptions = {
 
//   from: {
//       name: 'Web Wizard',
//       address:'nandini.07032005@gmail.com'
//   }, // sender address
//   to: emails, // list of receivers
//   subject: "Tracked Company Info", // Subject line
//   text: "Hello world?", // plain text body
//   html: "<b>Hello world?</b>", // html body
// }



// const sendMail = async(transporter , mailOptions) => {
//   try {
//     await transporter.sendMail(mailOptions);
//     console.log('email has been sent!');
//   } catch (error) {
//     console.error(error);
//   }
// }




//  const cronJobTwo =  new CronJob('*/5 * * * *', () => {
//   sendMail(transporter, mailOptions);
// });


// cronJobTwo.start();
// process.stdin.resume();
