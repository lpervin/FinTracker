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
import DeleteForeverSharpIcon from '@material-ui/icons/DeleteForeverSharp'
import Link from '@material-ui/core/Link';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    mainContent: {
        marginTop: theme.spacing(2)
    },
    DeleteLink: {
        cursor: 'pointer',
        color: theme.palette.error.dark + '!important'
    }
}) );

export default  function FinsecurityList({ Id }) {
        const classes = useStyles();
        const [finSecurities, setFinSecurities] = useState({totalItems: 0, items: []});
        const [page, setPage] = React.useState(0);
        const [rowsPerPage, setRowsPerPage] = React.useState(10);
        const [dataLoadingStatus, setDataLoadingStatus] = React.useState(true);
        const [deletedRowsCnt, setDeletedRowsCnt] = React.useState(0);
        
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
           
        }, [Id, page, rowsPerPage, deletedRowsCnt]);

    const handleChangePage = (event, newPage) => {
        console.log(newPage);
        setPage(newPage);
        
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    
    const handleDelete = (id) => {
        console.log(id);
        const doDelete = window.confirm('Delete this row?');
        if (!doDelete)
            return false;

        const apiUrl = configs.serviceUrl + 'finsecurity/' + id;       
        axios.delete(apiUrl)
            .then((results)=> {
               
                const newCount = deletedRowsCnt+1;
                setDeletedRowsCnt(newCount);
            })
            .catch((error)=> {
                console.log(error)
                window.alert('Error Occured!');
            })
            .finally(()=> {
                //setDataLoadingStatus(true);
            });
        
       
        
    }
        
        return (
               
            <Card className={classes.mainContent}> 
                <CardContent>              
                    {dataLoadingStatus && <CircularProgress color="primary"/>}
                    <TableContainer>
                        <Table size="medium">
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        &nbsp;
                                    </TableCell>
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
                                                    <Link className={classes.DeleteLink} title="Delete"  onClick={() => handleDelete(row.id)} id={row.id}>
                                                        <DeleteForeverSharpIcon   />                                        
                                                    </Link>
                                                    
                                                </TableCell>
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
