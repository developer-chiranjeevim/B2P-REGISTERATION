import {DynamoDBClient} from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { DeleteCommand } from "@aws-sdk/lib-dynamodb";
import axios from "axios";

const client = new DynamoDBClient({ region: process.env.AWS_REGION });
const docClient = DynamoDBDocumentClient.from(client);

const userModificationController = async (request, response) => {
  const applicationID = request.body.application_id;
  
  // Authorization check
  if (request.token.id.role !== 'admin') {
    return response.status(401).json({ message: "Not Authorized" });
  }
  
  const params = {
    TableName: process.env.DYNAMO_TABLE_NAME,
    Key: {
      application_reference: applicationID
    },
    UpdateExpression: `SET #attr = :value`,
    ExpressionAttributeNames: {
      "#attr": "isVerified"
    },
    ExpressionAttributeValues: {
      ":value": true
    },
    ReturnValues: "ALL_NEW"
  };
  
  try {
    // Update DynamoDB
    const data = await docClient.send(new UpdateCommand(params));
    
    // Extract token from request header
    const token = request.headers.authorization;
    
    // Create user via API
    await axios.post(
      `${process.env.B2P_AUTH_API_URL}/create-user`,
      {
        user_id: request.body.application_id,
        email: request.body.email,
        password: request.body.password,
        role: "teacher"
      },
      {
        headers: {
          Authorization: token
        }
      }
    );
    
    response.json({
      message: "User verified",
      data: data.Attributes
    });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};


const userDeleteController = async(request, response) => {
    try{
        const applicationID = request.body.application_id;
        // Add return statement to prevent further execution
        if(request.token.id.role !== 'admin'){
            return response.status(401).json({message: "Not Authorized"});
        }

        const params = {
            TableName: process.env.DYNAMO_TABLE_NAME,   
            Key: {
                application_reference: applicationID
            },
            ConditionExpression: "attribute_exists(application_reference)" 
        };

        await docClient.send(new DeleteCommand(params));

        return response.status(200).json({
            message: "User deleted successfully",
            application_id: applicationID
        });

    }catch(error){
        response.status(500).json({message: error.message});
    };
};

export {userModificationController, userDeleteController};