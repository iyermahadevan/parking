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
    //if(event["queryStringParamaters"] === undefined) {
    //  errorResponse('queryStringParameters not specified', context.awsRequestId, callback);
    //  return;
    //}

    var lat = 0;
    var lon = 0;
    var radius = 0;
    try {
      var latStr = event["queryStringParameters"]['Latitude'];
      var lonStr = event["queryStringParameters"]['Longitude'];
      var radiusStr = event["queryStringParameters"]['Radius'];
      lat = parseFloat(latStr);
      lon = parseFloat(lonStr);
      radius = parseFloat(radiusStr);
      if (isNaN(lat)) {
        throw(new Error("Invalid latitude:"+ latStr));
      }
      if (isNaN(lon)) {
        throw(new Error("Invalid longitude:"+ lonStr));
      }
      if (isNaN(radius)) {
        throw(new Error("Invalid radius:"+ radiusStr));
      }
    }
    catch(err) {
      console.error(err);
      errorResponse("queryString:" + err.message, context.awsRequestId, callback);
      return;
    }

    parkingImpl.getData(ddb, username, lat, lon, radius).then(data => {
        var spots = parkingImpl.getSpots(data);

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
