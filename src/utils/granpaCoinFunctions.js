import BigNumber from 'bignumber.js';
import { COINS } from '../App';

export function toGrandsonCoin(amount) {
    return BigNumber(amount).multipliedBy(COINS.grandson).toString();
}
export function toGrandpaCoin(amount) {
    return BigNumber(amount).dividedBy(COINS.grandpa).toString() + ' GPC';
}