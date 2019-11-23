export function payloadFormater(action, identifier) {
    let data = {};
    let ids = [];

    if (typeof action.payload === 'object' && Array.isArray(action.payload)) {
        action.payload.forEach(singleData => {
            data[singleData[identifier]] = singleData;
            ids.push(singleData[identifier]);
        });
    } else {
        data[action.payload[identifier]] = action.payload;
        ids.push(action.payload[identifier]);
    }
    
    return {
        data,
        ids
    }
}