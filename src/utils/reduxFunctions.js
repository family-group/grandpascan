export function payloadFormater(payload, identifier) {
    let data = {};
    let ids = [];

    if (typeof payload === 'object' && Array.isArray(payload)) {
        payload.forEach(singleData => {
            data[singleData[identifier]] = singleData;
            ids.push(singleData[identifier]);
        });
    } else {
        data[payload[identifier]] = payload;
        ids.push(payload[identifier]);
    }
    
    return {
        data,
        ids
    }
}