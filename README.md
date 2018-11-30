
Use the following page for information on the overall setup
https://miyesite.atlassian.net/wiki/spaces/MIYESPACE1/pages/2392065/Parking+Space+Locator+-+Shadow

Get the certificates into psensor/certs/piot
Run the following command from psensor to start psensorapp
> node psensorapp.js device-id certsdir area latitude longitude
e.g. node psensorapp.js piot-device1 certs/piot area1 22 33

Run the following command from test to start ptest
> node ptest.js username password latitude longitude radius
e.g. node ptest.js user1 password1 200 10 10

