import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

import {CTX} from './store'

const useStyles = makeStyles((theme) => ({
    root: {
        padding:theme.spacing(3, 2),
        margin:'50px',
    },
    
    flex: {
        display:'flex',
        alignItems:'center'
    },

    recWindow: {
        width:'30%',
        height:'300px',
    },

    chatWindow: {
        width:'70%',
        height:'300px',
        borderLeft:'1px solid black',
        padding:'20px'

    },

    chatArea: {
        height:'60%',
        width:'100%',
    },

    sendButton: {
        width:'10%'
    },

    space: {
        width:'46%'
    }


  }));
  


export default function Dashboard() {
    const classes = useStyles();

    // CTX store
    const {allChats} = React.useContext(CTX);
    const recip = Object.keys(allChats);

    // local state
    const [activeRecip, changeActiveRecip] = React.useState(recip[0])
    const [textValue, changeTextValue] = React.useState('')

    return (
        <div>
            <Paper color='primary' style={{backgroundColor:'#efefef'}} className={classes.root} elevation={10} >
                <Typography variant="h4" component="h4">
                    Chatting Practice
                </Typography>
                <Typography variant="h5" component="h5">
                    {activeRecip}
                </Typography>

                <div className={classes.flex}>
                    <div className={classes.recWindow}>
                        <List >
                            {recip.map(reci => (
                                    <ListItem onClick={e => changeActiveRecip(e.target.innerText)} key={reci} button> 
                                        <ListItemAvatar>
                                            <Avatar/>
                                         </ListItemAvatar>
                                        <ListItemText primary={reci}/>
                                    </ListItem>
                                    ))
                            }
                        </List>
                    </div>
                    
                    <div color='primary' style={{backgroundColor:'white'}} className={classes.chatWindow}>                   
                       {allChats[activeRecip].map((chat, i) => (
                            <div className={classes.flex} key={i}>
                                <Typography variant="p">
                                        {chat.from}
                                </Typography>
                                <Chip color='primary' style={{backgroundColor:'black'}} label={chat.msg} className={classes.chip}/>        
                            </div>
                        ))
                       }
                    </div>
                </div>
            
            
                <div className={classes.flex}>
                    <div className={classes.space}>

                    </div>
                    <div style={{backgroundColor:'#F8F8F8'}} className={classes.chatArea}>
                        <TextField 
                            id="standard-basic" 
                            label="Send a message"
                            className={classes.chatArea}
                            value={textValue}
                            onChange={e => changeTextValue(e.target.value)}
                        />
                    </div>
                    <div className={classes.sendButton}>
                        <Button style={{backgroundColor:'black', color:'white'}}>
                            Send
                        </Button>

                    </div>
                </div>
            </Paper>
        </div>
        
  );
}

    
          