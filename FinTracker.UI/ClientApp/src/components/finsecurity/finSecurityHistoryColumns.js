const columns = [
    { id: 'Date', label: 'Date', minWidth: 170,
        align: 'left'},
    {
        id: 'Open',
        label: 'Open',
        minWidth: 170,
        align: 'left',
        format: (value) => value.toFixed(6),
    },
    {
        id: 'High',
        label: 'High',
        minWidth: 170,
        align: 'left',
        format: (value) => value.toFixed(6),
    },
    {
        id: 'Low',
        label: 'Low',
        minWidth: 170,
        align: 'left',
        format: (value) => value.toFixed(6),
    },
    {
        id: 'Close',
        label: 'Close',
        minWidth: 170,
        align: 'left',
        format: (value) => value.toFixed(6),
    },
    {
        id: 'Adj Close',
        label: 'Adj Close',
        minWidth: 170,
        align: 'left',
        format: (value) => value.toFixed(6),
    },
    {
        id: 'Volume',
        label: 'Volume',
        minWidth: 170,
        align: 'left'
    },
];

export default columns;