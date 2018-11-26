const randomBytes = require('crypto').randomBytes;

const AWS = require('aws-sdk');

const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
    if (!event.requestContext.authorizer) {
      errorResponse('Authorization not configured', context.awsRequestId, callback);
      return;
    }

    const username = event.requestContext.authorizer.claims['cognito:username'];
    // const requestBody = JSON.parse(event.body);
    const parkingLocation = {};
    parkingLocation.Latitude = event["queryStringParameters"]['Latitude'];
    parkingLocation.Longitude = event["queryStringParameters"]['Longitude'];
    const area = findArea(parkingLocation);

    findParking(username, area).then(data => {
        var spots = [];
        data.Items.forEach(spot => {
          console.log(spot);
          var empty = spot.payload.state.reported.empty;
          if(empty == 1){
            var deviceId = spot.deviceId;
            var reported = spot.payload.state.reported;
            var item = {deviceId:deviceId, reported:reported};
            console.log(JSON.stringify());
            spots.push(item);
          }
        });

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

function findArea(parkingLocation) {
    console.log('Finding area for ', parkingLocation.Latitude, ', ', parkingLocation.Longitude);
    return 1;
}

function findParking(username, area) {
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