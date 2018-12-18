exports.handler = (event, context, callback) => {
    let success = 0;
    let failure = 0;
    const output = event.records.map((record) => {
        console.log('record:', JSON.stringify(record));
        var data = JSON.parse(new Buffer(record.data, 'base64'));
        console.log('data:', JSON.stringify(data));
        /* Data is base64 encoded, so decode here */
        // const recordData = Buffer.from(record.data, 'base64');
        try {
            /*
             * Note: Write logic here to deliver the record data to the
             * destination of your choice
             */
            success++;
            return {
                recordId: record.recordId,
                result: 'Ok',
            };
        } catch (err) {
            failure++;
            return {
                recordId: record.recordId,
                result: 'DeliveryFailed',
            };
        }
    });
    console.log(`Successful delivered records ${success}, Failed delivered records ${failure}.`);
    callback(null, {
        records: output,
    });
};