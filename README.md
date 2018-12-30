
Use the following page for information on the overall setup
https://miyesite.atlassian.net/wiki/spaces/MIYESPACE1/pages/2392065/Parking+Space+Locator+-+Shadow

Get the certificates into psensor/certs/piot


Using Cloud Formation
---------------------
Note: The certificate has to be created in the console and downloaded to the device

aws cloudformation create-stack --template-body file://setupDevice.yml --stack-name miye-stack1 

aws cloudformation create-stack --template-body file://setupIoT.yml --stack-name miye-stack2 --capabilities CAPABILITY_IAM

aws cloudformation create-stack --template-body file://setupLambda.yml --stack-name miye-stack3 --capabilities CAPABILITY_NAMED_IAM

aws cloudformation create-stack --template-body file://setupAPI.yml --stack-name miye-stack4 --capabilities CAPABILITY_NAMED_IAM

Device Login
------------
Run the following command from psensor to start psensorapp
> node psensorapp.js device-id certsdir area latitude longitude interval
e.g. node psensorapp.js piot-device1 certs/piot area1 100 10 10

API Testing
------------
Use aws cli to put API integration - you will need the test-api resourceId(###1) and the /parking resourceId (###2)
> aws apigateway put-integration --region us-west-2       --rest-api-id "<###1>"         --resource-id "<###2>"   --http-method GET  --type AWS_PROXY  --integration-http-method POST  --uri arn:aws:apigateway:us-west-2:lambda:path//2015-03-31/functions/arn:aws:lambda:us-west-2:###:function:test-lambda/invocations     --credentials arn:aws:iam::###:role/test-api-role

Use aws cli to deploy the API - you will need the test-api resourceId(###1)
> aws apigateway create-deployment --rest-api-id "###1" --stage-name test

Use the aws cli to add the User to the UserPool - you will need the clientId(###1)
> aws cognito-idp sign-up --region us-west-2 --client-id (###1) --username User_1234 --password User_1234 --user-attributes Name=name,Value=User_1234 Name=email,Value=User_1234@company.com

Select the user and click on Confirm button  on the console
node psensorapp.js <apiId> <poolId> <clientId> <username> <password> <latitude> <longitude> <radius>

