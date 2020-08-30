const finSecurityHistoryColumns = [
    { id: 'tradeDate', label: 'Date', minWidth: 170,
        format: (value) => {
            let d = new Date(value),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            return [month, day, year].join('/');
        },
        align: 'left'},
    {
        id: 'open',
        label: 'Open',
        minWidth: 170,
        align: 'left',
        format: (value) => value.toFixed(6),
    },
    {
        id: 'high',
        label: 'High',
        minWidth: 170,
        align: 'left',
        format: (value) => value.toFixed(6),
    },
    {
        id: 'low',
        label: 'Low',
        minWidth: 170,
        align: 'left',
        format: (value) => value.toFixed(6),
    },
    {
        id: 'close',
        label: 'Close',
        minWidth: 170,
        align: 'left',
        format: (value) => value.toFixed(6),
    },
    {
        id: 'adj',
        label: 'Adj Close',
        minWidth: 170,
        align: 'left',
        format: (value) => value.toFixed(6),
    },
    {
        id: 'volume',
        label: 'Volume',
        minWidth: 170,
        align: 'left'
    },
];

export default finSecurityHistoryColumns;