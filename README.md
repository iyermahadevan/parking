
Use the following page for information on the overall setup
https://miyesite.atlassian.net/wiki/spaces/MIYESPACE1/pages/98305/Parking+Space+Locator

> node psensorapp.js <device-id> <certsdir> <lat> <lon>
e.g. node psensorapp.js piot-device1 certs/piot 22 33

Generate an auth header
http://miye-bucket2-parking.s3-website-us-west-2.amazonaws.com/signin.html
Copy the auth token and use it in the curl command below

Use the auth header to get the device states
curl -H "Authorization: <token>" https://m9uy944xc9.execute-api.us-west-2.amazonaws.com/prod 

