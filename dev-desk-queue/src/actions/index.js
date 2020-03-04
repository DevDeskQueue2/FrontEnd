import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";

//not deleted
export const SIGNUP_START = "SIGNUP_START";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_ERROR = "SIGNUP_ERROR";


export const signUp = state => dispatch => {
    dispatch({ type : SIGNUP_START})
    return axios.post("https://dev-deskqueue2.herokuapp.com/api/auth/register", state)
        .then(res => {
            
            dispatch({type : SIGNUP_SUCCESS})
            
        })
        .catch(err => {
            dispatch ({type: SIGNUP_ERROR, payload: err})

        })
    
};


export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";


export const login = state => dispatch => {

    dispatch({type :LOGIN_START})
    return axios.post("https://dev-deskqueue2.herokuapp.com/api/auth/login", state)
    .then(res => {
        localStorage.setItem("token", res.data)
        dispatch({type: LOGIN_SUCCESS, payload: res.data})

    })
    .catch(err=>{
        dispatch({type: LOGIN_ERROR, payload: err})
    })

}


///AUTH required for axios

export const REMOVE_USER_START = "REMOVE_USER_START";
export const REMOVE_USER_SUCCESS = "REMOVE_USER_SUCCESS";
export const REMOVE_USER_ERROR = "REMOVE_USER_ERROR";

export const removeUser = state => dispatch => {
    dispatch({type: REMOVE_USER_START})
    //needs id to remove user
        return axiosWithAuth().delete("", state)
            .then(res => {
                //return status
                dispatch({type: REMOVE_USER_SUCCESS})
            })
            .catch(err=>{
                dispatch({type: REMOVE_USER_ERROR, payload: err})
            })
}



export const CATEGORY_START = "CATEGORY_START";
export const CATEGORY_SUCCESS = "CATEGORY_SUCCESS";
export const CATEGORY_ERROR = "CATEGORY_ERROR";


export const fetchCategories = () => dispatch => {

    dispatch({type: CATEGORY_START})
    return axiosWithAuth().get("url")
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

    return axiosWithAuth().post("auth url", state)
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
    return axiosWithAuth().get("auth url")
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

    return axiosWithAuth().post("auth", state)
    .then(res => {
        dispatch({type: EDIT_TICKET_SUCCESS, payload: res.data})

    })
    .catch(err=> {
        dispatch({type: EDIT_TICKET_ERROR, payload: err})
    })
    
}


export const FETCH_TICKETS_ID_START = "FETCH_TICKETS_ID_START";
export const FETCH_TICKETS_ID_SUCCESS = "FETCH_TICKETS_ID_SUCCESS";
export const FETCH_TICKETS_ID_ERROR = "FETCH_TICKETS_ID_ERROR";

export const fetchTicketById = state => dispatch => {
    dispatch({type: FETCH_TICKETS_ID_START})
    const { id } = state;
    return axiosWithAuth()
        .get(`/${id}`)
        .then(res => {
            dispatch({type : FETCH_TICKETS_ID_SUCCESS, payload: res.data})
            
        })
        .catch(err => {
            dispatch({type : FETCH_TICKETS_ID_ERROR, payload: err})
        })
}


