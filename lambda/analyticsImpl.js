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
                throw new Error(err);
                // console.log(err);
            }
        });
        console.log('addRow item:', item);
    }
}