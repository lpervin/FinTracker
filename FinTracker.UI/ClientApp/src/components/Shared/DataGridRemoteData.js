import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';


const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});

export default function DataGriRemoteData({pageData, columns, setPage, setRowsPerPage}) {
    const classes = useStyles();
    const [rows, setRows] = React.useState([]);
    const [totalItemsCnt, setTotalItemsCnt] = React.useState(0);
    const [curPageIndex, setCurPageIndex] = React.useState(0);
    const [curRowsPerPage, setCurRowsPerPage] = React.useState(25);

    useEffect(()=>{
      //  debugger;
        setRows(pageData.items);
        setTotalItemsCnt(pageData.totalItems)
    }, [pageData]);
    
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        setCurPageIndex(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setCurRowsPerPage(+event.target.value);
        setRowsPerPage(+event.target.value);
        
        setCurPageIndex(0);
        setPage(0);
    };

    return (<React.Fragment>
        <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell
                                key={column.id}
                                align={column.align}
                                style={{ minWidth: column.minWidth }}
                            >
                                {column.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => {
                        return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                {columns.map((column) => {
                                    const value = row[column.id];
                                    return (
                                        <TableCell key={column.id} align={column.align}>
                                            {column.format ? column.format(value) : value}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
            rowsPerPageOptions={[25, 50, 100]}
            component="span"
            count={totalItemsCnt}
            rowsPerPage={curRowsPerPage}
            page={curPageIndex}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
        />
    </React.Fragment>   );
}
