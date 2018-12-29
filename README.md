
Use the following page for information on the overall setup
https://miyesite.atlassian.net/wiki/spaces/MIYESPACE1/pages/2392065/Parking+Space+Locator+-+Shadow

Get the certificates into psensor/certs/piot
Run the following command from psensor to start psensorapp
> node psensorapp.js device-id certsdir area latitude longitude
e.g. node psensorapp.js piot-device1 certs/piot area1 22 33

Run the following command from test to start ptest
> node ptest.js username password latitude longitude radius
e.g. node ptest.js user1 password1 200 10 10

Using Cloud Formation
---------------------
Note: The certificate has to be created in the console and downloaded to the device

aws cloudformation delete-stack --stack-name miye-stack1 (If present)
aws cloudformation create-stack --template-body file://setupDevice.yml --stack-name miye-stack1 --parameters ParameterKey=KeyName,ParameterValue=Value


aws cloudformation delete-stack --stack-name miye-stack2 (If present)
aws cloudformation create-stack --template-body file://setupIoT.yml --stack-name miye-stack2 --capabilities CAPABILITY_IAM

aws cloudformation create-stack --template-body file://setupCognito.yml --stack-name miye-stack3 --capabilities CAPABILITY_IAM

aws cloudformation create-stack --template-body file://setupLambda.yml --stack-name miye-stack4 --capabilities CAPABILITY_NAMED_IAM