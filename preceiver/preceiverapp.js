var awsIot = require('aws-iot-device-sdk');
var NODE_ID = 'miye-device0';
var TAG = '[' + NODE_ID + ']';

console.log(TAG, 'Connecting ...');
var device = awsIot.device({
    keyPath: 'certs/private.pem.key',
    certPath: 'certs/certificate.pem.crt',
    caPath: 'certs/root-CA.crt.pem',
    clientId: NODE_ID,
    host: 'ahxem24ekc6o-ats.iot.us-west-2.amazonaws.com',
    port: 8883,
    region: 'us-west-2',
    debug: false
});


device.on('connect', function() {
    console.log(TAG, 'Connected.');
    device.subscribe('$aws/things/miye-device0/shadow/get/accepted')
    device.subscribe('$aws/things/miye-device0/shadow/get/rejected')
    device.publish('$aws/things/miye-device0/shadow/get', '');    
});

device.on('message', function (topic, payload){
    var message = JSON.parse(payload.toString());
    console.log(TAG, 'message:', topic, message);
})
