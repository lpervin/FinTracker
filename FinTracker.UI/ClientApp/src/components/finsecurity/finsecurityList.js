import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "@material-ui/core/Button";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import columns from './finSecurityHistoryColumns';
import axios from "axios";
import configs from './../../configs';

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
    },
    AuxLink: {
        cursor: 'pointer',
        color: theme.palette.info.dark + '!important'
    },

    confirmDialog: {
        minWidth: '460px'
    }
}) );

export default  function FinsecurityList({ Id }) {
        const classes = useStyles();
        const [finSecurities, setFinSecurities] = useState({totalItems: 0, items: []});
        const [page, setPage] = React.useState(0);
        const [rowsPerPage, setRowsPerPage] = React.useState(10);
        const [dataLoadingStatus, setDataLoadingStatus] = React.useState(true);
        const [deletedRowsCnt, setDeletedRowsCnt] = React.useState(0);
        const [confirmDelete, setConfirmDelete] = React.useState(false);
        const [rowToDelete, setRowToDelete] = React.useState({});
        const [showHistory, setShowHistory] = React.useState(false);
        
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
    
    const handleDelete = (row) => {
   /*     console.log(row.id);
        const doDelete = window.confirm(`Delete this ${row.symbol}?`);
        if (!doDelete)
            return false;      */
        setRowToDelete(row);
        setConfirmDelete(true);
    }

    const handleClose = () => {
        setConfirmDelete(false);
    };
    
    const handleHistClose = () => {
        setShowHistory(false);
    };
    
    const handleShowPriceHistory = (row) => {
        setShowHistory(true);
        console.log(row.id);
    };
    
    function doDelete() {
        const apiUrl = configs.serviceUrl + 'finsecurity/' + rowToDelete.id;
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
                setConfirmDelete(false);              
            });
    } 

    return (
              <div>
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
                                          <TableCell>
                                              &nbsp;
                                          </TableCell>
                                      </TableRow>
                                  </TableHead>
                                  {!dataLoadingStatus &&  <TableBody>
                                      {finSecurities.items.map((row, index) => {
                                              return (
                                                  <TableRow hover key={row.id}>
                                                      <TableCell>
                                                          <Link className={classes.DeleteLink} title="Delete"  onClick={() => handleDelete(row)} id={row.id}>
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
                                                      <TableCell>
                                                          {row.finSecurityHistoryExists && (<Link title="View Price History" className={classes.AuxLink} onClick={() => handleShowPriceHistory(row)} id={row.id}><FontAwesomeIcon icon={faChartLine}/></Link> )}
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
                  <Dialog
                      open={confirmDelete}
                      onClose={handleClose}                  
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description">
                      <DialogTitle id="alert-dialog-title">Confrim Delete</DialogTitle>
                      <DialogContent>
                          <DialogContentText id="alert-dialog-description"    className={classes.confirmDialog}>
                              Delete  {rowToDelete.name}?                        
                          </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                          <Button onClick={handleClose} color="primary">
                              Cancel
                          </Button>
                          <Button onClick={doDelete} color="secondary" autoFocus>
                              Yes
                          </Button>
                      </DialogActions>
                  </Dialog>

                  <Dialog
                      open={showHistory}
                      onClose={handleHistClose} fullWidth={true} maxWidth="md"
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description">
                      <DialogTitle id="alert-dialog-title">Price History</DialogTitle>
                      <DialogContent>
                          <DialogContentText id="alert-dialog-description"  >
                              Price History Table here
                          </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                          <Button onClick={handleHistClose} color="primary">
                              Ok
                          </Button>                         
                      </DialogActions>
                  </Dialog>
                  
              </div>  
        );
    
}
