module.exports = {
    addRow: function(ddb, tableName, ts, deviceId, area, activity) {
        var activityStr = activity.toString();
        var item = {
            'ts': {S:ts}, 
            'deviceId': {S:deviceId}, 
            'area': {S:area}, 
            'activity': {S:activityStr}
        };
        var params = {
            TableName: tableName,
            Item: item
        }
        ddb.putItem(params, function(err, data) {
            if(err) {
                console.log(err);
            }
            else {
                console.log('Success', data)
            }
        });
        console.log('addRow item:', item);
    }
}