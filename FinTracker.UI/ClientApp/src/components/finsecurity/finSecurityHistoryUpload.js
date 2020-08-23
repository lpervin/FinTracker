import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import StickyHeadTable from "../Shared/StickyHeadTable";
import XLSX from 'xlsx'
import {makeStyles} from "@material-ui/core/styles";


export default function FinSecurityHistoryUpload(props) {  
    const [open, setOpen] = useState(false);
    const [histData, setHistData] = useState([]);
    useEffect(()=>{
        setOpen(props.openHistory);
    }, [props])

/*    const handleClickOpen = () => {
        setOpen(true);
    };*/
    const handleClose = () => {
        props.onClose(false);
        setOpen(false);

    };
    const handleOk = () => {
        props.onClose(true, histData);
        setOpen( true);
    };
    
    const handleFile = (event) => {
        const file = event.target.files[0];
        if (!validFileType(file)){
            console.log('not valid')
            return false;
        }          
        const reader = new FileReader();
        reader.onload = (e) => {
            let data = e.target.result;
            let workbook = XLSX.read(data, {type: 'binary'});
            //console.log(workbook);
            if (workbook.SheetNames.length===0)
                return false;
            const sheetName = workbook.SheetNames[0];
            const excelData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName],{raw: false});
            setHistData(excelData);
            //console.log(excelData);
        };
        
        reader.readAsBinaryString(file);
    };
    
   const validFileType = (file) => {
        const fileTypes = [
            "text/csv",
            "application/vnd.ms-excel"
        ]
        for (let i = 0; i < fileTypes.length; i++) {
            if (file.type === fileTypes[i]) {
                return true;
            }
        }
        return false;
    }

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
   
    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true} maxWidth="md">
                <DialogTitle id="form-dialog-title">Upload Historical Data</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Select csv or excel file with historical data.
                    </DialogContentText>
                    <Button
                        variant="contained"
                        component="label"
                    >
                        Upload File
                        <input
                            type="file"
                            accept=".xlsx, .xls, .csv"
                            onChange={handleFile}
                            style={{ display: "none" }}
                        />
                    </Button>
                    <div
                        style={{ paddingTop: "15px" }}
                    >
                        {histData.length>0 && <StickyHeadTable columns={columns} rows={histData}/>}
                    </div>                       
                         
           
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    {histData.length>0 && (<Button onClick={handleOk} color="primary">
                        OK
                    </Button>)}
                    
                </DialogActions>
            </Dialog>
        </div>
    );
}
