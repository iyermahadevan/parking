
Use the following page for information on the overall setup
https://miyesite.atlassian.net/wiki/spaces/MIYESPACE1/pages/2392065/Parking+Space+Locator+-+Shadow

Get the certificates into psensor/certs/piot
Run the following command from psensor
> node psensorapp.js device-id certsdir area latitude longitude
e.g. node psensorapp.js piot-device1 certs/piot area1 22 33

Generate an auth header
http://miye-bucket2-parking.s3-website-us-west-2.amazonaws.com/signin.html
Copy the auth token and use it in the curl command below

Use the auth header to get the device states
curl -H "Authorization: <token>" https://yopzj8fx35.execute-api.us-west-2.amazonaws.com/test?Latitude=100&Longitude=2&Radius=10

