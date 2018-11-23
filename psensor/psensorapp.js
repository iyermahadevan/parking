var awsIot = require('aws-iot-device-sdk');
var INIT_DELAY = 10;

if(process.argv.length < 4) {
    console.log('Usage: node psensorapp.js <devicename> <lat> <lon>');
    process.exit();
}

// var NODE_ID = 'miye-device0';
var NODE_ID = process.argv[2];
var LAT = process.argv[3];
var LON = process.argv[4];
var TAG = '[' + NODE_ID + ']';
var node_id_parts = NODE_ID.split('-');
var type = node_id_parts[0];
console.log(TAG, 'Connecting type:', type, ' deviceId:', NODE_ID, ' ...');
var thingShadow = awsIot.thingShadow({
    keyPath: 'certs/' + type + '/private.pem.key',
    certPath: 'certs/' + type + '/certificate.pem.crt',
    caPath: 'certs/' + type + '/root-CA.crt.pem',
    clientId: NODE_ID,
    host: 'ahxem24ekc6o-ats.iot.us-west-2.amazonaws.com',
    port: 8883,
    region: 'us-west-2',
    debug: false
});

function sendData() {
    var now = new Date();
    var pSensorState = {
        "state": {
            "reported": {
                "empty": 1,
                "timestamp":now,
                "geoLocation": { // An object specifying latitutde and longitude as plain numbers. Used to build the geohash, the hashkey and geojson data
                    "latitude": LAT,
                    "longitude": LON
                },
            }
        }
    };
    var result = thingShadow.update(NODE_ID, pSensorState);
    console.log(TAG, 'sendData: result=', result);
    setTimeout(sendData, INIT_DELAY * 1000);
}

thingShadow.on('connect', function() {
    console.log(TAG, 'Connected.');
    thingShadow.register(NODE_ID, {}, function(){
        console.log(TAG, 'Registered.');
        setTimeout(sendData, INIT_DELAY * 1000);
    })
});

thingShadow.on('status', function (thingName, status, clientToken, stateObject){
    console.log('recv status:', status, stateObject);
})

thingShadow.on('delta', function (thingName, stateObject){
    console.log('recv delta:', stateObject);
})

thingShadow.on('timeout', function (thingName, clientToken){
    console.log('recv timeout for client:', clientToken);
})
