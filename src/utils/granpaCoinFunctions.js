import React from 'react';
import BigNumber from 'bignumber.js';
import { COINS } from '../App';
import { dateHumanize } from './dateFunctions';
import Link from '../components/Link';

export function toGrandsonCoin(amount) {
    return BigNumber(amount).multipliedBy(COINS.grandson).toString();
}
export function toGrandpaCoin(amount) {
    return BigNumber(amount).dividedBy(COINS.grandpa).toString() + ' GPC';
}
export function renderColumnAccordingLabel(obj, key) {
    const { data } = this.props;

    if (key === 'status')
        return data['transferSuccessful'] ? 'Confirmed' : 'Pending';
    if (data[key] === undefined || data[key] === null) 
        return 'N/A';
    if (obj[key].type && obj[key].type.toLowerCase() === 'date') 
        return dateHumanize(data[key]);
    if (obj[key].type && obj[key].type.toLowerCase() === 'coin') 
        return toGrandpaCoin(data[key]);
    if (obj[key].linkTo)
        return (
            <Link to={obj[key].linkTo + '/' + data[key] + `${obj[key].type === 'address' ? '/transactions' : ''}`}>
                {data[key]}
            </Link>
        );
    if (Array.isArray(data[key]))
        return data[key].length;
    if (obj[key].capitalize)
        return data[key].toString().slice(0, 1).toUpperCase() + data[key].toString().slice(1);
    return data[key].toString();
}