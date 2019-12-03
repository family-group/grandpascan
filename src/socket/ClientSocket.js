import IO from 'socket.io-client';
import { addNewBlocks } from '../redux/blockActions';
import { addNewTransactions, addNewPendingTransactions } from '../redux/transactionActions';
import { addNewPeer, removePeer, addNewNodeInfo } from '../redux/peerActions';

class ClientSocket {
    static CHANNELS_ACTIONS = {
        NEW_BLOCK: 'NEW_BLOCK',
        NEW_PEER: 'NEW_PEER',
        REMOVE_PEER: 'REMOVE_PEER',
        NEW_CHAIN: 'NEW_CHAIN'
    };

    constructor(channel, dispatch) {
        this.dispatch = dispatch;
        this.channel = channel;
        this.socket = IO(window.__baseUrl);
        this.socket.emit('PUBLIC_CONNECTION', '');
        this.listen();
    }
    listen() {
        this.socket.on(this.channel, data => {
            if (!data.actionType) return;

            switch (data.actionType) {
                case ClientSocket.CHANNELS_ACTIONS.NEW_BLOCK:
                    this.dispatch(addNewBlocks(data.block));
                    this.dispatch(addNewTransactions(data.block.transactions))
                    break;
                case ClientSocket.CHANNELS_ACTIONS.NEW_PEER:
                    this.dispatch(addNewPeer(data.peerInfo));
                    break;
                case ClientSocket.CHANNELS_ACTIONS.REMOVE_PEER:
                    this.dispatch(removePeer(data.nodeUrl));
                    break;
                case ClientSocket.CHANNELS_ACTIONS.NEW_CHAIN:
                    let transactions = [];
                    data.chain.forEach(block => {
                        transactions = transactions.concat(block.transactions);
                    });

                    this.dispatch(addNewBlocks(data.chain));
                    this.dispatch(addNewPendingTransactions(data.pendingTransactions));
                    this.dispatch(addNewTransactions(transactions));
                    this.dispatch(addNewNodeInfo(data.nodeInfo));
                    break;
                default:
                    break;
            }
        });
    }
}
export default ClientSocket;