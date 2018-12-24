var awsIot = require('aws-iot-device-sdk');
var INIT_DELAY = 10;

if(process.argv.length < 7) {
    console.log('Usage: node psensorapp.js <devicename> <certsdir> <areaId> <latitude> <longitude> [<interval>]');
    process.exit();
}

// var NODE_ID = 'miye-device0';
var NODE_ID = process.argv[2];
var certs = process.argv[3];
var area = process.argv[4];
var lat = parseFloat(process.argv[5]);
var lon = parseFloat(process.argv[6]);
if(process.argv.length > 7) {
    INIT_DELAY = parseInt(process.argv[7]);
}
var TAG = '[' + NODE_ID + ']';
console.log(TAG, 'Connecting deviceId:', NODE_ID, ' area:', area, ' at lat:', lat, ' lon:', lon,  ' ...', ' init_delay:', INIT_DELAY);
var thingShadow = awsIot.thingShadow({
    keyPath: certs + '/private.pem.key',
    certPath: certs + '/certificate.pem.crt',
    caPath: certs + '/root-CA.crt.pem',
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
                    "latitude": lat,
                    "longitude": lon
                },
                "area": area
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
