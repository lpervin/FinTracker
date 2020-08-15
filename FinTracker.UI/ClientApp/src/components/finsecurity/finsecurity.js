import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import Axios from "axios";
import configs from './../../configs';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {        
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary
    },
    form: {
        paddingTop: '1em',
        '& .MuiTextField-root': {
            margin: theme.spacing(2),
            width: '25ch',
        }    
    },
    formControl: {
        margin: theme.spacing(2),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    addButton: {
        marginTop: theme.spacing(4),
    }
}));

export default function Finsecurity()  {
    const classes = useStyles();
    const [finSecurity, setFinSecurity] = React.useState({Name: '', Symbol: '', SecurityType: 'Equity'  });
 
    const handleChange = (event) => {
        //console.log(event);
        const prop = event.target.id ? event.target.id : event.target.name;
        const newState = {...finSecurity};
        newState[prop] = event.target.value;
      //  console.log(newState);
        setFinSecurity(newState);        
    };
    
    const addFinSecurity = ()=>{
       // console.log(configs.serviceUrl);
        const apiUrl = configs.serviceUrl + 'finsecurity';
        console.log(finSecurity);
        Axios.post(apiUrl, finSecurity)
            .then((response)=> {console.log(response);})
            .catch((err) => {console.log(err);});
        
    };
    return (
            <div className={classes.root}>
                
                <Grid container spacing={1}>
                    <Grid item lg={12} xs={6}>
                        <Paper className={classes.paper}>
                            Add New Financial Security                        
                        </Paper>
                    </Grid>
                </Grid>  
                <form className={classes.form}>
                <Grid container>
                            <Grid item xs={8}>
                                    <TextField required id="Name"
                                               onChange={handleChange}
                                               label="Security Name" placeholder="Security Name"  
                                               value={finSecurity.Name} />
                                        <TextField required id="Symbol"
                                                   onChange={handleChange}
                                                   label="Symbol" placeholder="Symbol"  
                                                   value={finSecurity.Symbol} />
        
                                        <FormControl className={classes.formControl}>                                
                                        <InputLabel shrink id="securityTypeLabel">
                                            Security Type
                                        </InputLabel>
                                        <Select
                                            labelId="securityTypeLabel"
                                            id="SecurityType"
                                            name="SecurityType"
                                            value={finSecurity.SecurityType}
                                            onChange={handleChange}
                                            displayEmpty
                                            className={classes.selectEmpty}
                                        >                                    
                                            <MenuItem value="Equity">Common Stock</MenuItem>
                                            <MenuItem value="MutualFund">Mututal Fund</MenuItem>
                                            <MenuItem value="ETF">ETF</MenuItem>
                                        </Select>
                                    
                                    </FormControl>
                            </Grid>                          
                            <Grid item xs={2}>
                                <Button variant="contained" color="primary" 
                                        onClick={addFinSecurity}
                                        className={classes.addButton}>
                                    Add Security
                                </Button>
                            </Grid>
                   
                </Grid>
                </form>
            </div>
        );
    }

