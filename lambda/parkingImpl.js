const latitudeTolerance = 10;
const longitudeTolerance = 10;
module.exports = {
  getArea: function(parkingLocation) {
      console.log('getArea location: ', parkingLocation.Latitude, ', ', parkingLocation.Longitude);
      return {
        minLatitude: parkingLocation.Latitude - latitudeTolerance,
        maxLatitude: parkingLocation.Latitude + latitudeTolerance,
        minLongitude: parkingLocation.Longitude - longitudeTolerance,
        maxLogitude: parkingLocation.Longitude - longitudeTolerance
      };
  },

  getData: function(ddb, username, area) {
    // TBD use the area to set the scan filters and the empty filter
    var params = {
      TableName: 'piot-status-table'
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
