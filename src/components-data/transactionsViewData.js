export const transactionsViewData = {
    transactionDataHash: {label: 'Hash', linkTo: '/transaction', hex: true},
    dateCreated: {label: 'Date created', type: 'date'},
    status: {label: 'Status'},
    from: {label: 'From', linkTo: '/address', type: 'address', hex: true},
    to: {label: 'To', linkTo: '/address', type: 'address', hex: true},
    value: {label: 'Value', type: 'coin'},
    // fee: {label: 'Fee'},
    minedInBlockIndex: {label: 'Mined in block index'},
    data: {label: 'Data'},
};