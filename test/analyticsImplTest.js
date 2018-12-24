const randomBytes = require('crypto').randomBytes;

const AWS = require('aws-sdk');
AWS.config.update({region:'us-west-2'});


const ddb = new AWS.DynamoDB();

const analyticsImpl = require('../lambda/analyticsImpl');

console.log('analyticsImplTest');

let tableName = "piot-statistics-table";
let ts = (new Date()).toUTCString();
let deviceId = 'piot-device1';
let area = 'a1';
let activity = 12;

analyticsImpl.addRow(ddb, tableName, ts, deviceId,  area, ts, activity);