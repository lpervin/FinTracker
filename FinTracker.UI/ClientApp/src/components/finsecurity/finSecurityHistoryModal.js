import React, {useState, useEffect} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DataGridRemoteData from "../Shared/DataGridRemoteData";
import finSecurityHistoryColumns from '../../configs/ColumnMapings/finSecurityHistoryColumns'
import Button from "@material-ui/core/Button";

import configs from "../../configs";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function FinSecurityHistoryModal({finSecurityId, lastClick}){

    const [openModal, setOpenModal] = useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [dataLoadingStatus, setDataLoadingStatus] = React.useState(false);
    const [finSecurityPageData, setFinSecurityPageData] = React.useState([]);
        
    useEffect(()=>{
        async function fetchFinSecurityHistory(){
            const apiUrl = configs.serviceUrl + 'finSecurityHistory/query';
            const requestQuery = {"SearchTerm": finSecurityId.toString(), SortBy: 'TradeDate', IsSortAscending: false, PageSize: rowsPerPage, Page: page+1 };
            setDataLoadingStatus(true);
            const results = await axios({method: "post", url: apiUrl, data: requestQuery});
            setDataLoadingStatus(false);
            //console.log(results.data);
            setFinSecurityPageData(results.data);
            setOpenModal(true);
        }
        if (finSecurityId>0)
            fetchFinSecurityHistory();        
        
    }, [lastClick,finSecurityId,page,rowsPerPage]);
    
    const finSecurityPageChanged = (newPage) => {
      //  console.log(newPage)
        setPage(newPage);
    };
    
    
    const handleHistClose = () => {
        setOpenModal(false);
    };

    const finSecurityRowsPerPageChange = (rowPerPage)=>{
      //  console.log(rowPerPage);
        setRowsPerPage(rowsPerPage);
        
    };
        return (<div>
        <Dialog
            open={openModal}
            onClose={handleHistClose} fullWidth={true} maxWidth="md"
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">Price History</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description"  >
                    {dataLoadingStatus && <CircularProgress color="primary"/>}
                </DialogContentText>
                <DataGridRemoteData columns={finSecurityHistoryColumns} pageData={finSecurityPageData} setPage={finSecurityPageChanged} setRowsPerPage={finSecurityRowsPerPageChange} />

            </DialogContent>
            <DialogActions>
                <Button onClick={handleHistClose} color="primary">
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
        
    </div>);
}