import { DynamoDBClient} from "@aws-sdk/client-dynamodb";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { DynamoDBDocumentClient, ScanCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { get_next_application_number, update_application_number } from "../db/db.js";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from "dotenv";
import { generatePassword } from "../utils/utils.js";


dotenv.config();

const client = new DynamoDBClient({
    region: process.env.AWS_REGION,
    credentials:{
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});


const dynamodb = DynamoDBDocumentClient.from(client);

const fetch_application_number = async(request, response) => {
    
    try{
        const applicationNumber = await get_next_application_number();
        const application_reference = `B2PTECH${applicationNumber}`;
        update_application_number(applicationNumber + 1);
        response.json({application_reference: application_reference}).status(200);

    }catch(error){
        response.json({message: error.message}).status(409);
    };
};

const generate_presiged_url = async(request, response) => {
    
    const {application_reference, file_name, file_type} = request.body;

    try{
        const command = new PutObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: `${application_reference}/${Date.now()}-${file_name}`,
            ContentType: file_type,
        });
    
    
        const presigned_url = await getSignedUrl(s3, command, {expiresIn: 60});
        response.json({presigned_url: presigned_url}).status(200);

    }catch(error){
        response.json({message: error.message}).status(409);
    };

};


const submitForm = async(request, response) => {

    const password = generatePassword();
   
    const body = request.body;
    console.log(body.major);
    const params = {
        TableName: process.env.DYNAMO_TABLE_NAME,
        Item: {
            email: body.email,
            full_name: body.fullName,
            phone_number: body.contactNumber,
            application_reference: body.applicationReference,
            resume_path: body.resumePath,
            identity_path: body.identityPath,
            degree_path: body.degreePath,
            submission_date: new Date().toISOString(),
            whatsapp_number: body.whatsAppNumber,
            early_morning_work: body.earlyMorningWork,
            working_hours: body.workingHours,
            internetConnection: body.internetConnection,
            experienceMonths: body.experienceMonths,
            experienceYears: body.experienceYears,
            address: body.address,
            qualification: body.qualification,
            major: body.major,
            password: password,
            passord_resetted: false,
            isVerified: false            
        },
        
    };

    try{
        
        const add_data = await dynamodb.send(new PutCommand(params));
        response.status(200).json({message: "data added successfully"});

    }catch(error){
        response.status(409).json({message: error.message});
        console.log(error.message);
    };
};



export {submitForm, fetch_application_number, generate_presiged_url};