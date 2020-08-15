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
import CircularProgress from '@material-ui/core/CircularProgress';

import axios from "axios";
import FinsecurityList from "./finsecurityList";
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
    const [addInProgress, setAddInProgress] = React.useState(false);
    const [lastFinSecurityId, setLastFinSecurityId] = React.useState(0);
    const [formState, setFormState] = React.useState({Name: false, Symbol: false});
    
    const handleChange = (event) => {
        //console.log(event);
        const prop = event.target.id ? event.target.id : event.target.name;
        const newFinSecurity = {...finSecurity};
        newFinSecurity[prop] = event.target.value;
      //  console.log(newState);
        setFinSecurity(newFinSecurity);        
        //Set form state
        const newState = {...formState};
        newState[prop] = !event.target.value || event.target.value.length===0;
        setFormState(newState);
    };
    
    const addFinSecurity = ()=>{
        
        //event.preventDefault();
        /***Validation**/
        let isValid = true;
        const newState = {...formState};
        if (finSecurity.Symbol.length===0)  {
            newState.Symbol = true;
            isValid = false;
        }

        if (finSecurity.Name.length===0)  {
            newState.Name = true;
            isValid = false;
        }
        console.log(newState);
        setFormState(newState);
        if (!isValid)
            return;
        /***Validation**/
        
       // console.log(configs.serviceUrl);
        const apiUrl = configs.serviceUrl + 'finsecurity';
        //console.log(finSecurity);
        setAddInProgress(true);
        axios.post(apiUrl, finSecurity)
            .then((response)=> {
                setLastFinSecurityId(response);
                console.log(response);
            })
            .catch((err) => {console.log(err);})
            .finally(() => 
                                    {
                                        setFinSecurity({Name: '', Symbol: '', SecurityType: 'Equity'  });
                                        setAddInProgress(false);                                        
                                    });
        
    };
    return (
            <div className={classes.root}>
                
                <Grid container spacing={1}>
                    <Grid item lg={12} xs={12}>
                        <Paper className={classes.paper}>
                            Add New Financial Security                        
                        </Paper>
                    </Grid>
                </Grid>  
                <form className={classes.form}>
                    <Paper className={classes.paper}>
                        <Grid container>
                            <Grid item xs={8}>
                        
                                <TextField required id="Symbol"
                                           error={formState.Symbol}
                                           onChange={handleChange}
                                           label="Symbol" placeholder="Symbol"
                                           value={finSecurity.Symbol}
                                           helperText={formState.Symbol ? 'Symbol is required' : ''}
                                />
                                <TextField required id="Name"
                                           error={formState.Name}
                                           onChange={handleChange}
                                           label="Security Name" placeholder="Security Name"
                                           helperText={!formState.Name ? 'Name is required' : ''}
                                           value={finSecurity.Name} />
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
                        <Grid container>        
                            <Grid item xs={8}>
                                &nbsp;
                            </Grid>    
                                <Grid item xs={2}>
                                    
                                    {addInProgress && <CircularProgress color="primary"/>}
                                    
                                </Grid>
                            
                        </Grid>
                    </Paper>                
                </form>
             
                    <FinsecurityList Id={lastFinSecurityId}/>
             
            </div>
        );
    }

