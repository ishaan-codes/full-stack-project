import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
//although our major task is completed here by writing app.use(cors()), but in production we further configure cors
//we specify cors origin in env variables (.env)
//its value * represents freedom of coming cors origin from anywhere, but we should specify the origin (from where url is coming -- be it a vercel app or someother deployment)

//following are security practices for handling data coming into backend
app.use(express.json({limit: '16kb'}));
//this implies that we are allowing express to take input data in form of json files with a size limit of 16kb
//earlier express didn't have functionality to input json data thus bodyParser (parsing middleware) was used, which is not used nowadays as express can handle json files directly
app.use(express.urlencoded({extended: true, limit: '16kb'}));
//this implies to allow encoded input data for ex. <space> in encoded format is %20
//extended allows us to give nested objects
app.use(express.static("public"));
//used to allow static input data such as images, pdfs (name inspired from public folder we made earlier)
app.use(cookieParser());

//routes import
import userRouter from './routes/user.routes.js';
//#debugging -- writing .routes/user.routes.js gives an error

//routes declaration

//normal version -- app.use("/users", userRouter);
//for ex. url formed in this case would be http://localhost:8000/users/register
//standard practice version
app.use("/api/v1/users", userRouter);
//for ex. url formed in this case would be http://localhost:8000/api/v1/users/register
//it is a standard practice of defining api and its version

//earlier we used to write app.get for routes because we were writing both routes and controllers through app
//now things have changed, we have now organised routes and controllers into different folders
//app.use allows us to handle/activate all routes, and moves user through a set of steps mentioned in user.routes.js
//this is an application of middlewares

export {app};