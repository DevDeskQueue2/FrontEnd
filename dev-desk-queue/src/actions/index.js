import axios from "axios";


//not deleted
export const SIGNUP_START = "SIGNUP_START";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_ERROR = "SIGNUP_ERROR";


export const signUp = state => dispatch => {
    dispatch({ type : SIGNUP_START})
    // return axios.post("whatever link to post", state)
    //     .then(res => {
    //         dispatch({type : SIGNUP_SUCCESS})

    //     })
    //     .catch(err => {
    //         dispatch ({type: SIGNUP_ERROR, payload: err})

    //     })
    return new Promise(function(res) {
        setTimeout(() => {
            console.log("registered");
            res(state)
            dispatch({type: SIGNUP_SUCCESS})
            
        }, 1500)
    })
};


export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";


export const login = state => dispatch => {

    dispatch({type :LOGIN_START})
    // return axios.post("link", state)
    // .then(res => {
    //     localStorage.setItem("token", res.data)
    //     dispatch({type: LOGIN_SUCCESS, payload: res.data})
        

    // })
    // .catch(err=>{
    //     dispatch({type: LOGIN_ERROR, payload: err})
    // })

    return new Promise(function(res) {
        setTimeout(() => {
            console.log("signin up");
            res(state)
            dispatch({type: LOGIN_SUCCESS, payload: res.data})
            
        }, 1500)
    })
}



export const CATEGORY_START = "CATEGORY_START";
export const CATEGORY_SUCCESS = "CATEGORY_SUCCESS";
export const CATEGORY_ERROR = "CATEGORY_ERROR";


export const fetchCategories = () => dispatch => {

    dispatch({type: CATEGORY_START})
    return axios.get("url")
    .then(res => {

        dispatch({type: CATEGORY_SUCCESS, payload: res.data})

    })
    .catch(err => {
        dispatch({type: CATEGORY_ERROR, payload: err})
    })
}


export const ADD_TICKET_START = "ADD_TICKET_START";
export const ADD_TICKET_SUCCESS ="ADD_TICKET_SUCCESS";
export const ADD_TICKET_ERROR = "ADD_TICKET_ERROR";

export const addTicket = state => dispatch => {
    dispatch({type: ADD_TICKET_START})

    return axios.post("auth url", state)
    .then(res => {
        dispatch({type: ADD_TICKET_SUCCESS, payload: res.data})

    })
    .catch(err => {
        dispatch({type: ADD_TICKET_ERROR, payload:err})
    })
}


export const FETCH_TICKETS_START = "FETCH_TICKETS_START";
export const FETCH_TICKETS_SUCCESS = "FETCH_TICKETS_SUCCESS";
export const FETCH_TICKETS_ERROR = "FETCH_TICKETS_ERROR";


export const fetchTickets = () => dispatch => {
    dispatch({type: FETCH_TICKETS_START})
    return axios.get("auth url")
    .then(res => {
        
        dispatch({type: FETCH_TICKETS_SUCCESS, payload: res.data})

    })
    .catch(err => {
        dispatch({type:FETCH_TICKETS_ERROR, payload: err})
    })
}


export const EDIT_TICKET_START = "EDIT_TICKET_START";
export const EDIT_TICKET_SUCCESS = "EDIT_TICKET_SUCCESS";
export const EDIT_TICKET_ERROR = "EDIT_TICKET_ERROR";

export const editTicket = state => dispatch => {
    dispatch({type : EDIT_TICKET_START})

    return axios.post("auth",state)
    .then(res => {
        dispatch({type: EDIT_TICKET_SUCCESS, payload: res.data})

    })
    .catch(err=> {
        dispatch({type: EDIT_TICKET_ERROR, payload: err})
    })
    
}

