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
export function renderColumnAccordingLabel(label) {
    const { labels, data } = this.props;

    if (labels[label].type && labels[label].type.toLowerCase() === 'date') 
        return dateHumanize(data[label]);
    if (labels[label].type && labels[label].type.toLowerCase() === 'coin') 
        return toGrandpaCoin(data[label]);
    if (labels[label].linkTo)
        return <Link to={labels[label].linkTo + '/' + data[label]}>{data[label]}</Link>;
    if (Array.isArray(data[label]))
        return data[label].length;
    if (labels[label].capitalize)
        return data[label].toString().slice(0, 1).toUpperCase() + data[label].toString().slice(1);
    return data[label].toString();
}