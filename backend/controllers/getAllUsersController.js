import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { ScanCommand } from "@aws-sdk/lib-dynamodb";


const getAllUsersController = async(request, response) => {
    if(request.token.id.role !== 'admin'){
        response.status(401).json({message: "Not Authorized"});
    };
    
    // Create DynamoDB client
    const client = new DynamoDBClient({
      region: process.env.AWS_REGION, // change to your region
    });

    const params = {
        TableName: process.env.DYNAMO_TABLE_NAME
    };

    try{
        const data = await client.send(new ScanCommand(params));
        response.status(200).json({users: data.Items});

        }catch(error){
            response.status(500).json({message: error.message})
        };
    };


export default getAllUsersController;