global.fetch = require('node-fetch')
const AWS = require("aws-sdk");
var AmazonCognitoIdentity = require("amazon-cognito-identity-js");

if(process.argv.length < 5) {
    console.log('Usage: node psensorapp.js <username> <password> <longitude>');
    process.exit();
}

var username = process.argv[2];
var password = process.argv[3];
var latitude = process.argv[4];

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
    // console.log('accessToken:', accessToken, ' idToken:', idToken);
    const request = require('request');
    var url =  "https://yopzj8fx35.execute-api.us-west-2.amazonaws.com/test?Latitude=" + latitude + "&Longitude=2&Radius=10";
    request({ url:url, headers:{"Authorization" : idToken} }, 
        function (error, response, body) {
            if(error != null)
                console.log('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            console.log('body:', body); // Print the HTML for the Google homepage.
        }
    );
}

console.log('ptest');