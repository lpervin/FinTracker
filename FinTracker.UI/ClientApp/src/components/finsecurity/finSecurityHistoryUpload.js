import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import FilledInput from '@material-ui/core/FilledInput';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import XLSX from 'xlsx'

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
        props.onClose(true);
        setOpen(false);
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
            console.log(workbook);
            if (workbook.SheetNames.length===0)
                return false;
            const sheetName = workbook.SheetNames[0];
            const excelData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
            setHistData(excelData);
          //  console.log(excelData[0]);
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


   
    return (
        <div>
        {/*    <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Open form dialog
            </Button>*/}
            
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
