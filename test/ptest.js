global.fetch = require('node-fetch')
const AWS = require("aws-sdk");
var AmazonCognitoIdentity = require("amazon-cognito-identity-js");

if(process.argv.length < 7) {
    console.log('Usage: node psensorapp.js <username> <password> <latitude> <longitude> <radius>');
    process.exit();
}

var username = process.argv[2];
var password = process.argv[3];
var latitude = process.argv[4];
var longitude = process.argv[5];
var radius = process.argv[6];

var authenticationData = {
    Username : username,
    Password : password,
};
var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
var poolData = { 
    UserPoolId : 'us-west-2_c9xtJ9FZz',
    ClientId : '143m8ict683r4qk9n0d276ofva'
};
var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
var userData = {
    Username : username,
    Pool : userPool
};
var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function (result) {
        var accessToken = result.getAccessToken().getJwtToken();
        /* Use the idToken for Logins Map when Federating User Pools with identity pools or when passing through an Authorization Header to an API Gateway Authorizer*/
        var idToken = result.idToken.jwtToken;
        handleToken(accessToken, idToken);
    },

    onFailure: function(err) {
        alert(err);
    },

});

function handleToken(accessToken, idToken) {
    console.log('accessToken:', accessToken, ' idToken:', idToken);
    const request = require('request');
    var baseURL = "https://e41b8t8e26.execute-api.us-west-2.amazonaws.com/test/parking";
    // var baseURL =  "https://yopzj8fx35.execute-api.us-west-2.amazonaws.com/test";
    var url =  baseURL + "?" +
        "Latitude=" + latitude + 
        "&Longitude=" + longitude +
        "&Radius=" + radius;
    request({ url:url, headers:{"Authorization" : idToken} }, 
        function (error, response, body) {
            if(error != null)
                console.log('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            console.log(body);
            result = JSON.parse(body);
            console.log("Parking available at:");
            for (i = 0; i < result.length; i++)  
                console.log(result[i].reported.geoLocation);
        }
    );
}

console.log('ptest');