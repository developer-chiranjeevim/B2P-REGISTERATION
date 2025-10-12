import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from "dotenv";



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
    const params = {
        TableName : process.env.DYNAMO_TABLE_NAME
    };

    try{
        const result = await dynamodb.send(new ScanCommand(params));
        const applicationNumber = await result.Items.length + 1;
        const application_reference = `B2PTECH${applicationNumber}`;
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
    try{
        const body = request.body;
        response.json({data: body});

    }catch(error){
        response.status(409).json({message: error.message});
    };
};



export {submitForm, fetch_application_number, generate_presiged_url};