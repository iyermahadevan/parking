const randomBytes = require('crypto').randomBytes;

const AWS = require('aws-sdk');

const ddb = new AWS.DynamoDB.DocumentClient();

const parkingImpl = require('parkingImpl');

exports.handler = (event, context, callback) => {
    if (!event.requestContext.authorizer) {
      errorResponse('Authorization not configured', context.awsRequestId, callback);
      return;
    }

    const username = event.requestContext.authorizer.claims['cognito:username'];
    // const requestBody = JSON.parse(event.body);
    const parkingLocation = {};
    //if(event["queryStringParamaters"] === undefined) {
    //  errorResponse('queryStringParameters not specified', context.awsRequestId, callback);
    //  return;
    //}
    parkingLocation.Latitude = event["queryStringParameters"]['Latitude'];
    parkingLocation.Longitude = event["queryStringParameters"]['Longitude'];
    const area = parkingImpl.getArea(parkingLocation);

    scanItems(username, area).then(data => {
        var spots = parkingImpl.getSpots(data, area);

        // Because this Lambda function is called by an API Gateway proxy integration
        // the result object must use the following structure.
        callback(null, {
            statusCode: 201,
            body: JSON.stringify(spots),
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        });
    }).catch((err) => {
        console.error(err);
        errorResponse(err.message, context.awsRequestId, callback)
    });
};

function scanItems(username, area) {
    // TBD use the area to set the scan filters
    var params = {
      TableName: 'piot-status-table'
    };
    return ddb.scan(params).promise();
}

function errorResponse(errorMessage, awsRequestId, callback) {
  callback(null, {
    statusCode: 500,
    body: JSON.stringify({
      Error: errorMessage,
      Reference: awsRequestId,
    }),
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });
}
