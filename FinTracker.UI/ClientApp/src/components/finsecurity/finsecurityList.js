import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from "axios";
import configs from './../../configs';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    mainContent: {
        marginTop: theme.spacing(2)
    }
}) );

export default  function FinsecurityList({ Id }) {
        const classes = useStyles();
        const [finSecurities, setFinSecurities] = useState({totalItems: 0, items: []});
        const [page, setPage] = React.useState(0);
        const [rowsPerPage, setRowsPerPage] = React.useState(10);
        const [dataLoadingStatus, setDataLoadingStatus] = React.useState(true);
        useEffect(  () => {
            async function fetchFinSecurities(){
                const apiUrl = configs.serviceUrl + 'finsecurity/query';
                const requestQuery = {SortBy: 'Id', IsSortAscending: false, PageSize: rowsPerPage, Page: page+1 };
                setDataLoadingStatus(true);
                const results = await axios({method: "post", url: apiUrl, data: requestQuery});
                setDataLoadingStatus(false);
                console.log(results.data);
                setFinSecurities(results.data);  
            }
            fetchFinSecurities();
           
        }, [Id, page, rowsPerPage]);

    const handleChangePage = (event, newPage) => {
        console.log(newPage);
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
        
        return (
               
            <Card className={classes.mainContent}> 
                <CardContent>
                   {/* <ul>
                    {finSecurities.totalItems===0 && <CircularProgress color="primary"/>}
                    {finSecurities.items.map(
                        item => (
                            <li key={item.id}>{item.name}</li>)
                    )
                    }
                </ul>*/}
                    {dataLoadingStatus && <CircularProgress color="primary"/>}
                    <TableContainer>
                        <Table size="medium">
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        Smbol
                                    </TableCell>
                                    <TableCell>
                                       Security Name
                                    </TableCell>
                                    <TableCell>
                                        Security Type
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            {!dataLoadingStatus &&  <TableBody>
                                {finSecurities.items.map((row, index) => {
                                        return (
                                            <TableRow hover key={row.id}>
                                                <TableCell>
                                                    {row.symbol}
                                                </TableCell>
                                                <TableCell>
                                                    {row.name}
                                                </TableCell>
                                                <TableCell>
                                                    {row.securityType}
                                                </TableCell>
                                            </TableRow>);
                                    }
                                )}
                            </TableBody>}
                            
                       
                        </Table>
                    </TableContainer>
                    <TablePagination
                    rowsPerPageOptions={[5,10,25]}
                    component="div"
                    count={finSecurities.totalItems}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                        
                 
                </CardContent>
            </Card>  
        );
    
}
