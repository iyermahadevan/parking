module.exports = {

  getData: function(ddb, username, latStr, lonStr, radiusStr) {
    var lat = parseFloat(latStr);
    var lon = parseFloat(lonStr);
    var radius = parseFloat(radiusStr);
    var minLat = lat - radius;
    var maxLat = lat + radius;
    var minLon = lon - radius;
    var maxLon = lon + radius;
    var params = {
      TableName: "piot-status-table",
      FilterExpression: '#payload.#state.#reported.#empty = :emptyValue \
                        and #payload.#state.#reported.#geoLocation.#latitude >= :minLatValue \
                        and #payload.#state.#reported.#geoLocation.#latitude <= :maxLatValue \
                        and #payload.#state.#reported.#geoLocation.#longitude >= :minLonValue \
                        and #payload.#state.#reported.#geoLocation.#longitude <= :maxLonValue',
      ExpressionAttributeNames: {
          '#payload': 'payload',
          '#state': 'state',
          '#reported': 'reported',
          '#empty': 'empty',
          '#geoLocation': 'geoLocation',
          '#latitude': 'latitude',
          '#longitude': 'longitude',
      },
      ExpressionAttributeValues: {
          ':emptyValue': 1,
          ':minLatValue': minLat,
          ':maxLatValue': maxLat,
          ':minLonValue': minLon,
          ':maxLonValue': maxLon,
      },    
    };
    return ddb.scan(params).promise();
  },
  

  getSpots: function(data) {
    var spots = [];
    data.Items.forEach(spot => {
      console.log(spot);
      var deviceId = spot.deviceId;
      var reported = spot.payload.state.reported;
      var item = {deviceId:deviceId, reported:reported};
      console.log(JSON.stringify());
      spots.push(item);
    });
    return spots;
  }
}
