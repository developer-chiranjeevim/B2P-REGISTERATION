import express from "express";
import dotenv from "dotenv";
import formRoute from "./routes/formRoute.js";
import getAllUsersRouter from "./routes/getAllUsersRoute.js";
import userModificationRouter from "./routes/userModificationRoute.js";
import homeRouter from "./routes/homeRoute.js";
import cors from "cors";
import { db, update_application_number } from "./db/db.js";
import { DynamoDBClient} from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand, PutCommand } from "@aws-sdk/lib-dynamodb";


dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;
const client = new DynamoDBClient({
    region: process.env.AWS_REGION,
    credentials:{
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});
const dynamodb = DynamoDBDocumentClient.from(client);



const fetch_application_number = async() => {
    const params = {
        TableName : process.env.DYNAMO_TABLE_NAME
    };

    try{
        const result = await dynamodb.send(new ScanCommand(params));
        const applicationNumber = await result.Items.length + 1;
        
        update_application_number(applicationNumber)

    }catch(error){
        console.log(error.message);
    };
};

fetch_application_number();


app.use(express.json());
app.use(cors());

app.use("/apis", homeRouter);
app.use('/apis/application', formRoute);
app.use('/apis/users', getAllUsersRouter);
app.use('/apis/modify', userModificationRouter);

app.listen(PORT, (error) => {
    if(error){
        console.log(error.message);
    }else{
        console.log(`SERVER STARTED ON PORT ${PORT}`);
    };
});


