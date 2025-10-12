import express from "express";
import dotenv from "dotenv";
import formRoute from "./routes/formRoute.js";
import cors from "cors";


dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;


app.use(express.json());
app.use(cors());

app.use('/apis/application', formRoute);

app.listen(PORT, (error) => {
    if(error){
        console.log(error.message);
    }else{
        console.log(`SERVER STARTED ON PORT ${PORT}`);
    };
});


