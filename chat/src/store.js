import React from 'react';
import io from 'socket.io-client';

export const CTX = React.createContext();


const initState = {
    aaron: [
        {from: 'aaron', msg: "hello"},
        {from: 'aaron', msg: "how is your day?"},
        {from: 'aaron', msg: "I miss you..."}
    ],
    tim: [
        {from: 'tim', msg: "hello"},
        {from: 'tim', msg: "hello"},
        {from: 'tim', msg: "hello"}
    ]
}

function reducer(state, action) {
    const {from, msg, recip} = action.payload;
    switch(action.type) {
        case 'RECEIVE MESSAGE':
            return {
               ...state,
               [recip]: [
                   ...state[recip],
                   {from, msg}
               ]
            }
        
        default:
            return state
    }
}

var socket;

export default function Store(props) {
    
    if(!socket){
        socket = io.connect(':3000');
    }

    const [allChats] = React.useReducer(reducer, initState)
    
    return (
        <CTX.Provider value={{allChats}}>
            {props.children}
        </CTX.Provider>
    )
}
