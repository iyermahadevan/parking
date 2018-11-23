Using https://docs.aws.amazon.com/iot/latest/developerguide/iot-device-sdk-node.html
Used RSA 2048 bit key: Amazon Root CA 1 to avoid error

Example to send telemetry
https://hub.packtpub.com/build-an-iot-application-with-aws-iot-tutorial/

Used the document given below to setup the rules to write to dynamodb and republish updates
C:\tmp\aws\done\aws-tutorial_deploy-iot-application

> node psensorapp.js miye-device1 
This will start the sensor and have it use certs/miye for the certificates

Using the following URL to setup the API call to DynamoDB
https://aws.amazon.com/getting-started/projects/build-serverless-web-app-lambda-apigateway-s3-dynamodb-cognito/

Used the dynamoDB.scan API to get list of all the devices and converted to spots

API URL
curl -H "Authorization: <token>" https://m9uy944xc9.execute-api.us-west-2.amazonaws.com/prod 

Generate an auth header
http://miye-bucket2-parking.s3-website-us-west-2.amazonaws.com/signin.html
Copy the auth token and use it in the curl command below

curl -H "Authorization: eyJraWQiOiJJWHZnTUxJTDFobE13cm5RUmhIR2hNYThWbXNHUzJBSHVvdkxNSmRDUzhzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI0NDliZDZiMS1jN2UzLTRhZTYtOGZmNi03Mjg3YmNhYTJkMjciLCJhdWQiOiIxNDNtOGljdDY4M3I0cWs5bjBkMjc2b2Z2YSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZXZlbnRfaWQiOiJkMTFkZDUzNy1lYjBmLTExZTgtODhlMS04NTAyMDkzMWU2MDYiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTU0MjUzMTM4MCwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLXdlc3QtMi5hbWF6b25hd3MuY29tXC91cy13ZXN0LTJfYzl4dEo5Rlp6IiwiY29nbml0bzp1c2VybmFtZSI6ImRlZkBteWNvbXBhbnkuY29tIiwiZXhwIjoxNTQyNTM0OTgwLCJpYXQiOjE1NDI1MzEzODAsImVtYWlsIjoiZGVmQG15Y29tcGFueS5jb20ifQ.EoNxoU683H7T58D8tQKY2EraxttAxQlK6MeNhkYc1BqCExWhEh4DJQ8HGJBkGNoniu_cAnUaJI80u4cJj60OWbr62s87zakMB2zkxIhEuO15SZYHAqH8XEIMBCVi_VW8D9UuED8_sNaLv6dbZGlWxqSPhBra1W_y-CgEmH0Uth41Oxxg6peiPlF5natXZGl_it_PGFqKt6ZTAXF_N1kYS9LIrqTS61bKYJ_O7bp31ogkZyrOXmbcRGexrk8WstYi2UiS2WGFdo5CLmSt6RVD8FoSGc0dwA3mVJz7OY6HH1kBNvT8fz_IoJrOer-G-efztZtd0IOjTgTwygo75gdGXA" https://m9uy944xc9.execute-api.us-west-2.amazonaws.com/prod 